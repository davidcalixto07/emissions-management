import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import GridElement from "../../Aplication/Utils/GridElement";
import React, { useEffect } from "react";
import { useState } from "react";

function MapComponent({ show, setShow, saveMapping }) {
  const [mappedComponents, setMappedComponents] = useState([]);
  const [gases, setGases] = useState([]);
  const [values, setValues] = useState([]);
  const data = {
    C1: "",
    C10: "",
    C2: "",
    C3: "",
    C4: "",
    C5: "",
    C6: "",
    C7: "",
    C8: "",
    C9: "",
    CO2: "",
    H2O: "",
    "I-C4": "",
    "I-C5": "",
    "N-C5": "",
    N2: "",
  };

  useEffect(() => {
    setGases(Object?.keys(data));
    setValues(Object?.values(data));
    console.log(values);
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setMappedComponents((prevState) => ({
      ...prevState,
      [name]: value,
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

            {gases.map((t, i) => (
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
                  type="text"
                  name={t}
                  onChange={handleChange}
                  placeholder={values[i]}
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
          onClick={() => {
            saveMapping(mappedComponents);
            setShow(false);
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MapComponent;
