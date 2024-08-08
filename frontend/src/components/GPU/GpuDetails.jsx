import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import URL from '../../constants/api';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa';
import '../computadores/Computadordetails.css';

function GPUDetalle() {
  const [gpu, setGPU] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${URL.API}/api/v1/gpu/${id}`)
      .then(response => {
        setGPU(response.data.gpu);
        setLoading(false);
      })
      .catch(error => {
        setError('Hubo un error al cargar los detalles del GPU');
        setLoading(false);
      });
  }, [id]);

  const handleEdit = () => {
    navigate(`/editgpu/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${URL.API}/api/v1/gpu/${id}`);
      setShowModal(false);
      navigate('/gpus');
    } catch (error) {
      setError('Hubo un error al eliminar el GPU');
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!gpu) return <div className="error">No se encontró el GPU</div>;

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
        <h1>{gpu.brand} {gpu.model}</h1>
        <div className="detalle-grid">
          <div className="detalle-item">
            <strong>Marca:</strong> {gpu.brand}
          </div>
          <div className="detalle-item">
            <strong>Modelo:</strong> {gpu.model}
          </div>
          <div className="detalle-item">
            <strong>Memoria:</strong> {gpu.memory} GB
          </div>
          <div className="detalle-item">
            <strong>Tipo de memoria:</strong> {gpu.memoryType}
          </div>
          <div className="detalle-item">
            <strong>Velocidad del núcleo:</strong> {gpu.coreClock} MHz
          </div>
          <div className="detalle-item">
            <strong>Velocidad de boost:</strong> {gpu.boostClock} MHz
          </div>
          <div className="detalle-item">
            <strong>Núcleos CUDA:</strong> {gpu.cudaCores}
          </div>
          <div className="detalle-item">
            <strong>TDP:</strong> {gpu.tdp} W
          </div>
          <div className="detalle-item">
            <strong>Fecha de lanzamiento:</strong> {new Date(gpu.releaseDate).toLocaleDateString()}
          </div>
          <div className="detalle-item">
            <strong>Precio:</strong> ${gpu.price}
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
            <p>¿Estás seguro de que deseas eliminar este GPU?</p>
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

export default GPUDetalle;