import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import URL from '../../constants/api';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa';
import './Computadordetails.css';

function ComputadorDetalle() {
  const [computador, setComputador] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${URL.API}/api/v1/computador/${id}`)
      .then(response => {
        setComputador(response.data.computer);
        setLoading(false);
      })
      .catch(error => {
        setError('Hubo un error al cargar los detalles del computador');
        setLoading(false);
      });
  }, [id]);

  const handleEdit = () => {
    navigate(`/Editcomputadores/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${URL.API}/api/v1/computador/${id}`);
      setShowModal(false);
      navigate('/');
    } catch (error) {
      setError('Hubo un error al eliminar el computador');
    }
  };

  const openModal = () => {
    console.log('Abriendo modal');
    setShowModal(true);
  };

  const closeModal = () => {
    console.log('Cerrando modal');
    setShowModal(false);
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!computador) return <div className="error">No se encontró el computador</div>;

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
        <h1>{computador.name}</h1>
        <div className="detalle-grid">
      <div className="detalle-item">
          <strong>Ubicación:</strong> {computador.location}
        </div>
        <div className="detalle-item">
          <strong>Tipo:</strong> {computador.computerType}
        </div>
        <div className="detalle-item">
          <strong>Fabricante:</strong> {computador.manufacturer}
        </div>
        <div className="detalle-item">
          <strong>Técnico a cargo:</strong> {computador.technicianInCharge}
        </div>
        <div className="detalle-item">
          <strong>Grupo a cargo:</strong> {computador.groupInCharge}
        </div>
        <div className="detalle-item">
          <strong>Número de usuario alterno:</strong> {computador.alternateUsernameNumber}
        </div>
        <div className="detalle-item">
          <strong>Número de serie:</strong> {computador.serialNumber}
        </div>
        <div className="detalle-item">
          <strong>Usuario alterno:</strong> {computador.alternateUsername}
        </div>
        <div className="detalle-item">
          <strong>Número de inventario:</strong> {computador.inventoryNumber}
        </div>
        <div className="detalle-item">
          <strong>Usuario:</strong> {computador.user}
        </div>
        <div className="detalle-item">
          <strong>Grupo:</strong> {computador.group}
        </div>
        <div className="detalle-item">
          <strong>Comentarios:</strong> {computador.comments}
        </div>
        <div className="detalle-item">
          <strong>Fuente de actualización:</strong> {computador.updateSource}
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
            <p>¿Estás seguro de que deseas eliminar este computador?</p>
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

export default ComputadorDetalle;