import React from "react";
import { useState } from 'react';
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {BsFillSignIntersectionFill} from 'react-icons/bs';
import {BsFillTrashFill} from 'react-icons/bs';


export default function Category() {
  const [validated, setValidated] = useState(false);
  const [categorySelected, setCategorySelected] = useState("Agregar Categoría")

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
        <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Seleccionar o Agregar Categoría</Form.Label>
            <Form.Select aria-label="Default select example" required onChange={e => setCategorySelected(e.target.value)}>
              <option selected >Agregar Categoría</option>
              <option >One</option>
              <option >Two</option>
              <option >Three</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">Por favor seleccione la Categoría</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              required
              type="text"/>
            <Form.Control.Feedback type="invalid">Por favor introduzca la Categoría</Form.Control.Feedback>
          </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>Seleccionar Imagen</Form.Label>
            <Form.Control
              required
              type="file"/>
            <Form.Control.Feedback type="invalid">
              Por favor seleccione la imagen
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Col sm={3}><Button className="mb-3" type="submit" variant="outline-primary"><BsFillSignIntersectionFill /> Guardar</Button></Col>
          {categorySelected != "Agregar Categoría" &&
           <Col sm={9}><Button className="mb-3" type="submit" variant="outline-danger"><BsFillTrashFill /> Eliminar</Button></Col>
          }        
        </Row>
        
      </Form>
    </Container>
  );


}