/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import KYCOnboarding from './components/animations/KYCOnboarding';
import DepositToEscrow from './components/animations/DepositToEscrow';
import OrderSubmission from './components/animations/OrderSubmission';
import OrderMatching from './components/animations/OrderMatching';
import ZKProofGeneration from './components/animations/ZKProofGeneration';
import OnChainVerification from './components/animations/OnChainVerification';
import AtomicSettlement from './components/animations/AtomicSettlement';
import FullFlowAnimation from './components/animations/FullFlowAnimation';
import MermaidDiagram from './components/MermaidDiagram';

/* ─── Step data ────────────────────────────────────────────────────── */

const STEPS: StepData[] = [
  {
    id: 1,
    title: 'KYC Onboarding',
    Animation: KYCOnboarding,
    description: [
      'Institutions complete off-chain KYC verification through a trusted operator. Once approved, the operator computes a Poseidon hash of the institution\'s identity and registers it in the Registry contract\'s Merkle tree.',
      'The Merkle tree has a depth of 20, supporting up to 1,048,576 participants. Each participant receives a tree index that they\'ll use later to generate Merkle inclusion proofs during settlement - proving they\'re whitelisted without revealing who they are.',
    ],
    code: 'Registry.register_participant(admin, participant)\n  -> Poseidon(id_hash) inserted at tree_index\n  -> whitelist_root updated',
    mermaid: `graph TD
  A[KYC Operator] -->|verify| B[Institution]
  B -->|Poseidon hash| C[id_hash]
  C -->|insert leaf| D[Merkle Tree]
  D -->|update| E[whitelist_root]`,
    privatePublic: {
      private: 'Institution identity, KYC documents',
      public: 'Poseidon(id_hash) leaf, tree index, updated Merkle root',
    },
  },
  {
    id: 2,
    title: 'Deposit to Escrow',
    Animation: DepositToEscrow,
    description: [
      'Traders deposit RWA tokens or payment assets into the Settlement contract\'s escrow. Funds are tracked per-participant per-asset in an on-chain balance map.',
      'Locked amounts are reserved for pending orders and cannot be withdrawn. This ensures that when a trade settles, both sides have sufficient funds for the atomic swap.',
    ],
    code: 'Settlement.deposit(depositor, asset, amount)\n  -> escrow[(addr, asset)] += amount\n  -> balance returned',
    mermaid: `graph TD
  A[Trader Wallet] -->|deposit| B[Settlement Contract]
  B -->|track balance| C["escrow(addr, asset) += amount"]
  C --> D[Funds locked for trading]`,
    privatePublic: {
      private: 'Trading strategy, intended counterparties',
      public: 'Deposit amount, asset address, depositor address',
    },
  },
  {
    id: 3,
    title: 'Order Submission',
    Animation: OrderSubmission,
    description: [
      'The trader computes a Poseidon hash commitment over their full order details: asset, side, quantity, price, nonce, and secret. This commitment is submitted on-chain along with only the asset address and side (buy/sell).',
      'Price and quantity remain completely hidden inside the commitment. The nonce provides uniqueness, while the secret prevents brute-force preimage attacks on the hash.',
    ],
    code: 'commitment = Poseidon(\n  asset, side, qty, price, nonce, secret\n)\nOrderbook.submit_order(\n  trader, commitment, asset, side, expiry\n)',
    mermaid: `graph TD
  A[Order Details] -->|Poseidon hash| B[commitment]
  B -->|submit on-chain| C[Orderbook Contract]
  C -->|stores| D[commitment + asset + side]`,
    privatePublic: {
      private: 'Price, quantity, nonce, secret',
      public: 'Poseidon commitment hash, asset address, side (buy/sell)',
    },
    note: 'Design note: The commitment field order — Poseidon(asset, side, qty, price, nonce, secret) — is canonical across the entire stack. The circuit, prover (circomlibjs), and contracts all use this exact ordering. Commitments are stored on-chain as opaque hashes and never recomputed by contracts, eliminating the risk of hash variant or encoding mismatches between off-chain and on-chain components.',
  },
  {
    id: 4,
    title: 'Order Matching',
    Animation: OrderMatching,
    description: [
      'The off-chain matching engine receives full order details via encrypted channels. It validates that each order\'s commitment matches its on-chain hash, then runs price-time priority matching.',
      'When a buy price meets or exceeds a sell price, a match is found. The execution price is set as the midpoint of the two limit prices. The match record is posted on-chain with both commitment hashes.',
    ],
    code: 'buy.price >= sell.price\n  -> exec_price = (buy.price + sell.price) / 2\n  -> Orderbook.record_match(\n       match_id, buy_commit, sell_commit,\n       asset, qty, exec_price\n     )',
    mermaid: `graph TD
  A[Buy Order] --> C{Price Match?}
  B[Sell Order] --> C
  C -->|buy >= sell| D["exec_price = (buy + sell) / 2"]
  D --> E[Record Match on-chain]`,
    privatePublic: {
      private: 'Individual limit prices, trader identities, matching logic',
      public: 'Match ID, both commitment hashes, execution price, quantity',
    },
  },
  {
    id: 5,
    title: 'ZK Proof Generation',
    Animation: ZKProofGeneration,
    description: [
      'snarkjs generates a Groth16 proof on the BN254 curve. The circuit proves four things simultaneously: both traders are in the KYC Merkle whitelist, both order commitments are valid reconstructions, trade parameters match, and a unique nullifier is derived.',
      'The proof is only 256 bytes yet encodes all of these constraints. Generation takes 30-60 seconds off-chain using the ceremony-generated proving key (zkey) and compiled circuit (WASM).',
    ],
    code: 'const { proof, publicSignals } = \n  await groth16.prove(\n    circuit.wasm,\n    circuit.zkey,\n    witnessInputs     // private + public\n  )\n// proof = 256 bytes (pi_a, pi_b, pi_c)\n// publicSignals = 7 field elements',
    mermaid: `graph TD
  A[Private Inputs] --> D[Circom Circuit]
  B[Public Inputs] --> D
  C[Proving Key] --> D
  D -->|groth16.prove| E[Proof 256 bytes]
  D --> F[7 Public Signals]`,
    privatePublic: {
      private: 'Buyer/seller ID hashes, Merkle proofs, order secrets & nonces',
      public: 'Nullifier hash, both commitments, asset hash, quantity, price, whitelist root',
    },
  },
  {
    id: 6,
    title: 'On-Chain Verification',
    Animation: OnChainVerification,
    description: [
      'The Verifier contract receives the 256-byte proof and 7 public signals. It first computes vk_x - a linear combination of the verification key\'s IC points weighted by the public signals - using bn254_g1_mul and bn254_g1_add.',
      'Then it calls bn254_multi_pairing_check with 4 point pairs to verify the Groth16 equation: e(A,B) = e(alpha,beta) * e(vk_x,gamma) * e(C,delta). This takes only 5-10ms on-chain thanks to Stellar\'s X-Ray Protocol host functions.',
    ],
    code: 'Verifier.verify_proof(vk, proof, pub_signals)\n  -> vk_x = IC[0]\n       + IC[1]*s[0] + IC[2]*s[1] + ...\n  -> bn254_multi_pairing_check(\n       [-A, alpha, vk_x, C],\n       [ B, beta, gamma, delta]\n     ) == true',
    mermaid: `graph TD
  A[Proof + 7 Signals] --> B[Verifier Contract]
  B -->|compute vk_x| C[IC linear combination]
  C -->|bn254_multi_pairing_check| D{Valid?}
  D -->|yes| E[Settlement proceeds]
  D -->|no| F[Transaction rejected]`,
    privatePublic: {
      private: 'Nothing - verification is fully public',
      public: 'Proof bytes (256B), 7 public signals, verification key',
    },
  },
  {
    id: 7,
    title: 'Atomic Settlement',
    Animation: AtomicSettlement,
    description: [
      'Settlement requires explicit authorization from both buyer and seller via Soroban\'s require_auth(). The proof alone is not sufficient — both parties must cryptographically sign the settlement transaction. This prevents a valid proof from being used to settle against a party\'s will.',
      'If the proof is valid, both parties have authorized, and the nullifier hasn\'t been used before, the Settlement contract executes an atomic swap of escrowed balances. Both transfers succeed or neither does — atomicity is guaranteed by the Soroban runtime. The nullifier is stored on-chain permanently to prevent replay attacks.',
    ],
    code: 'Settlement.settle_trade(match_id, ...)\n  -> buyer.require_auth()       ✓\n  -> seller.require_auth()      ✓\n  -> verify_proof(proof, signals) ✓\n  -> check nullifier not used     ✓\n  -> escrow[seller][asset] -= qty\n  -> escrow[buyer][asset]  += qty\n  -> escrow[buyer][pay]    -= price\n  -> escrow[seller][pay]   += price\n  -> store nullifier',
    mermaid: `graph TD
  A[settle_trade] --> B{buyer.require_auth}
  A --> C{seller.require_auth}
  B --> D{verify_proof}
  C --> D
  D --> E{nullifier unused?}
  E --> F[Atomic Swap]
  F --> G[seller asset -> buyer]
  F --> H[buyer payment -> seller]
  F --> I[store nullifier]`,
    note: 'Design note: Proof correctness alone does not authorize settlement. The contract enforces a layered model — require_auth() signatures from both parties, ZK proof verification, nullifier uniqueness, and whitelist root validation must all pass independently. A valid proof with unauthorized addresses is rejected at the signature layer before any funds move.',
  },
];

interface StepData {
  id: number;
  title: string;
  Animation: React.FC;
  description: string[];
  code: string;
  mermaid?: string;
  privatePublic?: {
    private: string;
    public: string;
  };
  note?: string;
}

/* ─── App ──────────────────────────────────────────────────────────── */

export default function App() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveStep(i);
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-gray-900 font-sans selection:bg-gray-200">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/duskpool.png" alt="DuskPool" className="w-8 h-8 rounded-md" />
            <span className="font-semibold text-lg tracking-tight">DuskPool</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
            <a href="#walkthrough" className="hover:text-gray-900 transition-colors">Architecture</a>
            <a href="#circuit" className="hover:text-gray-900 transition-colors">ZK Circuit</a>
            <a href="#contracts" className="hover:text-gray-900 transition-colors">Contracts</a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="https://github.com/DuskPool" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">GitHub</a>
            <a href="https://duskpools.xyz/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2">
              Testnet Demo <span className="text-gray-400">-&gt;</span>
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* ─── Scroll-Driven Walkthrough ─────────────────────────── */}
        <section id="walkthrough" className="max-w-7xl mx-auto px-6 relative scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12">
            {/* Left: Sticky Animation Panel */}
            <div className="hidden lg:block">
              <div className="sticky top-16 h-[calc(100vh-64px)] flex flex-col justify-center py-8">
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
                  {/* Grid pattern background */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-40" />
                  {/* Corner decoration */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-dot-pattern opacity-50" />
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-hatch opacity-60" />

                  {/* Step indicator */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                    <span className="text-[10px] font-mono font-medium text-gray-400 bg-white/90 backdrop-blur-sm border border-gray-100 px-2 py-1 rounded">
                      {String(STEPS[activeStep].id).padStart(2, '0')} / 07
                    </span>
                    <span className="text-[10px] font-medium text-gray-500 bg-white/90 backdrop-blur-sm border border-gray-100 px-2 py-1 rounded">
                      {STEPS[activeStep].title}
                    </span>
                  </div>

                  {/* Animation */}
                  <div className="relative z-10 w-full h-full p-8">
                    {STEPS.map((step, i) => (
                      <div
                        key={step.id}
                        className="absolute inset-0 p-8 transition-opacity duration-500 ease-in-out"
                        style={{ opacity: i === activeStep ? 1 : 0, pointerEvents: i === activeStep ? 'auto' : 'none' }}
                      >
                        <step.Animation />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step dots below animation */}
                <div className="flex items-center justify-center gap-2 mt-4">
                  {STEPS.map((step, i) => (
                    <div
                      key={step.id}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        i === activeStep ? 'bg-gray-900 scale-125' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Scrollable Step Content */}
            <div className="py-16 lg:py-24">
              {/* Section header */}
              <div className="mb-12 lg:mb-16">
                <div className="inline-block mb-4 px-3 py-1 rounded-sm border border-gray-200 bg-white text-xs font-medium text-gray-500 tracking-wide">
                  Trade Lifecycle
                </div>
                <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4 tracking-tight leading-tight">
                  Seven steps to <span className="italic text-gray-500">private settlement</span>
                </h2>
                <p className="text-gray-500 leading-relaxed max-w-lg">
                  From KYC onboarding to atomic settlement — every step preserves privacy while
                  maintaining the security guarantees of the Stellar blockchain.
                </p>
              </div>

              {/* Steps */}
              {STEPS.map((step, i) => (
                <div
                  key={step.id}
                  ref={(el) => { stepRefs.current[i] = el; }}
                  className="min-h-[60vh] flex items-start"
                >
                  <div
                    className={`relative py-10 transition-all duration-500 ${
                      i === activeStep ? 'opacity-100' : 'opacity-40'
                    }`}
                  >
                    {/* Active border accent */}
                    <div
                      className={`absolute left-0 top-10 bottom-10 w-[2px] transition-all duration-500 ${
                        i === activeStep ? 'bg-gray-900' : 'bg-transparent'
                      }`}
                    />

                    <div className="pl-6">
                      {/* Step number & title */}
                      <div className="flex items-baseline gap-3 mb-4">
                        <span className="text-xs font-mono text-gray-400">
                          {String(step.id).padStart(2, '0')}
                        </span>
                        <h3 className="text-2xl font-serif text-gray-900 tracking-tight">
                          {step.title}
                        </h3>
                      </div>

                      {/* Mobile animation (only visible on small screens) */}
                      <div className="lg:hidden mb-6">
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-200 bg-white">
                          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                          <div className="relative z-10 w-full h-full p-4">
                            <step.Animation />
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      {step.description.map((para, j) => (
                        <p key={j} className="text-gray-500 leading-relaxed mb-4 max-w-lg">
                          {para}
                        </p>
                      ))}

                      {/* Code block or Mermaid diagram */}
                      {step.mermaid ? (
                        <div className="mt-4 mb-4 max-w-lg">
                          <MermaidDiagram source={step.mermaid} />
                        </div>
                      ) : (
                        <div className="code-block mt-4 mb-4 max-w-lg">
                          <pre className="whitespace-pre text-[12px] leading-relaxed">{step.code}</pre>
                        </div>
                      )}

                      {/* Private / Public callouts */}
                      {step.privatePublic && (
                        <div className="flex flex-col sm:flex-row gap-3 mt-4 max-w-lg">
                          <div className="flex-1 bg-red-50/60 border border-red-100 rounded-lg px-4 py-3">
                            <div className="flex items-center gap-1.5 mb-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-red-500">Private</span>
                            </div>
                            <p className="text-xs text-red-700/70 leading-relaxed">{step.privatePublic.private}</p>
                          </div>
                          <div className="flex-1 bg-emerald-50/60 border border-emerald-100 rounded-lg px-4 py-3">
                            <div className="flex items-center gap-1.5 mb-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600">Public</span>
                            </div>
                            <p className="text-xs text-emerald-700/70 leading-relaxed">{step.privatePublic.public}</p>
                          </div>
                        </div>
                      )}

                      {/* Design note callout */}
                      {step.note && (
                        <div className="mt-4 max-w-lg bg-amber-50/60 border border-amber-200 rounded-lg px-4 py-3">
                          <p className="text-xs text-amber-900/70 leading-relaxed">{step.note}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Complete Lifecycle ─────────────────────────────────── */}
        <section className="py-24 px-6 max-w-5xl mx-auto border-t border-gray-200">
          <div className="mb-16 text-center">
            <div className="inline-block mb-4 px-3 py-1 rounded-sm border border-gray-200 bg-white text-xs font-medium text-gray-500 tracking-wide">
              End-to-End
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6 tracking-tight">
              The Complete <span className="italic text-gray-500">Lifecycle</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              End-to-end privacy-preserving trade execution — from order submission through
              ZK proof generation to atomic settlement on Stellar.
            </p>
          </div>
          <div className="relative bg-white border border-gray-200 rounded-2xl p-2 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-30" />
            <div className="relative z-10 w-full h-[800px] bg-gray-50/50 rounded-xl border border-gray-100 p-8 overflow-hidden">
              <FullFlowAnimation />
            </div>
          </div>
        </section>

        {/* ─── ZK Circuit Deep Dive ──────────────────────────────── */}
        <section id="circuit" className="py-24 px-6 border-t border-gray-200 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Left: Text */}
              <div className="lg:col-span-2">
                <div className="inline-block mb-4 px-3 py-1 rounded-sm border border-gray-200 bg-white text-xs font-medium text-gray-500 tracking-wide">
                  Circom Circuit
                </div>
                <h2 className="text-3xl font-serif text-gray-900 mb-6 tracking-tight leading-tight">
                  The settlement <span className="italic text-gray-500">proof</span>
                </h2>
                <p className="text-gray-500 mb-6 leading-relaxed">
                  The Circom circuit enforces five constraints that together prove a trade is valid.
                  It takes private inputs (trader secrets, Merkle proofs) and public inputs (commitments, trade params)
                  and produces a single 256-byte Groth16 proof.
                </p>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  The circuit outputs a <strong className="text-gray-700">nullifier hash</strong> derived from both order
                  secrets - unique to each specific trade. Once used, the nullifier is stored on-chain and
                  prevents replay attacks.
                </p>

                <div className="space-y-3">
                  <CircuitStat label="Constraints" value="~23,000" />
                  <CircuitStat label="Proof Size" value="256 bytes" />
                  <CircuitStat label="Public Signals" value="7 (1 output + 6 inputs)" />
                  <CircuitStat label="Tree Depth" value="20 (1M participants)" />
                  <CircuitStat label="Proving Time" value="30-60 seconds" />
                  <CircuitStat label="Verification Time" value="5-10ms on-chain" />
                </div>
              </div>

              {/* Right: Circuit Diagram */}
              <div className="lg:col-span-3 space-y-4">
                {/* Private Inputs */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 relative">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-hatch opacity-60 rounded-tr-lg" />
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Private Inputs (hidden from verifier)</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <SignalBox label="buyerIdHash" type="Poseidon(buyer_id)" />
                    <SignalBox label="sellerIdHash" type="Poseidon(seller_id)" />
                    <SignalBox label="buyerMerkleProof[20]" type="sibling hashes" />
                    <SignalBox label="sellerMerkleProof[20]" type="sibling hashes" />
                    <SignalBox label="buyOrderSecret" type="random 256-bit" />
                    <SignalBox label="sellOrderSecret" type="random 256-bit" />
                    <SignalBox label="buyOrderNonce" type="random 256-bit" />
                    <SignalBox label="sellOrderNonce" type="random 256-bit" />
                  </div>
                </div>

                {/* Public Inputs */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 relative">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-hatch opacity-60 rounded-tr-lg" />
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Public Inputs (visible to verifier)</p>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <SignalBox label="buyCommitment" type="from Orderbook" />
                    <SignalBox label="sellCommitment" type="from Orderbook" />
                    <SignalBox label="assetHash" type="Poseidon(token_addr)" />
                    <SignalBox label="matchedQuantity" type="trade qty" />
                    <SignalBox label="executionPrice" type="trade price" />
                    <SignalBox label="whitelistRoot" type="from Registry" />
                  </div>
                </div>

                {/* Constraints */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">5 Circuit Constraints</p>
                  <div className="space-y-2">
                    <ConstraintRow num="1" label="Buyer Whitelist" formula="MerkleProof(buyerIdHash, proof, indices) == whitelistRoot" />
                    <ConstraintRow num="2" label="Seller Whitelist" formula="MerkleProof(sellerIdHash, proof, indices) == whitelistRoot" />
                    <ConstraintRow num="3" label="Buy Order Valid" formula="Poseidon(asset, 0, qty, price, nonce, secret) == buyCommitment" />
                    <ConstraintRow num="4" label="Sell Order Valid" formula="Poseidon(asset, 1, qty, price, nonce, secret) == sellCommitment" />
                    <ConstraintRow num="5" label="Nullifier" formula="nullifier = Poseidon(buyCommit, sellCommit, qty, buySecret + sellSecret)" />
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">Canonical Poseidon field ordering</p>
                    <p className="text-xs text-gray-500 leading-relaxed mb-3">
                      The circuit defines the canonical field order for every Poseidon hash. The prover (circomlibjs) and on-chain
                      Registry (soroban Poseidon) use this same ordering and variant. Commitments and nullifiers are never recomputed
                      on-chain — contracts store them as opaque bytes. The Merkle tree is the only hash computed both off-chain and
                      on-chain, using identical circomlib-compatible Poseidon(2) in both.
                    </p>
                    <div className="space-y-1 font-mono text-[10px]">
                      <div className="flex gap-2 text-gray-500"><span className="text-gray-400 w-24 shrink-0">Commitment:</span>Poseidon([0] asset, [1] side, [2] qty, [3] price, [4] nonce, [5] secret)</div>
                      <div className="flex gap-2 text-gray-500"><span className="text-gray-400 w-24 shrink-0">Nullifier:</span>Poseidon([0] buyCommit, [1] sellCommit, [2] qty, [3] buySecret+sellSecret)</div>
                      <div className="flex gap-2 text-gray-500"><span className="text-gray-400 w-24 shrink-0">Merkle node:</span>Poseidon([0] left, [1] right)</div>
                    </div>
                  </div>
                </div>

                {/* Output */}
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400" />
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Public Output</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <code className="text-sm font-mono text-violet-300">nullifierHash</code>
                    <span className="text-xs text-gray-500">&mdash;</span>
                    <span className="text-xs text-gray-400">Unique per trade. Stored on-chain to prevent replay. 254-bit BN254 Fr scalar.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Contracts Section ──────────────────────────────────── */}
        <section id="contracts" className="py-24 px-6 bg-[#fafafa] border-t border-gray-200 relative scroll-mt-20">
          <div className="absolute inset-0 bg-hatch opacity-20 pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="mb-16 text-center">
              <div className="inline-block mb-4 px-3 py-1 rounded-sm border border-gray-200 bg-white text-xs font-medium text-gray-500 tracking-wide">
                Soroban Smart Contracts
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6 tracking-tight">
                Four contracts, <span className="italic text-gray-500">one protocol</span>
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Each contract has a specific responsibility. They communicate through cross-contract calls
                on the Stellar blockchain.
              </p>
            </div>

            <div className="mb-12">
              <MermaidDiagram
                source={`graph LR
  R[Registry] -->|whitelist_root| S[Settlement]
  O[Orderbook] -->|commitments & matches| S
  S -->|proof + signals| V[Verifier]
  V -->|valid / invalid| S
  S -->|mark_settled| O`}
                className="border border-gray-200 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ContractCard
                name="Registry"
                subtitle="darkpool_registry"
                address="CAYHF7YE...D6SQRZ"
                description="Maintains KYC-verified participants and RWA asset registry. Participants are stored as Poseidon(id_hash) leaves in a binary Merkle tree with depth 20, supporting up to 1,048,576 participants."
                storage={['participants: Map<Address, Participant>', 'assets: Map<Address, RWAAsset>', 'whitelist_root: BytesN<32>', 'tree_index: u32 (auto-increment)']}
                functions={['register_participant(admin, participant)', 'deactivate_participant(admin, addr)', 'register_asset(admin, asset)', 'get_whitelist_root() -> BytesN<32>']}
              />
              <ContractCard
                name="Orderbook"
                subtitle="darkpool_orderbook"
                address="CA2KQFAC...BW5FIP"
                description="Stores hidden order commitments and match records. Only the Poseidon hash commitment, asset address, and side (buy/sell) are visible. Price, quantity, and trader identity remain hidden."
                storage={['commitments: Map<BytesN<32>, OrderCommitment>', 'matches: Map<BytesN<32>, MatchRecord>', 'order_index: u32']}
                functions={['submit_order(trader, commitment, asset, side, expiry)', 'cancel_order(trader, commitment)', 'record_match(admin, match_id, buy, sell, ...)', 'mark_settled(admin, match_id)']}
              />
              <ContractCard
                name="Settlement"
                subtitle="darkpool_settlement"
                address="CBD24SR5...BC45TJ"
                description="Core contract managing escrow, ZK verification, nullifier tracking, and atomic swaps. Settlement requires both buyer and seller to authorize via require_auth() — a valid proof alone cannot trigger a swap. The settle_trade function enforces: party signatures, Groth16 proof verification, nullifier uniqueness, and whitelist root match before executing the atomic balance transfer."
                storage={['escrow: Map<(Address, Address), i128>', 'locked: Map<(Address, Address), i128>', 'used_nullifiers: Vec<BytesN<32>>', 'settlement_records: Vec<SettlementRecord>']}
                functions={['deposit(depositor, asset, amount)', 'withdraw(withdrawer, asset, amount)', 'lock_escrow(trader, asset, amount)', 'settle_trade(match_id, buyer, seller, ...proof)']}
              />
              <ContractCard
                name="Verifier"
                subtitle="groth16_verifier_bn254"
                address="CBSNZSSJ...QJFNSJ"
                description="Generic BN254 Groth16 verifier. Computes vk_x linear combination using bn254_g1_mul and bn254_g1_add, then verifies the pairing equation with bn254_multi_pairing_check. Equivalent to Ethereum's EIP-196/197 precompiles."
                storage={['(stateless - receives vk as parameter)']}
                functions={['verify_proof(vk, proof, pub_signals)', 'verify_proof_bytes(vk_bytes, proof_bytes, signals_bytes)']}
              />
            </div>
          </div>
        </section>

        {/* ─── Proof Serialization ────────────────────────────────── */}
        <section className="py-24 px-6 border-t border-gray-200">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-serif text-gray-900 mb-4 tracking-tight">
                Proof <span className="italic text-gray-500">serialization</span>
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto text-sm">
                How the Groth16 proof and public signals are encoded for the Soroban contract.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6 relative">
                <div className="absolute top-0 right-0 w-12 h-12 bg-dot-pattern opacity-40 rounded-tr-lg" />
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Proof Bytes (256 bytes)</p>
                <div className="space-y-1 font-mono text-xs">
                  <SerializationRow offset="0" field="pi_a.x" size="32" />
                  <SerializationRow offset="32" field="pi_a.y" size="32" />
                  <SerializationRow offset="64" field="pi_b.x_c1" size="32" />
                  <SerializationRow offset="96" field="pi_b.x_c0" size="32" />
                  <SerializationRow offset="128" field="pi_b.y_c1" size="32" />
                  <SerializationRow offset="160" field="pi_b.y_c0" size="32" />
                  <SerializationRow offset="192" field="pi_c.x" size="32" />
                  <SerializationRow offset="224" field="pi_c.y" size="32" />
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 relative">
                <div className="absolute top-0 right-0 w-12 h-12 bg-dot-pattern opacity-40 rounded-tr-lg" />
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Public Signals (228 bytes)</p>
                <div className="space-y-1 font-mono text-xs">
                  <SerializationRow offset="0" field="signal_count" size="4" />
                  <SerializationRow offset="4" field="nullifierHash" size="32" />
                  <SerializationRow offset="36" field="buyCommitment" size="32" />
                  <SerializationRow offset="68" field="sellCommitment" size="32" />
                  <SerializationRow offset="100" field="assetHash" size="32" />
                  <SerializationRow offset="132" field="matchedQuantity" size="32" />
                  <SerializationRow offset="164" field="executionPrice" size="32" />
                  <SerializationRow offset="196" field="whitelistRoot" size="32" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Footer ─────────────────────────────────────────────── */}
        <footer className="border-t border-gray-200 py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/duskpool.png" alt="DuskPool" className="w-6 h-6 rounded" />
              <span className="text-sm text-gray-500">DuskPool &middot; Built on Stellar Protocol 25</span>
            </div>
            <div className="flex items-center gap-6 text-xs text-gray-400">
              <span>Testnet Deployed</span>
              <span>&middot;</span>
              <span>BN254 Groth16</span>
              <span>&middot;</span>
              <span>Poseidon Hash</span>
              <span>&middot;</span>
              <span>Circom Circuits</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

/* ─── Sub-components ───────────────────────────────────────────────── */

function ContractCard({ name, subtitle, address, description, storage, functions }: {
  name: string;
  subtitle: string;
  address: string;
  description: string;
  storage: string[];
  functions: string[];
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 bg-hatch opacity-40 rounded-tr-xl" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
          <code className="text-[10px] font-mono text-gray-400">{address}</code>
        </div>
        <p className="text-xs font-mono text-gray-400 mb-4">{subtitle}</p>
        <p className="text-sm text-gray-500 mb-5 leading-relaxed">{description}</p>

        <div className="mb-4">
          <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium mb-2">Storage</p>
          <div className="space-y-1">
            {storage.map((s) => (
              <code key={s} className="block text-[11px] font-mono text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                {s}
              </code>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium mb-2">Functions</p>
          <div className="flex flex-wrap gap-1.5">
            {functions.map((fn) => (
              <code key={fn} className="text-[11px] font-mono text-gray-600 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                {fn}
              </code>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SignalBox({ label, type }: { label: string; type: string }) {
  return (
    <div className="bg-gray-50 border border-gray-100 rounded px-3 py-2">
      <code className="text-[11px] font-mono text-gray-700 block">{label}</code>
      <span className="text-[10px] text-gray-400">{type}</span>
    </div>
  );
}

function ConstraintRow({ num, label, formula }: { num: string; label: string; formula: string }) {
  return (
    <div className="flex items-start gap-3 bg-gray-50 border border-gray-100 rounded-lg p-3">
      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-200 text-[10px] font-bold text-gray-600 flex-shrink-0 mt-0.5">
        {num}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-gray-700">{label}</p>
        <code className="text-[10px] font-mono text-gray-500 break-all">{formula}</code>
      </div>
    </div>
  );
}

function CircuitStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-mono font-medium text-gray-900">{value}</span>
    </div>
  );
}

function SerializationRow({ offset, field, size }: { offset: string; field: string; size: string }) {
  return (
    <div className="flex items-center gap-4 py-1.5 border-b border-gray-50">
      <span className="text-gray-400 w-8 text-right">{offset}</span>
      <span className="text-gray-700 flex-grow">{field}</span>
      <span className="text-gray-400">{size}B</span>
    </div>
  );
}

