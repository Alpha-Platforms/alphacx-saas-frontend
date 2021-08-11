import {Line} from 'react-chartjs-2';

const TicketLineGraph = () => {

    const ticketSources = {
        "chartId": "ticketSources",
        "emailData": [
            80,
            75,
            120,
            110,
            170,
            140,
            160
        ],
        "liveChatData": [
            102,
            124,
            126,
            142,
            153,
            149,
            105
        ],
        "callData": [
            70,
            40,
            30,
            40,
            50,
            50,
            80
        ],
        "whatsappData": [
            50,
            70,
            50,
            100,
            80,
            90,
            50
        ],
        "facebookData": [
            101,
            99,
            119,
            144,
            127,
            123,
            105
        ],
        "servicePortalData": [
            0,
            40,
            38,
            54,
            100,
            81,
            90
        ]
    };

    let datasetsArr = [
        {
            id: 'emailLegend',
            type: 'line',
            label: 'Email',
            data: ticketSources.emailData,
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
            data: ticketSources.liveChatData,
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
            data: ticketSources.callData,
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
            data: ticketSources.whatsappData,
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
            data: ticketSources.facebookData,
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
            data: ticketSources.servicePortalData,
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
        datasets: datasetsArr
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
    return (
        <div>
            <div className="dashboard-box-top px-2 py-3">
                <div>Ticket Sources</div>
                <div></div>
            </div>
            <div className="tclinegraph-wrapper">
                <Line data={data} options={options} height={130}/>
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
                            id="emailLegend"
                            checked="true"/>
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
                            id="livechatLegend"
                            checked="true"/>
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
                            id="callLegend"
                            checked="true"/>
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
                            id="whatsappLegend"
                            checked="true"/>
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
                            id="facebookLegend"
                            checked="true"/>
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
                            id="servicePortalLegend"
                            checked="true"/>
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
