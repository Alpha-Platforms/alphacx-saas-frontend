// @ts-nocheck
import {Line} from 'react-chartjs-2';
import {Dropdown} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import moment from 'moment';

const TicketLineGraph = ({analytics}) => {

    window.acxTickets = analytics?.allTickets;

    const emailTickets = analytics?.allTickets?.filter(x => x.channel === 'email') || [];
    const facebookTickets = analytics?.allTickets?.filter(x => x.channel === 'facebook') || [];
    const whatsappTickets = analytics?.allTickets?.filter(x => x.channel === 'whatsapp') || [];
    const helpdeskTickets = analytics?.allTickets?.filter(x => x.channel === 'helpdesk') || [];
    const systemTickets = analytics?.allTickets?.filter(x => x.channel === 'system') || [];
    const callTickets = analytics?.allTickets?.filter(x => x.channel === 'call') || [];
    const liveChatTickets = analytics?.allTickets?.filter(x => x.channel === 'livechat') || [];
    const servicePortalTickets = analytics?.allTickets?.filter(x => x.channel === 'service_portal') || [];


    const getDayDate = (daysBack) => {
        const date = new Date();
        return new Date(date.getTime() - (daysBack * 24 * 60 * 60 * 1000));
    }
    

    const todaysDate = new Date();

    console.log('todays date: ', todaysDate);
    console.log('yesterday', getDayDate(1));
    console.log('2 days back', getDayDate(2));

    // console.log('emailTicket Dates', emailTickets.map(x => moment(x.created_at).format('DD/MM/YYYY')));


    const datasetsArr = [
        {
            id: 'emailLegend',
            type: 'line',
            label: 'Email',
            // data: [
            //     80,
            //     75,
            //     120,
            //     110,
            //     170,
            //     140,
            //     160
            // ],
            data: [
                emailTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(7)).format('DD/MM/YYYY')).length || 0,
                emailTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(6)).format('DD/MM/YYYY')).length || 0,
                emailTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(5)).format('DD/MM/YYYY')).length || 0,
                emailTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(4)).format('DD/MM/YYYY')).length || 0,
                emailTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(3)).format('DD/MM/YYYY')).length || 0,
                emailTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(2)).format('DD/MM/YYYY')).length || 0,
                emailTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(1)).format('DD/MM/YYYY')).length || 0
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
                liveChatTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(7)).format('DD/MM/YYYY')).length || 0,
                liveChatTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(6)).format('DD/MM/YYYY')).length || 0,
                liveChatTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(5)).format('DD/MM/YYYY')).length || 0,
                liveChatTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(4)).format('DD/MM/YYYY')).length || 0,
                liveChatTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(3)).format('DD/MM/YYYY')).length || 0,
                liveChatTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(2)).format('DD/MM/YYYY')).length || 0,
                liveChatTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(1)).format('DD/MM/YYYY')).length || 0
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
                callTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(7)).format('DD/MM/YYYY')).length || 0,
                callTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(6)).format('DD/MM/YYYY')).length || 0,
                callTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(5)).format('DD/MM/YYYY')).length || 0,
                callTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(4)).format('DD/MM/YYYY')).length || 0,
                callTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(3)).format('DD/MM/YYYY')).length || 0,
                callTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(2)).format('DD/MM/YYYY')).length || 0,
                callTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(1)).format('DD/MM/YYYY')).length || 0
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
                whatsappTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(7)).format('DD/MM/YYYY')).length || 0,
                whatsappTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(6)).format('DD/MM/YYYY')).length || 0,
                whatsappTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(5)).format('DD/MM/YYYY')).length || 0,
                whatsappTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(4)).format('DD/MM/YYYY')).length || 0,
                whatsappTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(3)).format('DD/MM/YYYY')).length || 0,
                whatsappTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(2)).format('DD/MM/YYYY')).length || 0,
                whatsappTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(1)).format('DD/MM/YYYY')).length || 0
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
                facebookTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(7)).format('DD/MM/YYYY')).length || 0,
                facebookTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(6)).format('DD/MM/YYYY')).length || 0,
                facebookTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(5)).format('DD/MM/YYYY')).length || 0,
                facebookTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(4)).format('DD/MM/YYYY')).length || 0,
                facebookTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(3)).format('DD/MM/YYYY')).length || 0,
                facebookTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(2)).format('DD/MM/YYYY')).length || 0,
                facebookTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(1)).format('DD/MM/YYYY')).length || 0
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
                systemTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(7)).format('DD/MM/YYYY')).length || 0,
                systemTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(6)).format('DD/MM/YYYY')).length || 0,
                systemTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(5)).format('DD/MM/YYYY')).length || 0,
                systemTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(4)).format('DD/MM/YYYY')).length || 0,
                systemTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(3)).format('DD/MM/YYYY')).length || 0,
                systemTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(2)).format('DD/MM/YYYY')).length || 0,
                systemTickets.filter(x => moment(x.created_at).format('DD/MM/YYYY') === moment(getDayDate(1)).format('DD/MM/YYYY')).length || 0
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
        // labels: [
        //     "Mon",
        //     "Tues",
        //     "Wed",
        //     "Thu",
        //     "Fri",
        //     "Sat",
        //     "Sun"
        // ],
        labels: [
            moment(getDayDate(7)).format('ddd'),
            moment(getDayDate(6)).format('ddd'),
            moment(getDayDate(5)).format('ddd'),
            moment(getDayDate(4)).format('ddd'),
            moment(getDayDate(3)).format('ddd'),
            moment(getDayDate(2)).format('ddd'),
            moment(getDayDate(1)).format('ddd')
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

    const handleChartToggle = e => {

        const {id, checked, name} = e.target;
        const elemId = id;


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
                    {/* <Dropdown id="cust-table-dropdown" className="ticket-status-dropdown">
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
                    </Dropdown> */}
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
