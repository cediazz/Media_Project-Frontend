import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsFillSignIntersectionFill } from 'react-icons/bs';
import { Row } from 'react-bootstrap';
import { Container } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import {BsSearch } from 'react-icons/bs';
import InputGroup from 'react-bootstrap/InputGroup';

function LinkMedia() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
    <>
      <Button variant="outline-primary" onClick={() => setShow(true)} ><BsFillSignIntersectionFill /> Enlace a Medio</Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
       
      >
        <Modal.Header closeButton>
          <Modal.Title>Agregar enlace a Medio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container className="border">
          <Row className='mt-3'>
           <InputGroup className="mb-3">
            <Form.Control  required type="text"/>
            <Button variant="outline-primary" ><BsSearch /></Button>
           </InputGroup>
          </Row>
          <Row className='mb-3'>
          <Col md={6}><Button variant="danger">Quitar enlace </Button></Col>
            <Col md={6}><Button variant="primary">Aceptar</Button></Col>
          </Row>
          </Container>
         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          </Modal.Footer>
      </Modal>
    </>
  );
}

export default LinkMedia;