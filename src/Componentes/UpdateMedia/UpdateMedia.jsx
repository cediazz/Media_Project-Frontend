import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Row } from 'react-bootstrap';
import { Container } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { BsFillSaveFill } from 'react-icons/bs';
import { BsFillSignIntersectionFill } from 'react-icons/bs';
import Loading from "../Loading/Loading";
import Alert from '../Alert/Alert'
import getPlans from "../PlanManagement/getPlans";
import getCategorys from "../CategoryManagement/getCategorys";
import Map from '../Map/Map'
import { useLocation } from 'react-router-dom';
import getMediaFields from './getMediaFields';
import Field from '../Fields/Fields';
import UpdateMedias from './updateMedia';

function UpdateMedia() {

    const [validated, setValidated] = useState(false)
    const [loading, setLoading] = useState(false)
    const [plan, setPlan] = useState()
    const [plans, setPlans] = useState([])
    const [category, setCategory] = useState()
    const [categorys, setCategorys] = useState([])
    const [message, setMessage] = useState()
    const [error, setError] = useState(false)
    const location = useLocation();
    const [mediaData, setMediaData] = useState(location.state || {})
    const [mediaFields, setMediaFields] = useState([])
    const [planSelected, setPlanSelected] = useState(mediaData.planID)
    const [categorySelected, setCategorySelected] = useState(mediaData.catID)
    const [description, setDescription] = useState(mediaData.description)
    const [coordinadas, setCoordinadas] = useState(mediaData.coordinadas)


    useEffect(() => {
        const Plans = async () => {
            setLoading(true)
            let data = await getPlans()
            setPlans(data)
            setLoading(false)

        }
        Plans()
        const Categorys = async () => {
            setLoading(true)
            let data = await getCategorys()
            setCategorys(data)
            setLoading(false)

        }
        Categorys()

        const getMedia = async () => {
            setLoading(true)
            let data = await getMediaFields(mediaData.description)
            setMediaFields(data)
            setLoading(false)
        }
        getMedia()

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
                coordinadas: { lat: coordinadas.lat, lng: coordinadas.lng },
                description: description,
                category: categorySelected,
                plan: planSelected
            }
            console.log(dataForm)
            setMessage()
            let data = await UpdateMedias(dataForm, mediaData.id)
            if (data != 'fail') {
                setMessage("Medio Editado")

            } else {
                setMessage("El Medio que intenta insertar ya existe")
                setError(true)
            }
            setLoading(false)


        }
    }

    const getPlan = async (value) => {
        setLoading(true)
        setPlanSelected(value)
        let data = await getPlans(value)
        setPlan(data)
        setLoading(false)
    }

    const getCategory = async (value) => {
        setLoading(true)
        setCategorySelected(value)
        let data = await getCategorys(value)
        setCategory(data)
        setLoading(false)
    }



    return (
        <>
            <Container className="border mt-5">
                <Row>
                    {planSelected == mediaData.planID ?
                        <Map image={"http://127.0.0.1:8000" + mediaData.planImage} setCoordinadas={setCoordinadas} coordinadas={mediaData.coordinadas} />
                        : plan && <Map image={plan.image} setCoordinadas={setCoordinadas} />
                    }
                </Row>

                <Form className='mt-3' noValidate validated={validated} onSubmit={handleSubmit} >
                    <Row>
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Categoría</Form.Label>
                            <Form.Select required onChange={e => getCategory(e.target.value)}>
                                <option disabled value="">Seleccione la Categoría</option>
                                <option selected value={mediaData.catID}>{mediaData.catDescription}</option>
                                {categorys.map((category) => category.id != mediaData.catID && <option value={category.id} >{category.description}</option>)}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Por favor seleccione la Categoría</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                            <Form.Label>Plano</Form.Label>
                            <Form.Select required onChange={e => getPlan(e.target.value)} >
                                <option disabled value="">Seleccione el Plano</option>
                                <option selected value={mediaData.planID}>{mediaData.planDescription}</option>
                                {plans.map((plan) => plan.id != mediaData.planID && <option value={plan.id} >{plan.description}</option>)}
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
                            <Form.Control required type="text" defaultValue={mediaData.description} onChange={e => setDescription(e.target.value)} />
                            <Form.Control.Feedback type="invalid">Por favor introduzca la Descripción</Form.Control.Feedback>
                        </Form.Group>
                        {mediaFields.length != 0 && mediaFields.map((fields) =>
                            <Form.Group as={Col} md="4" controlId="validationCustom01">
                                <Form.Label>{fields.field.name}</Form.Label>
                                <Field value={fields.field.value} />
                            </Form.Group>
                        )
                        }
                    </Row>
                    <Row>
                        <Col md={4}></Col>
                        <Col md={4}><Button className="mb-3" type="submit" variant="outline-primary"><BsFillSaveFill /> Guardar</Button></Col>
                    </Row>
                </Form>
                <Row className="mt-3" >
                    <div style={{ textAlign: "center" }}>
                        {loading && <Loading />}
                    </div>
                </Row>
                {message && <Alert message={message} error={error}></Alert>}
            </Container>
        </>
    );
}

export default UpdateMedia;