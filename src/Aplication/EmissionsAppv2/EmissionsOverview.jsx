import BarChart from "../../Componentes/Charts/BarChart";
import DatePicker from "../../Componentes/DatePicker/DatePicker";
import Heatmapper from "./Heatmapper";
import CustomGrid from "../Utils/CustomGrid";
import GridElement from "../Utils/GridElement";
import MetricDisplay from "./MetricDisplay";
import EventsTable from "../../Componentes/EventsTable/EventsTable";
import MultiTimeseries from "../../Componentes/Charts/MultiTimeseries";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import DirectEmissionsModal from "./DirectEmissionsModal";
import { type } from "@testing-library/user-event/dist/type";
import { addTs, agregateTs } from "./Agregates";
import EmissionsPlot from "../../Componentes/Charts/EmissionsPlot";

const EmissionsOverview = () => {
  const [, , , units, , teasList, coordinates, imageSrc, loading, setDates, alarms] =
    useOutletContext();

  const [totalCo2, setTotalCo2] = useState(0);
  const [totalEq, setTotalEq] = useState(0);
  const [directModal, setDirectModal] = useState(false);
  const [ts, setTs] = useState([]);
  const nav = useNavigate();

  function setDate(date) {
    setDates(date);
  }

  function handleCloseModal() {
    setDirectModal(false);
  }

  useEffect(() => {
    const totalCo2 = teasList.reduce(
      (accumulator, currentValue) =>
        accumulator + (currentValue.calculations?.emissions.anh.CO2.total ?? 0), 0
    );
    const totalEq = teasList.reduce(
      (accumulator, currentValue) =>
        accumulator + (currentValue.calculations?.emissions.anh.CO2e.total ?? 0),
      0
    );
    setTotalCo2(totalCo2);
    setTotalEq(totalEq);
    console.log(teasList)
    const flare_ts = teasList[0]?.timeSerie ?? [];
    console.log(flare_ts);
    setTs(flare_ts);

    // const agregated_flares = teasList.map(flare => agregateTs(flare.timeSerie ?? []))
    // console.log(agregated_flares)
    // // const calcTs = { _times: agregated_flares.map((t) => t._time), values: ts.map((t) => t.calculations?.emissions.anh.CO2e.total ?? 0) };
    // if (agregated_flares.length > 0) {
    //   const times = agregated_flares[0].map(ts => ts._time)
    //   const values = agregated_flares[0].map(ts => ts.flow)
    //   console.log(times)
    //   setTs({ _times: flare.timeSerie?.map((t) => t._time), values: values });
    //   addTs(agregated_flares);
    // }
  }, [teasList]);
  return (
    <CustomGrid
      className={"Overview-100"}
      rows={11}
      cols={13}
      loading={loading}
    >
      <GridElement cols={6} className="grid-cell-white" com="Title">
        <h2 className="Overview-title">Plant Emissions Overview</h2>
      </GridElement>

      <GridElement cols={7} rows={6} className="grid-cell-white" com="Heat Map">
        <Heatmapper
          teas={teasList}
          coordinates={coordinates}
          imgsrc={imageSrc}
        />
      </GridElement>

      <GridElement
        cols={6}
        rows={1}
        className="grid-cell-white center"
        com="Date Picker"
      >
        <DatePicker setDate={setDate} />
      </GridElement>

      <GridElement
        cols={3}
        rows={1}
        className="grid-cell-white"
        com="Emissions eq Totalizer"
      >
        <MetricDisplay
          name={
            <span>
              Total CO<s>2</s> Emissions
            </span>
          }
          decimals={3}
          value={units.emissions.conv(totalCo2)}
          units={units.emissions.name}
        />
      </GridElement>

      <GridElement
        cols={3}
        rows={1}
        className="grid-cell-white"
        com="Emissions Totalizer"
      >
        <MetricDisplay
          name={<span>Total Emissions</span>}
          value={units.emissions.conv(totalEq)}
          units={units.emissions.name}
          decimals={5}
        />
      </GridElement>

      <GridElement
        cols={6}
        rows={4}
        className="grid-cell-white"
        com="Emissions Bar chart"
      >
        <BarChart
          legend="Contribution per smoker"
          labels={teasList.map((a) => a.name)}
          data={[
            {
              label: `Total (${units.emissions.name})`,
              data: teasList.map((flare) => units.emissions.conv((flare.calculations?.emissions.anh.CO2e.total ?? 0) / totalEq)),
            },
          ]}
          barWidth={32}
          legendPos="bottom"
          horizontal
        />
      </GridElement>

      <GridElement
        cols={7}
        rows={5}
        className="grid-cell-white"
        com="Time serie"
      >
        <EmissionsPlot
          timestamps={ts.map((t) => t._time)}
          modelsData={ts.map((t) => t.emissions.anh)}
          units={'TCO2e'}
          timeserie={ts}
        />
      </GridElement>

      <GridElement
        cols={6}
        rows={3}
        className="grid-cell-white"
        style={{ display: "inline" }}
      >
        <h5>Emissions Events</h5>
        <EventsTable
          eventsList={alarms}
          totalAssetList={teasList}
          loading={loading}
        />
      </GridElement>

      <GridElement cols={3} rows={1} className="grid-cell-white center">
        <button className="ReportButton" onClick={() => setDirectModal(false)}>
          Direct Emissions Data
        </button>
      </GridElement>

      <GridElement
        cols={3}
        rows={1}
        className="grid-cell-white"
        padding={"0.4rem"}
        style={{ gap: "0.4rem" }}
      >
        Reports:
        <button
          onClick={() => nav("/EmissionsReport", { state: { data: {} } })}
          className="ReportButton"
          style={{ width: "60%" }}
        >
          Generate Reports
        </button>
      </GridElement>
      <DirectEmissionsModal
        isOpen={directModal}
        onClose={handleCloseModal}
        coordinates={coordinates}
        imgSrc={imageSrc}
      />
    </CustomGrid>
  );
};

export default EmissionsOverview;
