import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import {BsFillTrashFill} from 'react-icons/bs';

export default function Field () {
  return (
    <>
       <InputGroup className="mb-3">
        <Form.Control
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <Button variant="outline-danger"><BsFillTrashFill /> Eliminar</Button>
      </InputGroup>
    </>
  );
}