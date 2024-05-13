import { Outlet, useNavigate } from "react-router-dom";
import CustomGrid from "../../Utils/CustomGrid";
import GridElement from "../../Utils/GridElement";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Route } from "react-router-dom";
import Reporter from "./Reporter";
import GridUtil from "../../Utils/GridUtil";
import context from "react-bootstrap/esm/AccordionContext";

const ReporterGenerator = () => {
  const nav = useNavigate();
  const { setData } = useOutletContext();
  const emptyInfoReport = {
    reportNumber: "",
    batteryFacility: "",
    opeartorName: "",
    contractName: "",
    fieldNames: {
      fieldName1: "",
      fieldName2: "",
      fieldName3: "",
    },
    annexes: "",
    technicalManagerOperator: "",
    professionalCardNumber: "",
  };
  const [InfoReport, setInfoReport] = useState(emptyInfoReport);
  const handleChange = (e) => {
    const { name, value } = e.target;

    const parsed_value = parseFloat(value);
    const newValue = isNaN(parsed_value) ? value : parsed_value;

    setInfoReport((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };
  return (
    <CustomGrid
      cols={2}
      rows={8}
      className={"Overview-100"}
      style={{ justifyContent: "space-between" }}
    >
      <GridElement
        className="grid-cell-white justified"
        rows={1}
        cols={2}
        style={{ justifyContent: "center" }}
      >
        <h4>Reports Info</h4>
      </GridElement>
      <GridElement className="grid-cell-white justified" rows={1} cols={1}>
        <span title="Campo Obligatorio"> Report Number: * </span>
        <input
          type="number"
          name="reportNumber"
          placeholder="001"
          value={InfoReport.reportNumber}
          onChange={handleChange}
          required
        />
      </GridElement>
      <GridElement className="grid-cell-white justified" rows={1} cols={1}>
        <span title="Campo Obligatorio"> Battery Facility: * </span>
        <input
          type="text"
          name="batteryFacility"
          placeholder="1038"
          value={InfoReport.batteryFacility}
          onChange={handleChange}
          required
        />
      </GridElement>
      <GridElement className="grid-cell-white justified" rows={1} cols={1}>
        <span> Contracts Name: </span>
        <input
          type="text"
          name="contractName"
          placeholder="001"
          value={InfoReport.contractName}
          onChange={handleChange}
          required
        />
      </GridElement>
      <GridElement className="grid-cell-white justified" rows={1} cols={1}>
        <span title="Campo Obligatorio"> Operator Name: * </span>
        <input
          type="text"
          name="opeartorName"
          placeholder="Pepito Perez"
          value={InfoReport.opeartorName}
          onChange={handleChange}
          required
        />
      </GridElement>
      <GridElement className="grid-cell-white justified" rows={1} cols={1} ns>
        <span> Annexes </span>
        <input
          type="text"
          name="annexes"
          placeholder="Annexes"
          value={InfoReport.annexes}
          onChange={handleChange}
          required
        />
      </GridElement>

      <GridElement className="grid-cell-white justified" rows={1} cols={1} ns>
        <span> Technical Manager Operator </span>
        <input
          type="text"
          name="technicalManagerOperator"
          placeholder="Juan Florez"
          value={InfoReport.technicalManagerOperator}
          onChange={handleChange}
          required
        />
      </GridElement>

      <GridElement className="grid-cell-white justified" rows={1} cols={1} ns>
        <span> Professional Card Number </span>
        <input
          type="text"
          name="professionalCardNumber"
          placeholder="101010101"
          value={InfoReport.professionalCardNumber}
          onChange={handleChange}
          required
        />
      </GridElement>
      <GridElement className="grid-cell-white justified" rows={1} cols={1} ns>
        <span> Field A Name</span>
        <input
          type="text"
          name="fieldName1"
          placeholder="Campo1"
          value={InfoReport.fieldNames.fieldName1}
          onChange={handleChange}
          required
        />
      </GridElement>
      <GridElement className="grid-cell-white justified" rows={1} cols={1} ns>
        <span> Field B Name </span>
        <input
          type="text"
          name="fieldName2"
          placeholder="Campo2"
          value={InfoReport.fieldNames.fieldName2}
          onChange={handleChange}
          required
        />
      </GridElement>
      <GridElement className="grid-cell-white justified" rows={1} cols={1} ns>
        <span> Field C Name </span>
        <input
          type="text"
          name="fieldName3"
          placeholder="Campo3"
          value={InfoReport.fieldNames.fieldName3}
          onChange={handleChange}
          required
        />
      </GridElement>

      <GridElement
        cols={2}
        rows={2}
        padding={"0.4rem"}
        style={{ gap: "0.4rem" }}
      >
        <div style={{ height: "60%" }}>Reports:</div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            onClick={() => {
              setData(InfoReport);
              nav("/EmissionsReport/anh");
            }}
            className="ReportButton"
          >
            ANH
          </button>
          <button
            onClick={() =>
              nav("/EmissionsReport/inventory", { state: { data: {} } })
            }
            className="ReportButton"
          >
            Inventory
          </button>
        </div>
      </GridElement>
    </CustomGrid>
  );
};
export default ReporterGenerator;
