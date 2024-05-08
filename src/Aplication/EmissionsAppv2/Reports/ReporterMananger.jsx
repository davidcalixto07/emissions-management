import { Outlet, useOutletContext } from "react-router-dom";
import { useState } from "react";

const Reporter = () => {
  const [data, setData] = useState(null);
  const [, , , , , teasList] = useOutletContext();
  return <Outlet context={{ data, setData, teasList }} />;
};

export default Reporter;
