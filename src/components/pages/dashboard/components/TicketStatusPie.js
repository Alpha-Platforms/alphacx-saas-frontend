// @ts-nocheck
import {Pie} from 'react-chartjs-2';
import {Dropdown} from 'react-bootstrap';
import {connect } from 'react-redux';

const TicketStatusPie = ({statuses, analytics}) => {

    const getColors = (statuses) => {
        const colors = [];
        let start = 23;
        const interval = Math.floor((100 - start) / statuses.length);

        for (let i = 0; i < statuses.length; i++) {
            colors.push(`hsl(240, 100%, ${start}%)`);
            start = start + interval;
        }

        return colors;
    }

    // const values = [25, 5, 20, 18];
    const values = statuses?.slice(0, 4).map(sta => analytics?.allTickets?.filter(x => x.status_id === sta.id).length || 0);
    // const colors = ["#D1E8FF", "#1E90FF", "#0707ED", "#000080"];
    const colors = getColors(statuses?.slice(0, 4));
    // const labels = ["Open", "In Progress", "Pending", "Closed"];
    const labels = statuses?.slice(0, 4)?.map(sta => sta?.status);


    const data = {
        // labels: ["Open", "Pending", "Closed", "In Progress"],
        datasets: [
            {
                // label: "# of Votes",
                data: values,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1
            }
        ]
    };

    return (
        <div>
            <div className="dashboard-box-top my-3 px-2">
                <div>
                    Ticket status
                </div>
                <div>
                    {/* <Dropdown id="cust-table-dropdown" className="ticket-status-dropdown">
                        <Dropdown.Toggle variant="transparent" size="sm">
                            <span className="">Days</span> <i className="bi bi-chevron-expand"></i>
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

            <div className="tsp-wrapper">
                <div className="ts-pie-wrapper">
                    <Pie
                        data={data}
                        width={130}
                        height={130}
                        options={{
                        maintainAspectRatio: false,
                        legend: {
                            display: true,
                            position: "right"
                        },
                        datalabels: {
                            display: true,
                            color: "white"
                        },
                        tooltips: {
                            backgroundColor: "#5a6e7f"
                        }
                    }}/>
                </div>

                <div className="details">
                    {labels.map((label, i) => (
                        <div className="detail mb-3" key={i}>
                            <div
                                className="dot"
                                style={{
                                backgroundColor: colors[i]
                            }}></div>
                            <p className="mb-0">{label}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    statuses: state.status.statuses
})

export default connect(mapStateToProps, null)(TicketStatusPie);
