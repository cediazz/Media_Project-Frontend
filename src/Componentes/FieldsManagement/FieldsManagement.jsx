import React from "react";
import { useState } from 'react';
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {BsFillSignIntersectionFill} from 'react-icons/bs';



export default function FieldsManagement() {
  const [validated, setValidated] = useState(false);
  const [categorySelected, setCategorySelected] = useState("Seleccionar la Categoría")

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
        <Form.Label>Seleccione la Categoría</Form.Label>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
            
            <Form.Select aria-label="Default select example" required onChange={e => setCategorySelected(e.target.value)}>
              <option selected disabled>Seleccionar la Categoría</option>
              <option >Categorias</option>
              <option >Two</option>
              <option >Three</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">Por favor seleccione la Categoría</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
           {categorySelected != "Seleccionar la Categoría" && <Button className="mb-3" type="submit" variant="outline-primary"><BsFillSignIntersectionFill /> Adicionar Campos</Button>}
          </Form.Group>
       </Row>
        <Row>
          
        </Row>
        
      </Form>
    </Container>
  );


}