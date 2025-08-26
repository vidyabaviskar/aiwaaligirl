import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink, FiCode, FiStar } from 'react-icons/fi';
import axios from 'axios';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
        const response = await axios.get(`${backendUrl}/api/projects`);
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Fallback data in case API fails
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const categories = ['all', 'Natural Language Processing', 'Conversational AI', 'Computer Vision', 'Machine Learning'];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  if (loading) {
    return (
      <div className="py-20 bg-gradient-to-br from-soft-blue-50/30 to-pookie-pink-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-tech-purple-600">Loading amazing projects...</p>
        </div>
      </div>
    );
  }

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
              My Projects
            </motion.span>
            <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-6">
              AI Solutions & Innovations
            </h2>
            <p className="text-lg text-tech-purple-600 max-w-3xl mx-auto mb-8">
              Explore my collection of AI-powered projects that showcase the practical applications 
              of generative AI, machine learning, and cutting-edge technology solutions.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-soft-blue-500 to-pookie-pink-500 mx-auto rounded-full"></div>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            variants={itemVariants}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  filter === category
                    ? 'bg-gradient-to-r from-soft-blue-500 to-pookie-pink-500 text-white shadow-lg'
                    : 'bg-white/80 text-tech-purple-700 border border-tech-purple-200 hover:bg-tech-purple-50'
                }`}
                onClick={() => setFilter(category)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {category === 'all' ? 'All Projects' : category}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card glass-card p-6 rounded-2xl overflow-hidden group"
                variants={cardVariants}
                whileHover="hover"
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Project Image */}
                <div className="relative mb-6 rounded-xl overflow-hidden">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Featured Badge */}
                  {project.featured && (
                    <motion.div
                      className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <FiStar className="w-3 h-3" />
                      <span>Featured</span>
                    </motion.div>
                  )}

                  {/* Overlay Buttons */}
                  <div className="absolute inset-0 flex items-center justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.github_url && (
                      <motion.a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-tech-purple-700 hover:bg-white transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiGithub className="w-5 h-5" />
                      </motion.a>
                    )}
                    {project.demo_url && (
                      <motion.a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-tech-purple-700 hover:bg-white transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiExternalLink className="w-5 h-5" />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-tech-purple-800 group-hover:text-pookie-pink-600 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <FiCode className="w-5 h-5 text-tech-purple-400 mt-1" />
                  </div>

                  <p className="text-tech-purple-600 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-pookie-pink-100 to-girlie-lavender-100 text-pookie-pink-700 rounded-full text-xs font-medium border border-pookie-pink-200">
                      {project.category}
                    </span>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-tech-purple-100 text-tech-purple-700 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech_stack.length > 3 && (
                      <span className="px-2 py-1 bg-tech-purple-100 text-tech-purple-700 rounded text-xs font-medium">
                        +{project.tech_stack.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-16"
            variants={itemVariants}
          >
            <div className="glass-card p-8 rounded-2xl max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold gradient-text mb-4">
                Have a Project Idea?
              </h3>
              <p className="text-lg text-tech-purple-700 mb-6">
                I'm always excited to collaborate on innovative AI projects. Let's build something amazing together!
              </p>
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              >
                Let's Collaborate
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;