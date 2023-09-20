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
import InsertMedias from './insertMedia';
import { useNavigate } from 'react-router-dom';
import getAllMedias from '../FieldsManagement/getAllMedias';
import getAllMediaFields from '../Plan/getAllMediaFields';

function InsertMedia() {

    const [validated, setValidated] = useState(false)
    const [loading, setLoading] = useState(false)
    const [plan, setPlan] = useState()
    const [plans, setPlans] = useState([])
    const [planSelected, setPlanSelected] = useState("Seleccione el Plano")
    const [category, setCategory] = useState()
    const [categorys, setCategorys] = useState([])
    const [categorySelected, setCategorySelected] = useState("Seleccione la Categoría")
    const [coordinadas, setCoordinadas] = useState()
    const [description, setDescription] = useState()
    const [medias, setMedias] = useState([])
    const [mediaFatherID, setMediaFatherID] = useState()
    const [planFather, setPlanFather] = useState()
    const [message, setMessage] = useState()
    const [error, setError] = useState(false)
    const navigate = useNavigate();



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
        setMessage()
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        }
        else if (coordinadas == undefined) {
            setMessage("Seleccione las coordenadas en el mapa")
            setError(true)
        }
        else {
            setLoading(true)
            setMessage()
            setError(false)
            let dataForm = {
                coordinadas: { lat: coordinadas.lat, lng: coordinadas.lng },
                description: description,
                category: categorySelected,
                plan: planSelected
            }

            let data = await InsertMedias(dataForm)
            if (data != 'fail') {
                setMessage("Medio Insertado")

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
        setPlanFather()
        setLoading(false)
    }

    const getCategory = async (value) => {
        setLoading(true)
        setCategorySelected(value)
        let data = await getCategorys(value)
        setCategory(data)
        setLoading(false)
    }

    const getMediaFather = async (value) => {
        setLoading(true)
        let data = await getAllMediaFields(value)
        setMediaFatherID(data[0].id)
        setPlanSelected(data[0].plan.id)
        if (data[0].coordinadas)
        setCoordinadas({lat:data[0].coordinadas.lat , lng:data[0].coordinadas.lng})
        setPlanFather(data[0].plan)
        setPlan()
        setLoading(false)
    }



    return (
        <>
            <Container className="border mt-5">
                <Row>
                    {plan != undefined ? <Map image={plan.image} setCoordinadas={setCoordinadas} />
                    : planFather && <Map image={planFather.image} setCoordinadas={setCoordinadas} coordinadas={coordinadas}/>}
                </Row>

                <Form className='mt-3' noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Categoría</Form.Label>
                            <Form.Select required onChange={e => getCategory(e.target.value)}>
                                <option selected disabled value="">Seleccione la Categoría</option>
                                {categorys.map((category) => <option value={category.id}>{category.description}</option>)}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Por favor seleccione la Categoría</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                            <Form.Label>Plano</Form.Label>
                            <Form.Select required onChange={e => getPlan(e.target.value)} >
                                <option selected disabled value="">Seleccione el Plano</option>
                                {plans.map((plan) => <option value={plan.id}>{plan.description}</option>)}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Por favor seleccione el Mapa
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom03">
                            <Form.Label>Hereda(Opcional)</Form.Label>
                            <Form.Select onChange={e => getMediaFather(e.target.value)} >
                                <option selected disabled value="">No</option>
                                {medias.map((medias) => <option value={medias.description}>{medias.description}</option>)}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Por favor seleccione la Herencia</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className='mt-3'>
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control required type="text" onChange={e => setDescription(e.target.value)} />
                            <Form.Control.Feedback type="invalid">Por favor introduzca la Descripción</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Adicionarle un Medio(Opcional)</Form.Label>
                            <Form.Select aria-label="Default select example" >
                                <option selected disabled value="">Seleccione el Medio </option>
                                {medias.map((medias) => <option value={medias.id}>{medias.description}</option>)}
                            </Form.Select>
                        </Form.Group>

                    </Row>
                    <Row className='mt-5'>
                        <Col md={4}></Col>
                        <Col md={4}>
                        <div className="d-grid gap-2">
                            <Button className="mb-3"  variant="info"> Adicionar Medio</Button>
                        </div>
                        </Col>
                        <Col md={4}></Col>

                    </Row>
                    <Row className='mt-5'>
                       
                        <Col md={6}>
                            <div className="d-grid gap-2">
                                <Button className="mb-3" onClick={()=> navigate("/gestionar-medios")} variant="danger">Cancelar</Button>
                            </div>
                        </Col>

                        <Col md={6}>
                            <div className="d-grid gap-2">
                                <Button className="mb-3" type="submit" variant="primary"><BsFillSaveFill /> Guardar</Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
                <Row className="mt-3" >
                    <div style={{ textAlign: "center" }}>
                        {loading && <Loading />}
                    </div>

                </Row>
                {message && <Alert message={message} error={error}></Alert>}
                {planSelected && planSelected}
                {coordinadas && coordinadas.lat}
            </Container>

        </>
    );
}

export default InsertMedia;