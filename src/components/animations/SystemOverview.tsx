import React from 'react';

export default function SystemOverview() {
  return (
    <svg viewBox="0 0 1000 600" className="w-full h-full">
      <defs>
        <linearGradient id="shieldGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="pathGradLeftLight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c084fc" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="pathGradRightLight" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="pathGradDownLight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0.3" />
        </linearGradient>
        <filter id="glowShieldLight" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="15" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <g id="buildingLight">
          <path d="M 0 40 L -40 20 L -40 -60 L 0 -40 Z" fill="#e5e7eb" />
          <path d="M 0 40 L 40 20 L 40 -60 L 0 -40 Z" fill="#d1d5db" />
          <path d="M 0 -40 L -40 -60 L 0 -80 L 40 -60 Z" fill="#f3f4f6" />
          <path d="M -10 25 L -30 15 L -30 -50 L -10 -40 Z" fill="#8b5cf6" opacity="0.2" />
          <path d="M -15 20 L -25 15 L -25 -45 L -15 -35 Z" fill="#c084fc" opacity="0.4" />
          <path d="M 10 25 L 30 15 L 30 -50 L 10 -40 Z" fill="#3b82f6" opacity="0.2" />
          <path d="M 15 20 L 25 15 L 25 -45 L 15 -35 Z" fill="#60a5fa" opacity="0.4" />
        </g>
        <g id="ledgerLight">
          <path d="M 0 30 L -60 0 L 0 -30 L 60 0 Z" fill="#d1fae5" />
          <path d="M -60 0 L 0 30 L 0 50 L -60 20 Z" fill="#a7f3d0" />
          <path d="M 60 0 L 0 30 L 0 50 L 60 20 Z" fill="#6ee7b7" />
          <path d="M 0 10 L -50 -15 L 0 -40 L 50 -15 Z" fill="#34d399" opacity="0.5" />
          <path d="M -50 -15 L 0 10 L 0 20 L -50 -5 Z" fill="#10b981" opacity="0.8" />
          <path d="M 50 -15 L 0 10 L 0 20 L 50 -5 Z" fill="#059669" opacity="0.8" />
          <circle cx="0" cy="-15" r="4" fill="#fff" />
          <circle cx="-25" cy="-15" r="3" fill="#fff" opacity="0.7" />
          <circle cx="25" cy="-15" r="3" fill="#fff" opacity="0.7" />
          <path d="M -25 -15 L 0 -15 L 25 -15" stroke="#fff" strokeWidth="1" opacity="0.5" />
        </g>
      </defs>

      <path id="pathLeftL" d="M 200 250 C 300 250, 350 250, 420 250" fill="none" stroke="url(#pathGradLeftLight)" strokeWidth="4" strokeDasharray="8 8">
        <animate attributeName="stroke-dashoffset" from="32" to="0" dur="1s" repeatCount="indefinite" />
      </path>
      <path id="pathRightL" d="M 800 250 C 700 250, 650 250, 580 250" fill="none" stroke="url(#pathGradRightLight)" strokeWidth="4" strokeDasharray="8 8">
        <animate attributeName="stroke-dashoffset" from="-32" to="0" dur="1s" repeatCount="indefinite" />
      </path>
      <path id="pathDownL" d="M 500 350 L 500 450" fill="none" stroke="url(#pathGradDownLight)" strokeWidth="4" strokeDasharray="8 8">
        <animate attributeName="stroke-dashoffset" from="32" to="0" dur="1s" repeatCount="indefinite" />
      </path>

      <circle r="4" fill="#8b5cf6">
        <animateMotion dur="2s" repeatCount="indefinite" path="M 200 250 C 300 250, 350 250, 420 250" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle r="4" fill="#3b82f6">
        <animateMotion dur="2s" repeatCount="indefinite" path="M 800 250 C 700 250, 650 250, 580 250" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="2s" repeatCount="indefinite" />
      </circle>

      <g transform="translate(150, 250)">
        <use href="#buildingLight" />
        <text x="0" y="70" fill="#4b5563" fontSize="16" fontWeight="600" textAnchor="middle" letterSpacing="1">BUYER</text>
      </g>
      <g transform="translate(850, 250)">
        <use href="#buildingLight" />
        <text x="0" y="70" fill="#4b5563" fontSize="16" fontWeight="600" textAnchor="middle" letterSpacing="1">SELLER</text>
      </g>

      <g transform="translate(500, 250)">
        <circle cx="0" cy="0" r="100" fill="url(#shieldGradLight)" stroke="#8b5cf6" strokeWidth="2" filter="url(#glowShieldLight)" opacity="0.8">
          <animate attributeName="r" values="98;102;98" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="0" cy="0" r="80" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 4" opacity="0.5">
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="20s" repeatCount="indefinite" />
        </circle>
        <g fill="#9ca3af">
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="10s" repeatCount="indefinite" />
          <path d="M -10 -35 L 10 -35 L 15 -25 L 25 -15 L 35 -10 L 35 10 L 25 15 L 15 25 L 10 35 L -10 35 L -15 25 L -25 15 L -35 10 L -35 -10 L -25 -15 L -15 -25 Z" />
          <circle cx="0" cy="0" r="20" fill="#f3f4f6" />
        </g>
        <g transform="translate(0, 2)">
          <rect x="-12" y="-5" width="24" height="18" rx="3" fill="#8b5cf6" />
          <path d="M -7 -5 L -7 -12 C -7 -16, 7 -16, 7 -12 L 7 -5" fill="none" stroke="#8b5cf6" strokeWidth="4" strokeLinecap="round" />
          <circle cx="0" cy="4" r="3" fill="#fff" />
          <path d="M 0 4 L 0 9" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>

      <g transform="translate(500, 480)">
        <use href="#ledgerLight" />
        <text x="0" y="70" fill="#059669" fontSize="16" fontWeight="600" textAnchor="middle" letterSpacing="1">SECURE LEDGER</text>
        <path d="M -10 -25 L -2 -15 L 15 -35" fill="none" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <animate attributeName="stroke-dasharray" values="0, 50; 50, 0; 50, 0" keyTimes="0; 0.3; 1" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0; 1; 1; 0" keyTimes="0; 0.1; 0.8; 1" dur="2s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  );
}
