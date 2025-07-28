import React from 'react';
import { motion } from 'framer-motion';

export const GeometricBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-50/30 to-transparent" />
      
      {/* Geometric shapes */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 border-2 border-blue-200 rounded-full opacity-20"
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-purple-200 to-blue-200 rounded-lg opacity-20"
        animate={{
          rotate: [0, 45, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-32 left-1/4 w-12 h-12 border-2 border-cyan-300 transform rotate-45 opacity-20"
        animate={{
          rotate: [45, 135, 45],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-1/3 w-24 h-24 border border-indigo-200 rounded-full opacity-20"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Floating dots */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 10 - 5, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export const WebinarBackground = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-gradient-to-br from-gray-50 via-white to-blue-50',
    landing: 'bg-gradient-to-br from-blue-50 via-white to-purple-50',
    details: 'bg-gradient-to-br from-white via-blue-50 to-indigo-50',
    registration: 'bg-gradient-to-br from-purple-50 via-white to-blue-50',
    manager: 'bg-gradient-to-br from-gray-50 via-slate-50 to-blue-50',
  };

  return (
    <div className={`min-h-screen relative ${variants[variant]}`}>
      <GeometricBackground />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GeometricBackground;
