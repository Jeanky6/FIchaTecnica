import React, { useState, useEffect } from 'react';
import axios from 'axios';
import URL from '../../constants/api';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { CDBBtn, CDBIcon } from 'cdbreact';
import { Alert, Stack } from '@mui/material';
import '../computadores/computadores.css';

const EditComputador = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    updateSource: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get(`${URL.API}/api/v1/computador/${id}`)
      .then(response => {
        setFormData(response.data.computer);
      })
      .catch(error => {
        console.error('Error al obtener los detalles del computador:', error);
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
      await axios.put(`${URL.API}/api/v1/computador/${id}`, formData);
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        setSuccess(false);
        navigate(`/computadores/${id}`);
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
            Computador actualizado exitosamente
          </Alert>
        </Stack>
      )}
      {error && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error" variant="filled">
            Error al actualizar el computador
          </Alert>
        </Stack>
      )}
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="carddddd">
            <Card.Header className="cardH text-white text-center py-3">
              <CDBIcon icon="edit" size="2x" className="text-white" />
            </Card.Header>
            <Card.Body className="p-4">
              <h2 className="fw-bold mb-2 text-uppercase text-center">
                Editar Registro de Computadora
              </h2>
              <p className="text-dark-50 mb-4 text-center">
                Actualice los detalles a continuación para editar la computadora.
              </p>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="name" className="mb-3">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre de la computadora"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="location" className="mb-3">
                      <Form.Label>Ubicación</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese la ubicación"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="computerType" className="mb-3">
                      <Form.Label>Tipo de Computadora</Form.Label>
                      <Form.Control
                        as="select"
                        name="computerType"
                        value={formData.computerType}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Seleccione tipo
                        </option>
                        <option value="desktop">Escritorio</option>
                        <option value="laptop">Portátil</option>
                        <option value="server">Servidor</option>
                        <option value="other">Otro</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="manufacturer" className="mb-3">
                      <Form.Label>Fabricante</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el fabricante"
                        name="manufacturer"
                        value={formData.manufacturer}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="technicianInCharge" className="mb-3">
                      <Form.Label>Técnico a Cargo</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre del técnico"
                        name="technicianInCharge"
                        value={formData.technicianInCharge}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="groupInCharge" className="mb-3">
                      <Form.Label>Grupo a Cargo</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre del grupo"
                        name="groupInCharge"
                        value={formData.groupInCharge}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="alternateUsernameNumber" className="mb-3">
                      <Form.Label>Número de Usuario Alternativo</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el número de usuario alternativo"
                        name="alternateUsernameNumber"
                        value={formData.alternateUsernameNumber}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="serialNumber" className="mb-3">
                      <Form.Label>Número de Serie</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el número de serie"
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
                      <Form.Label>Usuario Alternativo</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el usuario alternativo"
                        name="alternateUsername"
                        value={formData.alternateUsername}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="inventoryNumber" className="mb-3">
                      <Form.Label>Número de Inventario</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el número de inventario"
                        name="inventoryNumber"
                        value={formData.inventoryNumber}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="user" className="mb-3">
                      <Form.Label>Usuario</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre del usuario"
                        name="user"
                        value={formData.user}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="group" className="mb-3">
                      <Form.Label>Grupo</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre del grupo"
                        name="group"
                        value={formData.group}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="comments" className="mb-3">
                      <Form.Label>Comentarios</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Ingrese cualquier comentario adicional"
                        name="comments"
                        value={formData.comments}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="updateSource" className="mb-3">
                      <Form.Label>Fuente de Actualización</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese la fuente de actualización"
                        name="updateSource"
                        value={formData.updateSource}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="text-center mt-4">
                  <center>
                    <CDBBtn type="submit" className="Buttonn">
                      <CDBIcon icon="fa-solid fa-save" className="ms-1" />
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

export default EditComputador;
