import { useEffect, useMemo, useState } from "react";

function useEmissionsV2(dates) {
  const [imageSrc, setImageSrc] = useState(null);
  const [coordinates, setCoordinates] = useState({ start: "0,0", end: "0.0" });
  const [sidebarList, setSidebarList] = useState([]);
  const [flares, setFlares] = useState([]);
  const [assetsFlareList, setAssetsFlareList] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    GetFlaresList();
  }, [sidebarList, dates]);

  useEffect(() => {
    const intervalId = setInterval(() => GetFlaresTs(assetsFlareList), 30000);
    return () => clearInterval(intervalId);
  }, [assetsFlareList]);


  function GetFlaresList() {
    setLoading(true);
    if (sidebarList.length === 0) {
      setLoading(false);
      return;
    }
    const url = `/api/assetmanagement/v3/assets?filter={"assetId": {"in": {"value": [${sidebarList.map(
      (flare) => `"${flare.assetId}"`
    )}]}}}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          setLoading(false);
          throw new Error("Failed to fetch teas");
        }
        return response.json();
      })
      .then((json) => {
        const assets = json._embedded.assets;
        setAssetsFlareList(assets);
        GetFlaresTs(assets);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      })
      .finally(() => { });
  }

  function GetFlaresTs(flareList) {
    if (!dates.startDate || sidebarList.length == 0)
      return;
    console.log("Calculating for", flareList);
    const isoStartDate = dates.startDate.toISOString();
    const isoEndDate = dates.endDate ? dates.endDate.toISOString() : new Date(2050, 1, 1).toISOString();

    const promises = flareList.map(async (flare) => {
      const url = `/api/emissionsapi2-colwest2/v1/ProcessTimeserie?assetId=${flare.assetId}&from=${isoStartDate}&to=${isoEndDate}&model=both`;
      const response = await fetch(url);
      if (!response.ok) {
        console.warn(`Failed to fetch data for assetId ${flare.assetId}`);
        return flare;
      }
      const json = await response.json();
      console.log("Api response from ", json);
      flare.timeSerie = Array.isArray(json.timeseries) ? json.timeseries : [];
      flare.calculations = json.calculations;
      return flare;
    });

    Promise.all(promises)
      .then((updatedFlares) => {
        console.log("Teas with fetched data:", updatedFlares);
        setFlares(updatedFlares);
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function fetchImage() {
    fetch("/api/emissionsapi2-colwest2/v1/getImage?tenant=colwest2")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }
        return response.blob();
      })
      .then((blob) => {
        const imageURL = URL.createObjectURL(blob);
        setImageSrc(imageURL);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  }

  function fetchConfig() {
    fetch("/api/emissionsapi2-colwest2/v1/loadCoordinates?tenant=colwest2")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }
        return response.json();
      })
      .then((coords) => {
        console.log("Coordinates", coords);
        setCoordinates(coords);
      })
      .catch((error) => {
        console.error("Error fetching coordinates:", error);
      });
  }
  const alarms = useMemo(() => {
    const rand1 = Math.floor(Math.random() * flares.length);
    const rand2 = Math.floor(Math.random() * flares.length);

    if (flares.length > 0) {
      console.log(flares[rand1].assetId)
      return [
        {
          id: "433",
          severity: Math.floor(Math.random() * 3) * 10,
          timestamp: "30-01-24 20:52",
          entityId: sidebarList[rand1].assetId,
          description: "Emissions too high",
        },
        {
          id: "435",
          severity: Math.floor(Math.random() * 3) * 10,
          timestamp: "01-01-24 10:43",
          entityId: sidebarList[rand2].assetId,
          description: "Emissions too high",
        },
      ]
    }
    else
      return []
  }, [sidebarList])

  useEffect(() => {
    fetchImage();
    fetchConfig();
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, []);

  return { teasList: flares, setSidebarList, coordinates, imageSrc, loading, alarms };
}
export default useEmissionsV2;
