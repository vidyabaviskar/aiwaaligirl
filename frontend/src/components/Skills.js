import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = [
    {
      title: 'AI & Machine Learning',
      icon: '🤖',
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'Generative AI', level: 95 },
        { name: 'Machine Learning', level: 90 },
        { name: 'Deep Learning', level: 88 },
        { name: 'Natural Language Processing', level: 85 },
        { name: 'Computer Vision', level: 82 },
      ]
    },
    {
      title: 'Programming & Frameworks',
      icon: '💻',
      color: 'from-blue-500 to-purple-500',
      skills: [
        { name: 'Python', level: 92 },
        { name: 'TensorFlow', level: 88 },
        { name: 'PyTorch', level: 85 },
        { name: 'Hugging Face', level: 90 },
        { name: 'LangChain', level: 87 },
      ]
    },
    {
      title: 'Tools & Platforms',
      icon: '🛠️',
      color: 'from-green-500 to-blue-500',
      skills: [
        { name: 'OpenAI API', level: 93 },
        { name: 'Google Cloud AI', level: 85 },
        { name: 'AWS ML Services', level: 80 },
        { name: 'Docker', level: 78 },
        { name: 'Git/GitHub', level: 90 },
      ]
    },
    {
      title: 'Soft Skills',
      icon: '🎯',
      color: 'from-pink-500 to-red-500',
      skills: [
        { name: 'Public Speaking', level: 95 },
        { name: 'Technical Writing', level: 88 },
        { name: 'Team Leadership', level: 85 },
        { name: 'Mentoring', level: 90 },
        { name: 'Problem Solving', level: 92 },
      ]
    }
  ];

  const techIcons = [
    {
      name: 'Python',
      icon: '🐍',
      color: 'from-yellow-400 to-green-500'
    },
    {
      name: 'TensorFlow',
      icon: '🔥',
      color: 'from-orange-400 to-red-500'
    },
    {
      name: 'PyTorch',
      icon: '⚡',
      color: 'from-red-400 to-pink-500'
    },
    {
      name: 'Hugging Face',
      icon: '🤗',
      color: 'from-yellow-300 to-orange-400'
    },
    {
      name: 'OpenAI',
      icon: '🧠',
      color: 'from-purple-400 to-blue-500'
    },
    {
      name: 'Google AI',
      icon: '🔍',
      color: 'from-blue-400 to-green-500'
    },
    {
      name: 'AWS',
      icon: '☁️',
      color: 'from-orange-400 to-yellow-500'
    },
    {
      name: 'Docker',
      icon: '🐳',
      color: 'from-blue-400 to-cyan-500'
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
              Skills & Expertise
            </motion.span>
            <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-6">
              My Technical Arsenal
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-girlie-lavender-500 to-soft-blue-500 mx-auto rounded-full"></div>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                className="glass-card p-6 rounded-2xl hover-glow"
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center text-2xl mr-4`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-tech-purple-800">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      className="relative"
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="text-tech-purple-700 font-medium">
                          {skill.name}
                        </span>
                        <span className="text-tech-purple-600 text-sm">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-tech-purple-100 rounded-full h-2">
                        <motion.div
                          className={`h-2 bg-gradient-to-r ${category.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.5, duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tech Icons Section */}
          <motion.div
            className="text-center"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold text-tech-purple-800 mb-8">
              Technologies I Work With
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              {techIcons.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className={`w-20 h-20 bg-gradient-to-r ${tech.color} rounded-2xl flex flex-col items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
                  initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                  animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.5, rotate: -180 }}
                  transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 5,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-2xl mb-1">{tech.icon}</span>
                  <span className="text-xs font-medium">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications Preview */}
          <motion.div
            className="mt-16 text-center"
            variants={itemVariants}
          >
            <div className="glass-card p-8 rounded-2xl max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold gradient-text mb-4">
                Continuous Learning Journey
              </h3>
              <p className="text-lg text-tech-purple-700 mb-6">
                I believe in staying at the forefront of AI innovation through continuous learning 
                and hands-on experimentation with the latest technologies and methodologies.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.span
                  className="px-4 py-2 bg-gradient-to-r from-pookie-pink-100 to-girlie-lavender-100 text-pookie-pink-700 rounded-full text-sm font-medium border border-pookie-pink-200"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  Google AI Platform
                </motion.span>
                <motion.span
                  className="px-4 py-2 bg-gradient-to-r from-soft-blue-100 to-pookie-pink-100 text-soft-blue-700 rounded-full text-sm font-medium border border-soft-blue-200"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  AWS ML Specialty
                </motion.span>
                <motion.span
                  className="px-4 py-2 bg-gradient-to-r from-girlie-lavender-100 to-soft-blue-100 text-girlie-lavender-700 rounded-full text-sm font-medium border border-girlie-lavender-200"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  Deep Learning Specialization
                </motion.span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;