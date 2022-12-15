import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function ModalWindow({show, handleClose, modalTitle, modalText, modalConfirmation, onClickModalWindow}) {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalText}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="danger" onClick={onClickModalWindow}>{modalConfirmation}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}