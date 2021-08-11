import {Line} from 'react-chartjs-2';
import {Dropdown} from 'react-bootstrap';
import {useState, useEffect} from 'react';

const TicketLineGraph = () => {


    const datasetsArr = [
        {
            id: 'emailLegend',
            type: 'line',
            label: 'Email',
            data: [
                80,
                75,
                120,
                110,
                170,
                140,
                160
            ],
            borderColor: '#016298',
            backgroundColor: '#016298',
            borderWidth: 2,
            fill: false,
            showLine: true,
            pointRadius: 4,
            pointBorderColor: 'rgba(0, 0, 0, 0)',
            pointBackgroundColor: 'rgba(0, 0, 0, 0)',
            pointHoverBorderColor: '#016298',
            pointHoverBackgroundColor: '#016298',
            lineTension: 0.4,
            yAxisID: 'yAxes'
        }, {
            id: 'livechatLegend',
            type: 'line',
            label: 'LiveChat',
            data: [
                102,
                124,
                126,
                142,
                153,
                149,
                105
            ],
            borderColor: '#6C4181',
            backgroundColor: '#6C4181',
            borderWidth: 2,
            fill: false,
            showLine: true,
            pointRadius: 4,
            pointBorderColor: 'rgba(0, 0, 0, 0)',
            pointBackgroundColor: 'rgba(0, 0, 0, 0)',
            pointHoverBorderColor: '#6C4181',
            pointHoverBackgroundColor: '#6C4181',
            lineTension: 0.4
        }, {
            id: 'callLegend',
            type: 'line',
            label: 'Calls',
            data: [
                70,
                40,
                30,
                40,
                50,
                50,
                80
            ],
            borderColor: '#ECBA41',
            backgroundColor: '#ECBA41',
            borderWidth: 2,
            fill: false,
            showLine: true,
            pointRadius: 4,
            pointBorderColor: 'rgba(0, 0, 0, 0)',
            pointBackgroundColor: 'rgba(0, 0, 0, 0)',
            pointHoverBorderColor: '#ECBA41',
            pointHoverBackgroundColor: '#ECBA41',
            lineTension: 0.4
        }, {
            id: 'whatsappLegend',
            type: 'line',
            label: 'WhatsApp',
            data: [
                50,
                70,
                50,
                100,
                80,
                90,
                50
            ],
            borderColor: '#51B74F',
            backgroundColor: '#51B74F',
            borderWidth: 2,
            fill: false,
            showLine: true,
            pointRadius: 4,
            pointBorderColor: 'rgba(0, 0, 0, 0)',
            pointBackgroundColor: 'rgba(0, 0, 0, 0)',
            pointHoverBorderColor: '#51B74F',
            pointHoverBackgroundColor: '#51B74F',
            lineTension: 0.4
        }, {
            id: 'facebookLegend',
            type: 'line',
            label: 'Facebook',
            data: [
                101,
                99,
                119,
                144,
                127,
                123,
                105
            ],
            borderColor: '#4DCACA',
            backgroundColor: '#4DCACA',
            borderWidth: 2,
            fill: false,
            showLine: true,
            pointRadius: 4,
            pointBorderColor: 'rgba(0, 0, 0, 0)',
            pointBackgroundColor: 'rgba(0, 0, 0, 0)',
            pointHoverBorderColor: '#4DCACA',
            pointHoverBackgroundColor: '#4DCACA',
            lineTension: 0.4
        }, {
            id: 'servicePortalLegend',
            type: 'line',
            label: 'Service Portal',
            data: [
                0,
                40,
                38,
                54,
                100,
                81,
                90
            ],
            borderColor: '#C16473',
            backgroundColor: '#C16473',
            borderWidth: 2,
            fill: false,
            showLine: true,
            pointRadius: 4,
            pointBorderColor: 'rgba(0, 0, 0, 0)',
            pointBackgroundColor: 'rgba(0, 0, 0, 0)',
            pointHoverBorderColor: '#C16473',
            pointHoverBackgroundColor: '#C16473',
            lineTension: 0.4
        }
    ];

    const [allDataSet, setAllDataSet] = useState();

    useEffect(() => {
        setAllDataSet(datasetsArr.filter(({id}) => id === "whatsappLegend" || id === "facebookLegend" || id === "servicePortalLegend"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    const data = {
        labels: [
            "Mon",
            "Tues",
            "Wed",
            "Thurs",
            "Fri",
            "Sat",
            "Sun"
        ],
        datasets: allDataSet
    };

    const options = {
        scales: {
            yAxes: [
                {
                    gridLines: {
                        color: "transparent",
                        borderDash: [
                            10, 10
                        ],
                        drawBorder: false
                    },
                    ticks: {
                        stepSize: 50,
                        padding: 15
                    }
                }
            ],
            xAxes: [
                {
                    gridLines: {
                        color: "transparent",
                        borderDash: [
                            10, 10
                        ],
                        drawBorder: false,
                        drawOnChartArea: false
                    },
                    ticks: {
                        padding: 15
                    }
                }
            ]
        },
        plugins: {
            legend: {
                display: false,
                position: 'bottom'
            },
            tooltips: {
                backgroundColor: "rgba(0, 0, 0, 0.75)",
                borderColor: "rgba(0, 0, 0, 0.2)",
                borderWidth: 1,
                xPadding: 10,
                yPadding: 10
            }
        }
    };

    const [toggleInputs, setToggleInputs] = useState({
        email: false,
        livechat: false,
        call: false,
        whatsapp: true,
        facebook: true,
        serviceportal: true
    });

    console.log('toggleInputs', toggleInputs);

    const handleChartToggle = e => {
        console.log("toggle was changed");

        const {id, checked, value, name} = e.target;
        const elemId = id;

        console.log("checked", checked);
        console.log("value", value);
        console.log('id', elemId);


        if (checked) {
            if (!allDataSet.find(dataset => dataset.id === elemId)) {
                setAllDataSet([...allDataSet, datasetsArr.find(dataset => dataset.id === elemId)]);
                setToggleInputs(prev => ({...prev, [name]: true}));
            } else {
                setToggleInputs(prev => ({...prev, [name]: true}));
            }
        } else {
            setAllDataSet(allDataSet.filter(dataset => dataset.id !== elemId));
            setToggleInputs(prev => ({...prev, [name]: false}));
        }

    } 

    return (
        <div>
            <div className="dashboard-box-top px-2 py-3">
                <div>Ticket Sources</div>
                <div>
                    <Dropdown id="cust-table-dropdown" className="ticket-status-dropdown">
                        <Dropdown.Toggle variant="transparent" size="sm">
                            <span className="">Days</span>
                            <i className="bi bi-chevron-expand"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="1">
                                <span className="black-text">--</span>
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="2">
                                <span className="black-text">--</span>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <div className="tclinegraph-wrapper">
                {allDataSet && <Line data={data} options={options} height={130}/>}
            </div>
            {/*  Line graph check and legend */}
            <div
                className="d-flex justify-content-center align-items-center flex-wrap mt-0">
                {/* Email legend */}
                <div className="mx-3 my-2">
                    <div className="form-check form-switch d-flex justify-content-center">
                        <input
                            className="legendInput legend-input form-check-input form-check-input-lg mt-1"
                            type="checkbox"
                            onChange={handleChartToggle}
                            id="emailLegend"
                            name="email"
                            checked={toggleInputs.email}
                            />
                    </div>
                    <div className="text-center">
                        <span className="legend-circle legend-bg-blue"></span>&nbsp;Email
                    </div>
                </div>

                {/*  Livechat legend */}
                <div className="mx-3 my-2">
                    <div className="form-check form-switch d-flex justify-content-center">
                        <input
                            className="legendInput legend-input form-check-input form-check-input-lg mt-1"
                            type="checkbox"
                            onChange={handleChartToggle}
                            id="livechatLegend"
                            name="livechat"
                            checked={toggleInputs.livechat}
                            />
                    </div>
                    <div className="text-center">
                        <span className="legend-circle legend-bg-purple"></span>&nbsp;LiveChat
                    </div>
                </div>

                {/* calls legend */}
                <div className="mx-3 my-2">
                    <div className="form-check form-switch d-flex justify-content-center">
                        <input
                            className="legendInput legend-input form-check-input form-check-input-lg mt-1"
                            type="checkbox"
                            onChange={handleChartToggle}
                            id="callLegend"
                            name="call"
                            checked={toggleInputs.call}
                            />
                    </div>
                    <div className="text-center">
                        <span className="legend-circle legend-bg-yellow"></span>&nbsp;Call
                    </div>
                </div>

                {/* Whatsapp legend */}
                <div className="mx-3 my-2">
                    <div className="form-check form-switch d-flex justify-content-center">
                        <input
                            className="legendInput legend-input form-check-input form-check-input-lg mt-1"
                            type="checkbox"
                            onChange={handleChartToggle}
                            id="whatsappLegend"
                            name="whatsapp"
                            checked={toggleInputs.whatsapp}
                            />
                    </div>
                    <div className="text-center">
                        <span className="legend-circle legend-bg-green"></span>&nbsp;WhatsApp
                    </div>
                </div>

                {/*  Facebook legend  */}
                <div className="mx-3 my-2">
                    <div className="form-check form-switch d-flex justify-content-center">
                        <input
                            className="legendInput legend-input form-check-input form-check-input-lg mt-1"
                            type="checkbox"
                            onChange={handleChartToggle}
                            id="facebookLegend"
                            name="facebook"
                            checked={toggleInputs.facebook}
                            />
                    </div>
                    <div className="text-center">
                        <span className="legend-circle legend-bg-blue-light"></span>&nbsp;Facebook
                    </div>
                </div>

                {/* <!-- Service Portal legend --> */}
                <div className="mx-3 my-2">
                    <div className="form-check form-switch d-flex justify-content-center">
                        <input
                            className="legendInput legend-input form-check-input form-check-input-lg mt-1"
                            type="checkbox"
                            onChange={handleChartToggle}
                            id="servicePortalLegend"
                            name="serviceportal"
                            checked={toggleInputs.serviceportal}
                            />
                    </div>
                    <div className="text-center">
                        <span className="legend-circle legend-bg-red"></span>&nbsp;Service Portal
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TicketLineGraph
