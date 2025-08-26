import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiPlay, FiCalendar, FiMapPin, FiUsers } from 'react-icons/fi';
import axios from 'axios';

const Talks = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [talks, setTalks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTalks = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
        const response = await axios.get(`${backendUrl}/api/talks`);
        setTalks(response.data);
      } catch (error) {
        console.error('Error fetching talks:', error);
        setTalks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTalks();
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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      x: 10,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  if (loading) {
    return (
      <div className="py-20 bg-gradient-to-br from-girlie-lavender-50/30 to-soft-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-tech-purple-600">Loading speaking engagements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gradient-to-br from-girlie-lavender-50/30 to-soft-blue-50/30" ref={ref}>
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
              className="inline-block px-4 py-2 bg-gradient-to-r from-girlie-lavender-100 to-soft-blue-100 text-girlie-lavender-700 rounded-full text-sm font-medium border border-girlie-lavender-200 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              Speaking Engagements
            </motion.span>
            <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-6">
              Sharing AI Knowledge
            </h2>
            <p className="text-lg text-tech-purple-600 max-w-3xl mx-auto mb-8">
              I love sharing my passion for AI and technology through speaking engagements, 
              workshops, and community events. Here are some of the talks I've delivered.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-girlie-lavender-500 to-soft-blue-500 mx-auto rounded-full"></div>
          </motion.div>

          {/* Talks Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-girlie-lavender-300 to-soft-blue-300"></div>

            {talks.map((talk, index) => (
              <motion.div
                key={talk.id}
                className={`relative flex items-center mb-16 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                variants={cardVariants}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                {/* Timeline Dot */}
                <motion.div
                  className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 bg-gradient-to-r from-girlie-lavender-500 to-soft-blue-500 rounded-full border-4 border-white shadow-lg z-10"
                  whileHover={{ scale: 1.3 }}
                  animate={{ 
                    boxShadow: [
                      "0 0 0 0 rgba(168, 85, 247, 0.4)",
                      "0 0 0 10px rgba(168, 85, 247, 0)",
                      "0 0 0 0 rgba(168, 85, 247, 0)"
                    ]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3 
                  }}
                />

                {/* Talk Card */}
                <motion.div
                  className={`talk-card glass-card p-6 rounded-2xl w-full md:w-5/12 ml-16 md:ml-0 ${
                    index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                  }`}
                  whileHover="hover"
                  variants={{
                    hover: {
                      scale: 1.02,
                      y: -5,
                      transition: { duration: 0.3 }
                    }
                  }}
                >
                  {/* Talk Image */}
                  <div className="relative mb-6 rounded-xl overflow-hidden">
                    <img
                      src={talk.image_url}
                      alt={talk.title}
                      className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Play Button for Video */}
                    {talk.video_url && (
                      <motion.button
                        className="absolute inset-0 flex items-center justify-center"
                        onClick={() => window.open(talk.video_url, '_blank')}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <FiPlay className="w-6 h-6 text-tech-purple-700 ml-1" />
                        </div>
                      </motion.button>
                    )}

                    {/* Date Badge */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-girlie-lavender-500 to-soft-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {talk.date}
                    </div>
                  </div>

                  {/* Talk Info */}
                  <div>
                    <h3 className="text-xl font-bold text-tech-purple-800 mb-2 hover:text-girlie-lavender-600 transition-colors duration-300">
                      {talk.title}
                    </h3>
                    
                    <div className="flex items-center text-girlie-lavender-600 font-medium mb-3">
                      <FiMapPin className="w-4 h-4 mr-2" />
                      <span>{talk.event_name}</span>
                    </div>

                    <p className="text-tech-purple-600 text-sm mb-4 leading-relaxed">
                      {talk.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      {talk.video_url && (
                        <motion.button
                          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-girlie-lavender-500 to-soft-blue-500 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300"
                          onClick={() => window.open(talk.video_url, '_blank')}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FiPlay className="w-4 h-4" />
                          <span>Watch</span>
                        </motion.button>
                      )}
                      <motion.div
                        className="flex items-center space-x-1 px-3 py-2 bg-tech-purple-100 text-tech-purple-700 rounded-full text-sm"
                        whileHover={{ scale: 1.05 }}
                      >
                        <FiCalendar className="w-3 h-3" />
                        <span>{talk.date}</span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Speaking Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-20 mb-16"
            variants={itemVariants}
          >
            <motion.div
              className="text-center glass-card p-6 rounded-2xl"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <FiUsers className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-3xl font-bold gradient-text mb-2">5K+</h3>
              <p className="text-tech-purple-600">Audience Reached</p>
            </motion.div>

            <motion.div
              className="text-center glass-card p-6 rounded-2xl"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-2xl">🎤</span>
              </motion.div>
              <h3 className="text-3xl font-bold gradient-text mb-2">15+</h3>
              <p className="text-tech-purple-600">Speaking Events</p>
            </motion.div>

            <motion.div
              className="text-center glass-card p-6 rounded-2xl"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-2xl">🌟</span>
              </motion.div>
              <h3 className="text-3xl font-bold gradient-text mb-2">10+</h3>
              <p className="text-tech-purple-600">Tech Communities</p>
            </motion.div>

            <motion.div
              className="text-center glass-card p-6 rounded-2xl"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <span className="text-2xl">🏆</span>
              </motion.div>
              <h3 className="text-3xl font-bold gradient-text mb-2">95%</h3>
              <p className="text-tech-purple-600">Positive Feedback</p>
            </motion.div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="text-center"
            variants={itemVariants}
          >
            <div className="glass-card p-8 rounded-2xl max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold gradient-text mb-4">
                Invite Me to Speak
              </h3>
              <p className="text-lg text-tech-purple-700 mb-6">
                I'm passionate about sharing knowledge and inspiring others in the AI community. 
                I'd love to speak at your event, conference, or meetup about the exciting world of generative AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                >
                  Book a Speaking Session
                </motion.button>
                <motion.button
                  className="btn-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Speaking Topics
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Talks;