import { useState, useEffect } from "react";
import GridElement from "../../Aplication/Utils/GridElement";
import DeleteIcon from "../AssetsSidebar/trash-can-icon.png";
import MapComponent from "./MapComponent";
import Alerts from "../Alerts/Alerts";
import { Button } from "react-bootstrap";

const Datapoint = ({
  datapoint,
  handleDataPointClick,
  teasList,
  datasources,
  deleting,
  handleMappingVar,
  HandleMappingFlare,
  dataMappingComponents,
  setDataMapingComponents,
  showModalMapComponents,
  setShowModalMapComponents,
}) => {
  const [showAlert, setShowAlert] = useState(false);
  return datapoint.variable !== "Components" ? (
    <>
      <GridElement cols={6} rows={1} style={{ alignContent: "center" }}>
        <div
          onClick={() => handleDataPointClick(datapoint)}
          className="Datapoint"
        >
          <strong> Node/Tag: </strong>
          <span> {datapoint.node_id} </span>
          <div>
            {deleting && (
              <div className="SidebarAsset-DeleteIcon-search ">
                <img height="90%" src={DeleteIcon} alt="-" />
              </div>
            )}
          </div>
          <br></br>
          <strong> Flare: </strong>
          <span>
            <select
              id="dropdown"
              value={datapoint.flare ?? ""}
              onChange={(event) =>
                HandleMappingFlare(datapoint, event.target.value)
              }
            >
              <option key={"default"} value={""}>
                {"None"}
              </option>
              {datasources.length > 0 &&
                teasList.map((flare) => (
                  <option key={flare.name} value={flare.name}>
                    {flare.name}
                  </option>
                ))}
            </select>
          </span>
          <strong> Variable: </strong>
          <span>
            <select
              value={datapoint.variable ?? ""}
              onChange={(event) =>
                handleMappingVar(datapoint, event.target.value)
              }
            >
              <option value="">None</option>
              <option value="flow"> Gas Flow </option>
              <option value="pressure"> Gas Pressure </option>
              <option value="temperature"> Gas Temperature </option>
              <option value="Components">Components</option>
            </select>
          </span>
        </div>
      </GridElement>
    </>
  ) : (
    <>
      <GridElement cols={6} rows={1} style={{ alignContent: "center" }}>
        <div
          onClick={() => handleDataPointClick(datapoint)}
          className="Datapoint"
        >
          <strong> Variable: </strong>
          <span>
            <select
              value={datapoint.variable ?? ""}
              onChange={(event) =>
                handleMappingVar(datapoint, event.target.value)
              }
            >
              <option value="">None</option>
              <option value="flow"> Gas Flow </option>
              <option value="pressure"> Gas Pressure </option>
              <option value="temperature"> Gas Temperature </option>
              <option value="Components">Components</option>
            </select>
          </span>
          <strong> Flare: </strong>
          <span>
            <select
              id="dropdown"
              value={datapoint.flare ?? ""}
              onChange={(event) =>
                HandleMappingFlare(datapoint, event.target.value)
              }
            >
              <option key={"default"} value={""}>
                {"None"}
              </option>
              {datasources.length > 0 &&
                teasList.map((flare) => (
                  <option key={flare.name} value={flare.name}>
                    {flare.name}
                  </option>
                ))}
            </select>
          </span>
          <div style={{ width: "5em" }}>
            <Button
              onClick={() =>
                datapoint.flare == ""
                  ? setShowAlert(true)
                  : setShowModalMapComponents(true)
              }
            >
              {console.log(datapoint.flare)}
              Map Your Components
            </Button>
          </div>
        </div>
        <MapComponent
          show={showModalMapComponents}
          setShow={setShowModalMapComponents}
          saveMapping={setDataMapingComponents}
          data={dataMappingComponents}
        />
      </GridElement>
      <Alerts
        status={400}
        setShowAlert={setShowAlert}
        show={showAlert}
        message={
          "Please to map your components first select a Flare to map that components"
        }
      />
    </>
  );
};

export default Datapoint;
