import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { CDBBtn, CDBIcon } from 'cdbreact';
import { Alert, Stack } from '@mui/material';
import '../computadores/computadores.css';

const EditRAM = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    capacity: '',
    type: '',
    speed: '',
    latency: '',
    voltage: '',
    ecc: false,
    releaseDate: '',
    price: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get(`http://127.0.0.1:3300/api/v1/ram/${id}`)
      .then(response => {
        setFormData(response.data.ram);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los detalles de la RAM:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:3300/api/v1/ram/${id}`, formData);
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        setSuccess(false);
        navigate(`/rams/${id}`);
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
            RAM actualizada exitosamente
          </Alert>
        </Stack>
      )}
      {error && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error" variant="filled">
            Error al actualizar la RAM
          </Alert>
        </Stack>
      )}
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="carddddd">
            <Card.Header className="cardH text-white text-center py-3">
              <CDBIcon icon="memory" size="2x" className="text-white" />
            </Card.Header>
            <Card.Body className="p-4">
              <h2 className="fw-bold mb-2 text-uppercase text-center">
                Edit RAM Record
              </h2>
              <p className="text-dark-50 mb-4 text-center">
                Update the details below to edit the RAM.
              </p>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="brand" className="mb-3">
                      <Form.Label>Brand</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter RAM brand"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="model" className="mb-3">
                      <Form.Label>Model</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter RAM model"
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
                        placeholder="Enter RAM speed"
                        name="speed"
                        value={formData.speed}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="latency" className="mb-3">
                      <Form.Label>Latency (CL)</Form.Label>
                      <Form.Control
                        type="number"
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
                      <Form.Check 
                        type="checkbox"
                        label="ECC"
                        name="ecc"
                        checked={formData.ecc}
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
                      <CDBIcon icon="save" className="ms-1" />
                      Save Changes
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

export default EditRAM;