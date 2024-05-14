import { Button } from "react-bootstrap";
import CustomGrid from "../../Utils/CustomGrid";
import GridElement from "../../Utils/GridElement";
import { useState, useEffect } from "react";
import { saveAs } from 'file-saver'

const License = () => {
  const [todo, settodo] = useState(null);
  const [remainingDays, setRemainingDays] = useState(0);

  useEffect(() => {
    const storedTodo = localStorage.getItem("licenseTodo");
    if (storedTodo) {
      settodo(JSON.parse(storedTodo));
    }
    const storedRemainingDays = localStorage.getItem("remainingDays");
    if (storedRemainingDays) {
      setRemainingDays(parseInt(storedRemainingDays));
    }

    const interval = setInterval(() => {
      updateRemainingDays();
    }, 24 * 60 * 60 * 1000); 

    return () => clearInterval(interval); 
  }, []);

  const updateRemainingDays = () => {
    if (remainingDays > 0) {
      setRemainingDays(prevDays => prevDays - 1);
      localStorage.setItem("remainingDays", remainingDays - 1);
    }
  };

  const fetchTodo = () => {
    fetch('/api/licence/generate')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        settodo(data);
        localStorage.setItem("licenseTodo", JSON.stringify(data));
        console.log(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  const createFile = () => {
    const texto = handleNewLicense();
    const licenseText = `Usuario: ${texto.Usuario}\nUUID: ${texto.UUID}\nFecha: ${texto.Fecha}\nactivado: ${texto.activado}`;
    const blob = new Blob([licenseText], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'license.txt');
  }

  const readFile = (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log("No file selected");
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onerror = () => {
      console.error(fileReader.error);
    };
    fileReader.onload = async () => {
      const fileContent = fileReader.result;
      sendFileContent(fileContent);
    };
  };

  const sendFileContent = async (fileContent) => {
    try {
      const response = await fetch('/api/licence/license', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ archivo: fileContent })
      });

      if (response.ok) {
        const responseData = await response.json();
        const remainingDays = responseData.numero;
        setRemainingDays(remainingDays);
        localStorage.setItem("remainingDays", remainingDays);
        console.log("Días restantes:", remainingDays);
      } else {
        console.error("Error al enviar el contenido del archivo:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
    localStorage.setItem("licenseTodo", JSON.stringify(newLicenseData));
    return (newLicenseData)
  };

  return (
    <CustomGrid cols={4} rows={10} className={"Overview-100"}>
      <GridElement
        cols={4}
        rows={1}
        className="grid-cell-white vert"
        style={{ alignContent: "center" }}
      >
        <h2>Licence manager</h2>
      </GridElement>
      <GridElement
        cols={4}
        rows={3}
        className="grid-cell-white vert"
        style={{ alignContent: "center" }}
      >
        <h2>Remaining days of license</h2>
        <h1>{remainingDays}</h1>
      </GridElement>
      <GridElement
        cols={2}
        rows={2}
        className="grid-cell-white vert"
        style={{ alignContent: "center" }}
      >
        <h5>New License</h5>
        <Button onClick={createFile}>Offline</Button>
        
        <Button onClick={createFile}>Online</Button>
      </GridElement>
      <GridElement
        cols={2}
        rows={2}
        className="grid-cell-white vert"
        style={{ alignContent: "center" }}
      >
        <h5>Read License</h5>
        <input
          type="file"
          multiple={false}
          onChange={readFile}
        />
      </GridElement>
    </CustomGrid>
  );
};

export default License
