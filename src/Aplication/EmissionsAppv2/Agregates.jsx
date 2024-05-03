export function agregateTs(series) {
    const aggregatedValues = {};

    series.forEach(({ _time, ...rest }) => {
        const minute = _time.substring(0, 16); // Considering only up to minutes (HH:mm)

        if (!aggregatedValues[minute]) {
            aggregatedValues[minute] = { count: 0, sum: {} };
        }

        aggregatedValues[minute].count++;

        for (const key in rest) {
            if (Object.prototype.hasOwnProperty.call(rest, key)) {
                if (typeof rest[key] === 'object') {
                    if (!aggregatedValues[minute].sum[key]) {
                        aggregatedValues[minute].sum[key] = {};
                    }
                    for (const subKey in rest[key]) {
                        if (Object.prototype.hasOwnProperty.call(rest[key], subKey)) {
                            aggregatedValues[minute].sum[key][subKey] = (aggregatedValues[minute].sum[key][subKey] || 0) + rest[key][subKey];
                        }
                    }
                } else {
                    aggregatedValues[minute].sum[key] = (aggregatedValues[minute].sum[key] || 0) + rest[key];
                }
            }
        }
    });

    const result = Object.entries(aggregatedValues).map(([minute, { count, sum }]) => {
        const averageValues = {};
        for (const key in sum) {
            if (Object.prototype.hasOwnProperty.call(sum, key)) {
                if (typeof sum[key] === 'object') {
                    averageValues[key] = {};
                    for (const subKey in sum[key]) {
                        if (Object.prototype.hasOwnProperty.call(sum[key], subKey)) {
                            averageValues[key][subKey] = sum[key][subKey] / count;
                        }
                    }
                } else {
                    averageValues[key] = sum[key] / count;
                }
            }
        }
        return { _time: minute, ...averageValues };
    });

    return result;
}

export function addTs(...arrays) {
    console.log("Merging", arrays);
    const uniqueTimes = {};

    arrays.forEach(inner_arrays => {
        inner_arrays.forEach(array => {
            array.forEach(({ _time, ...values }) => {
                if (uniqueTimes[_time]) {
                    for (const key in values) {
                        if (Object.prototype.hasOwnProperty.call(values, key)) {
                            if (uniqueTimes[_time][key]) {
                                uniqueTimes[_time][key] += values[key];
                            } else {
                                uniqueTimes[_time][key] = values[key];
                            }
                        }
                    }
                }
                else {
                    uniqueTimes[_time] = { ...values };
                }
            })
        })
    });
    const mergedTimes = Object.keys(uniqueTimes).map(_time => ({ _time, ...uniqueTimes[_time] }));
    console.log(mergedTimes);
    return mergedTimes;
}
