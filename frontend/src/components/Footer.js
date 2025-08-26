import React from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiInstagram, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/aiwaaligirl',
      icon: FiInstagram,
      color: 'hover:text-pink-500'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/vidyabaviskar',
      icon: FiLinkedin,
      color: 'hover:text-blue-500'
    },
    {
      name: 'Email',
      url: 'mailto:vidyabaviskar11@gmail.com',
      icon: FiMail,
      color: 'hover:text-red-500'
    }
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Talks', href: '#talks' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-tech-purple-900 via-tech-purple-800 to-tech-purple-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-pookie-pink-500/20 to-girlie-lavender-500/20 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-16 w-24 h-24 bg-gradient-to-r from-soft-blue-500/20 to-pookie-pink-500/20 rounded-full"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-pookie-pink-500 to-girlie-lavender-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold gradient-text">Vidya Baviskar</h3>
                <p className="text-tech-purple-300">Gen AI Enthusiast & Tech Speaker</p>
              </div>
            </div>
            
            <p className="text-tech-purple-300 mb-6 leading-relaxed max-w-md">
              Passionate about creating innovative AI solutions and sharing knowledge 
              with the tech community. Let's build the future of artificial intelligence together.
            </p>

            {/* Newsletter Signup */}
            <div className="glass-card p-4 rounded-lg bg-white/5 backdrop-blur-sm">
              <h4 className="font-semibold mb-3 text-white">Stay Updated</h4>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-tech-purple-300 focus:outline-none focus:ring-2 focus:ring-pookie-pink-500"
                />
                <motion.button
                  className="px-4 py-2 bg-gradient-to-r from-pookie-pink-500 to-girlie-lavender-500 rounded font-medium hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.button
                    onClick={() => scrollToSection(link.href)}
                    className="text-tech-purple-300 hover:text-pookie-pink-400 transition-colors duration-300 text-left"
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-6 text-white">Connect</h4>
            
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-tech-purple-300 text-sm mb-1">Email</p>
                <a 
                  href="mailto:vidyabaviskar11@gmail.com"
                  className="text-white hover:text-pookie-pink-400 transition-colors duration-300 text-sm"
                >
                  vidyabaviskar11@gmail.com
                </a>
              </div>
              <div>
                <p className="text-tech-purple-300 text-sm mb-1">Location</p>
                <p className="text-white text-sm">Available Worldwide (Remote)</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-tech-purple-300 ${social.color} transition-all duration-300 hover:bg-white/20`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-2 text-tech-purple-300 mb-4 md:mb-0">
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <FiHeart className="w-4 h-4 text-pookie-pink-500" />
            </motion.div>
            <span>by Vidya Baviskar</span>
          </div>

          <div className="flex items-center space-x-6">
            <p className="text-tech-purple-300 text-sm">
              © 2024 Vidya Baviskar. All rights reserved.
            </p>
            
            {/* Scroll to Top Button */}
            <motion.button
              onClick={scrollToTop}
              className="w-10 h-10 bg-gradient-to-r from-pookie-pink-500 to-girlie-lavender-500 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;