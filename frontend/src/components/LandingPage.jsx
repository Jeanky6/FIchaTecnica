import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function LandingPage() {
  return (
    <motion.div 
      className="landing-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <center>
      <h1>Bienvenido a TechSpecs</h1>
      <p>Descubre las especificaciones técnicas de los mejores computadores del mercado.</p>
      <div className="featured-computers">
        {/* Aquí puedes mostrar algunos computadores destacados */}
      </div>
      <Link to="/computadores" className="cta-button">Ver todos los computadores</Link>
      </center>
    </motion.div>
  );
}

export default LandingPage;