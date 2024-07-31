import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaSearch, FaPlus } from 'react-icons/fa';
import './computadoreslist.css';

function ComputadorList() {
  const [computadores, setComputadores] = useState([]);
  const [filteredComputadores, setFilteredComputadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:3300/api/v1/computador')
      .then(response => {
        setComputadores(response.data.computers);
        setFilteredComputadores(response.data.computers);
        setLoading(false);
      })
      .catch(error => {
        setError('Hubo un error al cargar los datos');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const results = computadores.filter(comp =>
      (comp.name?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
      (comp.location?.toLowerCase().includes(searchTerm.toLowerCase()) || '')
    );
    setFilteredComputadores(results);
  }, [searchTerm, computadores]);

  const SkeletonLoader = () => (
    <motion.div className="skeleton-card" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
  );

  const handleCardClick = (id) => {
    navigate(`/computadores/${id}`);
  };

  const handleCreateComputador = () => {
    navigate('/Ccomputador');
  };

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="computador-list">
      <h1>Lista de Computadores</h1>
      <div className="search-and-create">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por nombre o ubicacion"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="create-button" onClick={handleCreateComputador}>
          <FaPlus /> Crear Computador
        </button>
      </div>
      <motion.div className="grid" layout>
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))
          : filteredComputadores.map(computador => (
              <motion.div
                key={computador._id}
                className="card"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                onClick={() => handleCardClick(computador._id)}
              >
                <h2>{computador.name}</h2>
                <p><strong>Ubicación:</strong> {computador.location}</p>
                <p><strong>Tipo:</strong> {computador.computerType}</p>
                <p><strong>Fabricante:</strong> {computador.manufacturer}</p>
                <p><strong>Usuario:</strong> {computador.user}</p>
              </motion.div>
            ))}
      </motion.div>
    </div>
  );
}

export default ComputadorList;