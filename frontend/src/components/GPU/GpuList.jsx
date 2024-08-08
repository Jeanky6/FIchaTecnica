import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import URL from '../../constants/api';
import { motion } from 'framer-motion';
import { FaSearch, FaPlus } from 'react-icons/fa';
import '../computadores/computadoreslist.css';

function GPUList() {
  const [gpus, setGPUs] = useState([]);
  const [filteredGPUs, setFilteredGPUs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${URL.API}/api/v1/gpu`)
      .then(response => {
        setGPUs(response.data.gpus);
        console.log(response.data);
        setFilteredGPUs(response.data.gpus);
        setLoading(false);
      })
      .catch(error => {
        setError('Hubo un error al cargar los datos');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const results = gpus.filter(gpu =>
      gpu.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gpu.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGPUs(results);
  }, [searchTerm, gpus]);

  const SkeletonLoader = () => (
    <motion.div className="skeleton-card" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
  );

  const handleCardClick = (id) => {
    navigate(`/gpus/${id}`);
  };

  const handleCreateGPU = () => {
    navigate('/CrearGPU');
  };

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="computador-list">
      <h1>Lista de GPUs</h1>
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
        <button className="create-button" onClick={handleCreateGPU}>
          <FaPlus /> Crear GPU
        </button>
      </div>
      <motion.div className="grid" layout>
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))
          : filteredGPUs.map(gpu => (
              <motion.div
                key={gpu._id}
                className="card"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                onClick={() => handleCardClick(gpu._id)}
              >
                <h2>{gpu.brand} {gpu.model}</h2>
                <p><strong>VRAM:</strong> {gpu.vram} GB</p>
                <p><strong>Clock Speed:</strong> {gpu.clockSpeed} MHz</p>
                <p><strong>Memory Type:</strong> {gpu.memoryType}</p>
                <p><strong>TDP:</strong> {gpu.tdp} W</p>
              </motion.div>
            ))}
      </motion.div>
    </div>
  );
}

export default GPUList;