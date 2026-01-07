import React from 'react';

export const SamaanDenaLogo = ({ className = "w-10 h-10" }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer circle - warm orange */}
      <circle cx="50" cy="50" r="48" fill="#FF8C42" opacity="0.1"/>
      
      {/* Shopping basket base - vibrant green */}
      <path
        d="M30 45 L35 70 C35 72 36 73 38 73 L62 73 C64 73 65 72 65 70 L70 45 Z"
        fill="#22C55E"
        stroke="#15803D"
        strokeWidth="2"
      />
      
      {/* Basket weave pattern */}
      <line x1="35" y1="50" x2="65" y2="50" stroke="#15803D" strokeWidth="1.5" opacity="0.3"/>
      <line x1="36" y1="55" x2="64" y2="55" stroke="#15803D" strokeWidth="1.5" opacity="0.3"/>
      <line x1="37" y1="60" x2="63" y2="60" stroke="#15803D" strokeWidth="1.5" opacity="0.3"/>
      <line x1="38" y1="65" x2="62" y2="65" stroke="#15803D" strokeWidth="1.5" opacity="0.3"/>
      
      {/* Items in basket - colorful goods */}
      {/* Tomato */}
      <circle cx="45" cy="38" r="5" fill="#EF4444"/>
      <circle cx="45" cy="38" r="5" fill="#DC2626" opacity="0.3"/>
      
      {/* Orange/Fruit */}
      <circle cx="55" cy="40" r="5" fill="#F97316"/>
      <circle cx="55" cy="40" r="5" fill="#EA580C" opacity="0.3"/>
      
      {/* Leafy vegetable */}
      <ellipse cx="50" cy="33" rx="4" ry="6" fill="#10B981" transform="rotate(-20 50 33)"/>
      
      {/* Basket handle - orange accent */}
      <path
        d="M30 45 Q50 25 70 45"
        fill="none"
        stroke="#F97316"
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      {/* Small leaves on handle for fresh/organic feel */}
      <path
        d="M45 30 Q45 28 47 28 Q45 28 45 26"
        fill="#10B981"
      />
      <path
        d="M55 30 Q55 28 57 28 Q55 28 55 26"
        fill="#10B981"
      />
      
      {/* Delivery truck wheel (small accent) - showing delivery aspect */}
      <circle cx="75" cy="75" r="8" fill="#3B82F6" opacity="0.9"/>
      <circle cx="75" cy="75" r="4" fill="white"/>
      
      {/* Speed lines for delivery */}
      <line x1="68" y1="72" x2="63" y2="72" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
      <line x1="68" y1="78" x2="65" y2="78" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
    </svg>
  );
};

export const SamaanDenaIcon = ({ className = "w-6 h-6" }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Simplified version for small sizes */}
      <path
        d="M30 45 L35 70 C35 72 36 73 38 73 L62 73 C64 73 65 72 65 70 L70 45 Z"
        fill="#22C55E"
        stroke="#15803D"
        strokeWidth="2"
      />
      <path
        d="M30 45 Q50 25 70 45"
        fill="none"
        stroke="#F97316"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="45" cy="38" r="5" fill="#EF4444"/>
      <circle cx="55" cy="40" r="5" fill="#F97316"/>
    </svg>
  );
};