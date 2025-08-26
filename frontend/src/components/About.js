import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiHeart, FiStar, FiTrendingUp, FiUsers } from 'react-icons/fi';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    {
      icon: FiStar,
      value: '25+',
      label: 'AI Projects',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: FiUsers,
      value: '10K+',
      label: 'Community Reach',
      color: 'from-blue-400 to-purple-500'
    },
    {
      icon: FiTrendingUp,
      value: '15+',
      label: 'Speaking Events',
      color: 'from-green-400 to-blue-500'
    },
    {
      icon: FiHeart,
      value: '100%',
      label: 'Passion for AI',
      color: 'from-pink-400 to-red-500'
    }
  ];

  const skills = [
    'Generative AI', 'Machine Learning', 'Deep Learning', 'Natural Language Processing',
    'Computer Vision', 'Python', 'TensorFlow', 'PyTorch', 'Hugging Face', 'OpenAI API',
    'LangChain', 'Vector Databases', 'MLOps', 'Data Science', 'Public Speaking'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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
    <div className="py-20 bg-gradient-to-br from-white/50 to-pookie-pink-50/30" ref={ref}>
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
              About Me
            </motion.span>
            <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-6">
              Passionate About AI Innovation
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pookie-pink-500 to-girlie-lavender-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div variants={itemVariants}>
              <div className="space-y-6">
                <motion.p
                  className="text-lg text-tech-purple-700 leading-relaxed"
                  variants={itemVariants}
                >
                  Hey there! I'm Vidya, a passionate Gen AI enthusiast who believes in the transformative power 
                  of artificial intelligence. My journey in tech has been driven by curiosity, creativity, and 
                  a desire to make AI accessible and beneficial for everyone.
                </motion.p>
                
                <motion.p
                  className="text-lg text-tech-purple-700 leading-relaxed"
                  variants={itemVariants}
                >
                  From building intelligent chatbots to creating content generation tools, I love exploring 
                  the endless possibilities of AI. As a tech speaker, I enjoy sharing insights about the 
                  future of AI and inspiring others to join this exciting field.
                </motion.p>

                <motion.p
                  className="text-lg text-tech-purple-700 leading-relaxed"
                  variants={itemVariants}
                >
                  When I'm not coding or speaking at events, you'll find me experimenting with the latest 
                  AI models, contributing to open-source projects, or mentoring aspiring AI enthusiasts 
                  in the community.
                </motion.p>

                {/* Skills Tags */}
                <motion.div
                  className="mt-8"
                  variants={itemVariants}
                >
                  <h3 className="text-xl font-semibold text-tech-purple-800 mb-4">
                    Tech Stack & Expertise
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <motion.span
                        key={skill}
                        className="skill-tag"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Content - Image and Stats */}
            <motion.div
              className="relative"
              variants={itemVariants}
            >
              {/* Main Image */}
              <motion.div
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-pookie-pink-500/20 to-girlie-lavender-500/20 z-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1694903110330-cc64b7e1d21d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwzfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlfGVufDB8fHx8MTc1NjEwODg3M3ww&ixlib=rb-4.1.0&q=85"
                  alt="AI Innovation"
                  className="w-full h-96 object-cover"
                />
              </motion.div>

              {/* Floating Cards with Stats */}
              <div className="absolute -bottom-8 -left-8 right-8">
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                      <motion.div
                        key={stat.label}
                        className="glass-card p-4 text-center"
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.8 }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                      >
                        <div className={`w-12 h-12 mx-auto mb-2 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                        <div className="text-sm text-tech-purple-600">{stat.label}</div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-girlie-lavender-300 to-soft-blue-300 rounded-full opacity-60"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div
                className="absolute -bottom-2 -right-12 w-16 h-16 bg-gradient-to-r from-pookie-pink-300 to-girlie-lavender-300 rounded-full opacity-60"
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>

          {/* Mission Statement */}
          <motion.div
            className="mt-20 text-center"
            variants={itemVariants}
          >
            <div className="max-w-4xl mx-auto glass-card p-8 rounded-2xl">
              <motion.h3
                className="text-2xl font-bold gradient-text mb-4"
                variants={itemVariants}
              >
                My Mission
              </motion.h3>
              <motion.p
                className="text-lg text-tech-purple-700 leading-relaxed"
                variants={itemVariants}
              >
                To democratize AI knowledge and inspire the next generation of innovators. I believe that 
                artificial intelligence should be accessible, ethical, and beneficial for everyone. Through 
                my projects, talks, and community engagement, I aim to bridge the gap between complex AI 
                concepts and practical applications that can make a real difference in people's lives.
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;