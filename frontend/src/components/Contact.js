import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMail, FiInstagram, FiLinkedin, FiSend, FiMapPin, FiPhone } from 'react-icons/fi';
import axios from 'axios';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      await axios.post(`${backendUrl}/api/contact`, formData);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FiMail,
      label: 'Email',
      value: 'vidyabaviskar11@gmail.com',
      href: 'mailto:vidyabaviskar11@gmail.com',
      color: 'from-red-400 to-pink-500'
    },
    {
      icon: FiLinkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/vidyabaviskar',
      href: 'https://www.linkedin.com/in/vidyabaviskar',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: FiInstagram,
      label: 'Instagram',
      value: '@aiwaaligirl',
      href: 'https://www.instagram.com/aiwaaligirl',
      color: 'from-pink-400 to-purple-500'
    }
  ];

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

  return (
    <div className="py-20 bg-gradient-to-br from-soft-blue-50/30 to-pookie-pink-50/30" ref={ref}>
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
              className="inline-block px-4 py-2 bg-gradient-to-r from-soft-blue-100 to-pookie-pink-100 text-soft-blue-700 rounded-full text-sm font-medium border border-soft-blue-200 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              Get In Touch
            </motion.span>
            <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-6">
              Let's Build Something Amazing
            </h2>
            <p className="text-lg text-tech-purple-600 max-w-3xl mx-auto mb-8">
              Have a project idea, collaboration opportunity, or just want to chat about AI? 
              I'd love to hear from you! Let's create innovative solutions together.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-soft-blue-500 to-pookie-pink-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <motion.div
              className="space-y-8"
              variants={itemVariants}
            >
              <div>
                <h3 className="text-2xl font-bold text-tech-purple-800 mb-6">
                  Let's Connect
                </h3>
                <p className="text-tech-purple-600 mb-8 leading-relaxed">
                  I'm always excited to discuss new projects, creative ideas, or opportunities to be part 
                  of your vision. Whether you're looking for AI consultation, speaking engagements, or 
                  collaboration on innovative projects, let's start a conversation!
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                {contactInfo.map((contact, index) => {
                  const IconComponent = contact.icon;
                  return (
                    <motion.a
                      key={contact.label}
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 glass-card rounded-xl hover-glow group"
                      whileHover={{ scale: 1.02, x: 10 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className={`w-12 h-12 bg-gradient-to-r ${contact.color} rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-tech-purple-800 group-hover:text-pookie-pink-600 transition-colors duration-300">
                          {contact.label}
                        </p>
                        <p className="text-tech-purple-600 text-sm">
                          {contact.value}
                        </p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              {/* Quick Info */}
              <motion.div
                className="glass-card p-6 rounded-xl"
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="font-semibold text-tech-purple-800 mb-3 flex items-center">
                  <FiMapPin className="w-4 h-4 mr-2 text-pookie-pink-500" />
                  Location & Availability
                </h4>
                <p className="text-tech-purple-600 text-sm mb-2">
                  📍 Available for remote collaborations worldwide
                </p>
                <p className="text-tech-purple-600 text-sm mb-2">
                  🕒 Usually responds within 24 hours
                </p>
                <p className="text-tech-purple-600 text-sm">
                  🎯 Open to exciting AI projects and speaking opportunities
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={itemVariants}
            >
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-tech-purple-800 mb-6">
                  Send me a message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                    >
                      <label className="block text-sm font-medium text-tech-purple-700 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-tech-purple-200 rounded-lg focus:ring-2 focus:ring-pookie-pink-500 focus:border-transparent transition-all duration-300 bg-white/80"
                        placeholder="Your full name"
                      />
                    </motion.div>

                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                    >
                      <label className="block text-sm font-medium text-tech-purple-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-tech-purple-200 rounded-lg focus:ring-2 focus:ring-pookie-pink-500 focus:border-transparent transition-all duration-300 bg-white/80"
                        placeholder="your@email.com"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                  >
                    <label className="block text-sm font-medium text-tech-purple-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-tech-purple-200 rounded-lg focus:ring-2 focus:ring-pookie-pink-500 focus:border-transparent transition-all duration-300 bg-white/80"
                      placeholder="What's this about?"
                    />
                  </motion.div>

                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                  >
                    <label className="block text-sm font-medium text-tech-purple-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-tech-purple-200 rounded-lg focus:ring-2 focus:ring-pookie-pink-500 focus:border-transparent transition-all duration-300 bg-white/80 resize-none"
                      placeholder="Tell me about your project or idea..."
                    />
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full btn-primary flex items-center justify-center space-x-2 ${
                      isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <FiSend className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <motion.div
                      className="p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      ✅ Message sent successfully! I'll get back to you soon.
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      className="p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      ❌ Oops! Something went wrong. Please try again or email me directly.
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>
          </div>

          {/* Additional CTA */}
          <motion.div
            className="text-center mt-16"
            variants={itemVariants}
          >
            <div className="glass-card p-8 rounded-2xl max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold gradient-text mb-4">
                Ready to Innovate Together?
              </h3>
              <p className="text-lg text-tech-purple-700 mb-6">
                Whether you're a startup looking to integrate AI, a company needing AI consultation, 
                or an event organizer seeking an engaging speaker, I'm here to help bring your vision to life.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.span
                  className="px-4 py-2 bg-gradient-to-r from-pookie-pink-100 to-girlie-lavender-100 text-pookie-pink-700 rounded-full text-sm font-medium border border-pookie-pink-200"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  AI Consultation
                </motion.span>
                <motion.span
                  className="px-4 py-2 bg-gradient-to-r from-soft-blue-100 to-pookie-pink-100 text-soft-blue-700 rounded-full text-sm font-medium border border-soft-blue-200"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  Project Collaboration
                </motion.span>
                <motion.span
                  className="px-4 py-2 bg-gradient-to-r from-girlie-lavender-100 to-soft-blue-100 text-girlie-lavender-700 rounded-full text-sm font-medium border border-girlie-lavender-200"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  Speaking Engagements
                </motion.span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;