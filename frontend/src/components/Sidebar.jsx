import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from "./ThemeContext"

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode } = useTheme();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' }
  };

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? '☰' : '✕'} 
      </button>
      <AnimatePresence>
        {(isOpen || window.innerWidth > 768) && (
          <motion.aside
            className={`sidebar ${darkMode ? 'dark' : ''}`}
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            transition={{ duration: 0.3, type: 'tween' }}
          >
            <motion.h3
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Categorías
            </motion.h3>
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <li><Link to="/computers?category=laptop">Laptops</Link></li>
              <li><Link to="/computers?category=desktop">Desktops</Link></li>
              <li><Link to="/computers?category=workstation">Workstations</Link></li>
            </motion.ul>
            <motion.h3
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Componentes
            </motion.h3>
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <li><Link to="/cpus">CPU</Link></li>
              <li><Link to="/gpus">GPU</Link></li>
              <li><Link to="/rams">RAM</Link></li>
              <li><Link to="/storages">Almacenamiento</Link></li>
            </motion.ul>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

export default Sidebar;