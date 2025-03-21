import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Menu, X, Award } from 'lucide-react';
import { ThemeToggle } from './components/ThemeToggle';
import { Section } from './components/Section';
import { projects, skills } from './data';
import RotatingText from './RotatingText';

function App() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const fullText = "Hi there! I'm VVRS TEJA";

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, []);

  const toggleTheme = () => setIsDark(prev => !prev);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const navVariants = {
    hidden: { y: -100 },
    visible: { y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  const linkVariants = {
    hover: { scale: 1.1, transition: { type: "spring", stiffness: 400, damping: 10 } }
  };

  const skillVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };

  const aboutVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const achievementVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.2 } }
  };

  const navItems = ['about', 'skills', 'achievements', 'projects', 'contact'];

  // Sample achievements data
  const achievements = [
    { platform: "LeetCode", achievement: "Solved 500+ problems", link: "https://leetcode.com/your-profile", rank: "Top 5% globally" },
    { platform: "Codeforces", achievement: "Specialist Rating", link: "https://codeforces.com/profile/your-profile", rank: "1500+ rating" },
    { platform: "HackerRank", achievement: "5-star in Problem Solving", link: "https://www.hackerrank.com/your-profile", rank: "Gold Badge" }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-200">
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`fixed w-full backdrop-blur-sm z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-gray-900/90 shadow-lg' : 'bg-white/50 dark:bg-gray-900/50'}`}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold"
          >
            VVRS TEJA
          </motion.h1>
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item}`}
                variants={linkVariants}
                whileHover="hover"
                onClick={(e) => handleNavClick(e, item)}
                className="hover:text-blue-500 transition-colors capitalize"
              >
                {item}
              </motion.a>
            ))}
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
          </div>
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-900 px-4 py-2"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <motion.a
                  key={item}
                  href={`#${item}`}
                  whileHover={{ x: 10 }}
                  onClick={(e) => handleNavClick(e, item)}
                  className="hover:text-blue-500 transition-colors capitalize"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      <main className="max-w-6xl mx-auto px-4 pt-24">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="min-h-[80vh] flex flex-col justify-center"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              {displayText}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-[4px] h-12 bg-blue-500 ml-2"
              />
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1 w-32 bg-blue-500 mb-8"
            />
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 flex items-center">
              <span>I AM</span>{' '}
              <RotatingText
                texts={['MERN Stack Developer', 'Competitive Programmer']}
                mainClassName="inline-flex px-2 sm:px-2 md:px-3 bg-black-300 text-gray-800 dark:text-gray-200 overflow-hidden py-0.5 sm:py-1 md:py-2 rounded-lg align-middle"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.026}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </p>
          </motion.div>
          <div className="flex space-x-4">
            <motion.a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Get in touch
            </motion.a>
            <motion.a
              href="#projects"
              onClick={(e) => handleNavClick(e, 'projects')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
            >
              View projects
            </motion.a>
          </div>
        </motion.section>

        <Section id="about" title="About Me">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={aboutVariants}
            className="relative py-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-blue-500 dark:text-blue-400">
                  Crafting Digital Experiences
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  Hey! I'm VVRS Teja, a passionate{" "}
                  <span className="font-semibold text-blue-600 dark:text-blue-300">
                    MERN Stack Developer
                  </span>{" "}
                  and{" "}
                  <span className="font-semibold text-blue-600 dark:text-blue-300">
                    Competitive Programmer
                  </span>
                  . I thrive on turning ideas into reality through clean, efficient code and innovative solutions.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  With a strong foundation in full-stack development and a knack for solving complex algorithmic challenges, 
                  I bring creativity and precision to every project. Let’s build something amazing together!
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-block px-6 py-2 bg-blue-500 text-white rounded-full"
                >
                  Download Resume
                </motion.div>
              </div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="w-64 h-64 mx-auto bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="text-4xl font-bold text-white"
                  >
                    VT
                  </motion.span>
                </div>
                <motion.div
                  className="absolute -top-4 -left-4 w-16 h-16 bg-blue-200 dark:bg-blue-800 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-4 -right-4 w-12 h-12 bg-blue-300 dark:bg-blue-700 rounded-full"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </motion.div>
            </div>
          </motion.div>
        </Section>

        <Section id="skills" title="Skills">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(skills).map(([category, items], categoryIndex) => (
              <motion.div
                key={category}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                variants={skillVariants}
                className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg transform-gpu"
              >
                <h3 className="text-xl font-semibold mb-6 capitalize">{category}</h3>
                <div className="space-y-6">
                  {items.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">{skill}</span>
                        <span className="text-sm text-blue-500">{90 - (index * 5)}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${90 - (index * 5)}%` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="achievements" title="Achievements">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={achievementVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.platform}
                variants={achievementVariants}
                whileHover={{ scale: 1.03 }}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Award className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {achievement.platform}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {achievement.achievement}
                </p>
                <p className="text-sm text-blue-500 dark:text-blue-300 mb-3">
                  {achievement.rank}
                </p>
                <a
                  href={achievement.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View Profile →
                </a>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        <Section id="projects" title="Featured Projects">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.title}
                whileHover={{ y: -5 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden"
              >
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    className="text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    View Project →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="contact" title="Get in Touch">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                I'm always open to new opportunities and interesting projects.
                Feel free to reach out!
              </p>
              <div className="flex space-x-4">
                <motion.a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-500"
                >
                  <Github className="w-6 h-6" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-500"
                >
                  <Linkedin className="w-6 h-6" />
                </motion.a>
                <motion.a
                  href="mailto:contact@example.com"
                  whileHover={{ y: -2 }}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-500"
                >
                  <Mail className="w-6 h-6" />
                </motion.a>
              </div>
            </div>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </Section>
      </main>

      <footer className="bg-gray-50 dark:bg-gray-800 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <p className="text-center text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} VVRS TEJA. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;