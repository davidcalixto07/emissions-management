import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";

function PopupDeleteDp({ show, setShow, confirmDelete, noDelete, dp }) {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      backdrop="static"
      keyboard={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add a datapoint</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Do you wish to delete datasource with Tag: {dp?.tag ?? ""}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => confirmDelete(dp)}>
          Yes
        </Button>
        <Button variant="primary" onClick={() => noDelete(dp)}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PopupDeleteDp;
