import React from "react";
import { useState } from 'react';
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import {BsFillSignIntersectionFill} from 'react-icons/bs';
import {BsSearch} from 'react-icons/bs';

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
        <Row className="mb-3 mt-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              required
              type="text"/>
            <Form.Control.Feedback type="invalid">Por favor introduzca la Descripción</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Categoría</Form.Label>
            <Form.Select aria-label="Default select example" required>
              <option selected disabled value="">Seleccione la Categoría </option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">Por favor seleccione la Categoría</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>Mapa</Form.Label>
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
        </Row>
        <Row>
          <Col sm={3}><Button className="mb-3" type="submit" variant="outline-primary"><BsFillSignIntersectionFill /> Agregar Medio</Button></Col>
          <Col sm={9}><Button className="mb-3" type="submit" variant="outline-primary"><BsSearch /> Buscar Medio</Button></Col>
        </Row>
        
      </Form>
    </Container>
  );


}