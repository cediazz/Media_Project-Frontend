import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import fuga_ingresos from './fuga_ingresos.jpg'
import { Row } from 'react-bootstrap';
import { Container } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { BsFillSaveFill } from 'react-icons/bs';

function InsertMedia() {

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
            <Row>
                <img src={fuga_ingresos}></img>
            </Row>
            <Container className="border mt-5">
                <Form className='mt-3' noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Categoría</Form.Label>
                            <Form.Select aria-label="Default select example" required>
                                <option selected disabled value="">Seleccione la Categoría </option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Por favor seleccione la Categoría</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                            <Form.Label>Plano</Form.Label>
                            <Form.Select aria-label="Default select example" required>
                                <option selected disabled value="">Seleccione el Plano </option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Por favor seleccione el Mapa
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom03">
                            <Form.Label>Hereda</Form.Label>
                            <Form.Select aria-label="Default select example" required>
                                <option selected disabled value="">Seleccione la Herencia </option>
                                <option >Si</option>
                                <option >No</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Por favor seleccione la Herencia</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className='mt-3'>
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                required
                                type="text" />
                            <Form.Control.Feedback type="invalid">Por favor introduzca la Descripción</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Col md={4}></Col>
                        <Col md={4}><Button className="mb-3" type="submit" variant="outline-primary"><BsFillSaveFill /> Guardar</Button></Col>
                    </Row>
                </Form>
            </Container>

        </>
    );
}

export default InsertMedia;