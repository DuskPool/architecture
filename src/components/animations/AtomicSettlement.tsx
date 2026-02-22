import React from 'react';

export default function AtomicSettlement() {
  return (
    <svg viewBox="0 0 800 450" className="w-full h-full">
      <defs>
        <g id="vault">
          <path d="M 0 30 L -40 10 L -40 -30 L 0 -10 Z" fill="#d1d5db" />
          <path d="M 0 30 L 40 10 L 40 -30 L 0 -10 Z" fill="#9ca3af" />
          <path d="M 0 -10 L -40 -30 L 0 -50 L 40 -30 Z" fill="#e5e7eb" />
          <circle cx="20" cy="0" r="8" fill="#4b5563" />
        </g>
        <g id="wallet">
          <path d="M -20 -30 L 20 -30 L 20 30 L -20 30 Z" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2" rx="4" />
          <path d="M -15 -25 L 15 -25 L 15 25 L -15 25 Z" fill="#fff" rx="2" />
          <circle cx="0" cy="15" r="4" fill="#d1d5db" />
        </g>
        <g id="coinGold">
          <ellipse cx="0" cy="0" rx="8" ry="4" fill="#fcd34d" />
          <path d="M -8 0 L -8 3 A 8 4 0 0 0 8 3 L 8 0 Z" fill="#f59e0b" />
        </g>
        <g id="coinGreen">
          <ellipse cx="0" cy="0" rx="8" ry="4" fill="#6ee7b7" />
          <path d="M -8 0 L -8 3 A 8 4 0 0 0 8 3 L 8 0 Z" fill="#10b981" />
        </g>
      </defs>

      <path d="M 300 150 L 500 300" fill="none" stroke="#9ca3af" strokeWidth="2" strokeDasharray="6 6" />
      <path d="M 500 150 L 300 300" fill="none" stroke="#9ca3af" strokeWidth="2" strokeDasharray="6 6" />

      {/* Top Vaults */}
      <g transform="translate(300, 150)">
        <use href="#vault" />
        <text x="0" y="-60" fill="#4b5563" fontSize="12" fontWeight="600" textAnchor="middle">BUYER ESCROW</text>
        <text x="0" y="-45" fill="#f59e0b" fontSize="10" textAnchor="middle">(PAYMENT)</text>
      </g>

      <g transform="translate(500, 150)">
        <use href="#vault" />
        <text x="0" y="-60" fill="#4b5563" fontSize="12" fontWeight="600" textAnchor="middle">SELLER ESCROW</text>
        <text x="0" y="-45" fill="#10b981" fontSize="10" textAnchor="middle">(RWA TOKENS)</text>
      </g>

      {/* Bottom Wallets */}
      <g transform="translate(300, 300)">
        <use href="#wallet" />
        <text x="0" y="50" fill="#4b5563" fontSize="12" fontWeight="600" textAnchor="middle">BUYER WALLET</text>
      </g>

      <g transform="translate(500, 300)">
        <use href="#wallet" />
        <text x="0" y="50" fill="#4b5563" fontSize="12" fontWeight="600" textAnchor="middle">SELLER WALLET</text>
      </g>

      {/* Center Flash */}
      <g transform="translate(400, 225)" opacity="0">
        <animate attributeName="opacity" values="0;0;1;0" keyTimes="0;0.4;0.5;0.6" dur="3s" repeatCount="indefinite" />
        <circle cx="0" cy="0" r="20" fill="#fff" filter="drop-shadow(0 0 10px #3b82f6)" />
        <text x="0" y="4" fill="#3b82f6" fontSize="10" fontWeight="bold" textAnchor="middle">SWAP</text>
      </g>

      {/* Moving Coins */}
      <g>
        <animateMotion dur="3s" repeatCount="indefinite" path="M 300 150 L 500 300" />
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="3s" repeatCount="indefinite" />
          <use href="#coinGold" />
        </g>
      </g>

      <g>
        <animateMotion dur="3s" repeatCount="indefinite" path="M 500 150 L 300 300" />
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="3s" repeatCount="indefinite" />
          <use href="#coinGreen" />
        </g>
      </g>
    </svg>
  );
}
