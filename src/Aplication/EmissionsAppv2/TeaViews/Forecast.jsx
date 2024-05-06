import CustomGrid from "../../Utils/CustomGrid";
import GridElement from "../../Utils/GridElement";

const Forecast = () => {
  return (
    <>
      <CustomGrid rows={9} cols={2} className={"Overview-100"}>
        <GridElement
          style={{ justifyContent: "center", alignContent: "center" }}
          rows={1}
          cols={2}
        >
          <h4> Forecasting</h4>
        </GridElement>
        <GridElement className="grid-cell-white justified" rows={1} cols={2}>
          <span title="Campo Obligatorio"> When: * </span>
          <input type="text" name="flareId" placeholder="Tea001" required />
        </GridElement>
        <GridElement rows={6} cols={2}>
          Graph
        </GridElement>
      </CustomGrid>
    </>
  );
};
export default Forecast;
