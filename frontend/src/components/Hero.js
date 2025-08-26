import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiInstagram, FiLinkedin, FiMail, FiDownload, FiArrowDown } from 'react-icons/fi';

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const roles = [
    'Gen AI Enthusiast',
    'Tech Speaker',
    'ML Engineer',
    'AI Innovator',
    'Tech Leader'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [roles.length]);

  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/aiwaaligirl',
      icon: FiInstagram,
      color: 'from-pink-400 to-purple-500'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/vidyabaviskar',
      icon: FiLinkedin,
      color: 'from-blue-400 to-blue-600'
    },
    {
      name: 'Email',
      url: 'mailto:vidyabaviskar11@gmail.com',
      icon: FiMail,
      color: 'from-red-400 to-pink-500'
    }
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-pookie-pink-50 via-girlie-lavender-50 to-soft-blue-50">
        {/* Floating shapes */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-pookie-pink-200 to-girlie-lavender-200 rounded-full opacity-30"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/3 right-16 w-24 h-24 bg-gradient-to-r from-soft-blue-200 to-pookie-pink-200 rounded-full opacity-30"
          animate={{
            y: [0, 40, 0],
            x: [0, -25, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-r from-girlie-lavender-200 to-soft-blue-200 rounded-full opacity-30"
          animate={{
            y: [0, -35, 0],
            x: [0, 30, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Greeting */}
            <motion.div
              className="inline-block mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="px-4 py-2 bg-gradient-to-r from-pookie-pink-100 to-girlie-lavender-100 text-pookie-pink-700 rounded-full text-sm font-medium border border-pookie-pink-200">
                👋 Hello, I'm
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <span className="gradient-text">Vidya</span>
              <br />
              <span className="text-tech-purple-800">Baviskar</span>
            </motion.h1>

            {/* Dynamic Role */}
            <motion.div
              className="mb-8 h-16 flex items-center justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.h2
                key={currentRole}
                className="text-2xl sm:text-3xl font-semibold text-tech-purple-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {roles[currentRole]}
              </motion.h2>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-lg text-tech-purple-600 mb-8 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              Passionate about creating innovative AI solutions that transform businesses and empower communities. 
              Sharing insights through speaking engagements and building the future of artificial intelligence.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-10 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <motion.button
                className="btn-primary flex items-center justify-center space-x-2 hover-glow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
              >
                <span>View My Work</span>
                <FiArrowDown className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                className="btn-secondary flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiDownload className="w-4 h-4" />
                <span>Download Resume</span>
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex space-x-6 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
            >
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${social.color} flex items-center justify-center text-white hover:shadow-lg transition-all duration-300`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.8 + index * 0.1, type: "spring" }}
                  >
                    <IconComponent className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="relative">
              {/* Background decorative elements */}
              <motion.div
                className="absolute -top-4 -left-4 w-72 h-72 bg-gradient-to-r from-pookie-pink-200 to-girlie-lavender-200 rounded-full opacity-50"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -bottom-4 -right-4 w-64 h-64 bg-gradient-to-r from-soft-blue-200 to-pookie-pink-200 rounded-full opacity-50"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Main profile image container */}
              <motion.div
                className="relative z-10 w-80 h-80 mx-auto"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-r from-pookie-pink-300 to-girlie-lavender-300 p-2">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white p-2">
                    <img
                      src="https://images.unsplash.com/photo-1573496358961-3c82861ab8f4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHw0fHxwcm9mZXNzaW9uYWwlMjB0ZWNofGVufDB8fHx8MTc1NjE5NTMyNHww&ixlib=rb-4.1.0&q=85"
                      alt="Vidya Baviskar - Gen AI Enthusiast"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Floating tech icons */}
              <motion.div
                className="absolute top-16 -left-8 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span className="text-2xl">🤖</span>
              </motion.div>
              
              <motion.div
                className="absolute top-32 -right-8 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center"
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <span className="text-2xl">⚡</span>
              </motion.div>
              
              <motion.div
                className="absolute bottom-16 -left-6 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 15, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              >
                <span className="text-2xl">🚀</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-tech-purple-400 rounded-full flex justify-center"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-tech-purple-400 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
        <p className="text-tech-purple-600 text-sm mt-2 text-center">Scroll down</p>
      </motion.div>
    </div>
  );
};

export default Hero;