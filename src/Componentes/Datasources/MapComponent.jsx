import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import GridElement from "../../Aplication/Utils/GridElement";
import React, { useEffect } from "react";
import { useState } from "react";

function MapComponent({ show, setShow, saveMapping, data }) {
  const mapComponents = {
    C1: "",
    C2: "",
    C3: "",
    C4: "",
    C5: "",
  };
  const [mappedComponents, setMappedComponents] = useState(mapComponents);
  const [gases, setGases] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
    setGases(Object.keys(data));
    setValues(Object.values(data));
  }, [data]);
  console.log(mappedComponents);
  const handleChange = (e) => {
    const { name, value } = e.target;

    const parsed_value = parseFloat(value);
    const newValue = isNaN(parsed_value) ? value : parsed_value;

    setMappedComponents((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      backdrop="static"
      keyboard={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Map your Components</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <GridElement rows={4} cols={4}>
            <GridElement rows={1} cols={4} ns>
              <h5>Map components</h5>
            </GridElement>

            {gases.map((t) => (
              <GridElement
                className="grid-cell-white justified"
                style={{
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span> {t} </span>
                <input
                  type="number"
                  name={t}
                  placeholder="Node/tag"
                  onChange={handleChange}
                />
                <br></br>
              </GridElement>
            ))}
          </GridElement>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => saveMapping(mappedComponents, setShow(false))}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MapComponent;
