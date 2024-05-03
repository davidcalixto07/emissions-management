useEffect(() => {
    if (!data || !data.timeSerie || !data.timeSerie.length) return;

    async function fetchData() {
      const url = `/api/iottimeseries/v3/timeseries/${data.assetId
        }/GasComposition?from=${data.timeSerie[data.timeSerie.length - 1]._time
        }&sort=desc`;
      const response = await fetch(url);
      if (!response.ok) {
        console.warn(Error(`Failed to fetch data for assetId ${data.assetId}`));
        return;
      }

      const json = await response.json();
      console.log("Api response from GasComposition", json);
    }
    fetchData();

    setTimeseries(data.timeSerie);
    console.log(data);
    const tsLength = data.timeSerie.length;
    setTsTime(data.timeSerie.map((t) => t._time));

    const avgFlow =
      data.timeSerie.reduce(
        (accumulator, currentValue) => accumulator + currentValue.flow,
        0
      ) / tsLength;
    const maxflow = Math.max(...data.timeSerie.map((o) => o.flow));

    const avgTemp =
      data.timeSerie.reduce(
        (accumulator, currentValue) => accumulator + currentValue.temperature,
        0
      ) / tsLength;
    const maxtemp = Math.max(...data.timeSerie.map((o) => o.temperature));

    const avgPres =
      data.timeSerie.reduce(
        (accumulator, currentValue) => accumulator + currentValue.pressure,
        0
      ) / tsLength;
    const maxPres = Math.max(...data.timeSerie.map((o) => o.pressure));

    function calculateHoursBetweenDates(isoDate1, isoDate2) {
      const date1 = new Date(isoDate1);
      const date2 = new Date(isoDate2);
      const differenceMs = Math.abs(date2 - date1);
      const hours = differenceMs / (1000 * 60 * 60);
      return hours;
    }

    const hours = calculateHoursBetweenDates(
      data.timeSerie[0]._time,
      data.timeSerie[tsLength - 1]._time
    );

    const avgCo2 =
      data.timeSerie.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.emissions[model.toLowerCase()].C02,
        0
      ) / tsLength;
    const maxCo2 = Math.max(
      ...data.timeSerie.map((o) => o.emissions[model.toLowerCase()].C02)
    );
    const totalco2 = avgCo2 * hours * 10;

    const avgCo2eq =
      data.timeSerie.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.emissions[model.toLowerCase()].CO2e,
        0
      ) / tsLength;
    const maxCo2eq = Math.max(
      ...data.timeSerie.map((o) => o.emissions[model.toLowerCase()].CO2e)
    );
    const totalco2eq = avgCo2eq * hours * 10;
    const res = {
      flow: {
        avg: avgFlow,
        peak: maxflow,
      },
      temperature: {
        avg: avgTemp,
        peak: maxtemp,
      },
      pressure: {
        avg: avgPres,
        peak: maxPres,
      },
      CO2Emissions: {
        avg: avgCo2,
        peak: maxCo2,
        total: totalco2,
      },
      eqEmissions: {
        avg: avgCo2eq,
        peak: maxCo2eq,
        total: totalco2eq,
      },
    };

    setResults(res);
  }, [data]);