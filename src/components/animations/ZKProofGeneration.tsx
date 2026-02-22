

export default function ZKProofGeneration() {
  return (
    <svg viewBox="0 0 800 450" className="w-full h-full">
      <defs>
        <g id="docStack">
          <rect x="-15" y="-25" width="30" height="40" fill="#fff" stroke="#d1d5db" strokeWidth="2" rx="2" />
          <rect x="-12" y="-22" width="30" height="40" fill="#fff" stroke="#d1d5db" strokeWidth="2" rx="2" />
          <rect x="-9" y="-19" width="30" height="40" fill="#fff" stroke="#9ca3af" strokeWidth="2" rx="2" />
        </g>
        <g id="zk-circuit-icon">
          <rect x="-40" y="-40" width="80" height="80" fill="#1f2937" rx="8" />
          <path d="M -40 -20 L -20 -20 L -20 0 L 0 0 M 40 20 L 20 20 L 20 0 L 0 0 M -20 40 L -20 20 L 0 20 M 20 -40 L 20 -20 L 0 -20" fill="none" stroke="#3b82f6" strokeWidth="2" />
          <circle cx="0" cy="0" r="15" fill="#8b5cf6" />
          <text x="0" y="4" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">ZK</text>
        </g>
        <g id="crystal">
          <polygon points="0,-15 10,0 0,15 -10,0" fill="#c084fc" />
          <polygon points="0,-15 10,0 0,0" fill="#e879f9" />
          <polygon points="0,15 10,0 0,0" fill="#a855f7" />
        </g>
      </defs>

      <path d="M 200 150 L 400 225" fill="none" stroke="#9ca3af" strokeWidth="2" strokeDasharray="6 6">
        <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1s" repeatCount="indefinite" />
      </path>
      <path d="M 200 300 L 400 225" fill="none" stroke="#9ca3af" strokeWidth="2" strokeDasharray="6 6">
        <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1s" repeatCount="indefinite" />
      </path>
      <path d="M 400 225 L 600 225" fill="none" stroke="#9ca3af" strokeWidth="2" strokeDasharray="6 6">
        <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1s" repeatCount="indefinite" />
      </path>

      <g transform="translate(200, 150)">
        <use href="#docStack" />
        <rect x="-5" y="-5" width="10" height="10" fill="#ef4444" rx="2" />
        <text x="0" y="40" fill="#4b5563" fontSize="12" fontWeight="600" textAnchor="middle">PRIVATE INPUTS</text>
      </g>

      <g transform="translate(200, 300)">
        <use href="#docStack" />
        <circle cx="0" cy="0" r="5" fill="#10b981" />
        <text x="0" y="40" fill="#4b5563" fontSize="12" fontWeight="600" textAnchor="middle">PUBLIC INPUTS</text>
      </g>

      <g transform="translate(400, 225)">
        <use href="#circuit" />
        <text x="0" y="60" fill="#4b5563" fontSize="12" fontWeight="600" textAnchor="middle">ZK CIRCUIT (CIRCOM)</text>

        {/* Pulse effect */}
        <circle cx="0" cy="0" r="20" fill="none" stroke="#8b5cf6" strokeWidth="2" opacity="0">
          <animate attributeName="r" values="20; 60" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8; 0" dur="2s" repeatCount="indefinite" />
        </circle>
      </g>

      <g transform="translate(600, 225)">
        <rect x="-20" y="-15" width="40" height="30" fill="#fff" stroke="#c084fc" strokeWidth="2" rx="2" />
        <path d="M -20 -15 L 0 0 L 20 -15" fill="none" stroke="#c084fc" strokeWidth="2" />
        <text x="0" y="40" fill="#8b5cf6" fontSize="12" fontWeight="600" textAnchor="middle">GROTH16 PROOF</text>
        <text x="0" y="55" fill="#9ca3af" fontSize="10" textAnchor="middle">(256 BYTES)</text>
      </g>

      {/* Moving Crystal */}
      <g>
        <animateMotion dur="3s" repeatCount="indefinite" path="M 400 225 L 600 225" />
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="3s" repeatCount="indefinite" />
          <use href="#crystal" />
        </g>
      </g>
    </svg>
  );
}
