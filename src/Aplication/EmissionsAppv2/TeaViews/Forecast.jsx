import CustomGrid from "../../Utils/CustomGrid";
import GridElement from "../../Utils/GridElement";
import { useEffect, useState } from "react";
import DatePicker from "../../../Componentes/DatePicker/DatePicker";
import EmissionsPlot from "../../../Componentes/Charts/EmissionsPlot";
import MultiTimeseries from "../../../Componentes/Charts/MultiTimeseries";

const Forecast = ({ data, setDates }) => {
  const [model, setModel] = useState("west");
  const [gas, setGas] = useState("CO2");
  const [gases, setGases] = useState([]);
  const [times, setTimes] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
    setGases(Object.keys(data?.calculations?.emissions[model] ?? {}));
    setTimes(data.timeSerie.map((t) => t._time));
    setValues(
      data.timeSerie.map((t) =>
        t.emissions[model][gas] ? t.emissions[model][gas].value : []
      )
    );
    console.log(gases);
  }, [data, model]);
  function HandleDateChange(dates) {
    setDates(dates);
  }
  console.log(times);
  console.log(values);

  console.log(gases);
  return (
    <>
      <CustomGrid rows={9} cols={3} className={"Overview-100"}>
        <GridElement
          style={{ justifyContent: "center", alignContent: "center" }}
          rows={1}
          cols={3}
        >
          <h4> Forecasting</h4>
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={1}>
          <span title="Campo Obligatorio"> When: * </span>
          <DatePicker setDate={HandleDateChange} />
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={1}>
          Calculation Model:
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="emissionsSelector"
            style={{ width: "7.5rem" }}
          >
            <option value={"west"}>West </option>
            <option value={"anh"}>ANH</option>
            <option value={"em_factor"}>Emissions Factor</option>
            <option value={"direct"}>Direct</option>
          </select>
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={1}>
          <span title="Campo Obligatorio">Variable to forecast </span>
          {console.log(data.timeSerie)}
          Variable:
          <select
            value={gas}
            onChange={(e) => setGas(e.target.value)}
            className="emissionsSelector"
            style={{ width: "6.5rem" }}
          >
            {gases.map((gas) => (
              <option>{gas}</option>
            ))}
          </select>
        </GridElement>
        <GridElement rows={6} cols={3}>
          Graph
          <MultiTimeseries values={values} label={times} />
        </GridElement>
      </CustomGrid>
    </>
  );
};
export default Forecast;
