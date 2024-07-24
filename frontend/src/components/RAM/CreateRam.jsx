import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { CDBBtn, CDBIcon } from 'cdbreact';
import { Alert, Stack } from '@mui/material';
import '../computadores/computadores.css';
import { useNavigate } from 'react-router-dom';

const CreateRAM = () => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    capacity: '',
    type: '',
    speed: '',
    latency: '',
    voltage: '',
    ecc: '',
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
      await axios.post('http://127.0.0.1:3300/api/v1/ram', formData);
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        setSuccess(false);
        navigate('/rams');
      }, 5000);
      setFormData({
        brand: '',
        model: '',
        capacity: '',
        type: '',
        speed: '',
        latency: '',
        voltage: '',
        ecc: '',
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
            RAM creada exitosamente
          </Alert>
        </Stack>
      )}
      {error && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error" variant="filled">
            Error al crear la RAM
          </Alert>
        </Stack>
      )}
      <Row>
        <Col xs={12} md={8} lg={6}>
          <Card className="carddddd">
            <Card.Header className="cardH text-white text-center py-3">
              <CDBIcon icon="memory" size="2x" className="text-white" />
            </Card.Header>
            <Card.Body className="p-4">
              <h2 className="fw-bold mb-2 text-uppercase text-center">
                Crear Nueva RAM
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
                      />
                    </Form.Group>
                    <Form.Group controlId="capacity" className="mb-3">
                      <Form.Label>Capacidad (GB)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Ingrese la capacidad"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="type" className="mb-3">
                      <Form.Label>Tipo</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el tipo de RAM"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="speed" className="mb-3">
                      <Form.Label>Velocidad (MHz)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Ingrese la velocidad"
                        name="speed"
                        value={formData.speed}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="latency" className="mb-3">
                      <Form.Label>Latencia</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese la latencia"
                        name="latency"
                        value={formData.latency}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="voltage" className="mb-3">
                      <Form.Label>Voltaje (V)</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.1"
                        placeholder="Ingrese el voltaje"
                        name="voltage"
                        value={formData.voltage}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="ecc" className="mb-3">
                      <Form.Label>ECC</Form.Label>
                      <Form.Select
                        name="ecc"
                        value={formData.ecc}
                        onChange={handleChange}
                      >
                        <option value="">Seleccione ECC</option>
                        <option value="true">Sí</option>
                        <option value="false">No</option>
                      </Form.Select>
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
                      <CDBIcon icon="plus" className="ms-1" />
                      Guardar RAM
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

export default CreateRAM;
