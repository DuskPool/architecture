

export default function OrderMatching() {
  return (
    <svg viewBox="0 0 800 450" className="w-full h-full">
      <defs>
        <g id="phoneBlue">
          <rect x="-20" y="-40" width="40" height="80" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2" rx="4" />
          <rect x="-16" y="-30" width="32" height="60" fill="#3b82f6" rx="2" opacity="0.2" />
          <rect x="-10" y="-20" width="20" height="8" fill="#3b82f6" rx="2" />
          <rect x="-10" y="-5" width="20" height="4" fill="#9ca3af" rx="1" />
          <rect x="-10" y="5" width="15" height="4" fill="#9ca3af" rx="1" />
        </g>
        <g id="phoneGreen">
          <rect x="-20" y="-40" width="40" height="80" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2" rx="4" />
          <rect x="-16" y="-30" width="32" height="60" fill="#10b981" rx="2" opacity="0.2" />
          <rect x="-10" y="-20" width="20" height="8" fill="#10b981" rx="2" />
          <rect x="-10" y="-5" width="20" height="4" fill="#9ca3af" rx="1" />
          <rect x="-10" y="5" width="15" height="4" fill="#9ca3af" rx="1" />
        </g>
        <g id="server">
          <path d="M 0 40 L -40 20 L -40 -40 L 0 -20 Z" fill="#d1d5db" />
          <path d="M 0 40 L 40 20 L 40 -40 L 0 -20 Z" fill="#9ca3af" />
          <path d="M 0 -20 L -40 -40 L 0 -60 L 40 -40 Z" fill="#e5e7eb" />
          {/* Server lights */}
          <circle cx="-20" cy="0" r="2" fill="#10b981" />
          <circle cx="-20" cy="10" r="2" fill="#3b82f6" />
          <circle cx="20" cy="0" r="2" fill="#8b5cf6" />
        </g>
      </defs>

      <path d="M 200 225 C 300 150, 350 150, 400 225" fill="none" stroke="#9ca3af" strokeWidth="2" strokeDasharray="6 6">
        <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1s" repeatCount="indefinite" />
      </path>
      <path d="M 600 225 C 500 150, 450 150, 400 225" fill="none" stroke="#9ca3af" strokeWidth="2" strokeDasharray="6 6">
        <animate attributeName="stroke-dashoffset" from="-24" to="0" dur="1s" repeatCount="indefinite" />
      </path>

      <g transform="translate(200, 225)">
        <use href="#phoneBlue" />
        <text x="0" y="60" fill="#3b82f6" fontSize="12" fontWeight="600" textAnchor="middle">BUYER</text>
      </g>

      <g transform="translate(600, 225)">
        <use href="#phoneGreen" />
        <text x="0" y="60" fill="#10b981" fontSize="12" fontWeight="600" textAnchor="middle">SELLER</text>
      </g>

      <g transform="translate(400, 225)">
        <use href="#server" />
        <text x="0" y="60" fill="#4b5563" fontSize="12" fontWeight="600" textAnchor="middle">MATCHING ENGINE</text>

        {/* Match Burst */}
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;0" keyTimes="0;0.7;0.8;1" dur="3s" repeatCount="indefinite" />
          <circle cx="0" cy="-20" r="30" fill="#fcd34d" opacity="0.3" />
          <path d="M -15 -20 L 15 -20 M 0 -35 L 0 -5 M -10 -30 L 10 -10 M -10 -10 L 10 -30" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
          <text x="0" y="-15" fill="#d97706" fontSize="10" fontWeight="bold" textAnchor="middle">MATCH</text>
        </g>
      </g>

      {/* Moving Envelopes */}
      <g>
        <animateMotion dur="3s" repeatCount="indefinite" path="M 200 225 C 300 150, 350 150, 400 225" />
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.7;0.8" dur="3s" repeatCount="indefinite" />
          <rect x="-10" y="-8" width="20" height="16" fill="#fff" stroke="#3b82f6" strokeWidth="1.5" rx="2" />
          <path d="M -10 -8 L 0 0 L 10 -8" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
          <rect x="-3" y="-2" width="6" height="6" fill="#3b82f6" rx="1" />
        </g>
      </g>
      <g>
        <animateMotion dur="3s" repeatCount="indefinite" path="M 600 225 C 500 150, 450 150, 400 225" />
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.7;0.8" dur="3s" repeatCount="indefinite" />
          <rect x="-10" y="-8" width="20" height="16" fill="#fff" stroke="#10b981" strokeWidth="1.5" rx="2" />
          <path d="M -10 -8 L 0 0 L 10 -8" fill="none" stroke="#10b981" strokeWidth="1.5" />
          <rect x="-3" y="-2" width="6" height="6" fill="#10b981" rx="1" />
        </g>
      </g>
    </svg>
  );
}
