import React, { useState, useEffect, useMemo } from "react";
import { Chart, registerables } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { Line } from 'react-chartjs-2';
import '../style.css';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables, zoomPlugin);
function FindColorName(name) {
    switch (name) {
        case 'CO2':
            return '#40d040'
        case 'CO2e':
            return '#f040d0'
        case 'CH4':
            return '#d0d040'
        case 'N2':
            return '#4050d0'
        default:
            return '#0f2d57'
    }
}

const EmissionsPlot = ({ timestamps, modelsData, maintainRatio, units, maxTicks = 10, title }) => {
    const [hiddenDatasets, setHiddenDatasets] = useState({});

    const handleLegendClick = (e, legendItem) => {
        const datasetLabel = legendItem.text;
        setHiddenDatasets(prevState => ({
            ...prevState,
            [datasetLabel]: !prevState[datasetLabel],
        }));
    };

    const datasets = useMemo(() => {
        const subKeys = ['value', 'upper', 'lower']
        const temp_datasets = [];
        if (modelsData.length > 0) {
            const gases = Object.keys(modelsData[0]);
            temp_datasets.push(
                {
                    label: 'efficiency',
                    data: [],
                    borderColor: FindColorName('efficiency'),
                    borderWidth: 1.4,
                    fill: false,
                    pointRadius: 0.1,
                    yAxisID: 'y2',
                    hidden: hiddenDatasets['efficiency']
                }
            )
            gases.forEach((gas) => {
                if (gas != 'efficiency')
                    subKeys.forEach((key) =>
                        temp_datasets.push(
                            {
                                label: key === 'value' ? gas : '_' + gas + key,
                                data: [],
                                borderColor: FindColorName(gas) + (key != 'value' ? '40' : 'D0'),
                                backgroundColor: FindColorName(gas) + '50',
                                borderWidth: key === 'value' ? 2 : 0.2,
                                fill: key === 'upper' ? '+1' : false,
                                pointRadius: key === 'value' ? 0.3 : 0,
                                yAxisID: (gas === 'CO2' || gas === 'CO2e') ? 'y' : 'y1',
                                hidden: hiddenDatasets[gas]
                            }
                        )
                    )
            })
            modelsData.forEach((point) => {
                var index = 0;
                gases.forEach((gas) => {
                    if (gas === 'efficiency') {
                        temp_datasets[0].data.push(point[gas]);
                    }
                    else
                        subKeys.forEach((key) => {
                            index++;
                            temp_datasets[index].data.push(point[gas][key]);
                        })
                })
            })
        }
        return temp_datasets;
    }, [modelsData, hiddenDatasets])

    const data = {
        labels: timestamps,
        datasets: datasets
    }

    const chartOptions = useMemo(() => {
        return {
            responsive: true,
            maintainAspectRatio: maintainRatio ?? false,
            animation: {
                duration: 0
            },
            scales: {
                x: {
                    type: "time",
                    time: {
                        unit: "day",
                        displayFormats: {
                            hour: "MMM dd hh:mm",
                        },
                    },
                    ticks: {
                        font: {
                            size: 10,
                        },
                        autoSkip: true,
                        maxTicksLimit: maxTicks,
                    },
                },
                y: {
                    type: 'linear',
                    position: 'left',
                    beginAtZero: true,
                    title: {
                        display: units,
                        text: units ?? ""
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: {
                        drawOnChartArea: false,
                    },
                    title: {
                        display: true,
                        text: "T"
                    }
                },
                y2: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    beginAtZero: true,
                    max: 1,
                    grid: {
                        drawOnChartArea: false,
                    },
                    title: {
                        display: true,
                        text: "efficiency"
                    }
                }
            },
            plugins: {
                zoom: {
                    zoom: {
                        wheel: {
                            enabled: true,
                            modifierKey: 'ctrl'
                        },
                        drag: {
                            enabled: true,
                            modifierKey: 'shift'
                        },
                        mode: "x",
                        speed: 80
                    },
                    pan: {
                        enabled: true,
                        mode: "x",
                        speed: 0.1
                    },
                },
                legend: {
                    labels: {
                        font: {
                            size: 12
                        },
                        filter: function (legendItem, chartData) {
                            return !legendItem.text.includes('_'); // Hide legend labels containing '_'
                        }
                    },
                    onClick: handleLegendClick,
                },
                title: {
                    display: title,
                    text: title,
                }
            },
        };
    }, []);


    return (
        <Line data={data} options={chartOptions} />
    );
};

export default EmissionsPlot;
