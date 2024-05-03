import AssetSidebar from "../../Componentes/AssetsSidebar/AssetSidebar";
import "./Styles.css";
import { Outlet, Route, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AppConfiguration from "./AppConfiguration";
import TeaView from "./TeaView";
import EmissionsOverview from "./EmissionsOverview";
import { defaultUnits } from "./conversions";
import useEmissionsV2 from "./useEmissionsv2";
import TeaCreation from "./TeaCreation";
import "../AppCommonStyles.css";
import Mapping from "./Mapping";
import License from "./License";
import Westbot from "../../Componentes/Westbot/Westbot";
import ReporterMananger from "./Reports/ReporterMananger";
import Reporter from "./Reports/Reporter";
import Reporter2 from "./Reports/Reporter2";
import GenerateReports from "./Reports/GenerateReports";

export const EmissionsAppV2Routes = (
  <>
    <Route path="configure" element={<AppConfiguration />} />
    <Route path="connection" element={<Mapping />} />
    <Route path="create" element={<TeaCreation />} />
    <Route path="license" element={<License />} />
    <Route path=":assetId" element={<TeaView />} />
    <Route index element={<EmissionsOverview />} />
    <Route path="EmissionsReport" element={<ReporterMananger />}>
      <Route path="" element={<GenerateReports />} />
      <Route path="anh" element={<Reporter />} />
      <Route path="inventory" element={<Reporter2 />} />
    </Route>
  </>
);

const EmissionsAppV2 = () => {
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [assetList, setAssetList] = useState([]);
  const [units, setUnits] = useState(defaultUnits);
  const [dates, setDates] = useState({});

  const { teasList, setSidebarList, coordinates, imageSrc, loading, alarms } =
    useEmissionsV2(dates);

  const nav = useNavigate();
  const { assetId } = useParams();

  function getAssetList(list) {
    setAssetList(list);
    setSidebarList(list);
    console.warn("Set Asset List", list);
  }

  function HandleAssetSelected(asset) {
    setSelectedAsset(asset);
    if (asset) {
      nav(`/${asset.assetId}`);
    } else {
      nav("/");
    }
  }

  useEffect(() => {
    if (assetId)
      HandleAssetSelected({
        assetId: assetId,
        name: assetList?.find((x) => x.assetId === assetId)?.name ?? "Asset",
      });
  }, [assetList]);

  return (
    <div className="App-Container">
      <AssetSidebar
        appName="Emissions Management"
        appId="emisiones"
        handleSelectedAsset={HandleAssetSelected}
        homeUrl="/"
        type="colwest2.TeaEmisiones"
        getList={getAssetList}
      >
        <div className="aditionalContainer">
          <span onClick={() => nav("/configure")}>
            Application Configuration
          </span>
          <span onClick={() => nav("/connection")}>Connection Mananger</span>
          <span onClick={() => nav("/license")}>License Manager</span>
        </div>
      </AssetSidebar>
      <Westbot />
      <Outlet
        context={[
          selectedAsset,
          assetList,
          setAssetList,
          units,
          setUnits,
          teasList,
          coordinates,
          imageSrc,
          loading,
          setDates,
          alarms
        ]}
      />
    </div>
  );
};

export default EmissionsAppV2;
