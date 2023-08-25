import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import {BsFillTrashFill} from 'react-icons/bs';

export default function Field (props) {
  return (
    
       <InputGroup className="mb-3">
        <Form.Control  required type="text"/>
        <Button variant="outline-danger" onClick={() => props.deleteField(props.index)}><BsFillTrashFill /> Eliminar</Button>
      </InputGroup>
    
  );
}