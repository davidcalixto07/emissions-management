
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";



const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    color: "black",
    padding: 8,
  },
  section: {
    margin: 1,
    padding: 1,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  tableRow: { flexDirection: "row" },
  tableCol: { flexDirection: "column" },
  tableRow2: {
    flexDirection: "row",
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(242,242,242)",
  },
  tableRow3: {
    flexDirection: "row",
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  tableCell: {
    flex: 1,
    fontSize: 10,
    padding: 0,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    justifyContent: "center",
  },
  tableCell2: {
    fontSize: "0.8vw",
    padding: 0,
    borderStyle: "solid",
    borderColor: "black",
    justifyContent: "center",
  },
  text1: {
    fontSize: "0.8vw",
    textAlign: "center",
  },
  text2: {
    fontSize: "1.1vw",
    textAlign: "center",
    fontWeight: "bold",
  },
});

const Reporter = () => {
  const nav = useNavigate();
  const { data, teasList }  = useOutletContext();

  console.log(data);
  console.log(teasList); 
  return (
    <div style={{ width: "100%" }}>
      <Button onClick={() => nav("/")}>Back to overview</Button>
      <PDFViewer style={{ width: "100%", height: "100%" }}>
        <Document>
          <Page
            orientation="landscape"
            size={{ width: 850, height: 1980 }}
            style={styles.page}
          >
            <View style={styles.section}>
              <View style={styles.table}>
                {/*Encabezado 1*/}
                <View style={styles.tableRow}>
                  <View
                    style={{
                      ...styles.tableCell,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      src={"/logoHc.jpeg"}
                      style={{ width: 100, height: 50 }}
                    />
                    <View style={{ flex: 1, marginLeft: 8 }}>
                      <Text style={styles.text2}>
                        FORMATO REPORTE DE EFICIENCIA DE COMBUSTIÓN EN TEA
                      </Text>
                      <Text style={styles.text2}>
                        AGENCIA NACIONAL DE HIDROCARBUROS
                      </Text>
                    </View>
                  </View>
                </View>
                {/*fila 1*/}
                <View style={styles.tableRow}>
                  <View style={styles.tableCell}>
                    <Text>Número de Reporte: </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>{data.reportNumber}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>Fecha de presentación (dd/mm/aaaa): </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text></Text>
                  </View>
                </View>
                {/*Fila 2*/}
                <View style={styles.tableRow}>
                  <View style={styles.tableCell}>
                    <Text>Facilidad de Batería</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>{data.batteryFacility}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>Ubicación en coordenadas</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>Latitud</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text></Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>Longitud</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text></Text>
                  </View>
                </View>
                {/*Fila 3*/}
                <View style={styles.tableRow}>
                  <View style={styles.tableCell}>
                    <Text>Operador</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>{data.opeartorName}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>Nombre de los Contratos: </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>{data.contractName}</Text>
                  </View>
                </View>
                {/*Fila 4*/}
                <View style={styles.tableRow}>
                  <View style={styles.tableCell}>
                    <Text>
                      Nombre de los Campos:
                      {data.fieldNames.fieldname1},
                      {data.fieldNames.fieldname2},
                      {data.fieldNames.fieldname3}
                    </Text>
                  </View>
                </View>
                {/*Titulo 1*/}
                <View
                  style={{
                    ...styles.tableRow,
                    backgroundColor: "rgb(180,198,231)",
                  }}
                >
                  <View style={styles.tableCell}>
                    <Text style={styles.text2}>
                      SECCIÓN I. INFORMACIÓN DE LA TEA
                    </Text>
                  </View>
                </View>
                {/*Encabezados 1*/}
                <View
                  style={{
                    ...styles.tableRow,
                    backgroundColor: "rgb(242,242,242)",
                  }}
                >
                  <View style={styles.tableCell}>
                    <Text style={styles.text1}>ID TEA</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.text1}>Tipo de TEA</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.text1}>Tecnología de la TEA</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.text1}>Altura TEA (ft)</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.text1}>Diámetro TEA (in)</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.text1}>Año de instalación</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.text1}>
                      Frecuencia de funcionamiento{" "}
                    </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.text1}>
                      Horas estimadas de funcionamiento al año{" "}
                    </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.text1}>Segmento uso TEA</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.text1}>
                      Método de medición del volumen de gas quemado
                    </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.text1}>Tipo de Medidor </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.text1}>Serial Medidor</Text>
                  </View>
                </View>
                {/*Contenido 1*/}
                {teasList.map((flare) => (
                  <View style={styles.tableRow}>
                    <View style={styles.tableCell}>
                      <Text style={styles.text1}>{flare.data.flareId}</Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text style={styles.text1}>{flare.data.flareType}</Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text style={styles.text1}>{flare.data.tecnology}</Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text style={styles.text1}> {flare.data.height}</Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text style={styles.text1}>{flare.data.diameter}</Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text style={styles.text1}>{flare.data.instalationYear}</Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text style={styles.text1}>{/*flare.data.frecuencia_funcionamiento*/}</Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text style={styles.text1}>{flare.data.estimatedHours}</Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text style={styles.text1}>{flare.data.segment}</Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text style={styles.text1}>{flare.data.measureMethod}</Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text style={styles.text1}>{flare.data.measureType}</Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text style={styles.text1}>{flare.data.transmitterSerial}</Text>
                    </View>
                  </View>
                ))}
                {/*Titulo 2*/}
                <View
                  style={{
                    ...styles.tableRow,
                    backgroundColor: "rgb(180,198,231)",
                  }}
                >
                  <View style={styles.tableCell}>
                    <Text style={styles.text2}>
                    SECCIÓN II. QUEMA DE GAS NATURAL EN EXPLORACIÓN DE HIDROCARBUROS
                    </Text>
                  </View>
                </View>
                {/*Encabezados 2*/}
                <View
                  style={{
                    ...styles.tableRow,
                    backgroundColor: "rgb(242,242,242)",
                  }}
                >
                  <View style={styles.tableCell}>
                    <Text style={styles.text1}>ID TEA</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.text1}>
                      Volumen de gas quemado durante Operaciones de control de
                      pozo (KPC/a){" "}
                    </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.text1}>
                      Volumen de gas quemado durante pruebas iniciales para los
                      pozos exploratorios y de avanzada (KPC/a)
                    </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.text1}>
                      Volumen de gas natural quemado durante Pruebas extensas{" "}
                    </Text>
                  </View>
                </View>
                {/*contenido 2*/}
                {teasList.map((flare) => (
                  <View style={styles.tableRow}>
                    <View style={styles.tableCell}>
                      <Text style={styles.text1}>{flare.data.flareId} </Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text style={styles.text1}>{/*flare.data.KPCoperacion*/}</Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text style={styles.text1}>{/*flare.data.KPCexploracion*/}</Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text style={styles.text1}>{/*flare.data.KPCpruebaslargas*/}</Text>
                    </View>
                  </View>
                    ))}
                {/*Titulo 3*/}
                <View
                  style={{
                    ...styles.tableRow,
                    backgroundColor: "rgb(180,198,231)",
                  }}
                >
                  <View style={styles.tableCell}>
                    <Text style={styles.text2}>
                      SECCIÓN III. QUEMA DE GAS NATURAL EN EXPLOTACIÓN DE
                      HIDROCARBUROS
                    </Text>
                  </View>
                </View>
                {/*Encabezados 3*/}
                <View style={{ ...styles.tableRow }}>
                  <View style={{ ...styles.tableRow2, width: "8%" }}>
                    <Text style={styles.text1}>ID TEA </Text>
                  </View>
                  <View style={{ ...styles.tableRow2, width: "30%" }}>
                    <View style={{ ...styles.tableCol, width: "100%" }}>
                      <View
                        style={{ ...styles.tableCell2, borderBottom: "1px" }}
                      >
                        <Text style={styles.text1}>Quema rutinaria</Text>
                      </View>
                      <View style={styles.tableCell2}>
                        <View style={{ ...styles.tableRow }}>
                          <View style={styles.tableCell}>
                            <View style={{ ...styles.tableCol, width: "100%" }}>
                              <View
                                style={{
                                  ...styles.tableCell2,
                                  borderBottom: "1px",
                                }}
                              >
                                <Text style={styles.text1}>
                                  Volumen de quema por seguridad
                                </Text>
                              </View>
                              <View style={{ ...styles.tableRow }}>
                                <View
                                  style={{
                                    ...styles.tableCell,
                                    border: "none",
                                    borderRight: "1px",
                                  }}
                                >
                                  <Text style={styles.text1}>
                                    Volumen de gas quemado por gas de purga
                                    (KPC/año)
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    ...styles.tableCell,
                                    border: "none",
                                  }}
                                >
                                  <Text style={styles.text1}>
                                    {" "}
                                    Volumen de gas quemado por pilotos (KPC/año)
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                          <View style={styles.tableCell}>
                            <Text style={styles.text1}>
                              {" "}
                              Volumen de gas quemado económinamente inviable
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={{ ...styles.tableRow2, width: "8%" }}>
                    <Text style={styles.text1}>
                      Gas de venteo intencional recolectado para quema
                    </Text>
                  </View>
                  <View style={{ ...styles.tableRow2, width: "8%" }}>
                    <Text style={styles.text1}>
                      Quema por eventos planeados
                    </Text>
                  </View>
                  <View style={{ ...styles.tableRow2, width: "38%" }}>
                    <View style={{ ...styles.tableCol, width: "100%" }}>
                      <View
                        style={{ ...styles.tableCell2, borderBottom: "1px" }}
                      >
                        <Text style={styles.text1}>
                          Quema por eventos no planeados
                        </Text>
                      </View>
                      <View style={{ ...styles.tableCell2 }}>
                        <View style={{ ...styles.tableRow }}>
                          <View
                            style={{
                              ...styles.tableCell,
                              border: "none",
                              borderRight: "1px",
                            }}
                          >
                            <Text style={styles.text1}>
                              Factor de eficiencia (Fe)
                            </Text>
                          </View>
                          <View
                            style={{
                              ...styles.tableCell,
                              border: "none",
                              borderRight: "1px",
                            }}
                          >
                            <Text style={styles.text1}>
                              Factor de reducción de quema por eventos no
                              planeados en el tiempo (Tr)
                            </Text>
                          </View>
                          <View
                            style={{
                              ...styles.tableCell,
                              border: "none",
                              borderRight: "1px",
                            }}
                          >
                            <Text style={styles.text1}>Factor F (Fe * Tr)</Text>
                          </View>
                          <View style={{ ...styles.tableCell, border: "none" }}>
                            <Text style={styles.text1}>
                              Volumen de gas quemado por eventos no planeados
                              (KPC/año)
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={{ ...styles.tableRow2, width: "8%" }}>
                    <Text style={styles.text1}>Quema por permiso puntual</Text>
                  </View>
                </View>
                {/*cONTENIDO 3*/}
                {teasList.map((flare) => (
                  <View style={{ ...styles.tableRow }}>
                    <View style={{ ...styles.tableRow3, width: "8%" }}>
                      <Text style={styles.text1}>{flare.data.flareId}</Text>
                    </View>
                    <View style={{ ...styles.tableRow3, width: "7.5%" }}>
                      <Text style={styles.text1}>{/*flare.data.quemapurga*/}</Text>
                    </View>
                    <View style={{ ...styles.tableRow3, width: "7.5%" }}>
                      <Text style={styles.text1}>{/*flare.data.quemapilotos*/}</Text>
                    </View>
                    <View style={{ ...styles.tableRow3, width: "15%" }}>
                      <Text style={styles.text1}>{/*flare.data.quema_no_viable*/}</Text>
                    </View>
                    <View style={{ ...styles.tableRow3, width: "8%" }}>
                      <Text style={styles.text1}>{/*flare.data.gasventeo*/}</Text>
                    </View>
                    <View style={{ ...styles.tableRow3, width: "8%" }}>
                      <Text style={styles.text1}>{/*flare.data.quemaeventos_planeados*/}</Text>
                    </View>
                    <View style={{ ...styles.tableRow3, width: "9.5%" }}>
                      <Text style={styles.text1}>{/*flare.data.factoreiciencia*/}</Text>
                    </View>
                    <View style={{ ...styles.tableRow3, width: "9.5%" }}>
                      <Text style={styles.text1}>{/*flare.data.factor_Reduccion*/}</Text>
                    </View>
                    <View style={{ ...styles.tableRow3, width: "9.5%" }}>
                      <Text style={styles.text1}>{/*flare.data.fe*tr*/}</Text>
                    </View>
                    <View style={{ ...styles.tableRow3, width: "9.5%" }}>
                      <Text style={styles.text1}>{/*flare.data.quema_eventos_NO_planeados*/}</Text>
                    </View>
                    <View style={{ ...styles.tableRow3, width: "8%" }}>
                      <Text style={styles.text1}>{/*flare.data.quema_PERMISO*/}</Text>
                    </View>
                  </View>
                  ))}
                {/*TITULO 4*/}
                <View
                  style={{
                    ...styles.tableRow,
                    backgroundColor: "rgb(180,198,231)",
                  }}
                >
                  <View style={styles.tableCell}>
                    <Text style={styles.text2}>
                    SECCIÓN IV. RELACIÓN DE EMISIONES DE GASES DE EFECTO INVERNADERO
                    </Text>
                  </View>
                </View>
                {/*Encabezado  4*/}
                <View style={{ ...styles.tableRow }}>
                  <View style={{ ...styles.tableRow2, width: "8%" }}>
                    <Text style={styles.text1}>ID TEA </Text>
                  </View>
                  <View style={{ ...styles.tableRow2, width: "7.5%" }}>
                    <Text style={styles.text1}> Segmento uso TEA</Text>
                  </View>
                  <View style={{ ...styles.tableRow2, width: "7.5%" }}>
                    <Text style={styles.text1}>
                      Volumen Total de Gas Quemado en TEA (KPC/año){" "}
                    </Text>
                  </View>
                  <View style={{ ...styles.tableRow2, width: "7.5%" }}>
                    <Text style={styles.text1}>Eficiencia CE (%) </Text>
                  </View>
                  <View style={{ ...styles.tableRow2, width: "7.5%" }}>
                    <Text style={styles.text1}> Eficiencia DRE metano (%)</Text>
                  </View>
                  <View style={{ ...styles.tableRow2, width: "32%" }}>
                    <View style={{ ...styles.tableCol, width: "100%" }}>
                      <View
                        style={{ ...styles.tableCell2, borderBottom: "1px" }}
                      >
                        <Text style={styles.text1}>
                          Composicion Molar representativa del gas quemado
                        </Text>
                      </View>
                      <View style={{ ...styles.tableRow }}>
                        <View style={{ ...styles.tableRow3, width: "12.5%" }}>
                          <Text style={styles.text1}>C1</Text>
                        </View>
                        <View style={{ ...styles.tableRow3, width: "12.5%" }}>
                          <Text style={styles.text1}>C2 </Text>
                        </View>
                        <View style={{ ...styles.tableRow3, width: "12.5%" }}>
                          <Text style={styles.text1}>C3 </Text>
                        </View>
                        <View style={{ ...styles.tableRow3, width: "12.5%" }}>
                          <Text style={styles.text1}>C4 </Text>
                        </View>
                        <View style={{ ...styles.tableRow3, width: "12.5%" }}>
                          <Text style={styles.text1}>C5</Text>
                        </View>
                        <View style={{ ...styles.tableRow3, width: "12.5%" }}>
                          <Text style={styles.text1}>C6+ </Text>
                        </View>
                        <View style={{ ...styles.tableRow3, width: "12.5%" }}>
                          <Text style={styles.text1}>H2 </Text>
                        </View>
                        <View style={{ ...styles.tableRow3, width: "12.5%" }}>
                          <Text style={styles.text1}>CO2</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={{ ...styles.tableRow2, width: "7.5%" }}>
                    <Text style={styles.text1}>Emisiones CO2 (tCO2/año) </Text>
                  </View>
                  <View style={{ ...styles.tableRow2, width: "7.5%" }}>
                    <Text style={styles.text1}> Emisiones CH4 (tCH4/año)</Text>
                  </View>
                  <View style={{ ...styles.tableRow2, width: "7.5%" }}>
                    <Text style={styles.text1}> Emisiones N2O (tN2O/año)</Text>
                  </View>
                  <View style={{ ...styles.tableRow2, width: "7.5%" }}>
                    <Text style={styles.text1}>
                      {" "}
                      Emisiones CO2e (tCO2e/año)
                    </Text>
                  </View>
                </View>
                {/*Contenido  4*/}
                {teasList.map((flare) => (
                  <View style={{ ...styles.tableRow }}>
                    <View style={{ ...styles.tableRow3, width: "8%" }}>
                      <Text style={styles.text1}>{flare.data.flareId} </Text>
                    </View>
                    <View style={{ ...styles.tableRow3, width: "7.5%" }}>
                      <Text style={styles.text1}>{flare.data.segment} </Text>
                    </View>
                    <View style={{ ...styles.tableRow3, width: "7.5%" }}>
                      <Text style={styles.text1}>{/*flare.data.kpca*/}</Text>
                    </View>
                    <View style={{ ...styles.tableRow3, width: "7.5%" }}>
                      <Text style={styles.text1}> {/*flare.data.eficieciaCE*/}</Text>
                    </View>
                    <View style={{ ...styles.tableRow3, width: "7.5%" }}>
                      <Text style={styles.text1}> {/*flare.data.eficieciaDRE*/}</Text>
                    </View>
                    <View style={{ ...styles.tableRow3, width: "4%" }}>
                      <Text style={styles.text1}>{flare.data.composition.C1}</Text>
                    </View>
                    <View style={{ ...styles.tableRow3, width: "4%" }}>
                      <Text style={styles.text1}>{flare.data.composition.C2}</Text>
                    </View>
                    <View style={{ ...styles.tableRow3, width: "4%" }}>
                      <Text style={styles.text1}>{flare.data.composition.C3}</Text>
                    </View>
                    <View style={{ ...styles.tableRow3, width: "4%" }}>
                      <Text style={styles.text1}>{flare.data.composition.C4}</Text>
                    </View>
                    <View style={{ ...styles.tableRow3, width: "4%" }}>
                      <Text style={styles.text1}>{flare.data.composition.C5}</Text>
                    </View>
                    <View style={{ ...styles.tableRow3, width: "4%" }}>
                      <Text style={styles.text1}>{flare.data.composition.C6}</Text>
                    </View>
                    <View style={{ ...styles.tableRow3, width: "4%" }}>
                      <Text style={styles.text1}>{flare.data.composition.N2}</Text>
                    </View>
                    <View style={{ ...styles.tableRow3, width: "4%" }}>
                      <Text style={styles.text1}>{flare.data.composition.CO2}</Text>
                    </View>
                    <View style={{ ...styles.tableRow3, width: "7.5%" }}>
                      <Text style={styles.text1}>{/*flare.data.co2año*/} </Text>
                    </View>
                    <View style={{ ...styles.tableRow3, width: "7.5%" }}>
                      <Text style={styles.text1}>{/*flare.data.CH4año*/}</Text>
                    </View>
                    <View style={{ ...styles.tableRow3, width: "7.5%" }}>
                      <Text style={styles.text1}>{/*flare.data.N2OAÑO*/}</Text>
                    </View>
                    <View style={{ ...styles.tableRow3, width: "7.5%" }}>
                      <Text style={styles.text1}>{/*flare.data.CO2eAÑO*/}</Text>
                    </View>
                  </View>
                  ))}
                <View style={{ ...styles.tableRow3, width: "100%" }}>
                  <Text style={styles.text1}>
                    {" "}
                    Adjuntar certificaciones de eficiencia de TEA, según{" "}
                  </Text>
                </View>

                {/*TITULO 5*/}
                <View
                  style={{
                    ...styles.tableRow,
                    backgroundColor: "rgb(180,198,231)",
                  }}
                >
                  <View style={styles.tableCell}>
                    <Text style={styles.text2}>
                      SECCIÓN V. DOCUMENTOS ANEXOS AL FORMATO
                    </Text>
                  </View>
                </View>
                 {/*Contenido  5*/}
                <View style={styles.tableRow}>
                  <View style={styles.tableCell}>
                    <Text style={styles.text2}> {data.annexes}</Text>
                  </View>
                </View>
                 {/*TITULO 6*/}
                <View
                  style={{
                    ...styles.tableRow,
                    backgroundColor: "rgb(180,198,231)",
                  }}
                >
                  <View style={styles.tableCell}>
                    <Text style={styles.text2}>SECCIÓN VI. OBSERVACIONES</Text>
                  </View>
                </View>
                 {/*contenido 6*/}
                <View style={styles.tableRow}>
                  <View style={styles.tableCell}>
                    <Text style={{ textAlign: "center" }}> </Text>
                  </View>
                </View>
                 {/*TITULO 7*/}
                <View
                  style={{
                    ...styles.tableRow,
                    backgroundColor: "rgb(180,198,231)",
                  }}
                >
                  <View style={styles.tableCell}>
                    <Text style={styles.text2}>SECCIÓN VII. RESPONSABLES</Text>
                  </View>
                </View>
                {/*contenido 7*/}
                <View style={styles.tableRow}>
                  <View style={styles.tableCell}>
                    <Text style={{ textAlign: "center" }}>
                      Nombre del Responsable Técnico Operadora
                    </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={{ textAlign: "center" }}>
                      Firma del Responsable Técnico Operadora
                    </Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableCell}>
                    <Text style={{ textAlign: "center" }}> {data.technicalManagerOperator}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={{ textAlign: "center" }}> </Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableCell}>
                    <Text style={{ textAlign: "center" }}>
                      Número de Tarjeta profesional:{" "}
                    </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={{ textAlign: "center" }}> </Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableCell}>
                    <Text>
                      {" "}
                      Nota: La información aquí suministrada deberá estar acorde
                      con lo establecido en la Resolución 40066 de 2022 y a la
                      Resolución 40317 de 2023 del Ministerio de Minas y Energía
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default Reporter;
