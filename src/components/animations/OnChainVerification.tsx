import React from 'react';

export default function OnChainVerification() {
  return (
    <svg viewBox="0 0 800 450" className="w-full h-full">
      <defs>
        <g id="crystal">
          <polygon points="0,-15 10,0 0,15 -10,0" fill="#c084fc" />
          <polygon points="0,-15 10,0 0,0" fill="#e879f9" />
          <polygon points="0,15 10,0 0,0" fill="#a855f7" />
        </g>
        <g id="stellarNode">
          <polygon points="0,-40 34,-20 34,20 0,40 -34,20 -34,-20" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2" />
          {/* Stellar-like logo */}
          <path d="M -15 0 L 15 0 M -10 -10 L 10 10 M -10 10 L 10 -10" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
        </g>
      </defs>

      <path d="M 200 225 L 400 225" fill="none" stroke="#9ca3af" strokeWidth="2" strokeDasharray="6 6">
        <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1s" repeatCount="indefinite" />
      </path>

      <g transform="translate(200, 225)">
        <use href="#crystal" />
        <text x="0" y="40" fill="#8b5cf6" fontSize="12" fontWeight="600" textAnchor="middle">ZK PROOF</text>
      </g>

      <g transform="translate(400, 225)">
        <use href="#stellarNode" />
        <text x="0" y="60" fill="#4b5563" fontSize="12" fontWeight="600" textAnchor="middle">X-RAY PROTOCOL</text>
        <text x="0" y="75" fill="#9ca3af" fontSize="10" textAnchor="middle">(BN254)</text>

        {/* Verification Operations */}
        <g transform="translate(60, -20)">
          <circle cx="0" cy="0" r="10" fill="#fff" stroke="#d1d5db" strokeWidth="2" />
          <text x="0" y="4" fill="#9ca3af" fontSize="10" fontWeight="bold" textAnchor="middle">×</text>
          <circle cx="0" cy="0" r="10" fill="#10b981" opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.4;0.5;0.9;1" dur="4s" repeatCount="indefinite" />
          </circle>
          <text x="0" y="4" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle" opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.4;0.5;0.9;1" dur="4s" repeatCount="indefinite" />
            ×
          </text>
        </g>

        <g transform="translate(60, 0)">
          <circle cx="0" cy="0" r="10" fill="#fff" stroke="#d1d5db" strokeWidth="2" />
          <text x="0" y="4" fill="#9ca3af" fontSize="10" fontWeight="bold" textAnchor="middle">+</text>
          <circle cx="0" cy="0" r="10" fill="#10b981" opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.5;0.6;0.9;1" dur="4s" repeatCount="indefinite" />
          </circle>
          <text x="0" y="4" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle" opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.5;0.6;0.9;1" dur="4s" repeatCount="indefinite" />
            +
          </text>
        </g>

        <g transform="translate(60, 20)">
          <circle cx="0" cy="0" r="10" fill="#fff" stroke="#d1d5db" strokeWidth="2" />
          <circle cx="-3" cy="0" r="4" fill="none" stroke="#9ca3af" strokeWidth="1" />
          <circle cx="3" cy="0" r="4" fill="none" stroke="#9ca3af" strokeWidth="1" />
          <circle cx="0" cy="0" r="10" fill="#10b981" opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.6;0.7;0.9;1" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="-3" cy="0" r="4" fill="none" stroke="#fff" strokeWidth="1" opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.6;0.7;0.9;1" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="3" cy="0" r="4" fill="none" stroke="#fff" strokeWidth="1" opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.6;0.7;0.9;1" dur="4s" repeatCount="indefinite" />
          </circle>
        </g>
      </g>

      <g transform="translate(600, 225)">
        <circle cx="0" cy="0" r="20" fill="#10b981" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.7;0.8;0.9;1" dur="4s" repeatCount="indefinite" />
        </circle>
        <path d="M -8 0 L -2 6 L 8 -4" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.7;0.8;0.9;1" dur="4s" repeatCount="indefinite" />
        </path>
        <text x="0" y="40" fill="#10b981" fontSize="12" fontWeight="600" textAnchor="middle" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.7;0.8;0.9;1" dur="4s" repeatCount="indefinite" />
          VERIFIED ✓
        </text>
      </g>

      {/* Moving Crystal */}
      <g>
        <animateMotion dur="4s" repeatCount="indefinite" path="M 200 225 L 400 225" />
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.3;0.4" dur="4s" repeatCount="indefinite" />
          <use href="#crystal" />
        </g>
      </g>
    </svg>
  );
}
