import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import GridElement from "../../Aplication/Utils/GridElement";
import React from "react";
import { useState } from "react";

function AddComponent({ show, setShow, saveComponent }) {
  const [name, setName] = useState("");
  const [gwp, setGwp] = useState("");
  const [mw, setMw] = useState("");
  const [lhw, setlhw] = useState("");
  const [sc, setSc] = useState("");


  function handleSave() {
    const newComp = { key: name, data: { lhw: lhw, gwp: gwp, mw: mw, sc: sc } }
    console.log("New Component: ", newComp)
    saveComponent(newComp)
  }

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      backdrop="static"
      keyboard={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add a Component</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <GridElement rows={4} cols={4}>
          <GridElement rows={1} cols={4} ns>
            <h5>Extra Components</h5>
          </GridElement>
          <GridElement
            className="grid-cell-white justified"
            rows={1}
            cols={2}
            style={{ border: "none" }}
          >
            <span>chemical symbol:</span>
            <input
              value={name}
              type="text"
              onChange={(event) => setName(event.target.value)}
              name="AC1"
              placeholder="component name"
            />
          </GridElement>
          <GridElement
            className="grid-cell-white justified"
            rows={1}
            cols={2}
            style={{ border: "none" }}
          >
            <span>Gwp:</span>
            <input
              value={gwp}
              type="number"
              onChange={(event) => setGwp(event.target.value)}
              name="AC1"
              placeholder="GWP value"
            />
          </GridElement>
          <GridElement
            className="grid-cell-white justified"
            rows={1}
            cols={2}
            style={{ border: "none" }}
          >
            <span>MW Value:</span>
            <input
              value={mw}
              type="number"
              onChange={(event) => setMw(event.target.value)}
              name="MW"
              placeholder="Molecular weight"
            />
          </GridElement>
          <GridElement
            className="grid-cell-white justified"
            rows={1}
            cols={2}
            style={{ border: "none" }}
          >
            <span>LHW Value:</span>
            <input
              value={lhw}
              type="number"
              onChange={(event) => setlhw(event.target.value)}
              name="AC1"
              placeholder="Lower Heating weight value"
            />
          </GridElement>
          <GridElement
            className="grid-cell-white justified"
            rows={1}
            cols={2}
            style={{ border: "none" }}
          >
            <span>SC Value:</span>
            <input
              value={sc}
              type="number"
              onChange={(event) => setSc(event.target.value)}
              name="AC1"
              placeholder="Stoichiometric coefficient"
            />
          </GridElement>
          <GridElement
            rows={1}
            cols={2}
            ns
            style={{ justifyContent: "center" }}
          ></GridElement>
        </GridElement>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => handleSave()}
        >
          Save
        </Button>   
      </Modal.Footer>
    </Modal>
  );
}

export default AddComponent;
