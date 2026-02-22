

export default function KYCOnboarding() {
  return (
    <svg viewBox="0 0 800 450" className="w-full h-full">
      <defs>
        <g id="buildingSm">
          <path d="M 0 30 L -30 15 L -30 -45 L 0 -30 Z" fill="#e5e7eb" />
          <path d="M 0 30 L 30 15 L 30 -45 L 0 -30 Z" fill="#d1d5db" />
          <path d="M 0 -30 L -30 -45 L 0 -60 L 30 -45 Z" fill="#f3f4f6" />
        </g>
        <g id="doc">
          <path d="M -10 -15 L 10 -15 L 10 15 L -10 15 Z" fill="#fff" stroke="#9ca3af" strokeWidth="2" />
          <line x1="-5" y1="-5" x2="5" y2="-5" stroke="#d1d5db" strokeWidth="2" />
          <line x1="-5" y1="0" x2="5" y2="0" stroke="#d1d5db" strokeWidth="2" />
          <line x1="-5" y1="5" x2="2" y2="5" stroke="#d1d5db" strokeWidth="2" />
        </g>
        <g id="desk">
          <path d="M 0 20 L -40 0 L 0 -20 L 40 0 Z" fill="#d1d5db" />
          <path d="M -40 0 L 0 20 L 0 30 L -40 10 Z" fill="#9ca3af" />
          <path d="M 40 0 L 0 20 L 0 30 L 40 10 Z" fill="#6b7280" />
          {/* Operator */}
          <circle cx="0" cy="-30" r="10" fill="#3b82f6" />
          <path d="M -15 -10 C -15 -20, 15 -20, 15 -10 L 15 0 L -15 0 Z" fill="#60a5fa" />
        </g>
        <g id="merkleNode">
          <circle cx="0" cy="0" r="12" fill="#fff" stroke="#10b981" strokeWidth="3" />
        </g>
      </defs>

      {/* Paths */}
      <path d="M 200 225 L 400 225" fill="none" stroke="#9ca3af" strokeWidth="2" strokeDasharray="6 6">
        <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1s" repeatCount="indefinite" />
      </path>
      <path d="M 400 225 C 500 225, 550 300, 650 300" fill="none" stroke="#9ca3af" strokeWidth="2" strokeDasharray="6 6">
        <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1s" repeatCount="indefinite" />
      </path>

      {/* Institution */}
      <g transform="translate(150, 225)">
        <use href="#buildingSm" />
        <text x="0" y="50" fill="#4b5563" fontSize="12" fontWeight="600" textAnchor="middle">INSTITUTION</text>
      </g>

      {/* Operator Desk */}
      <g transform="translate(400, 225)">
        <use href="#desk" />
        <text x="0" y="50" fill="#4b5563" fontSize="12" fontWeight="600" textAnchor="middle">KYC VERIFICATION</text>
        {/* Stamp animation */}
        <g transform="translate(0, -10)">
          <circle cx="10" cy="-10" r="8" fill="#10b981" opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.4;0.5;0.9;1" dur="3s" repeatCount="indefinite" />
          </circle>
          <path d="M 6 -10 L 9 -7 L 14 -13" fill="none" stroke="#fff" strokeWidth="2" opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.4;0.5;0.9;1" dur="3s" repeatCount="indefinite" />
          </path>
        </g>
      </g>

      {/* Merkle Tree */}
      <g transform="translate(650, 200)">
        <line x1="0" y1="0" x2="-30" y2="40" stroke="#d1d5db" strokeWidth="2" />
        <line x1="0" y1="0" x2="30" y2="40" stroke="#d1d5db" strokeWidth="2" />
        <line x1="-30" y1="40" x2="-50" y2="80" stroke="#d1d5db" strokeWidth="2" />
        <line x1="-30" y1="40" x2="-10" y2="80" stroke="#d1d5db" strokeWidth="2" />
        <line x1="30" y1="40" x2="10" y2="80" stroke="#d1d5db" strokeWidth="2" />
        <line x1="30" y1="40" x2="50" y2="80" stroke="#d1d5db" strokeWidth="2" />

        <use href="#merkleNode" x="0" y="0" />
        <use href="#merkleNode" x="-30" y="40" />
        <use href="#merkleNode" x="30" y="40" />
        <use href="#merkleNode" x="-50" y="80" />
        <use href="#merkleNode" x="-10" y="80" />
        <use href="#merkleNode" x="10" y="80" />

        {/* Target Node */}
        <g transform="translate(50, 80)">
          <circle cx="0" cy="0" r="12" fill="#fff" stroke="#10b981" strokeWidth="3" />
          <circle cx="0" cy="0" r="8" fill="#10b981" opacity="0">
            <animate attributeName="opacity" values="0;0;0;1;1" keyTimes="0;0.6;0.7;0.8;1" dur="3s" repeatCount="indefinite" />
          </circle>
        </g>
        <text x="0" y="110" fill="#4b5563" fontSize="12" fontWeight="600" textAnchor="middle">WHITELIST REGISTRY</text>
      </g>

      {/* Moving Document */}
      <g>
        <animateMotion dur="3s" repeatCount="indefinite" path="M 150 160 L 400 210 C 500 210, 550 280, 700 280" />
        <use href="#doc" />
        <g opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;1" keyTimes="0;0.4;0.5;0.9;1" dur="3s" repeatCount="indefinite" />
          <circle cx="5" cy="5" r="4" fill="#10b981" />
          <path d="M 3 5 L 4.5 6.5 L 7 3.5" fill="none" stroke="#fff" strokeWidth="1" />
        </g>
      </g>
    </svg>
  );
}
