import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa';
import '../computadores/Computadordetails.css';

function RAMDetalle() {
  const [ram, setRAM] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://127.0.0.1:3300/api/v1/ram/${id}`)
      .then(response => {
        setRAM(response.data.ram);
        setLoading(false);
      })
      .catch(error => {
        setError('Hubo un error al cargar los detalles de la RAM');
        setLoading(false);
      });
  }, [id]);

  const handleEdit = () => {
    navigate(`/editram/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:3300/api/v1/ram/${id}`);
      setShowModal(false);
      navigate('/rams');
    } catch (error) {
      setError('Hubo un error al eliminar la RAM');
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!ram) return <div className="error">No se encontró la RAM</div>;

  return (
    <div className="computador-detalle-container">
      <motion.div 
        className="computador-detalle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Volver
        </button>
        <h1>{ram.brand} {ram.model}</h1>
        <div className="detalle-grid">
          <div className="detalle-item">
            <strong>Marca:</strong> {ram.brand}
          </div>
          <div className="detalle-item">
            <strong>Modelo:</strong> {ram.model}
          </div>
          <div className="detalle-item">
            <strong>Capacidad:</strong> {ram.capacity} GB
          </div>
          <div className="detalle-item">
            <strong>Tipo:</strong> {ram.type}
          </div>
          <div className="detalle-item">
            <strong>Velocidad:</strong> {ram.speed} MHz
          </div>
          <div className="detalle-item">
            <strong>Latencia:</strong> CL{ram.latency}
          </div>
          <div className="detalle-item">
            <strong>Voltaje:</strong> {ram.voltage} V
          </div>
          <div className="detalle-item">
            <strong>ECC:</strong> {ram.ecc ? 'Sí' : 'No'}
          </div>
          <div className="detalle-item">
            <strong>Fecha de lanzamiento:</strong> {new Date(ram.releaseDate).toLocaleDateString()}
          </div>
          <div className="detalle-item">
            <strong>Precio:</strong> ${ram.price}
          </div>
        </div>
        <div className="action-buttons">
          <button className="edit-button" onClick={handleEdit}>
            <FaEdit /> Editar
          </button>
          <button className="delete-button" onClick={openModal}>
            <FaTrash /> Eliminar
          </button>
        </div>
      </motion.div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modall">
            <h2>Confirmar Eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar esta RAM?</p>
            <div className="modal-buttons">
              <button onClick={closeModal}>Cancelar</button>
              <button onClick={handleDelete}>Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RAMDetalle;