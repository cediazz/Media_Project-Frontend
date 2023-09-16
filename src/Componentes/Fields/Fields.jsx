import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { BsPencilSquare } from 'react-icons/bs';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ModalLinkFieldMedia from '../Modal/ModalLinkField-Media';

export default function Field(props) {

  const [showModal, setShowModal] = useState(false)

  const renderTooltipEdit = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Asociar Medio
    </Tooltip>
  );

  return (
    <>
      <InputGroup className="mb-3">
        <Form.Control readOnly={true} type="text" value={props.value} />
        <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderTooltipEdit}>
          <Button variant="primary" onClick={() => setShowModal(true)} ><BsPencilSquare /></Button>
        </OverlayTrigger>
      </InputGroup>
      {showModal == true && <ModalLinkFieldMedia fieldID={props.idField}  setShowModal={setShowModal} />}
    </>


  );
}