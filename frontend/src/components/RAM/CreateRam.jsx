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
                Create New RAM
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
                      />
                    </Form.Group>
                    <Form.Group controlId="capacity" className="mb-3">
                      <Form.Label>Capacity (GB)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter capacity"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="type" className="mb-3">
                      <Form.Label>Type</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter RAM type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="speed" className="mb-3">
                      <Form.Label>Speed (MHz)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter speed"
                        name="speed"
                        value={formData.speed}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="latency" className="mb-3">
                      <Form.Label>Latency</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter latency"
                        name="latency"
                        value={formData.latency}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="voltage" className="mb-3">
                      <Form.Label>Voltage (V)</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.1"
                        placeholder="Enter voltage"
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
                        <option value="">Select ECC</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </Form.Select>
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
                  <center>
                    <CDBBtn type="submit" className="Buttonn">
                      <CDBIcon icon="plus" className="ms-1" />
                      Save RAM
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