import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { CDBBtn, CDBIcon } from 'cdbreact';
import { Alert, Stack } from '@mui/material';
import '../computadores/computadores.css';
import { useNavigate } from 'react-router-dom';

const CreateComputer = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    computerType: '',
    manufacturer: '',
    technicianInCharge: '',
    groupInCharge: '',
    alternateUsernameNumber: '',
    serialNumber: '',
    alternateUsername: '',
    inventoryNumber: '',
    user: '',
    group: '',
    comments: '',
    updateSource: '',
    cpu: '',
    gpu: '',
    ram: [],
    storage: [],
  });

  const [cpus, setCpus] = useState([]);
  const [gpus, setGpus] = useState([]);
  const [rams, setRams] = useState([]);
  const [storages, setStorages] = useState([]);
  const navigate= useNavigate();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const cpuResponse = await axios.get('http://127.0.0.1:3300/api/v1/cpu');
        setCpus(cpuResponse.data.cpus);

        const gpuResponse = await axios.get('http://127.0.0.1:3300/api/v1/gpu');
        setGpus(gpuResponse.data.gpus);

        const ramResponse = await axios.get('http://127.0.0.1:3300/api/v1/ram');
        setRams(ramResponse.data.rams);

        const storageResponse = await axios.get('http://127.0.0.1:3300/api/v1/storage');
        setStorages(storageResponse.data.storages);
      } catch (error) {
        console.error('Error fetching components:', error);
      }
    };

    fetchComponents();
  }, []);

  const handleChange = (e) => {
    const { name, value, options } = e.target;
    if (name === 'ram' || name === 'storage') {
      const selectedValues = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);
      setFormData(prevState => ({
        ...prevState,
        [name]: selectedValues,
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:3300/api/v1/computador', formData);
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        setSuccess(false);
        navigate('/computadores');
      }, 5000);
      setFormData({
        name: '',
        location: '',
        computerType: '',
        manufacturer: '',
        technicianInCharge: '',
        groupInCharge: '',
        alternateUsernameNumber: '',
        serialNumber: '',
        alternateUsername: '',
        inventoryNumber: '',
        user: '',
        group: '',
        comments: '',
        updateSource: '',
        cpu: '',
        gpu: '',
        ram: [],
        storage: [],
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
          <Alert severity="success" variant="filled" style={{backgroundColor:"#39a900"}}>
            Computador creado exitosamente
          </Alert>
        </Stack>
      )}
      {error && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error" variant="filled">
            Error al crear el computador
          </Alert>
        </Stack>
      )}
      <Row>
        <Col xs={12} md={8} lg={6}>
          <Card className="carddddd">
            <Card.Header className="cardH text-white text-center py-3">
              <CDBIcon icon="plus-circle" size="2x" className="text-white" />
            </Card.Header>
            <Card.Body className="p-4">
              <h2 className="fw-bold mb-2 text-uppercase text-center">
                Create New Computer Record
              </h2>
              <p className="text-dark-50 mb-4 text-center">
                Fill out the details below to add a new computer.
              </p>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="name" className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter computer name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="location" className="mb-3">
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="computerType" className="mb-3">
                      <Form.Label>Computer Type</Form.Label>
                      <Form.Control
                        as="select"
                        name="computerType"
                        value={formData.computerType}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Select type
                        </option>
                        <option value="desktop">Desktop</option>
                        <option value="laptop">Laptop</option>
                        <option value="server">Server</option>
                        <option value="other">Other</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="manufacturer" className="mb-3">
                      <Form.Label>Manufacturer</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter manufacturer"
                        name="manufacturer"
                        value={formData.manufacturer}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="technicianInCharge" className="mb-3">
                      <Form.Label>Technician In Charge</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter technician name"
                        name="technicianInCharge"
                        value={formData.technicianInCharge}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="groupInCharge" className="mb-3">
                      <Form.Label>Group In Charge</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter group name"
                        name="groupInCharge"
                        value={formData.groupInCharge}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="alternateUsernameNumber" className="mb-3">
                      <Form.Label>Alternate Username Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter alternate username number"
                        name="alternateUsernameNumber"
                        value={formData.alternateUsernameNumber}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="serialNumber" className="mb-3">
                      <Form.Label>Serial Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter serial number"
                        name="serialNumber"
                        value={formData.serialNumber}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <Form.Group controlId="alternateUsername" className="mb-3">
                      <Form.Label>Alternate Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter alternate username"
                        name="alternateUsername"
                        value={formData.alternateUsername}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="inventoryNumber" className="mb-3">
                      <Form.Label>Inventory Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter inventory number"
                        name="inventoryNumber"
                        value={formData.inventoryNumber}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="user" className="mb-3">
                      <Form.Label>User</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter user name"
                        name="user"
                        value={formData.user}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="group" className="mb-3">
                      <Form.Label>Group</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter group name"
                        name="group"
                        value={formData.group}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="comments" className="mb-3">
                      <Form.Label>Comments</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Enter any additional comments"
                        name="comments"
                        value={formData.comments}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="updateSource" className="mb-3">
                      <Form.Label>Update Source</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter update source"
                        name="updateSource"
                        value={formData.updateSource}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="cpu" className="mb-3">
                      <Form.Label>CPU</Form.Label>
                      <Form.Control
                        as="select"
                        name="cpu"
                        value={formData.cpu}
                        onChange={handleChange}
                      >
                        <option value="">Select CPU</option>
                        {cpus.map(cpu => (
                          <option key={cpu._id} value={cpu._id}>
                            {cpu.brand} {cpu.model}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="gpu" className="mb-3">
                      <Form.Label>GPU</Form.Label>
                      <Form.Control
                        as="select"
                        name="gpu"
                        value={formData.gpu}
                        onChange={handleChange}
                      >
                        <option value="">Select GPU</option>
                        {gpus.map(gpu => (
                          <option key={gpu._id} value={gpu._id}>
                            {gpu.brand} {gpu.model}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="ram" className="mb-3">
                      <Form.Label>RAM (Hold Ctrl/Cmd to select multiple)</Form.Label>
                      <Form.Control
                        as="select"
                        multiple
                        name="ram"
                        value={formData.ram}
                        onChange={handleChange}
                      >
                        {rams.map(ram => (
                          <option key={ram._id} value={ram._id}>
                            {ram.brand} {ram.model} {ram.capacity}GB
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="storage" className="mb-3">
                      <Form.Label>Storage (Hold Ctrl/Cmd to select multiple)</Form.Label>
                      <Form.Control
                        as="select"
                        multiple
                        name="storage"
                        value={formData.storage}
                        onChange={handleChange}
                      >
                        {storages.map(storage => (
                          <option key={storage._id} value={storage._id}>
                            {storage.brand} {storage.model} {storage.capacity}GB
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <div className="text-center mt-4">
                  <center>
                    <CDBBtn type="submit" className="Buttonn">
                      <CDBIcon icon="fa-solid fa-plus" className="ms-1" />
                      Save Record
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

export default CreateComputer;