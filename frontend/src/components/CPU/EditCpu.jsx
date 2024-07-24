import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { CDBBtn, CDBIcon } from 'cdbreact';
import { Alert, Stack } from '@mui/material';
import '../computadores/computadores.css';

const EditCPU = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    price: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get(`http://127.0.0.1:3300/api/v1/cpu/${id}`)
      .then(response => {
        setFormData(response.data.cpu);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los detalles del CPU:', error);
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
      await axios.put(`http://127.0.0.1:3300/api/v1/cpu/${id}`, formData);
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        setSuccess(false);
        navigate(`/cpus/${id}`);
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
            CPU actualizado exitosamente
          </Alert>
        </Stack>
      )}
      {error && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error" variant="filled">
            Error al actualizar el CPU
          </Alert>
        </Stack>
      )}
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="carddddd">
            <Card.Header className="cardH text-white text-center py-3">
              <CDBIcon icon="microchip" size="2x" className="text-white" />
            </Card.Header>
            <Card.Body className="p-4">
              <h2 className="fw-bold mb-2 text-uppercase text-center">
                Edit CPU Record
              </h2>
              <p className="text-dark-50 mb-4 text-center">
                Update the details below to edit the CPU.
              </p>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="brand" className="mb-3">
                      <Form.Label>Brand</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter CPU brand"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="model" className="mb-3">
                      <Form.Label>Model</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter CPU model"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="cores" className="mb-3">
                      <Form.Label>Cores</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter number of cores"
                        name="cores"
                        value={formData.cores}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="threads" className="mb-3">
                      <Form.Label>Threads</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter number of threads"
                        name="threads"
                        value={formData.threads}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="baseClockSpeed" className="mb-3">
                      <Form.Label>Base Clock Speed (GHz)</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.1"
                        placeholder="Enter base clock speed"
                        name="baseClockSpeed"
                        value={formData.baseClockSpeed}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="turboClockSpeed" className="mb-3">
                      <Form.Label>Turbo Clock Speed (GHz)</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.1"
                        placeholder="Enter turbo clock speed"
                        name="turboClockSpeed"
                        value={formData.turboClockSpeed}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="socket" className="mb-3">
                      <Form.Label>Socket</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter CPU socket"
                        name="socket"
                        value={formData.socket}
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

export default EditCPU;