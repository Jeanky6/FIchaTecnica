import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaSearch, FaPlus } from 'react-icons/fa';
import '../computadores/computadoreslist.css';

function RAMList() {
  const [rams, setRAMs] = useState([]);
  const [filteredRAMs, setFilteredRAMs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:3300/api/v1/ram')
      .then(response => {
        setRAMs(response.data.rams);
        console.log(response.data); 
        setFilteredRAMs(response.data.rams);
        setLoading(false);
      })
      .catch(error => {
        setError('Hubo un error al cargar los datos');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const results = rams.filter(ram =>
      ram.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ram.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRAMs(results);
  }, [searchTerm, rams]);

  const SkeletonLoader = () => (
    <motion.div className="skeleton-card" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
  );

  const handleCardClick = (id) => {
    navigate(`/rams/${id}`);
  };

  const handleCreateRAM = () => {
    navigate('/CrearRAM');
  };

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="computador-list">
      <h1>Lista de RAMs</h1>
      <div className="search-and-create">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por marca o modelo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="create-button" onClick={handleCreateRAM}>
          <FaPlus /> Crear RAM
        </button>
      </div>
      <motion.div className="grid" layout>
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))
          : filteredRAMs.map(ram => (
              <motion.div
                key={ram._id}
                className="card"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                onClick={() => handleCardClick(ram._id)}
              >
                <h2>{ram.brand} {ram.model}</h2>
                <p><strong>Capacity:</strong> {ram.capacity} GB</p>
                <p><strong>Type:</strong> {ram.type}</p>
                <p><strong>Speed:</strong> {ram.speed} MHz</p>
                <p><strong>Latency:</strong> CL{ram.latency}</p>
              </motion.div>
            ))}
      </motion.div>
    </div>
  );
}

export default RAMList;