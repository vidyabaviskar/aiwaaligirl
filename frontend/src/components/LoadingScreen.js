import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-pookie-pink-50 via-girlie-lavender-50 to-soft-blue-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center">
        {/* Animated Logo/Icon */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-pookie-pink-400 to-girlie-lavender-400 rounded-full flex items-center justify-center">
            <motion.div
              className="text-4xl text-white font-bold"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              V
            </motion.div>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.h2
          className="text-2xl font-bold gradient-text mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Vidya Baviskar
        </motion.h2>

        <motion.p
          className="text-tech-purple-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Gen AI Enthusiast & Tech Speaker
        </motion.p>

        {/* Loading Spinner */}
        <motion.div
          className="w-16 h-16 mx-auto border-4 border-pookie-pink-200 border-t-pookie-pink-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          initial={{ opacity: 0 }}
          animate2={{ opacity: 1 }}
          transition2={{ delay: 1, duration: 0.5 }}
        />

        {/* Loading Dots */}
        <motion.div
          className="flex justify-center space-x-2 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-gradient-to-r from-pookie-pink-400 to-girlie-lavender-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;