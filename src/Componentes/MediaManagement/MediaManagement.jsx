import React from "react";
import { useState } from 'react';
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom'
import { BsFillSignIntersectionFill } from 'react-icons/bs';


export default function Media() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Container className="border mt-5">
     <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mt-3">
          <Col md={3}><Form.Label>Descripción</Form.Label></Col>
          <Col md={3}><Form.Label>Categoría</Form.Label></Col>
          <Col md={3}> <Form.Label>Mapa</Form.Label></Col>
        </Row>
        <Row >
          <Form.Group as={Col} md="3" controlId="validationCustom01">
            <Form.Control
              required
              type="text" />
            <Form.Control.Feedback type="invalid">Por favor introduzca la Descripción</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom02">
            <Form.Select aria-label="Default select example" required>
              <option selected disabled value="">Seleccione la Categoría </option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">Por favor seleccione la Categoría</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom03">

            <Form.Select aria-label="Default select example" required>
              <option selected disabled value="">Seleccione el Mapa </option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Por favor seleccione el Mapa
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom03">

            <Button className="mb-3" type="submit" variant="outline-primary"><BsSearch /> Buscar Medio</Button>
          </Form.Group>
        </Row>
      </Form>
      <Row className="mt-3 mb-3">
       <Col sm={3}></Col>
       <Col sm={3}><Link to="/insertar-medio" className="link-dark rounded" style={{textDecoration:"none"}}><Button variant="primary" ><BsFillSignIntersectionFill /> Agregar Medio</Button></Link></Col>
      </Row>
    </Container>
  );


}