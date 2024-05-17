import React, { useEffect, useState } from "react";
import BarChart from "../../../Componentes/Charts/BarChart";
import Button from "react-bootstrap/Button";
import axios from "axios";
import CustomGrid from "../../Utils/CustomGrid";
import GridElement from "../../Utils/GridElement";
import GridUtil from "../../Utils/GridUtil";

const SimulationView = ({ averages }) => {
  const [averageEmissions, setAverageEmissions] = useState({
    co2Eq: null,
    Nox: null,
    So2: null,
  });

  const [flow, setFlow] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [simModel, setSimModel] = useState("west");
  const [actualEmissions, setActualEmissions] = useState(0);
  const [sum, setSum] = useState(0);

  console.log(averages.emissions[simModel]?.CO2e);
  console.log(actualEmissions);
  console.log(averageEmissions);

  const barData = [
    {
      label: "Emissions Comparission",
      data: [actualEmissions, averageEmissions.co2Eq ?? 0],
    },
  ];
  const [comp, setComp] = useState({
    C1: 85.4305,
    C10: 0,
    C2: 8.5901,
    C3: 2.7031,
    C4: 0.2777,
    C5: 0.0207,
    C6: 0.0263,
    C7: 0.0048,
    C8: 0.0014,
    C9: 0.0016,
    CO2: 0.08757,
    H2O: 0,
    "I-C4": 0.1882,
    "I-C5": 0.0359,
    "N-C5": 0,
    N2: 2.1649,
  });

  useEffect(() => {
    console.log("CalcSumEffect");
    CalcSum(Object.values(comp));
  }, []);

  useEffect(() => {
    setFlow(averages?.flow?.avg);
    setPressure(averages?.pressure?.avg);
    setTemperature(averages?.temperature?.avg);
    setSimModel(simModel);
    if (averageEmissions) {
      CalculateEmissions(
        averages?.flow?.avg,
        averages?.pressure?.avg,
        averages?.temperature?.avg
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [averages, simModel]);
  console.log(flow, pressure, temperature);
  useEffect(() => {
    if (
      actualEmissions ||
      isNaN(averages?.emissions[simModel]?.CO2e?.avg) ||
      averages?.emissions[simModel]?.CO2e?.avg === 0
    )
      console.log("useEffect actualEmissions");
    console.log(averages?.emissions[simModel]?.CO2e?.avg);
    setActualEmissions(averages?.emissions[simModel]?.CO2e?.avg);
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [simModel, averageEmissions]);

  function CalculateEmissions(f, p, t) {
    const frame = {
      flow: parseFloat(flow),
      pressure: parseFloat(pressure),
      temperature: parseFloat(temperature),
      wind: 4,
      diameter: 9.1,
      composition: comp,
    };

    if (parseFloat(f)) {
      frame.flow = parseFloat(f);
      frame.pressure = parseFloat(p);
      frame.temperature = parseFloat(t);
    }
    console.log(frame);
    axios
      .post("/api/emissionsapi2-colwest2/v1/Calculate", frame)
      .then((response) => {
        console.log(response);
        if (response.data[0][simModel]["CO2e"]) {
          const co2Eq = parseFloat(response.data[0][simModel]["CO2e"].value);
          console.log(co2Eq);
          const Nox = parseFloat(response.data[0][simModel]["CO2"].value);
          const emissions = {
            co2Eq: co2Eq.toFixed(4),
            Nox: Nox.toFixed(4),
            So2: 0,
          };
          console.log(emissions);
          setAverageEmissions(emissions);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }
  const handleChange = (e) => {
    if (isNaN(parseFloat(e.target.value))) {
      e.target.value = 0;
      return;
    }

    switch (e.target.name) {
      case "flow":
        setFlow(parseFloat(e.target.value));
        break;
      case "pressure":
        setPressure(parseFloat(e.target.value));
        break;
      default:
        setTemperature(parseFloat(e.target.value));
        break;
    }
  };

  const handleChangeComp = (e) => {
    if (isNaN(parseFloat(e.target.value))) {
      e.target.value = 0;
      return;
    }

    const compTemp = [...comp];

    switch (e.target.name) {
      case "C1":
        compTemp.C1 = parseFloat(e.target.value);
        break;
      case "C2":
        compTemp.C2 = parseFloat(e.target.value);
        break;
      case "C3":
        compTemp.C3 = parseFloat(e.target.value);
        break;
      case "I-C4":
        compTemp["I-C4"] = parseFloat(e.target.value);
        break;
      case "C4":
        compTemp.C4 = parseFloat(e.target.value);
        break;
      case "C5":
        compTemp.C5 = parseFloat(e.target.value);
        break;
      default:
        compTemp.C10 = parseFloat(e.target.value);
        break;
    }
    setComp(compTemp);
  };
  function CalcSum(newComp) {
    var sum = 0;
    newComp.forEach((val) => {
      sum += val;
    });
    setSum(sum);
  }

  return (
    <CustomGrid rows={9} cols={6} className={"TeaView"}>
      {/* <span style={{ color: 'red' }}>{errorMessage}</span> */}
      <GridElement rows={4} cols={4} className="grid-cell-white trans ns">
        <GridUtil rows={4} cols={2}>
          <GridElement
            cols={2}
            ns
            className="grid-cell-white vert"
            style={{ alignItems: "center" }}
          >
            <h5>Gas Composition</h5>
          </GridElement>
          <GridElement rows={3} cols={2} ns className="grid-cell-white">
            <GridUtil rows={4} cols={3} ns>
              <div className="CompParameter">
                <span>C1:</span>
                <input
                  value={comp.C1}
                  onChange={handleChangeComp}
                  name="C1"
                  type="number"
                />
              </div>
              <div className="CompParameter">
                <span>C2:</span>
                <input
                  value={comp.C2}
                  onChange={handleChangeComp}
                  name="C2"
                  type="number"
                />
              </div>
              <div className="CompParameter">
                <span>C3:</span>
                <input
                  value={comp.C3}
                  onChange={handleChangeComp}
                  name="C3"
                  type="number"
                />
              </div>
              <div className="CompParameter">
                <span>I-C4:</span>
                <input
                  value={comp["I-C4"]}
                  onChange={handleChangeComp}
                  name="I-C4"
                  type="number"
                />
              </div>
              <div className="CompParameter">
                <span>C4:</span>
                <input
                  value={comp.C4}
                  onChange={handleChangeComp}
                  name="C4"
                  type="number"
                />
              </div>
              <div className="CompParameter">
                <span>C5:</span>
                <input
                  value={comp.C5}
                  onChange={handleChangeComp}
                  name="C5"
                  type="number"
                />
              </div>
              <div className="CompParameter">
                <span>C6+:</span>
                <input
                  value={comp.C10}
                  onChange={handleChangeComp}
                  name="C10"
                  type="number"
                />
              </div>
              <div className="CompParameter">
                <span>Molar composition:</span>
                {sum.toFixed(3)}
              </div>
            </GridUtil>
          </GridElement>
        </GridUtil>
      </GridElement>
      <GridElement rows={4} cols={2} className="grid-cell-white">
        <GridUtil rows={4} cols={1}>
          <h5 style={{ textAlign: "center" }}>Gas parameters</h5>
          <GridElement ns className="grid-cell-white">
            <div className="Simparameter">
              <span>Flow to TEA:</span>
              <input
                onChange={handleChange}
                name="flow"
                type="number"
                value={flow}
              />
              <span className="unit">MMSCFD</span>
            </div>
          </GridElement>
          <GridElement ns className="grid-cell-white">
            <div className="Simparameter">
              <span>Gas pressure:</span>
              <input
                onChange={handleChange}
                name="pressure"
                type="number"
                value={pressure}
              />
              <span className="unit">psi</span>
            </div>
          </GridElement>
          <GridElement ns className="grid-cell-white">
            <div className="Simparameter">
              <span>Gas temperature:</span>
              <input
                onChange={handleChange}
                name="temperature"
                type="number"
                value={temperature}
              />
              <span className="unit">°F</span>
            </div>
          </GridElement>
        </GridUtil>
      </GridElement>
      <GridElement
        rows={1}
        cols={3}
        className="grid-cell-white center trans ns"
      >
        Calculation Model:
        <select
          value={simModel}
          onChange={(e) => setSimModel(e.target.value)}
          className="emissionsSelector"
          style={{ width: "7.5rem" }}
        >
          <option value={"west"}>West </option>
          <option value={"anh"}>ANH</option>
          <option value={"em_factor"}>Emissions Factor</option>
          <option value={"direct"}>Direct</option>
        </select>
      </GridElement>

      <GridElement
        rows={1}
        cols={3}
        className="grid-cell-white center trans ns"
      >
        <Button onClick={() => CalculateEmissions()}> Calculate </Button>
      </GridElement>

      <GridElement rows={4} cols={3} className="grid-cell-white">
        <BarChart data={barData} labels={["Actual", "Simulated"]} />
      </GridElement>

      <GridElement rows={4} cols={3} className="grid-cell-white">
        <GridUtil rows={4} cols={1}>
          <GridElement ns>
            <p className="fs-4 fw-bold text-center">Calculated Emissions</p>
          </GridElement>
          <GridElement className="SimResult" ns>
            <p>Average CO2e emissions: </p>
            <p className="result">{averageEmissions.co2Eq} Tm/d </p>
          </GridElement>
          <GridElement className="SimResult" ns>
            <p>Average NOx emissions:</p>
            <p className="result"> {averageEmissions.Nox} Tm/d</p>
          </GridElement>
          <GridElement className="SimResult" ns>
            <p>Average Total emissions:</p>
            <p className="result">
              {" "}
              {(
                parseFloat(averageEmissions.co2Eq) +
                parseFloat(averageEmissions.Nox)
              ).toFixed(2)}{" "}
              Tm/d
            </p>
          </GridElement>
        </GridUtil>
      </GridElement>
    </CustomGrid>
  );
};

export default SimulationView;
