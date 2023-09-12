import React from "react";
import { useState, useEffect } from 'react';
import Loading from "../Loading/Loading";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { BsFillSignIntersectionFill } from 'react-icons/bs';
import Alert from '../Alert/Alert'
import Field from "../Fields/Fields";
import getAllMedias from "./getAllMedias";
import InsertField from "./insertField";


export default function FieldsManagement() {
  const [validated, setValidated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [mediaSelected, setMediaSelected] = useState("Seleccione el Medio")
  const [medias, setMedias] = useState([])
  const [nameField, setNameField] = useState()
  const [valueField, setValueField] = useState()
  const [message, setMessage] = useState()
  const [error, setError] = useState(false)

  useEffect(() => {

    const Medias = async () => {
      setLoading(true)
      let data = await getAllMedias()
      setMedias(data)
      setLoading(false)
    }
    Medias()

  }, [])


  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    }
    else {
      setLoading(true)
      let dataForm = {
        field: { name: nameField, value: valueField },
        media: mediaSelected
      }
      setMessage()
      let data = await InsertField(dataForm)
      if (data != 'fail') {
        setMessage("Campo Insertado")

      }
      setLoading(false)
    }


  };

  /*const deleteField = (index) => {
    //console.log(fields.length)
    //console.log(index)

    const newFields = [...fields]
    newFields.splice(index, 1)
    setFields(newFields)
    console.log(newFields.length)
    console.log(newFields)


  };*/





  return (

    <Container className="border mt-5">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3 mt-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Seleccione el Medio</Form.Label>
            <Form.Select required onChange={e => setMediaSelected(e.target.value)}>
              <option selected disabled value="">Seleccione el Medio</option>
              {medias.map((medias) => <option value={medias.id}>{medias.description}</option>)}
            </Form.Select>
            <Form.Control.Feedback type="invalid">Por favor seleccione la Categoría</Form.Control.Feedback>
          </Form.Group>

          {mediaSelected != "Seleccione el Medio" &&
            <>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Nombre del Campo</Form.Label>
                <Form.Control type="text" required onChange={e => setNameField(e.target.value)} />
                <Form.Control.Feedback type="invalid">Por favor introduzca el nombre</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom03">
                <Form.Label>Valor del Campo</Form.Label>
                <Form.Control type="text" required onChange={e => setValueField(e.target.value)} />
                <Form.Control.Feedback type="invalid">Por favor introduzca el valor</Form.Control.Feedback>
              </Form.Group>
            </>
          }

        </Row>
        <Row>
          <Col md="4"></Col><Col md="4"><Button variant="primary" type="submit" ><BsFillSignIntersectionFill /> Agregar Campo</Button></Col><Col md="4"></Col>
        </Row>

      </Form>
      <Row className="mt-3">
        <div style={{ textAlign: "center" }}>
          {loading && <Loading />}
        </div>
      </Row>
      {message && <Alert message={message} error={error}></Alert>}
    </Container>




  );


}