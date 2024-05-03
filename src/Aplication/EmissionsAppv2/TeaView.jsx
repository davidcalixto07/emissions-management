import DatePicker from "../../Componentes/DatePicker/DatePicker";
import AppTab from "../Utils/AppTab";
import TabbedAppLayout from "../Utils/TabbedAppLayout";
import EmissionsView from "./TeaViews/EmissionsView";
import SimulationView from "./TeaViews/SimulationView";
import TeaCreation from "./TeaCreation";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const TeaView = () => {
  const [viewDate, setViewDate] = useState(true);
  const [
    selectedAsset,
    assetList,
    setAssetList,
    units,
    setUnits,
    teasList,
    coordinates,
    imageSrc,
    loading,
    setDates
  ] = useOutletContext();
  const [assetData, setAssetData] = useState({ timeSerie: [] });
  const [lastTs, setLastTs] = useState(null);
  const [results, setResults] = useState({});

  useEffect(() => {
    if (!selectedAsset)
      return;

    const flare = teasList.find((x) => x.assetId == selectedAsset.assetId);
    if (flare) {
      console.log("Finded ", flare);
      setAssetData(flare);
      setLastTs(flare.timeSerie[flare.timeSerie.length - 1]._time)
    }
  }, [selectedAsset, teasList]);

  function HandleDateChange(dates) {
    setDates(dates);
  }

  function handleChange(a) {
    setViewDate(a === "Emissions View");
  }

  return (
    <TabbedAppLayout
      title={"View data from " + selectedAsset?.name ?? ""}
      subtitle={<DatePicker setDate={HandleDateChange} disabled={!viewDate} />}
      appName="Emissions"
      setSelected={handleChange}
    >
      <AppTab label="Emissions View">
        <EmissionsView
          data={assetData}
          units={units}
          lastTs={lastTs}
          loading={loading}
          setCalcs={setResults}
        />
      </AppTab>

      <AppTab label="Emissions Simulator">
        <SimulationView averages={results} />
      </AppTab>

      <AppTab label="Flare Config">
        <div style={{ height: "calc(100% - 4em)" }}>
          <TeaCreation assetData={assetData} />
        </div>
      </AppTab>
    </TabbedAppLayout>
  );
};

export default TeaView;
