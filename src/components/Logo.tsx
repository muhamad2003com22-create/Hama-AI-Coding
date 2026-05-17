import React from 'react';
import { motion } from 'motion/react';

export default function Logo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <motion.div 
      className={className}
      initial={{ scale: 0.9 }}
      animate={{ 
        scale: [1, 1.05, 1],
        filter: ["drop-shadow(0 0 5px rgba(34, 211, 238, 0.4))", "drop-shadow(0 0 15px rgba(34, 211, 238, 0.6))", "drop-shadow(0 0 5px rgba(34, 211, 238, 0.4))"]
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path 
          d="M20 20V80M80 20V80M20 50H80" 
          stroke="url(#neon-gradient)" 
          strokeWidth="10" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <path 
          d="M10 20L30 20M70 20L90 20M10 80L30 80M70 80L90 80" 
          stroke="url(#neon-gradient)" 
          strokeWidth="6" 
          strokeLinecap="round"
          className="opacity-50"
        />
        <defs>
          <linearGradient id="neon-gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#22d3ee" />
            <stop offset="1" stopColor="#2563eb" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}
