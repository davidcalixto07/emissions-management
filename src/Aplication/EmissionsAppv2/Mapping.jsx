import React, { useEffect, useState } from "react";
import "./Styles.css";
import axios from "axios";
import CustomGrid from "../Utils/CustomGrid";
import GridElement from "../Utils/GridElement";
import { Button } from "react-bootstrap";
import Datasource from "../../Componentes/Datasources/Datasource";
import AddIcon from "../../Componentes/AssetsSidebar/add_icon.png";
import DeleteIcon from "../../Componentes/AssetsSidebar/trash-can-icon.png";
import AddDatasource from "../../Componentes/Datasources/AddDatasource";
import AddDataPoint from "../../Componentes/Datasources/AddDataPoint";
import MapComponent from "../../Componentes/Datasources/MapComponent";
import PopupDeleteDs from "../../Componentes/Utlities/PopupDeleteDs";
import PopupDeleteDp from "../../Componentes/Utlities/PopupDeleteDp";
import { useOutletContext } from "react-router-dom";
import Datapoint from "../../Componentes/Datasources/Datapoint";
import Alerts from "../../Componentes/Alerts/Alerts";
import useEmissionsApi from "./useEmissionsApi";

const Mapping = () => {
  const {
    CreateDatasource,
    DeleteDatasource,
    CreateDatapoint,
    DeleteDatapoint,
    GetDatasources,
    PostDatamappings,
    GetMappings,
  } = useEmissionsApi();
  const [showModalDs, setShowModalDs] = useState(false);
  const [showModalDp, setShowModalDp] = useState(false);
  const [showModalDeleteDs, setShowModalDeleteDs] = useState(false);
  const [showModalDeleteDp, setShowModalDeleteDp] = useState(false);
  const [dataMappingComponents, setDataMapingComponents] = useState([]);
  const [showModalMapComponents, setShowModalMapComponents] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const [datasources, setDatasources] = useState([]);
  const [dataMapings, setDataMapings] = useState([]);
  const [message, setMessage] = useState("");
  const [isRemovingds, setIsRemovingds] = useState(false);
  const [isRemovingdp, setIsRemovingdp] = useState(false);
  const [selectedDataSource, setSelectedDataSource] = useState(null);
  const [selectedDataPoint, setSelectedDataPoint] = useState(null);
  const [response, setResponse] = useState(200);
  const [, , , , , teasList, , ,] = useOutletContext();
  console.warn("TEASlIST", teasList);
  console.log(dataMappingComponents);
  async function updateMappings(ds_direction) {
    const res = await GetMappings(ds_direction);
    setDataMapings(res);
    console.log("Updating Mappings", res);
  }
  console.log("Datamappppppppings", dataMapings);
  async function handleDataSourceClick(datasource) {
    setSelectedDataSource(datasource);

    if (isRemovingds) {
      console.log(datasource);
      setShowModalDeleteDs(true);
    } else {
      updateMappings(datasource.direction);
    }
  }

  function handleDataPointClick(dp) {
    setSelectedDataPoint(dp);
    if (isRemovingdp) {
      console.log(dp);
      setShowModalDeleteDp(true);
    }
  }

  function HandleClickedRemoveDs() {
    setIsRemovingds(true);
  }
  function HandleClickedRemoveDp() {
    setIsRemovingdp(true);
  }

  function HandleCancelDp() {
    setIsRemovingdp(false);
  }
  function HandleCancelDs() {
    setIsRemovingds(false);
  }

  async function SaveDatasourceDs(ds) {
    setShowModalDs(false);
    if (await CreateDatasource(ds)) getApiData();
    else console.log("Not created");
  }
  async function SaveDataPoint(dp, ds) {
    setShowModalDp(false);
    console.log("SaveDp", dp, "Ds", ds);
    const createResponse = await CreateDatapoint(ds, dp);
    console.log(createResponse);
    if (createResponse === "Added") {
      setShowAlerts(true);
      setResponse(200);
      setMessage("The datapoint was create successfully");
    } else {
      setShowAlerts(true);
      setResponse(createResponse);
    }
    updateMappings(ds.direction);
  }

  async function confirmDelete(ds) {
    console.log("delete", ds);
    setShowModalDeleteDs(false);
    await DeleteDatasource(ds);
    getApiData();
  }

  async function confirmDeleteDp(dp) {
    console.log("delete", selectedDataSource, dp);
    setShowModalDeleteDp(false);
    await DeleteDatapoint(selectedDataSource, dp);
    updateMappings(selectedDataSource.direction);
  }

  const getApiData = async () => {
    try {
      const res = await GetDatasources();
      setDatasources(res);
    } catch (error) {
      console.error(error);
    }
  };

  function noDelete() {
    setShowModalDeleteDs(false);
    setShowModalDeleteDp(false);
  }

  function handleMappingFlare(dp, value) {
    console.log("Dp", dp, "Value", value);
    const newDps = [...dataMapings];
    const newDp = newDps.find((x) => x === dp);
    newDp.flare = value;
    setDataMapings(newDps);
  }

  function handleMappingVar(dp, value) {
    console.log("Dp", dp, "Value", value);
    const newDps = [...dataMapings];
    const newDp = newDps.find((x) => x === dp);
    newDp.variable = value;
    setDataMapings(newDps);
  }

  async function saveMappings() {
    const json = {
      dp_id: selectedDataSource.direction,
      dp_type: selectedDataSource.type,
      datapoints: dataMapings,
    };
    if (await PostDatamappings(json)) {
      updateMappings(selectedDataSource.direction);
      setShowAlerts(true);
      setResponse(200);
      setMessage("The datamapping ended succesfully");
    } else {
      console.log("Not created");
      setShowAlerts(true);
    }
  }

  useEffect(() => {
    getApiData();
  }, []);

  useEffect(() => {
    console.log("Ds update", datasources);
    if (selectedDataSource) {
      const ds = datasources.find(
        (x) =>
          x.direction === selectedDataSource.direction &&
          x.type === selectedDataSource.type
      );
      if (ds != null) {
        setSelectedDataSource(ds);
        updateMappings(ds.direction);
        return;
      }
    }
    if (datasources[0]) {
      setSelectedDataSource(datasources[0]);
      updateMappings(datasources[0].direction);
    }
  }, [datasources]);

  console.log(dataMappingComponents);

  return (
    <>
      <CustomGrid rows={8} cols={8} className={"Overview-100"}>
        <GridElement cols={2} rows={8}>
          <GridElement cols={1} ns>
            <h4>Datasources</h4>
          </GridElement>
          <div className="list">
            {datasources.map((ds, index) => (
              <Datasource
                datasource={ds}
                handleDataSourceClickDs={handleDataSourceClick}
                selected={selectedDataSource}
                deleting={isRemovingds}
                key={index}
              />
            ))}
          </div>
          <div className="button-container">
            <div className="ControlButtons">
              {isRemovingds ? (
                <>
                  <button
                    onClick={() => HandleCancelDs()}
                    className="SidebarAsset-DeleteIcon"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => HandleClickedRemoveDs()}
                    className="SidebarAsset-DeleteIcon"
                  >
                    <img src={DeleteIcon} alt="-" />
                  </button>
                  <button
                    onClick={() => setShowModalDs(true)}
                    className="SidebarAsset-DeleteIcon"
                  >
                    <img src={AddIcon} alt="-" />
                  </button>
                </>
              )}
            </div>
          </div>
        </GridElement>
        {!selectedDataSource ? (
          <>
            <GridElement
              cols={6}
              rows={2}
              style={{ alignContent: "center", backgroundColor: "#efeef5" }}
              ns
            >
              <h4 style={{ color: "grey" }}>
                {" "}
                There's no Data Source selected, please select one{" "}
              </h4>
            </GridElement>
          </>
        ) : selectedDataSource.datapoints.length > 0 ? (
          <>
            <GridElement cols={6} style={{ alignContent: "center" }}>
              <h3> DataPoints</h3>
            </GridElement>
            {dataMapings.map((dp, index) => (
              <Datapoint
                datapoint={dp}
                handleDataPointClick={handleDataPointClick}
                teasList={teasList}
                datasources={datasources}
                deleting={isRemovingdp}
                handleMappingVar={handleMappingVar}
                HandleMappingFlare={handleMappingFlare}
                dataMappingComponents={dataMappingComponents}
                setDataMapingComponents={setDataMapingComponents}
                showModalMapComponents={showModalMapComponents}
                setShowModalMapComponents={setShowModalMapComponents}
                key={index}
              />
            ))}
          </>
        ) : (
          <>
            <GridElement
              cols={6}
              rows={2}
              style={{ alignContent: "center", backgroundColor: "#efeef5" }}
              ns
            >
              <h4 style={{ color: "grey" }}>
                {" "}
                There's no data points in the data source, please select one
                wich has nodes or tags or add a datapoint{" "}
              </h4>
            </GridElement>
          </>
        )}
        <GridElement cols={6} ns style={{ backgroundColor: "transparent" }}>
          <div className="button-container">
            <div className="ControlButtons">
              {isRemovingdp ? (
                <>
                  <button
                    onClick={() => HandleCancelDp()}
                    className="SidebarAsset-DeleteIcon"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => HandleClickedRemoveDp()}
                    className="SidebarAsset-DeleteIcon"
                  >
                    <img src={DeleteIcon} alt="-" />
                  </button>
                  <button
                    onClick={() => setShowModalDp(true)}
                    className="SidebarAsset-DeleteIcon"
                  >
                    <img src={AddIcon} alt="-" />
                  </button>
                </>
              )}
            </div>
          </div>
        </GridElement>
        <GridElement
          cols={6}
          ns
          style={{
            alignContent: "center",
            backgroundColor: "transparent",
          }}
        >
          <Button variant="primary" onClick={() => saveMappings()}>
            Apply Mappings
          </Button>
        </GridElement>
      </CustomGrid>
      <AddDatasource
        show={showModalDs}
        setShow={setShowModalDs}
        saveDatasource={SaveDatasourceDs}
      />
      <AddDataPoint
        show={showModalDp}
        setShow={setShowModalDp}
        saveDataPoint={SaveDataPoint}
        ds={selectedDataSource}
      />

      <PopupDeleteDs
        show={showModalDeleteDs}
        setShow={setShowModalDeleteDs}
        confirmDelete={confirmDelete}
        noDelete={noDelete}
        ds={selectedDataSource}
      />

      <PopupDeleteDp
        show={showModalDeleteDp}
        setShow={setShowModalDeleteDp}
        confirmDelete={confirmDeleteDp}
        noDelete={noDelete}
        dp={selectedDataPoint}
      />
      <Alerts
        status={response}
        message={message}
        show={showAlerts}
        setShowAlert={setShowAlerts}
      />
    </>
  );
};

export default Mapping;
