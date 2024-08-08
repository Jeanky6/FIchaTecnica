import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import URL from '../../constants/api';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa';
import '../computadores/Computadordetails.css';

function StorageDetalle() {
  const [storage, setStorage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${URL.API}/api/v1/storage/${id}`)
      .then(response => {
        setStorage(response.data.storage);
        setLoading(false);
      })
      .catch(error => {
        setError('Hubo un error al cargar los detalles del almacenamiento');
        setLoading(false);
      });
  }, [id]);

  const handleEdit = () => {
    navigate(`/editstorage/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${URL.API}/api/v1/storage/${id}`);
      setShowModal(false);
      navigate('/storages');
    } catch (error) {
      setError('Hubo un error al eliminar el almacenamiento');
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!storage) return <div className="error">No se encontró el almacenamiento</div>;

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
        <h1>{storage.brand} {storage.model}</h1>
        <div className="detalle-grid">
          <div className="detalle-item">
            <strong>Marca:</strong> {storage.brand}
          </div>
          <div className="detalle-item">
            <strong>Modelo:</strong> {storage.model}
          </div>
          <div className="detalle-item">
            <strong>Capacidad:</strong> {storage.capacity} GB
          </div>
          <div className="detalle-item">
            <strong>Tipo:</strong> {storage.type}
          </div>
          <div className="detalle-item">
            <strong>Factor de forma:</strong> {storage.formFactor}
          </div>
          <div className="detalle-item">
            <strong>Interfaz:</strong> {storage.interface}
          </div>
          <div className="detalle-item">
            <strong>Velocidad de lectura:</strong> {storage.readSpeed} MB/s
          </div>
          <div className="detalle-item">
            <strong>Velocidad de escritura:</strong> {storage.writeSpeed} MB/s
          </div>
          <div className="detalle-item">
            <strong>Caché:</strong> {storage.cache} MB
          </div>
          <div className="detalle-item">
            <strong>Fecha de lanzamiento:</strong> {new Date(storage.releaseDate).toLocaleDateString()}
          </div>
          <div className="detalle-item">
            <strong>Precio:</strong> ${storage.price}
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
            <p>¿Estás seguro de que deseas eliminar este almacenamiento?</p>
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

export default StorageDetalle;