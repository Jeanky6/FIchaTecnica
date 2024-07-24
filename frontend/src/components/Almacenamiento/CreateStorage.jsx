import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { CDBBtn, CDBIcon } from 'cdbreact';
import { Alert, Stack } from '@mui/material';
import '../computadores/computadores.css';
import { useNavigate } from 'react-router-dom';

const CreateStorage = () => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    capacity: '',
    type: '',
    formFactor: '',
    interface: '',
    readSpeed: '',
    writeSpeed: '',
    cache: '',
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
      await axios.post('http://127.0.0.1:3300/api/v1/storage', formData);
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        setSuccess(false);
        navigate('/storages');
      }, 5000);
      setFormData({
        brand: '',
        model: '',
        capacity: '',
        type: '',
        formFactor: '',
        interface: '',
        readSpeed: '',
        writeSpeed: '',
        cache: '',
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
            Storage creado exitosamente
          </Alert>
        </Stack>
      )}
      {error && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error" variant="filled">
            Error al crear el Storage
          </Alert>
        </Stack>
      )}
      <Row>
        <Col xs={12} md={8} lg={6}>
          <Card className="carddddd">
            <Card.Header className="cardH text-white text-center py-3">
              <CDBIcon icon="hdd" size="2x" className="text-white" />
            </Card.Header>
            <Card.Body className="p-4">
              <h2 className="fw-bold mb-2 text-uppercase text-center">
                Create New Storage
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
                        placeholder="Enter storage type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="formFactor" className="mb-3">
                      <Form.Label>Form Factor</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter form factor"
                        name="formFactor"
                        value={formData.formFactor}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="interface" className="mb-3">
                      <Form.Label>Interface</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter interface"
                        name="interface"
                        value={formData.interface}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="readSpeed" className="mb-3">
                      <Form.Label>Read Speed (MB/s)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter read speed"
                        name="readSpeed"
                        value={formData.readSpeed}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="writeSpeed" className="mb-3">
                      <Form.Label>Write Speed (MB/s)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter write speed"
                        name="writeSpeed"
                        value={formData.writeSpeed}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="cache" className="mb-3">
                      <Form.Label>Cache (MB)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter cache size"
                        name="cache"
                        value={formData.cache}
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
                  <center>
                    <CDBBtn type="submit" className="Buttonn">
                      <CDBIcon icon="plus" className="ms-1" />
                      Save Storage
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

export default CreateStorage;