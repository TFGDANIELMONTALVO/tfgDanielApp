import { Button, Modal } from "react-bootstrap";

export function ModalWindow({modalTitle}, {modalBody}, {saveText}) {
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalBody}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">{saveText}</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}
