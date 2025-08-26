import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiAward, FiExternalLink, FiCalendar } from 'react-icons/fi';
import axios from 'axios';

const Certificates = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
        const response = await axios.get(`${backendUrl}/api/certificates`);
        setCertificates(response.data);
      } catch (error) {
        console.error('Error fetching certificates:', error);
        setCertificates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      y: -10,
      rotateY: 5,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  if (loading) {
    return (
      <div className="py-20 bg-gradient-to-br from-pookie-pink-50/30 to-girlie-lavender-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-tech-purple-600">Loading certificates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gradient-to-br from-pookie-pink-50/30 to-girlie-lavender-50/30" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            variants={itemVariants}
          >
            <motion.span
              className="inline-block px-4 py-2 bg-gradient-to-r from-pookie-pink-100 to-girlie-lavender-100 text-pookie-pink-700 rounded-full text-sm font-medium border border-pookie-pink-200 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              Certifications
            </motion.span>
            <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-6">
              Recognized Expertise
            </h2>
            <p className="text-lg text-tech-purple-600 max-w-3xl mx-auto mb-8">
              My commitment to continuous learning is reflected in these industry-recognized certifications 
              from leading technology companies and educational institutions.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-pookie-pink-500 to-girlie-lavender-500 mx-auto rounded-full"></div>
          </motion.div>

          {/* Certificates Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {certificates.map((certificate, index) => (
              <motion.div
                key={certificate.id}
                className="certificate-card glass-card p-6 rounded-2xl overflow-hidden group cursor-pointer"
                variants={cardVariants}
                whileHover="hover"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => certificate.credential_url && window.open(certificate.credential_url, '_blank')}
              >
                {/* Certificate Image */}
                <div className="relative mb-6 rounded-xl overflow-hidden">
                  <img
                    src={certificate.image_url}
                    alt={certificate.title}
                    className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Award Icon */}
                  <motion.div
                    className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
                    whileHover={{ rotate: 15, scale: 1.1 }}
                  >
                    <FiAward className="w-5 h-5 text-white" />
                  </motion.div>

                  {/* External Link Overlay */}
                  {certificate.credential_url && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.div
                        className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-tech-purple-700"
                        whileHover={{ scale: 1.1 }}
                      >
                        <FiExternalLink className="w-5 h-5" />
                      </motion.div>
                    </div>
                  )}
                </div>

                {/* Certificate Info */}
                <div>
                  <h3 className="text-lg font-bold text-tech-purple-800 mb-2 group-hover:text-pookie-pink-600 transition-colors duration-300">
                    {certificate.title}
                  </h3>
                  
                  <p className="text-tech-purple-600 font-medium mb-3">
                    {certificate.issuer}
                  </p>

                  <div className="flex items-center text-tech-purple-500 text-sm">
                    <FiCalendar className="w-4 h-4 mr-2" />
                    <span>{certificate.date}</span>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pookie-pink-500/10 to-girlie-lavender-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            variants={itemVariants}
          >
            <motion.div
              className="text-center glass-card p-6 rounded-2xl"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <FiAward className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-3xl font-bold gradient-text mb-2">8+</h3>
              <p className="text-tech-purple-600">Certifications Earned</p>
            </motion.div>

            <motion.div
              className="text-center glass-card p-6 rounded-2xl"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-2xl">🏆</span>
              </motion.div>
              <h3 className="text-3xl font-bold gradient-text mb-2">5+</h3>
              <p className="text-tech-purple-600">Top Platforms</p>
            </motion.div>

            <motion.div
              className="text-center glass-card p-6 rounded-2xl"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-2xl">📚</span>
              </motion.div>
              <h3 className="text-3xl font-bold gradient-text mb-2">100+</h3>
              <p className="text-tech-purple-600">Hours of Learning</p>
            </motion.div>
          </motion.div>

          {/* Learning Journey */}
          <motion.div
            className="text-center"
            variants={itemVariants}
          >
            <div className="glass-card p-8 rounded-2xl max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold gradient-text mb-4">
                Continuous Learning Philosophy
              </h3>
              <p className="text-lg text-tech-purple-700 mb-6">
                In the rapidly evolving field of AI, staying current with the latest developments is crucial. 
                I continuously invest in professional development through courses, certifications, and hands-on practice 
                to ensure I'm always at the forefront of AI innovation.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.span
                  className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium border border-blue-200"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  Machine Learning
                </motion.span>
                <motion.span
                  className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-medium border border-purple-200"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  Deep Learning
                </motion.span>
                <motion.span
                  className="px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 text-green-700 rounded-full text-sm font-medium border border-green-200"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  Cloud AI
                </motion.span>
                <motion.span
                  className="px-4 py-2 bg-gradient-to-r from-pink-100 to-red-100 text-pink-700 rounded-full text-sm font-medium border border-pink-200"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  Generative AI
                </motion.span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Certificates;