import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaPython, FaDatabase, 
  FaBrain, FaGitAlt, FaGithub 
} from 'react-icons/fa';
import { 
  SiJavascript, SiMongodb, SiTailwindcss, SiCplusplus, 
  SiMysql, SiExpress 
} from 'react-icons/si';

const Skills = () => {
  const skillsData = [
    { name: 'HTML', icon: <FaHtml5 size={40} />, level: 'Advanced' },
    { name: 'CSS & Tailwind', icon: <SiTailwindcss size={40} />, level: 'Advanced' },
    { name: 'JavaScript', icon: <SiJavascript size={40} />, level: 'Intermediate' },
    { name: 'React.js', icon: <FaReact size={40} />, level: 'Intermediate' },
    { name: 'Node.js', icon: <FaNodeJs size={40} />, level: 'Intermediate' },
    { name: 'Express.js', icon: <SiExpress size={40} />, level: 'Intermediate' },
    { name: 'MongoDB', icon: <SiMongodb size={40} />, level: 'Intermediate' },
    { name: 'MySQL', icon: <SiMysql size={40} />, level: 'Intermediate' },
    { name: 'C++', icon: <SiCplusplus size={40} />, level: 'Advanced' },
    { name: 'Python', icon: <FaPython size={40} />, level: 'Intermediate' },
    { name: 'Data Structures & Algorithms', icon: <FaBrain size={40} />, level: 'Intermediate-Advanced' },
    { name: 'Git & GitHub', icon: <FaGitAlt size={40} />, level: 'Intermediate' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 }
    },
    hover: {
      scale: 1.05,
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="py-16">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold mb-4">
          <span className="text-blue-500">Technical</span> Skills
        </h2>
        <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
      </div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {skillsData.map((skill, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover="hover"
            className="relative bg-[#1a1f2e] rounded-lg overflow-hidden shadow-lg flex flex-col items-center p-8 group hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 text-blue-500 mb-4 transform group-hover:scale-110 transition-transform duration-300">
              {skill.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2 relative z-10 group-hover:text-blue-400 transition-colors duration-300">{skill.name}</h3>
            <div className="mt-auto relative z-10">
              <span className="text-sm text-gray-400 group-hover:text-blue-300 transition-colors duration-300">{skill.level}</span>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Skills;
