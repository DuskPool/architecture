

export default function DepositToEscrow() {
  return (
    <svg viewBox="0 0 800 450" className="w-full h-full">
      <defs>
        <g id="wallet">
          <path d="M -20 -30 L 20 -30 L 20 30 L -20 30 Z" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2" rx="4" />
          <path d="M -15 -25 L 15 -25 L 15 25 L -15 25 Z" fill="#fff" rx="2" />
          <circle cx="0" cy="15" r="4" fill="#d1d5db" />
          <rect x="-10" y="-15" width="20" height="15" fill="#3b82f6" rx="2" opacity="0.2" />
          <text x="0" y="-5" fill="#3b82f6" fontSize="8" fontWeight="bold" textAnchor="middle">$10k</text>
        </g>
        <g id="vault">
          <path d="M 0 40 L -50 15 L -50 -35 L 0 -10 Z" fill="#d1d5db" />
          <path d="M 0 40 L 50 15 L 50 -35 L 0 -10 Z" fill="#9ca3af" />
          <path d="M 0 -10 L -50 -35 L 0 -60 L 50 -35 Z" fill="#e5e7eb" />
          <circle cx="25" cy="5" r="10" fill="#4b5563" />
          <circle cx="25" cy="5" r="6" fill="#1f2937" />
          <path d="M 25 5 L 25 -1" stroke="#fff" strokeWidth="2" />
        </g>
        <g id="coin">
          <ellipse cx="0" cy="0" rx="10" ry="5" fill="#fcd34d" />
          <path d="M -10 0 L -10 4 A 10 5 0 0 0 10 4 L 10 0 Z" fill="#f59e0b" />
          <ellipse cx="0" cy="0" rx="7" ry="3" fill="#fbbf24" />
        </g>
      </defs>

      <path d="M 200 225 C 350 100, 450 100, 600 225" fill="none" stroke="#9ca3af" strokeWidth="2" strokeDasharray="6 6">
        <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1s" repeatCount="indefinite" />
      </path>

      <g transform="translate(200, 225)">
        <use href="#wallet" />
        <text x="0" y="50" fill="#4b5563" fontSize="12" fontWeight="600" textAnchor="middle">TRADER WALLET</text>
      </g>

      <g transform="translate(600, 225)">
        <use href="#vault" />
        <text x="0" y="60" fill="#4b5563" fontSize="12" fontWeight="600" textAnchor="middle">SETTLEMENT ESCROW</text>

        {/* Balance Counter */}
        <g transform="translate(-25, -15)">
          <rect x="-15" y="-10" width="30" height="15" fill="#10b981" rx="2" />
          <text x="0" y="1" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.8;0.9;1" dur="2s" repeatCount="indefinite" />
            +10k
          </text>
        </g>

        {/* Shield Icon */}
        <g transform="translate(0, -40)" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.7;0.8;0.9;1" dur="2s" repeatCount="indefinite" />
          <path d="M 0 -10 L -8 -5 L -8 2 C -8 6, 0 10, 0 10 C 0 10, 8 6, 8 2 L 8 -5 Z" fill="#10b981" />
          <path d="M -3 0 L -1 2 L 4 -3" fill="none" stroke="#fff" strokeWidth="1.5" />
        </g>
      </g>

      {/* Moving Coins */}
      <g>
        <animateMotion dur="2s" repeatCount="indefinite" path="M 200 225 C 350 100, 450 100, 600 225" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.8;1" dur="2s" repeatCount="indefinite" />
        <use href="#coin" y="-10" />
        <use href="#coin" y="-5" />
        <use href="#coin" y="0" />
      </g>
    </svg>
  );
}
