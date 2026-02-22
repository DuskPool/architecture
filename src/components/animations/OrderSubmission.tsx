import React from 'react';

export default function OrderSubmission() {
  return (
    <svg viewBox="0 0 800 450" className="w-full h-full">
      <defs>
        <g id="clipboard">
          <rect x="-20" y="-30" width="40" height="50" fill="#fff" stroke="#d1d5db" strokeWidth="2" rx="2" />
          <rect x="-10" y="-35" width="20" height="10" fill="#9ca3af" rx="2" />
          <line x1="-12" y1="-10" x2="12" y2="-10" stroke="#d1d5db" strokeWidth="2" />
          <line x1="-12" y1="0" x2="12" y2="0" stroke="#d1d5db" strokeWidth="2" />
          <line x1="-12" y1="10" x2="0" y2="10" stroke="#d1d5db" strokeWidth="2" />
        </g>
        <g id="block">
          <path d="M 0 30 L -30 15 L -30 -15 L 0 0 Z" fill="#d1d5db" />
          <path d="M 0 30 L 30 15 L 30 -15 L 0 0 Z" fill="#9ca3af" />
          <path d="M 0 0 L -30 -15 L 0 -30 L 30 -15 Z" fill="#e5e7eb" />
          <text x="15" y="5" fill="#fff" fontSize="8" transform="skewY(26)">0x...</text>
        </g>
        <g id="poseidon">
          <polygon points="0,-20 17,-10 17,10 0,20 -17,10 -17,-10" fill="#8b5cf6" opacity="0.2" stroke="#8b5cf6" strokeWidth="2" />
          {/* Trident */}
          <path d="M 0 10 L 0 -10 M -8 -2 L -8 -10 L 8 -10 L 8 -2" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </defs>

      <path d="M 200 225 L 400 225" fill="none" stroke="#9ca3af" strokeWidth="2" strokeDasharray="6 6">
        <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1s" repeatCount="indefinite" />
      </path>
      <path d="M 400 225 L 600 225" fill="none" stroke="#9ca3af" strokeWidth="2" strokeDasharray="6 6">
        <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1s" repeatCount="indefinite" />
      </path>

      <g transform="translate(200, 225)">
        <use href="#clipboard" />
        <text x="0" y="50" fill="#4b5563" fontSize="12" fontWeight="600" textAnchor="middle">ORDER DETAILS</text>
        <text x="0" y="65" fill="#9ca3af" fontSize="10" textAnchor="middle">(PRIVATE)</text>
      </g>

      <g transform="translate(400, 225)">
        <use href="#poseidon" />
        <text x="0" y="50" fill="#8b5cf6" fontSize="12" fontWeight="600" textAnchor="middle">POSEIDON HASH</text>

        {/* Swirl particles */}
        <g>
          <circle cx="-20" cy="0" r="2" fill="#c084fc">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="20" cy="0" r="2" fill="#8b5cf6">
            <animateTransform attributeName="transform" type="rotate" from="180" to="540" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>
      </g>

      <g transform="translate(600, 225)">
        <use href="#block" />
        <text x="0" y="50" fill="#4b5563" fontSize="12" fontWeight="600" textAnchor="middle">ON-CHAIN COMMITMENT</text>
        <text x="0" y="65" fill="#9ca3af" fontSize="10" textAnchor="middle">(PUBLIC)</text>
      </g>

      {/* Moving Envelope */}
      <g>
        <animateMotion dur="3s" repeatCount="indefinite" path="M 200 225 L 400 225 L 600 225" />
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;1;1;0" keyTimes="0;0.1;0.5;0.9;1" dur="3s" repeatCount="indefinite" />
          <rect x="-10" y="-8" width="20" height="16" fill="#fff" stroke="#8b5cf6" strokeWidth="1.5" rx="2" />
          <path d="M -10 -8 L 0 0 L 10 -8" fill="none" stroke="#8b5cf6" strokeWidth="1.5" />
          <rect x="-3" y="-2" width="6" height="6" fill="#8b5cf6" rx="1" />
        </g>
      </g>
    </svg>
  );
}
