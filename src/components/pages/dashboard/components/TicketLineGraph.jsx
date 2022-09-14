/* eslint-disable react/prop-types */
// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { css } from '@emotion/css';
import { textCapitalize } from '../../../../helper';

function TicketLineGraph({ newAnalytics, brandingBg }) {
    // top 6 channels available in current tenant
    const allChannels = newAnalytics?.allChannels?.slice(0, 6)?.map((channel) => channel?.name);

    const channelData = newAnalytics?.channelsDeltaDaysTicketsCounts;

    const lineColors = ['#016298', '#6C4181', '#ECBA41', '#51B74F', '#4DCACA', '#C16473'];

    const legendColorClassNames = [
        'legend-bg-blue',
        'legend-bg-purple',
        'legend-bg-yellow',
        'legend-bg-green',
        'legend-bg-blue-light',
        'legend-bg-red',
    ];

    const datasetsArr = Array.isArray(allChannels)
        ? allChannels?.map((channel, idx) => {
              return {
                  id: `${channel}Legend`,
                  type: 'line',
                  label: textCapitalize(channel),
                  data: Array.isArray(channelData)
                      ? channelData?.map((data) =>
                            Number(
                                data?.counts?.find((item) => item?.name?.toLowerCase() === channel.toLowerCase())
                                    ?.__meta__?.ticket_count ?? 0,
                            ),
                        )
                      : [],
                  borderColor: lineColors[idx],
                  backgroundColor: lineColors[idx],
                  borderWidth: 2,
                  fill: false,
                  showLine: true,
                  pointRadius: 4,
                  pointBorderColor: 'rgba(0, 0, 0, 0)',
                  pointBackgroundColor: 'rgba(0, 0, 0, 0)',
                  pointHoverBorderColor: lineColors[idx],
                  pointHoverBackgroundColor: lineColors[idx],
                  lineTension: 0.4,
              };
          })
        : [];

    const numOfDefaultActiveLine = Math.ceil(Number(allChannels.length) / 2);

    const [allDataSet, setAllDataSet] = useState([]);

    const data = {
        labels: Array.isArray(channelData)
            ? channelData?.map((item) => textCapitalize(item?.day?.slice(0, 3) ?? ''))
            : [],
        datasets: allDataSet,
    };

    const options = {
        scales: {
            yAxes: [
                {
                    gridLines: {
                        color: 'transparent',
                        borderDash: [10, 10],
                        drawBorder: false,
                    },
                    ticks: {
                        stepSize: 50,
                        padding: 15,
                    },
                },
            ],
            xAxes: [
                {
                    gridLines: {
                        color: 'transparent',
                        borderDash: [10, 10],
                        drawBorder: false,
                        drawOnChartArea: false,
                    },
                    ticks: {
                        padding: 15,
                    },
                },
            ],
        },
        plugins: {
            legend: {
                display: false,
                position: 'bottom',
            },
            tooltips: {
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                borderColor: 'rgba(0, 0, 0, 0.2)',
                borderWidth: 1,
                xPadding: 10,
                yPadding: 10,
            },
        },
    };

    const defaultToggleInputs = Array.isArray(allChannels)
        ? allChannels?.reduce(
              (prev, _, idx, channels) => ({ ...prev, [channels[idx]]: idx > numOfDefaultActiveLine - 1 }),
              {},
          )
        : [];

    const [toggleInputs, setToggleInputs] = useState({});

    useEffect(() => {
        setAllDataSet(datasetsArr.slice(-1 * Number(allChannels.length - numOfDefaultActiveLine)));
        setToggleInputs(defaultToggleInputs);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChartToggle = (e) => {
        const { id, checked, name } = e.target;
        const elemId = id;

        if (checked) {
            if (!allDataSet.find((dataset) => dataset.id === elemId)) {
                setAllDataSet([...allDataSet, datasetsArr.find((dataset) => dataset.id === elemId)]);
                setToggleInputs((prev) => ({ ...prev, [name]: true }));
            } else {
                setToggleInputs((prev) => ({ ...prev, [name]: true }));
            }
        } else {
            setAllDataSet(allDataSet.filter((dataset) => dataset.id !== elemId));
            setToggleInputs((prev) => ({ ...prev, [name]: false }));
        }
    };

    return (
        <div>
            <div className="dashboard-box-top ps-2 pt-3">
                <div>Conversation Sources</div>
            </div>
            {/*  Line graph check and legend */}
            <div className="d-flex justify-content-center align-items-center flex-wrap mt-0">
                {/* ALL TOGGLE */}
                {(Array.isArray(allChannels) ? allChannels : [])?.map((channel, idx) => (
                    <div className="mx-3 my-2">
                        <div className="form-check form-switch d-flex justify-content-center">
                            <input
                                className={`legendInput legend-input form-check-input form-check-input-lg mt-1 ${css({
                                    '&:checked': { ...brandingBg },
                                })}`}
                                type="checkbox"
                                onChange={handleChartToggle}
                                id={`${channel}Legend`}
                                name={channel}
                                checked={toggleInputs[channel]}
                            />
                        </div>
                        <div className="text-center">
                            <span className={`legend-circle ${legendColorClassNames[idx]}`} />
                            &nbsp;{textCapitalize(channel)}
                        </div>
                    </div>
                ))}
            </div>

            <div className="tclinegraph-wrapper">
                {allDataSet && <Line data={data} options={options} height={130} />}
            </div>
        </div>
    );
}

export default TicketLineGraph;
