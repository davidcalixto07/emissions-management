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
  const [actualEmissions, setActualEmissions] = useState(0);
  const [sum, setSum] = useState(0);

  const barData = [
    {
      label: "Emissions Comparission",
      data: [actualEmissions, averageEmissions.co2Eq ?? 0],
    },
  ];
  const [comp, setComp] = useState([
    85.4305, 8.5901, 2.7031, 0.1882, 0.2777, 0.0, 0.0359, 0.0207, 0.0263,
    0.0048, 0.0014, 0.0016, 0, 0.8757, 2.1649, 0,
  ]);

  useEffect(() => {
    console.log("CalcSumEffect");
    CalcSum(comp);
  }, []);

  useEffect(() => {
    setFlow(averages?.flow.avg);
    setPressure(averages?.pressure.avg);
    setTemperature(averages?.temperature.avg);
    CalculateEmissions(
      averages?.flow.avg,
      averages?.pressure.avg,
      averages?.temperature.avg
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      actualEmissions ||
      isNaN(averages?.CO2Emissions?.avg) ||
      averages?.CO2Emissions?.avg === 0
    )
      return;
    console.log("useEffect actualEmissions");
    setActualEmissions(averages?.CO2Emissions.avg);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function CalculateEmissions(f, p, t) {
    const frame = {
      flow: parseFloat(flow),
      pressure: parseFloat(pressure),
      temperature: parseFloat(temperature),
      wind: 4,
      diameter: 9.1,
      comp: comp,
    };

    if (parseFloat(f)) {
      frame.flow = parseFloat(f);
      frame.pressure = parseFloat(p);
      frame.temperature = parseFloat(t);
    }

    axios
      .post("/api/emissionsapi2-colwest2/v1/Calculate", frame)
      .then((response) => {
        if (response.data["CO2e"]) {
          const co2Eq = parseFloat(response.data["CO2e"]);
          const Nox = parseFloat(response.data["C02"]);
          const emissions = {
            co2Eq: co2Eq.toFixed(4),
            Nox: Nox.toFixed(4),
            So2: 0,
          };
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
        compTemp[0] = parseFloat(e.target.value);
        break;
      case "C2":
        compTemp[1] = parseFloat(e.target.value);
        break;
      case "C3":
        compTemp[2] = parseFloat(e.target.value);
        break;
      case "I-C4":
        compTemp[3] = parseFloat(e.target.value);
        break;
      case "C4":
        compTemp[4] = parseFloat(e.target.value);
        break;
      case "C5":
        compTemp[5] = parseFloat(e.target.value);
        break;
      default:
        compTemp[12] = parseFloat(e.target.value);
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
                  value={comp[0]}
                  onChange={handleChangeComp}
                  name="C1"
                  type="number"
                />
              </div>
              <div className="CompParameter">
                <span>C2:</span>
                <input
                  value={comp[1]}
                  onChange={handleChangeComp}
                  name="C2"
                  type="number"
                />
              </div>
              <div className="CompParameter">
                <span>C3:</span>
                <input
                  value={comp[2]}
                  onChange={handleChangeComp}
                  name="C3"
                  type="number"
                />
              </div>
              <div className="CompParameter">
                <span>I-C4:</span>
                <input
                  value={comp[3]}
                  onChange={handleChangeComp}
                  name="I-C4"
                  type="number"
                />
              </div>
              <div className="CompParameter">
                <span>C4:</span>
                <input
                  value={comp[4]}
                  onChange={handleChangeComp}
                  name="C4"
                  type="number"
                />
              </div>
              <div className="CompParameter">
                <span>C5:</span>
                <input
                  value={comp[5]}
                  onChange={handleChangeComp}
                  name="C5"
                  type="number"
                />
              </div>
              <div className="CompParameter">
                <span>C6+:</span>
                <input
                  value={comp[12]}
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
        cols={6}
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
