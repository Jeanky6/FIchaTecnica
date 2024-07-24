import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { CDBBtn, CDBIcon } from 'cdbreact';
import { Alert, Stack } from '@mui/material';
import '../computadores/computadores.css';
import { useNavigate } from 'react-router-dom';

const CreateGPU = () => {
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
      await axios.post('http://127.0.0.1:3300/api/v1/gpu', formData);
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        setSuccess(false);
        navigate('/gpus');
      }, 5000);
      setFormData({
        brand: '',
        model: '',
        memory: '',
        memoryType: '',
        coreClock: '',
        boostClock: '',
        cudaCores: '',
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
            GPU creado exitosamente
          </Alert>
        </Stack>
      )}
      {error && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error" variant="filled">
            Error al crear el GPU
          </Alert>
        </Stack>
      )}
      <Row>
        <Col xs={12} md={8} lg={6}>
          <Card className="carddddd">
            <Card.Header className="cardH text-white text-center py-3">
              <CDBIcon icon="video" size="2x" className="text-white" />
            </Card.Header>
            <Card.Body className="p-4">
              <h2 className="fw-bold mb-2 text-uppercase text-center">
                Create New GPU
              </h2>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="brand" className="mb-3">
                      <Form.Label>Brand</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter brand"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="model" className="mb-3">
                      <Form.Label>Model</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter model"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="memory" className="mb-3">
                      <Form.Label>Memory (GB)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter memory size"
                        name="memory"
                        value={formData.memory}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="memoryType" className="mb-3">
                      <Form.Label>Memory Type</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter memory type"
                        name="memoryType"
                        value={formData.memoryType}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="coreClock" className="mb-3">
                      <Form.Label>Core Clock (MHz)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter core clock"
                        name="coreClock"
                        value={formData.coreClock}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="boostClock" className="mb-3">
                      <Form.Label>Boost Clock (MHz)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter boost clock"
                        name="boostClock"
                        value={formData.boostClock}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="cudaCores" className="mb-3">
                      <Form.Label>CUDA Cores</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter number of CUDA cores"
                        name="cudaCores"
                        value={formData.cudaCores}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="tdp" className="mb-3">
                      <Form.Label>TDP (W)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter TDP"
                        name="tdp"
                        value={formData.tdp}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="releaseDate" className="mb-3">
                      <Form.Label>Release Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="releaseDate"
                        value={formData.releaseDate}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="price" className="mb-3">
                      <Form.Label>Price ($)</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.01"
                        placeholder="Enter price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="text-center mt-4">
                  <CDBBtn type="submit" className="Buttonn">
                    <CDBIcon icon="plus" className="ms-1" /> Add GPU
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

export default CreateGPU;