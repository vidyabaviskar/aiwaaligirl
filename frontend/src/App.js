import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Talks from './components/Talks';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    // Simulate loading time for smooth entrance
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Handle scroll-based active section detection
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'certificates', 'talks', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="App">
      <Helmet>
        <title>Vidya Baviskar - Gen AI Enthusiast & Tech Speaker</title>
        <meta name="description" content="Passionate Gen AI enthusiast creating innovative AI solutions. Explore my projects, certifications, and speaking engagements in artificial intelligence." />
        <meta name="keywords" content="Vidya Baviskar, Gen AI, Generative AI, Machine Learning, AI Expert, Tech Speaker, Women in Tech" />
        <link rel="canonical" href="https://vidyabaviskar.com" />
      </Helmet>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen bg-gradient-to-br from-pookie-pink-50 via-girlie-lavender-50 to-soft-blue-50"
        >
          {/* Navigation */}
          <Navigation activeSection={activeSection} />

          {/* Main Content */}
          <main className="relative overflow-hidden">
            {/* Hero Section */}
            <section id="hero" className="min-h-screen">
              <Hero />
            </section>

            {/* About Section */}
            <section id="about" className="min-h-screen py-20">
              <About />
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-20">
              <Skills />
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-20">
              <Projects />
            </section>

            {/* Certificates Section */}
            <section id="certificates" className="py-20">
              <Certificates />
            </section>

            {/* Talks Section */}
            <section id="talks" className="py-20">
              <Talks />
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20">
              <Contact />
            </section>
          </main>

          {/* Footer */}
          <Footer />

          {/* Floating Elements */}
          <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
            <motion.div
              className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-pookie-pink-300 to-girlie-lavender-300 rounded-full opacity-20"
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute top-1/3 right-20 w-16 h-16 bg-gradient-to-r from-soft-blue-300 to-pookie-pink-300 rounded-full opacity-20"
              animate={{
                y: [0, 30, 0],
                x: [0, -15, 0],
                scale: [1, 0.9, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-gradient-to-r from-girlie-lavender-300 to-soft-blue-300 rounded-full opacity-20"
              animate={{
                y: [0, -25, 0],
                x: [0, 20, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;