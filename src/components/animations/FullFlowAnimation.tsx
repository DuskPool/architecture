

export default function FullFlowAnimation() {
  return (
    <svg viewBox="0 0 800 1200" className="w-full h-full">
      <defs>
        {/* Reusing some defs from other components for consistency */}
        <g id="phoneSmall">
          <rect x="-15" y="-30" width="30" height="60" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2" rx="4" />
          <rect x="-12" y="-22" width="24" height="44" fill="#fff" rx="2" />
        </g>
        <g id="serverSmall">
          <path d="M 0 30 L -30 15 L -30 -30 L 0 -15 Z" fill="#d1d5db" />
          <path d="M 0 30 L 30 15 L 30 -30 L 0 -15 Z" fill="#9ca3af" />
          <path d="M 0 -15 L -30 -30 L 0 -45 L 30 -30 Z" fill="#e5e7eb" />
        </g>
        <g id="circuitSmall">
          <rect x="-30" y="-30" width="60" height="60" fill="#1f2937" rx="6" />
          <circle cx="0" cy="0" r="10" fill="#8b5cf6" />
        </g>
        <g id="stellarNodeSmall">
          <polygon points="0,-30 25,-15 25,15 0,30 -25,15 -25,-15" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2" />
        </g>
        <g id="vaultSmall">
          <path d="M 0 20 L -25 5 L -25 -20 L 0 -5 Z" fill="#d1d5db" />
          <path d="M 0 20 L 25 5 L 25 -20 L 0 -5 Z" fill="#9ca3af" />
          <path d="M 0 -5 L -25 -20 L 0 -35 L 25 -20 Z" fill="#e5e7eb" />
        </g>
      </defs>

      {/* Vertical Path Line */}
      <path d="M 400 100 L 400 1000" fill="none" stroke="#e5e7eb" strokeWidth="4" strokeDasharray="10 10" />

      {/* Step 1: Order Submission */}
      <g transform="translate(0, 150)">
        <path d="M 250 0 L 400 50" fill="none" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M 550 0 L 400 50" fill="none" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4 4" />

        <g transform="translate(250, 0)">
          <use href="#phoneSmall" />
          <rect x="-10" y="-15" width="20" height="30" fill="#3b82f6" opacity="0.2" />
          <text x="0" y="45" fill="#4b5563" fontSize="12" fontWeight="600" textAnchor="middle">BUYER</text>
        </g>
        <g transform="translate(550, 0)">
          <use href="#phoneSmall" />
          <rect x="-10" y="-15" width="20" height="30" fill="#10b981" opacity="0.2" />
          <text x="0" y="45" fill="#4b5563" fontSize="12" fontWeight="600" textAnchor="middle">SELLER</text>
        </g>
        <g transform="translate(400, 50)">
          <circle cx="0" cy="0" r="25" fill="#fff" stroke="#d1d5db" strokeWidth="2" />
          <text x="0" y="4" fill="#4b5563" fontSize="10" fontWeight="bold" textAnchor="middle">ORDERBOOK</text>
        </g>
      </g>

      {/* Step 2: Matching */}
      <g transform="translate(0, 350)">
        <path d="M 400 -100 L 400 0" fill="none" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4 4" />
        <g transform="translate(400, 0)">
          <use href="#serverSmall" />
          <text x="0" y="50" fill="#4b5563" fontSize="12" fontWeight="600" textAnchor="middle">MATCHING ENGINE</text>
          <g opacity="0">
            <animate attributeName="opacity" values="0;0;1;0" keyTimes="0;0.4;0.5;1" dur="4s" repeatCount="indefinite" />
            <text x="0" y="-10" fill="#f59e0b" fontSize="14" fontWeight="bold" textAnchor="middle">MATCH</text>
          </g>
        </g>
      </g>

      {/* Step 3: ZK Proof */}
      <g transform="translate(0, 550)">
        <path d="M 400 -100 L 400 0" fill="none" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4 4" />
        <g transform="translate(250, 0)">
          <rect x="-20" y="-20" width="40" height="40" fill="#fff" stroke="#d1d5db" strokeWidth="2" rx="4" />
          <text x="0" y="4" fill="#4b5563" fontSize="10" textAnchor="middle">DATA</text>
        </g>
        <path d="M 270 0 L 370 0" fill="none" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4 4" />
        <g transform="translate(400, 0)">
          <use href="#circuitSmall" />
          <text x="0" y="50" fill="#4b5563" fontSize="12" fontWeight="600" textAnchor="middle">ZK CIRCUIT</text>
        </g>
      </g>

      {/* Step 4: Verification */}
      <g transform="translate(0, 750)">
        <path d="M 400 -100 L 400 0" fill="none" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4 4" />
        <g transform="translate(400, 0)">
          <use href="#stellarNodeSmall" />
          <text x="0" y="50" fill="#4b5563" fontSize="12" fontWeight="600" textAnchor="middle">ON-CHAIN VERIFICATION</text>
          <g opacity="0">
            <animate attributeName="opacity" values="0;0;1;0" keyTimes="0;0.6;0.7;1" dur="4s" repeatCount="indefinite" />
            <circle cx="0" cy="0" r="15" fill="#10b981" />
            <path d="M -5 0 L -1 4 L 6 -3" fill="none" stroke="#fff" strokeWidth="2" />
          </g>
        </g>
      </g>

      {/* Step 5: Settlement */}
      <g transform="translate(0, 950)">
        <path d="M 400 -100 L 400 0" fill="none" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M 300 -50 L 500 50" fill="none" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M 500 -50 L 300 50" fill="none" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4 4" />

        <g transform="translate(300, -50)">
          <use href="#vaultSmall" />
          <text x="0" y="-40" fill="#4b5563" fontSize="10" textAnchor="middle">ESCROW A</text>
        </g>
        <g transform="translate(500, -50)">
          <use href="#vaultSmall" />
          <text x="0" y="-40" fill="#4b5563" fontSize="10" textAnchor="middle">ESCROW B</text>
        </g>
        <g transform="translate(300, 50)">
          <use href="#vaultSmall" />
          <text x="0" y="40" fill="#4b5563" fontSize="10" textAnchor="middle">WALLET A</text>
        </g>
        <g transform="translate(500, 50)">
          <use href="#vaultSmall" />
          <text x="0" y="40" fill="#4b5563" fontSize="10" textAnchor="middle">WALLET B</text>
        </g>
        <text x="400" y="80" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">ATOMIC SETTLEMENT</text>
      </g>

      {/* Global Moving Particles */}
      <circle r="4" fill="#3b82f6">
        <animateMotion dur="4s" repeatCount="indefinite" path="M 250 150 L 400 200 L 400 350 L 400 550 L 400 750 L 400 950" />
      </circle>
      <circle r="4" fill="#10b981">
        <animateMotion dur="4s" begin="2s" repeatCount="indefinite" path="M 550 150 L 400 200 L 400 350 L 400 550 L 400 750 L 400 950" />
      </circle>
    </svg>
  );
}
