import React, { useEffect, useRef, useState } from "react";
import h337 from "heatmap.js";

const HeatMapper = ({ imgsrc, teas, coordinates }) => {
  var [heatmapInstance, setHeatmapInstance] = useState(null);
  const mapref = useRef(null);

  function GetPositionFromCoords(lat, lon) {
    var width = mapref.current.clientWidth;
    var height = mapref.current.clientHeight;

    const [lat1, lon1] = coordinates.start.split(',').map(parseFloat);
    const [lat2, lon2] = coordinates.end.split(',').map(parseFloat);
    const calculatedY = (lat - lat1) / (lat2 - lat1);
    const calc2 = (lon1 - lon) / (lon1 - lon2);
    const pos = { x: Math.round(width * calc2), y: Math.round(height * calculatedY) };
    return pos
  }

  function InstantiateMap() {
    const hmInstance = h337.create({
      container: mapref.current
    });
    setHeatmapInstance(hmInstance);
  }

  useEffect(() => {
    if (!teas || !heatmapInstance)
      return;

    console.log("TEEEEAS", teas)
    const points = teas.map((t) => (
      {
        x: GetPositionFromCoords(t.location.latitude, t.location.longitude).x,
        y: GetPositionFromCoords(t.location.latitude, t.location.longitude).y,
        value: t.avgEmissions * 350,
        radius: t.avgEmissions * 200
      }
    ));
    var data = {
      max: 100,
      data: points
    };

    heatmapInstance.setData(data);
  }, [teas, heatmapInstance]);


  useEffect(() => {
    if (mapref.current) {
      const imageElement = mapref.current.querySelector('img');
      if (imageElement) {
        imageElement.onload = InstantiateMap;
      }
    }
  }, [])

  return (
    <div >
      <h5 style={{ textAlign: 'start', marginLeft: '1rem' }}>Emissions Heatmap</h5>
      <div id="myMap" ref={mapref} style={{ height: '100%', width: '100%' }}>
        <img src={imgsrc} id='mapImg' alt="My Image" style={{
          width: '100%',
          objectFit: 'contain',
        }} />
      </div>
    </div>
  );
}

export default HeatMapper;
