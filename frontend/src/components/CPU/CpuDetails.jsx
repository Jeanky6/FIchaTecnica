import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import URL from '../../constants/api';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa';
import '../computadores/Computadordetails.css';

function CPUDetalle() {
  const [cpu, setCPU] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${URL.API}/api/v1/cpu/${id}`)
      .then(response => {
        setCPU(response.data.cpu);
        setLoading(false);
      })
      .catch(error => {
        setError('Hubo un error al cargar los detalles del CPU');
        setLoading(false);
      });
  }, [id]);

  const handleEdit = () => {
    navigate(`/editcpu/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${URL.API}/api/v1/cpu/${id}`);
      setShowModal(false);
      navigate('/cpus');
    } catch (error) {
      setError('Hubo un error al eliminar el CPU');
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!cpu) return <div className="error">No se encontró el CPU</div>;

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
        <h1>{cpu.brand} {cpu.model}</h1>
        <div className="detalle-grid">
          <div className="detalle-item">
            <strong>Marca:</strong> {cpu.brand}
          </div>
          <div className="detalle-item">
            <strong>Modelo:</strong> {cpu.model}
          </div>
          <div className="detalle-item">
            <strong>Núcleos:</strong> {cpu.cores}
          </div>
          <div className="detalle-item">
            <strong>Hilos:</strong> {cpu.threads}
          </div>
          <div className="detalle-item">
            <strong>Velocidad base:</strong> {cpu.baseClockSpeed} GHz
          </div>
          <div className="detalle-item">
            <strong>Velocidad turbo:</strong> {cpu.turboClockSpeed} GHz
          </div>
          <div className="detalle-item">
            <strong>Socket:</strong> {cpu.socket}
          </div>
          <div className="detalle-item">
            <strong>TDP:</strong> {cpu.tdp} W
          </div>
          <div className="detalle-item">
            <strong>Fecha de lanzamiento:</strong> {new Date(cpu.releaseDate).toLocaleDateString()}
          </div>
          <div className="detalle-item">
            <strong>Precio:</strong> ${cpu.price}
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
            <p>¿Estás seguro de que deseas eliminar este CPU?</p>
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

export default CPUDetalle;