import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { CDBBtn, CDBIcon } from 'cdbreact';
import { Alert, Stack } from '@mui/material';
import '../computadores/computadores.css';
import { useNavigate } from 'react-router-dom';

const CreateCPU = () => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    cores: '',
    threads: '',
    baseClockSpeed: '',
    turboClockSpeed: '',
    socket: '',
    tdp: '',
    releaseDate: '',
    price: '',
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:3300/api/v1/cpu', formData);
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        setSuccess(false);
        navigate('/cpus');
      }, 5000);
      setFormData({
        brand: '',
        model: '',
        cores: '',
        threads: '',
        baseClockSpeed: '',
        turboClockSpeed: '',
        socket: '',
        tdp: '',
        releaseDate: '',
        price: '',
      });
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
            CPU creado exitosamente
          </Alert>
        </Stack>
      )}
      {error && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error" variant="filled">
            Error al crear el CPU
          </Alert>
        </Stack>
      )}
      <Row>
        <Col xs={12} md={8} lg={6}>
          <Card className="carddddd">
            <Card.Header className="cardH text-white text-center py-3">
              <CDBIcon icon="microchip" size="2x" className="text-white" />
            </Card.Header>
            <Card.Body className="p-4">
              <h2 className="fw-bold mb-2 text-uppercase text-center">
                Crear Nuevo CPU
              </h2>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="brand" className="mb-3">
                      <Form.Label>Marca</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese la marca"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="model" className="mb-3">
                      <Form.Label>Modelo</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el modelo"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="cores" className="mb-3">
                      <Form.Label>Núcleos</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Ingrese el número de núcleos"
                        name="cores"
                        value={formData.cores}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="threads" className="mb-3">
                      <Form.Label>Hilos</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Ingrese el número de hilos"
                        name="threads"
                        value={formData.threads}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="baseClockSpeed" className="mb-3">
                      <Form.Label>Velocidad Base (GHz)</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.1"
                        placeholder="Ingrese la velocidad base"
                        name="baseClockSpeed"
                        value={formData.baseClockSpeed}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="turboClockSpeed" className="mb-3">
                      <Form.Label>Velocidad Turbo (GHz)</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.1"
                        placeholder="Ingrese la velocidad turbo"
                        name="turboClockSpeed"
                        value={formData.turboClockSpeed}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="socket" className="mb-3">
                      <Form.Label>Socket</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el tipo de socket"
                        name="socket"
                        value={formData.socket}
                        onChange={handleChange}
                        required
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
                  <CDBBtn type="submit" className="Buttonn">
                    <CDBIcon icon="plus" className="ms-1" /> Añadir CPU
                  </CDBBtn>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateCPU;
