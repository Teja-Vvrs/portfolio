import React from 'react';
import { motion } from 'framer-motion';

export const Section = ({ id, title, children }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-16"
    >
      <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">{title}</h2>
      {children}
    </motion.section>
  );
};