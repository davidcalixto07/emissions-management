import { useEffect, useState } from "react";
import CustomGrid from "../Utils/CustomGrid";
import AddComponent from "../../Componentes/Datasources/AddComponent";
import GridElement from "../Utils/GridElement";
import { ComponentSelector } from "./TeaViews/ComponentsSelector";
import { Button } from "react-bootstrap";
import axios from "axios";

const emptyForm = {
  flareId: "",
  flareType: "Flare Alta",
  tecnology: "",
  height: "",
  diameter: "",
  segment: "Exploración",
  instalationYear: "",
  estimatedHours: "",
  measureMethod: "Balance",
  measureType: "Coriolis",
  transmitterSerial: "",
  latitude: "-75.290777",
  longitude: "3.072371",
  wind: "",
  flareDiameter: "",
  defaultModel: "",
  MaxEfficiency: "",
  MinEfficiency: "",
  CombustionEfficiency: "",
  DestructionEfficiency: "",
};

const AppConfiguration = ({ assetData }) => {
  const [formData, setFormData] = useState(emptyForm);
  const [statusText, setStatusText] = useState("");
  const [extraComponent, setExtraComponent] = useState([]);
  const [showModalExtraComponent, setShowModalExtraComponent] = useState(false);
  const [optionValues, setOptionValues] = useState(assetData?.composition ?? []);
  const [selectedComponents, setSelectedComponents] = useState([]);

  console.log(assetData);

  useEffect(() => {
    setFormData(assetData?.data ?? emptyForm);
  }, [assetData]);

  const totalComposition = selectedComponents.reduce((total, key) => {
    if (
      optionValues[key] != null &&
      optionValues[key] !== "" &&
      !isNaN(optionValues[key])
    ) {
      return total + parseFloat(optionValues[key]);
    }
    return total;
  }, 0);

  const handleSelect = (selectedOptions) => {
    console.log("Selected options:", selectedOptions);
    setSelectedComponents(selectedOptions);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log(optionValues);
  console.log(selectedComponents);


  function ParseForm(obj) {
    for (const key in obj) {
      const floatValue = parseFloat(obj[key]);
      if (!isNaN(floatValue)) {
        obj[key] = floatValue;
      }
    }
    return obj;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filteredData = Object.keys(optionValues)
      .filter(key => selectedComponents.includes(key))
      .reduce((obj, key) => {
        obj[key] = optionValues[key];
        return obj;
      }, {});
    console.log(filteredData);

    formData.composition = filteredData;
    console.log(formData);
    const parsedData = ParseForm(formData);

    try {
      const response = await axios.post("/api/assets/CreateAsset", parsedData);
      console.log("Response:", response.data);
      setStatusText("Created");
      window.location.href = "/";
    } catch (error) {
      console.error("Error:", error);
    }
  };

  async function saveComponent(data) {
    console.log("Save Component", data);
    setShowModalExtraComponent(false);
    try {
      const response = await axios.post("/api/emissionsapi2-colwest2/v1/AddComponent", data);
      console.log("Response:", response.data);
      setStatusText("Created");
    } catch (error) {
      console.error("Error:", error);
    }
  }


  return (
    <form onSubmit={handleSubmit} href="/" className="fullSize">
      <CustomGrid
        cols={5}
        rows={11}
        className={"Overview-100"}
        style={{ justifyContent: "space-between" }}
      >
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span title="Campo Obligatorio"> Flare ID: * </span>
          <input
            type="text"
            name="flareId"
            placeholder="Tea001"
            value={formData.flareId}
            onChange={handleChange}
            required
          />
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Flare Type:</span>
          <select
            name="flareType"
            value={formData.flareType}
            onChange={handleChange}
          >
            <option value="Flare Alta">Flare Alta</option>
            <option value="Flare Baja">Flare Baja</option>
          </select>
        </GridElement>
        <GridElement className="grid-cell-white vert" cols={1} rows={10}>
          <h4 style={{ margin: "10px" }}>Flare Components Composition</h4>
          <ComponentSelector
            optionValues={optionValues}
            setOptionValues={setOptionValues}
            onSelect={handleSelect}
            teaValues={assetData}
          />
          <div>
            <br></br>
            <Button onClick={() => setShowModalExtraComponent(true)}>
              {" "}
              Add Component{" "}
            </Button>
            <br></br>

            <span> Total Composition: </span>
            {totalComposition.toFixed(2)}
            <br></br>
            <div className="tooltip-container">
              <div
                className="tooltip-content"
                data-tooltip="Información de ayuda"
              >
                The total composition should be 100%, but if it's not, you
                should keep the diference lower than 1.5%
              </div>
              <div className="content">
                {" "}
                <img src="./info.png" width={35} />
              </div>
            </div>
          </div>
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Wind Speed (m/s): * </span>
          <input
            type="text"
            name="wind"
            placeholder="4"
            value={formData.wind}
            onChange={handleChange}
            required
          />
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Flare Technology:</span>
          <select
            name="tecnology"
            value={formData.tecnology}
            onChange={handleChange}
          >
            <option value="Flare Combinada">Flare Combinada</option>
            <option value="Flare Asistida por aire">Flare Asistida por aire</option>
            <option value="Flare Asistida por vapor">
              Flare Asistida por vapor
            </option>
            <option value="Flare móvil- Temporal">Flare móvil- Temporal</option>
          </select>
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Position: Longitude: *</span>
          <input
            type="text"
            name="longitude"
            placeholder="-75.290777"
            value={formData.longitude}
            onChange={handleChange}
            required
          />
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Operating frequency :</span>
          <select
            name="Operating Frequency"
            value={formData.OperatingFrequency}
            onChange={handleChange}
          >
            <option value="Balance">Continuous</option>
            <option value="Medidor">Intermittent</option>
          </select>
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Position: Latitude: *</span>
          <input
            type="text"
            name="latitude"
            placeholder="3.072371"
            value={formData.latitude}
            onChange={handleChange}
            required
          />
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Default calculus Model :</span>
          <select
            name="defaultModel"
            value={formData.defaultModel}
            onChange={handleChange}
          >
            <option value="anh">ANH</option>
            <option value="west">West</option>
            <option value="em_factor">Emissions Factor</option>
            <option value="cu_factor">Custom User Factor</option>
            <option value="Direct">Direct</option>
          </select>
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Flare diameter(ft)</span>
          <input
            type="text"
            name="diameter"
            placeholder="  9.1"
            value={formData.diameter}
            onChange={handleChange}
          />
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Operation segment:</span>
          <select
            name="segment"
            value={formData.segment}
            onChange={handleChange}
          >
            <option value="Exploración">Exploración</option>
            <option value="Producción">Producción</option>
            <option value="Gas planta">Gas planta</option>
          </select>
        </GridElement>

        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Instalation Year</span>
          <input
            type="text"
            name="instalationYear"
            placeholder=" 2024"
            value={formData.instalationYear}
            onChange={handleChange}
          />
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Measure Method:</span>
          <select
            name="measureMethod"
            value={formData.measureMethod}
            onChange={handleChange}
          >
            <option value="Balance">Balance</option>
            <option value="Medidor">Medidor</option>
          </select>
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Meter Serial:</span>
          <input
            type="text"
            name="transmitterSerial"
            placeholder=" A-00000"
            value={formData.transmitterSerial}
            onChange={handleChange}
          />
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Meter type:</span>
          <select
            name="measureType"
            value={formData.measureType}
            onChange={handleChange}
          >
            <option value="Coriolis">Coriolis</option>
            <option value="Ultrasonico">Ultrasonico</option>
            <option value="Daniel's">Daniel's</option>
            <option value="Thermal dispersion">Thermal dispersion</option>
            <option value="Orifice plate">Orifice plate</option>
            <option value="Vortex">Vortex</option>
            <option value="SPIF">Single Point Insertion Flowmeter</option>
          </select>
        </GridElement>

        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Flare height(ft)</span>
          <input
            type="text"
            name="height"
            placeholder="  30"
            value={formData.height}
            onChange={handleChange}
          />
        </GridElement>

        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Estimated Operative Hours in one Year:</span>
          <input
            type="text"
            name="estimatedHours"
            placeholder=" 3500"
            value={formData.estimatedHours}
            onChange={handleChange}
          />
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Max Flow Emissions</span>
          <input
            type="text"
            name="MaximumEfficiency"
            placeholder=""
            value={formData.MaxEfficiency}
            onChange={handleChange}
          />
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Minimum efficiency per Flare:</span>
          <input
            type="text"
            name="MinimumEfficiency"
            placeholder=""
            value={formData.MinEfficiency}
            onChange={handleChange}
          />
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Combustion Emissions</span>
          <input
            type="text"
            name="CombustionEfficiency"
            placeholder=""
            value={formData.CombustionEfficiency}
            onChange={handleChange}
          />
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span>Destruction efficiency:</span>
          <input
            type="text"
            name="DestructionEfficiency"
            placeholder=""
            value={formData.DestructionEfficiency}
            onChange={handleChange}
          />
        </GridElement>
        <GridElement
          className="grid-cell-white justified"
          rows={2}
          cols={6}
          style={{ justifyContent: "center" }}
        >
          <Button type="submit">Submit</Button>
        </GridElement>
        <h5>{statusText}</h5>
      </CustomGrid>
      <AddComponent
        show={showModalExtraComponent}
        setShow={setShowModalExtraComponent}
        saveComponent={saveComponent}
      />
    </form>
  );
};

export default AppConfiguration;
