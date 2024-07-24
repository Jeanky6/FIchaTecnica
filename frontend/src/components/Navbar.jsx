import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';

function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <motion.nav 
      className={`navbar ${darkMode ? 'dark' : ''}`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-logo">
      
      </div>
      <ul className="navbar-menu">
        <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link to="/">Inicio</Link>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link to="/computadores  ">Computadores</Link>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link to="/about">Acerca de</Link>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link to="/contact">Contacto</Link>
        </motion.li>
      </ul>
      <motion.button 
        onClick={toggleDarkMode} 
        className="theme-toggle"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {darkMode ? '☀️' : '🌙'}
      </motion.button>
    </motion.nav>
  );
}

export default Navbar;