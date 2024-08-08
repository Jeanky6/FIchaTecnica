import React, { useState, useEffect } from 'react';
import axios from 'axios';
import URL from '../../constants/api';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { CDBBtn, CDBIcon } from 'cdbreact';
import { Alert, Stack } from '@mui/material';
import '../computadores/computadores.css';

const EditGPU = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    memory: '',
    memoryType: '',
    coreClock: '',
    boostClock: '',
    cudaCores: '',
    tdp: '',
    releaseDate: '',
    price: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get(`${URL.API}/api/v1/gpu/${id}`)
      .then(response => {
        setFormData(response.data.gpu);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los detalles del GPU:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${URL.API}/api/v1/gpu/${id}`, formData);
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        setSuccess(false);
        navigate(`/gpus/${id}`);
      }, 2000);
    } catch (error) {
      setError(true);
      setSuccess(false);
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  };

  return (
    <Container fluid className="my-4">
      {success && (
        <Stack className="alert3" sx={{ width: '100%', marginLeft: '30%', marginBottom: '3px' }} spacing={2}>
          <Alert severity="success" variant="filled">
            GPU actualizado exitosamente
          </Alert>
        </Stack>
      )}
      {error && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error" variant="filled">
            Error al actualizar el GPU
          </Alert>
        </Stack>
      )}
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="carddddd">
            <Card.Header className="cardH text-white text-center py-3">
              <CDBIcon icon="video" size="2x" className="text-white" />
            </Card.Header>
            <Card.Body className="p-4">
              <h2 className="fw-bold mb-2 text-uppercase text-center">
                Editar Registro de GPU
              </h2>
              <p className="text-dark-50 mb-4 text-center">
                Actualiza los detalles a continuación para editar el GPU.
              </p>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="brand" className="mb-3">
                      <Form.Label>Marca</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese la marca del GPU"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="model" className="mb-3">
                      <Form.Label>Modelo</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el modelo del GPU"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="memory" className="mb-3">
                      <Form.Label>Memoria (GB)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Ingrese el tamaño de la memoria"
                        name="memory"
                        value={formData.memory}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="memoryType" className="mb-3">
                      <Form.Label>Tipo de Memoria</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el tipo de memoria"
                        name="memoryType"
                        value={formData.memoryType}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="coreClock" className="mb-3">
                      <Form.Label>Core Clock (MHz)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Ingrese la velocidad del núcleo"
                        name="coreClock"
                        value={formData.coreClock}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="boostClock" className="mb-3">
                      <Form.Label>Boost Clock (MHz)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Ingrese la velocidad de aumento"
                        name="boostClock"
                        value={formData.boostClock}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="cudaCores" className="mb-3">
                      <Form.Label>CUDA Cores</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Ingrese el número de núcleos CUDA"
                        name="cudaCores"
                        value={formData.cudaCores}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="tdp" className="mb-3">
                      <Form.Label>TDP (W)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Ingrese el TDP"
                        name="tdp"
                        value={formData.tdp}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="releaseDate" className="mb-3">
                      <Form.Label>Fecha de Lanzamiento</Form.Label>
                      <Form.Control
                        type="date"
                        name="releaseDate"
                        value={formData.releaseDate}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="price" className="mb-3">
                      <Form.Label>Precio ($)</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.01"
                        placeholder="Ingrese el precio"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="text-center mt-4">
                  <center>
                    <CDBBtn type="submit" className="Buttonn">
                      <CDBIcon icon="save" className="ms-1" />
                      Guardar Cambios
                    </CDBBtn>
                  </center>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditGPU;
