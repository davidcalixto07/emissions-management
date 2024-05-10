import { Button } from "react-bootstrap";
import CustomGrid from "../../Utils/CustomGrid";
import GridElement from "../../Utils/GridElement";
import { useState } from "react";
import {saveAs} from 'file-saver'
const License = () => {
  const [todo, settodo] = useState(null);

  const fetchTodo = () => {
    fetch('/apip')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        settodo(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };
  const createFile=()=>{
    const texto=handleNewLicense()
    const licenseText = `Usuario: ${texto.Usuario}\nUUID: ${texto.UUID}\nFecha: ${texto.Fecha}\nActivado: ${texto.activado}`;
    const blob = new Blob([licenseText], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'license.txt');
  }
  const handleNewLicense = () => {
    fetchTodo();
    const newLicenseData = {
      Usuario: "david",
      UUID: todo?.uuid, 
      Fecha: new Date().toISOString().split('T')[0],
      activado: false
    };
    console.log("New License Data:", newLicenseData); 
    settodo(newLicenseData);
    return(newLicenseData)
  };
  const handleRenew = () => {
    // Lógica para renovar la licencia
    console.log("Renewing license...");
  };

  const handleOnline = () => {
    // Lógica para operación en línea
    console.log("Online operation...");
  };

  const handleOffline = () => {
    // Lógica para operación fuera de línea
    console.log("Offline operation...");
  };

  return (
    <CustomGrid cols={4} rows={10} className={"Overview-100"}>
      <GridElement
        cols={4}
        rows={1}
        className="grid-cell-white vert"
        style={{ alignContent: "center" }}
      >
        <h2> </h2>
      </GridElement>
      <GridElement
        cols={4}
        rows={3}
        className="grid-cell-white vert"
        style={{ alignContent: "center" }}
      >
        <h2>Remaining days of license</h2>
        {todo && (
          <h1>{todo.UUID}</h1>
        )}
      </GridElement>
      <GridElement
        cols={2}
        rows={2}
        className="grid-cell-white vert"
        style={{ alignContent: "center" }}
      >
            <h5>New License</h5>
            <Button onClick={handleNewLicense}>Offline</Button>
            <Button onClick={createFile}>Online</Button>
        </GridElement>
        <GridElement
        cols={2}
        rows={2}
        className="grid-cell-white vert"
        style={{ alignContent: "center" }}
        >
          <h5>Read License</h5>
          <Button onClick={handleNewLicense}>Offline</Button>
          <Button onClick={createFile}>Online</Button>
        </GridElement>

    </CustomGrid>
  );
};

export default License;
