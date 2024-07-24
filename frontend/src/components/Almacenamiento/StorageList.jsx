import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaSearch, FaPlus } from 'react-icons/fa';
import '../computadores/computadoreslist.css';

function StorageList() {
  const [storages, setStorages] = useState([]);
  const [filteredStorages, setFilteredStorages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:3300/api/v1/storage')
      .then(response => {
        setStorages(response.data.storages);
        console.log(response.data);
        setFilteredStorages(response.data.storages);
        setLoading(false);
      })
      .catch(error => {
        setError('Hubo un error al cargar los datos');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const results = storages.filter(storage =>
      storage.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      storage.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStorages(results);
  }, [searchTerm, storages]);

  const SkeletonLoader = () => (
    <motion.div className="skeleton-card" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
  );

  const handleCardClick = (id) => {
    navigate(`/storages/${id}`);
  };

  const handleCreateStorage = () => {
    navigate('/CrearAlmacenamiento');
  };

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="computador-list">
      <h1>Lista de Dispositivos de Almacenamiento</h1>
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
        <button className="create-button" onClick={handleCreateStorage}>
          <FaPlus /> Crear Almacenamiento
        </button>
      </div>
      <motion.div className="grid" layout>
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))
          : filteredStorages.map(storage => (
              <motion.div
                key={storage._id}
                className="card"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                onClick={() => handleCardClick(storage._id)}
              >
                <h2>{storage.brand} {storage.model}</h2>
                <p><strong>Capacity:</strong> {storage.capacity} GB</p>
                <p><strong>Type:</strong> {storage.type}</p>
                <p><strong>Form Factor:</strong> {storage.formFactor}</p>
                <p><strong>Interface:</strong> {storage.interface}</p>
              </motion.div>
            ))}
      </motion.div>
    </div>
  );
}

export default StorageList;