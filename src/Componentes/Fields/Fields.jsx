import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { BsPencilSquare } from 'react-icons/bs';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default function Field(props) {

  const renderTooltipEdit = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Asociar Medio
    </Tooltip>
  );

  return (

    <InputGroup className="mb-3">
      <Form.Control required type="text" value={props.value} />
      <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderTooltipEdit}>
        <Button variant="primary" ><BsPencilSquare /></Button>
      </OverlayTrigger>
    </InputGroup>

  );
}