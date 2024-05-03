import React, { useState, useEffect, useMemo } from "react";
import { Chart, registerables } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { Line } from 'react-chartjs-2';
import '../style.css';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables, zoomPlugin);

const MultiTimeseries = ({ values, label, max, zero, freeRatio, units, maxTicks = 10, title, }) => {

    const datasets = useMemo(() => {
        return values.map((element) => {
            const datavalues = element.t.map((value, index) => {
                return { x: value, y: element.v[index] };
            });

            const val = {
                label: element.label,
                data: datavalues,
                borderColor: element.color ?? '#0f2d57',
                backgroundColor: element.Bcolor ?? '#0f2d5760',
                borderWidth: 1.4,
                fill: element.f ?? false,
                pointRadius: element.pointRadius ?? 0.1,
            }
            return val;
        });
    }, [values])


    const data = { datasets: datasets }

    const chartOptions = useMemo(() => {
        return {
            responsive: true,
            maintainAspectRatio: !freeRatio ?? true,
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
                    beginAtZero: zero ? true : false,
                    max: max,
                    title: {
                        display: units ? true : false,
                        text: units ?? ""
                    }
                },
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
                        },
                    }
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

export default MultiTimeseries;
