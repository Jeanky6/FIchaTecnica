import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaSearch, FaPlus } from 'react-icons/fa';
import '../computadores/computadoreslist.css';

function CPUList() {
  const [cpus, setCPUs] = useState([]);
  const [filteredCPUs, setFilteredCPUs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:3300/api/v1/cpu')
      .then(response => {
        setCPUs(response.data.cpus);
        console.log(response.data);
        setFilteredCPUs(response.data.cpus);
        setLoading(false);
      })
      .catch(error => {
        setError('Hubo un error al cargar los datos');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const results = cpus.filter(cpu =>
      cpu.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cpu.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCPUs(results);
  }, [searchTerm, cpus]);

  const SkeletonLoader = () => (
    <motion.div className="skeleton-card" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
  );

  const handleCardClick = (id) => {
    navigate(`/cpus/${id}`);
  };

  const handleCreateCPU = () => {
    navigate('/CrearCPU');
  };

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="computador-list">
      <h1>Lista de CPUs</h1>
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
        <button className="create-button" onClick={handleCreateCPU}>
          <FaPlus /> Crear CPU
        </button>
      </div>
      <motion.div className="grid" layout>
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))
          : filteredCPUs.map(cpu => (
              <motion.div
                key={cpu._id}
                className="card"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                onClick={() => handleCardClick(cpu._id)}
              >
                <h2>{cpu.brand} {cpu.model}</h2>
                <p><strong>Cores:</strong> {cpu.cores}</p>
                <p><strong>Clock Speed:</strong> {cpu.baseClockSpeed} GHz</p>
                <p><strong>Socket:</strong> {cpu.socket}</p>
                <p><strong>TDP:</strong> {cpu.tdp} W</p>
              </motion.div>
            ))}
      </motion.div>
    </div>
  );
}

export default CPUList;