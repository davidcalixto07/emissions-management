import BarChart from "../../../Componentes/Charts/BarChart";
import EmissionsPlot from "../../../Componentes/Charts/EmissionsPlot";
import MultiTimeseries from "../../../Componentes/Charts/MultiTimeseries";
import CustomGrid from "../../Utils/CustomGrid";
import GridElement from "../../Utils/GridElement";
import MetricView from "./MetricView";
import { useEffect, useState } from "react";

const gasesNames = ["CO2", "CH4", "CO2e", "NOx"];
const colors = ["#0f2d57", "#f03030", "#30f030", "#30f030"];
// Mass balance- West
// Mass balance - ANH
// Emission factor - EPA
// ch4 y co2

// NOX
// Emission factor - ANH
// Emission factor- EPA

const EmissionsView = ({ data, lastTs, units, loading, setCalcs }) => {
  const [timeseries, setTimeseries] = useState([]);
  const [tsTime, setTsTime] = useState([]);
  const [model, setModel] = useState("west");
  const [gas, setGas] = useState("All");
  const [gasesTs, setGasesTs] = useState([]);
  const [compositionData, setCompositionData] = useState([]);
  const [calculations, setCalculations] = useState({ emissions: {} });
  const [gases, setGases] = useState([])


  useEffect(() => { console.log(lastTs) }, [lastTs])
  useEffect(() => {
    console.log("Useeffect ", data)
    if (!data || !data.data)
      return;
    // Composition top  calculation
    const comparray = Object.entries(data.data?.composition ?? {});
    comparray.sort((a, b) => b[1] - a[1]);
    const top5Keys = comparray.slice(0, comparray.length > 5 ? 5 : comparray.length);
    setCompositionData({ comps: top5Keys.map((e) => e[0]), values: top5Keys.map((e) => e[1]) })

    // Calculations
    setCalculations(data.calculations ?? {})
    setGases(Object.keys(data.calculations.emissions[model] ?? {}))

    setTimeseries(data.timeSerie)
    console.log("New data", data)
  }, [data, lastTs]);

  function generateFutureDates(startISOString, numberOfDates) {
    let datesArray = [];
    let currentDate = new Date(startISOString);

    for (let i = 0; i < numberOfDates; i++) {
      currentDate.setMinutes(currentDate.getMinutes() + 3);
      datesArray.push(new Date(currentDate).toISOString());
    }
    return datesArray;
  }

  function UpdateTimeseries() {
    console.log("Called To update", data);
    if (gas === "All") {
      const tsList = gasesNames.map((g, i) => ({
        label: g,
        t: tsTime,
        v: timeseries.map((v) => v.emissions[model.toLowerCase()][g]),
        color: colors[i],
        f: g === "C02e",
      }));
      if (timeseries.length > 0) {
        const ts = timeseries
          .map((v) => v.emissions[model.toLowerCase()].C02e)
          .slice(0, 20);
        console.log("Ts", ts);
        const times = generateFutureDates(timeseries[0]._time, 20);
        console.log("Timeeeeeees", times);

        const forecast = {
          label: "CO2e forecast",
          t: times,
          v: ts,
          color: "#01d0d0",
          f: false,
        };
        tsList.push(forecast);
      }
      setGasesTs(tsList);
    } else {
      const index = gasesNames.findIndex((x) => x === gas);
      setGasesTs([
        {
          label: gas,
          t: tsTime,
          v: timeseries.map((v) => v.emissions[model.toLowerCase()][gas]),
          color: colors[index],
          f: gas === "C02e",
        },
      ]);
    }
  }

  useEffect(() => {
    console.log(timeseries)
  }, [gas, model, timeseries]);

  return (
    <CustomGrid className={"TeaView"} rows={11} cols={10} loading={loading}>
      <GridElement rows={6} cols={3} className="grid-cell-white">
        <MultiTimeseries
          title={"Produced gas flow"}
          values={[
            {
              label: `flow (${units.flow.name})`,
              t: data.timeSerie.map((t) => t._time) ?? [],
              v: data.timeSerie.map((t) => units.flow.conv(t.flow)) ?? [],
              color: "#0f2d57",
              f: false,
              pointRadius: 0,
            },
          ]}
          freeRatio
        />
      </GridElement>

      <GridElement rows={6} cols={3} className="grid-cell-white">
        {/* TODO: The mean difference */}
        <BarChart
          legend="Gas Composition"
          labels={compositionData.comps}
          data={
            [
              {
                label: "Actual",
                data: compositionData.values,
                backgroundColor: '#40408fa0'
              },
              {
                label: "Mean",
                data: compositionData.values
              },
            ]}
          barWidth={12}
          legendPos="top"
        />
      </GridElement>
      <GridElement rows={2} cols={4} className="grid-cell-white metricView">
        <MetricView
          title={"CO2 Equivalent Emissions"}
          metrics={[
            {
              name: "average",
              value: units.emissions.conv(calculations.emissions[model]?.CO2e.avg ?? 0),
              units: units.emissions.name,
            },
            {
              name: "peak",
              value: units.emissions.conv(calculations.emissions[model]?.CO2e.max ?? 0),
              units: units.emissions.name,
            },
            {
              name: "Total",
              value: units.emissions.conv(calculations.emissions[model]?.CO2e.total ?? 0),
              units: units.emissions.name,
            },
          ]}
          decimals={3}
        />
      </GridElement>

      <GridElement rows={1} cols={4} className="grid-cell-white">
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

        </select>
        Variable:
        <select
          value={gas}
          onChange={(e) => setGas(e.target.value)}
          className="emissionsSelector"
          style={{ width: "6.5rem" }}
        >
          <option>All</option>
          {
            gases.map((gas) =>
              <option>{gas}</option>
            )
          }

        </select>
      </GridElement>
      {
        console.log(data.status)
      }
      <GridElement
        rows={6}
        cols={4}
        className="grid-cell-white"
        style={{ justifyContent: "center" }}
      >
        {(data.data?.status?.[model] ?? []).length < 1 ? (
          <EmissionsPlot
            timestamps={timeseries.map((t) => t._time)}
            modelsData={timeseries.map((t) => t.emissions[model])}
            units={'TCO2e'}
          />
        ) : (
          <div className="tooltip-container">
            <div
              className="tooltip-content"
              data-tooltip="Información de ayuda"
            >
              You're missing some variables to calculate this model, please
              check those:
              {data.data?.status?.[model]?.map((ds) => (
                <div> {ds}</div>
              ))}
            </div>
            <div className="content">
              {" "}
              <img src="./info.png" width={35} />
            </div>
          </div>
        )}
      </GridElement>

      <GridElement rows={2} cols={3} className="grid-cell-white metricView">
        <MetricView
          title={"Gas flow"}
          metrics={[
            {
              name: "average",
              value: units.flow.conv(calculations.flow?.avg),
              units: units.flow.name,
            },
            {
              name: "peak",
              value: units.flow.conv(calculations.flow?.max),
              units: units.flow.name,
            },
          ]}
        />
      </GridElement>

      <GridElement rows={2} cols={3} className="grid-cell-white metricView">
        <MetricView
          title={"Gas Pressure"}
          decimals={3}
          metrics={[
            {
              name: "average",
              value: units.pressure.conv(calculations.pressure?.avg),
              units: units.pressure.name,
            },
            {
              name: "peak",
              value: units.pressure.conv(calculations.pressure?.peak),
              units: units.pressure.name,
            },
          ]}
        />
      </GridElement>

      <GridElement rows={3} cols={3} className="grid-cell-white metricView">
        <MetricView
          title={"Gas Temperature"}
          metrics={[
            {
              name: "average",
              value: units.temperature.conv(calculations.temperature?.avg),
              units: units.temperature.name,
            },
            {
              name: "peak",
              value: units.temperature.conv(calculations.temperature?.max),
              units: units.temperature.name,
            },
          ]}
        />
      </GridElement>

      <GridElement rows={3} cols={3} className="grid-cell-white metricView">
        <MetricView
          title={"Efficiencies "}
          metrics={[
            { name: "Combustion efficiency", value: 5.3, units: "m/s" },
            { name: "Destruction efficiency", value: 98.6, units: "%" },
          ]}
        />
      </GridElement>
      {
      }
      <GridElement rows={2} cols={4} className="grid-cell-white metricView">
        <MetricView
          title={`${(gas === 'All' || gas === 'efficiency') ? 'CO2' : gas} Emissions`}
          metrics={
            [
              {
                name: "average",
                value: units.emissions.conv((calculations.emissions[model]?.[(gas === 'All' || gas === 'efficiency') ? 'CO2' : gas].avg ?? 0)),
                units: units.emissions.name,
              },
              {
                name: "peak",
                value: units.emissions.conv((calculations.emissions[model]?.[(gas === 'All' || gas === 'efficiency') ? 'CO2' : gas].max ?? 0)),
                units: units.emissions.name,
              },
              {
                name: "Total",
                value: units.emissions.conv((calculations.emissions[model]?.[(gas === 'All' || gas === 'efficiency') ? 'CO2' : gas].total ?? 0)),
                units: units.emissions.name,
              },
            ]
          }
          decimals={4}
        />
      </GridElement>
    </CustomGrid>
  );
};

export default EmissionsView;
