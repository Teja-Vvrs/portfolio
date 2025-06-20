import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Menu, X, Award } from 'lucide-react';
import { ThemeToggle } from './components/ThemeToggle';
import { Section } from './components/Section';
import { projects } from './data';
import RotatingText from './RotatingText';
import { 
  FaReact, FaNodeJs, FaJsSquare, FaHtml5, FaCss3Alt, FaPython, FaJava, 
  FaGitAlt, FaDatabase, FaDocker 
} from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTypescript, SiRedux } from 'react-icons/si';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Skills from './components/Skills'

function App() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme === 'dark';
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
    const handleScroll = () => setScrolled(window.scrollY > 20);
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
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleDownloadResume = () => {
    toast.success("Resume downloaded successfully!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: isDark ? "dark" : "light",
    });
  };

  const navVariants = { hidden: { y: -100 }, visible: { y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } } };
  const linkVariants = { hover: { scale: 1.1, transition: { type: "spring", stiffness: 400, damping: 10 } } };
  const skillVariants = { hidden: { scale: 0.8, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }, hover: { scale: 1.05, transition: { duration: 0.2 } } };
  const aboutVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } };
  const achievementVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.2 } } };

  const navItems = ['about', 'skills', 'achievements', 'projects', 'contact'];
  const achievements = [
    { platform: "LeetCode", achievement: "Solved 200+ problems", rank: "Top 25% globally" },
    { platform: "Codeforces", achievement: "Newbie", rank: "1000+ rating" },
    { platform: "Codechef", achievement: "3-Star Rating", rank: "1600+ rating" }
  ];

  // const getSkillIcon = (skill) => {
  //   const iconClass = "w-6 h-6 text-blue-500 dark:text-blue-300";
  //   switch (skill.toLowerCase()) {
  //     case 'react': return <FaReact className={iconClass} />;
  //     case 'nodejs': case 'node.js': return <FaNodeJs className={iconClass} />;
  //     case 'javascript': return <FaJsSquare className={iconClass} />;
  //     case 'html': return <FaHtml5 className={iconClass} />;
  //     case 'css': return <FaCss3Alt className={iconClass} />;
  //     case 'python': return <FaPython className={iconClass} />;
  //     case 'java': return <FaJava className={iconClass} />;
  //     case 'git': return <FaGitAlt className={iconClass} />;
  //     case 'mongodb': return <SiMongodb className={iconClass} />;
  //     case 'express': return <SiExpress className={iconClass} />;
  //     case 'typescript': return <SiTypescript className={iconClass} />;
  //     case 'redux': return <SiRedux className={iconClass} />;
  //     case 'sql': return <FaDatabase className={iconClass} />;
  //     case 'docker': return <FaDocker className={iconClass} />;
  //     default: return <span className="text-blue-500 dark:text-blue-300 text-lg">{skill[0]}</span>;
  //   }
  // };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-200">
      {/* Toast Container */}
      <ToastContainer />

      {/* Navigation */}
      <motion.nav initial="hidden" animate="visible" variants={navVariants} className={`fixed w-full backdrop-blur-sm z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-gray-900/90 shadow-lg' : 'bg-white/50 dark:bg-gray-900/50'}`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="text-2xl font-bold">VVRS TEJA</motion.h1>
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a key={item} href={`#${item}`} variants={linkVariants} whileHover="hover" onClick={(e) => handleNavClick(e, item)} className="hover:text-blue-500 transition-colors capitalize">{item}</motion.a>
            ))}
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
          </div>
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
            <motion.button whileTap={{ scale: 0.9 }} onClick={toggleMenu} aria-label="Toggle menu">{isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</motion.button>
          </div>
        </div>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="md:hidden bg-white dark:bg-gray-900 px-4 py-2">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <motion.a key={item} href={`#${item}`} whileHover={{ x: 10 }} onClick={(e) => handleNavClick(e, item)} className="hover:text-blue-500 transition-colors capitalize">{item}</motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      <main className="max-w-6xl mx-auto px-4 pt-24">
        {/* Hero Section */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="min-h-[80vh] flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">{displayText}<motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="inline-block w-[4px] h-12 bg-blue-500 ml-2" /></h1>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.5 }} className="h-1 w-32 bg-blue-500 mb-8" />
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 flex items-center">
              <span>I AM</span>{' '}
              <RotatingText texts={['MERN Stack Developer', 'Competitive Programmer']} mainClassName="inline-flex px-2 sm:px-2 md:px-3 bg-black-300 text-gray-800 dark:text-gray-200 overflow-hidden py-0.5 sm:py-1 md:py-2 rounded-lg align-middle" staggerFrom="last" initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "-120%" }} staggerDuration={0.026} splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1" transition={{ type: "spring", damping: 30, stiffness: 400 }} rotationInterval={2000} />
            </p>
          </motion.div>
          <div className="flex space-x-4">
            <motion.a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">Get in touch</motion.a>
            <motion.a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors">View projects</motion.a>
          </div>
        </motion.section>

        {/* About Section */}
        <Section id="about" title="About Me">
          <motion.div initial="hidden" whileInView="visible" variants={aboutVariants} className="relative py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-blue-500 dark:text-blue-400">Crafting Digital Experiences</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  Hey! I'm VVRS Teja, a passionate{' '}
                  <span className="font-semibold text-blue-600 dark:text-blue-300">MERN Stack Developer</span> and{' '}
                  <span className="font-semibold text-blue-600 dark:text-blue-300">Competitive Programmer</span>. I thrive on turning ideas into reality through clean, efficient code and innovative solutions.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  With a strong foundation in full-stack development and a knack for solving complex algorithmic challenges, I bring creativity and precision to every project. Let's build something amazing together!
                </p>
              
              </div>

              {/* Your Photo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-blue-500 dark:border-blue-400 shadow-lg">
                  <img
                    src="/tej.jpg" // Update this path to your photo
                    alt="VVRS Teja"
                    className="w-full h-full object-cover scale-125"
                  />
                </div>
                {/* Optional: Add decorative elements */}
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

        {/* Skills Section */}
        <Section id="skills" >
          <Skills />
        </Section>

        {/* Achievements Section */}
        <Section id="achievements" title="Achievements">
          <motion.div initial="hidden" whileInView="visible" variants={achievementVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <motion.div key={achievement.platform} variants={achievementVariants} whileHover={{ scale: 1.03 }} className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3 mb-3">
                  <Award className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{achievement.platform}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-2">{achievement.achievement}</p>
                <p className="text-sm text-blue-500 dark:text-blue-300 mb-3">{achievement.rank}</p>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* Projects Section with Slider */}
        <Section id="projects" title="Featured Projects">
          <div className="relative py-8 px-12">
            {/* Navigation Buttons */}
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => document.getElementById('projects-container')?.scrollBy({ left: -340, behavior: 'smooth' })}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-blue-500/80 text-white p-3 rounded-full shadow-md hover:bg-blue-600 transition-all backdrop-blur-sm"
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => document.getElementById('projects-container')?.scrollBy({ left: 340, behavior: 'smooth' })}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-blue-500/80 text-white p-3 rounded-full shadow-md hover:bg-blue-600 transition-all backdrop-blur-sm"
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>

            {/* Projects Container */}
            <div 
              id="projects-container"
              className="flex overflow-x-scroll snap-x snap-mandatory scroll-smooth gap-8 hide-scrollbar"
              style={{ 
                WebkitOverflowScrolling: 'touch',
                maxWidth: '100%',
                scrollBehavior: 'smooth'
              }}
            >
              {projects.map((project) => (
                <motion.div 
                  key={project.title} 
                  whileHover={{ y: -5 }}
                  className="flex-shrink-0 w-[320px] bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden snap-center shadow-lg"
                >
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span 
                          key={tech} 
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a 
                      href={project.link} 
                      className="text-blue-500 hover:text-blue-600 transition-colors text-sm font-medium"
                    >
                      View Project →
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* Contact Section */}
        <Section id="contact" title="Get in Touch">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-lg text-gray-600 dark:text-gray-400">I'm always open to new opportunities and interesting projects. Feel free to reach out!</p>
              <div className="flex space-x-4">
                <motion.a href="https://github.com/Teja-Vvrs" target="_blank" rel="noopener noreferrer" whileHover={{ y: -2 }} className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-500"><Github className="w-6 h-6" /></motion.a>
                <motion.a href="https://www.linkedin.com/in/veluvarthi-teja" target="_blank" rel="noopener noreferrer" whileHover={{ y: -2 }} className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-500"><Linkedin className="w-6 h-6" /></motion.a>
                <motion.a href="mailto:vvrsteja944@gmail.com" whileHover={{ y: -2 }} className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-500"><Mail className="w-6 h-6" /></motion.a>
              </div>
            </div>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <input type="text" id="name" className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input type="email" id="email" className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea id="message" rows={4} className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">Send Message</motion.button>
            </form>
          </div>
        </Section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-800 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <p className="text-center text-gray-600 dark:text-gray-400">MADE WITH ❤️ VVRS TEJA</p>
        </div>
      </footer>
    </div>
  );
}
export default App;