/* eslint-disable */
// @ts-nocheck
import { Pie } from 'react-chartjs-2';

function TicketStatusPie({ newAnalytics }) {
    const getColors = (statuses) => {
        const colors = [];
        let start = 23;
        const interval = Math.floor((100 - start) / statuses?.length);

        for (let i = 0; i < statuses?.length; i++) {
            colors.push(`hsl(240, 100%, ${start}%)`);
            start += interval;
        }

        return colors;
    };

    // const values = [25, 5, 20, 18];
    const values = newAnalytics?.allStatus?.slice(0, 5)?.map((status) => status?.__meta__?.ticket_count);
    // const colors = ["#D1E8FF", "#1E90FF", "#0707ED", "#000080"];
    const colors = getColors(newAnalytics?.allStatus?.slice(0, 5) || []);
    // const labels = ["Open", "In Progress", "Pending", "Closed"];
    const labels = newAnalytics?.allStatus?.slice(0, 5)?.map((status) => status);

    const data = {
        // labels: ["Open", "Pending", "Closed", "In Progress"],
        datasets: [
            {
                // label: "# of Votes",
                data: values,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <div className="dashboard-box-top my-3 px-2">
                <div>Conversation status</div>
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
                                position: 'right',
                            },
                            datalabels: {
                                display: true,
                                color: 'white',
                            },
                            tooltips: {
                                backgroundColor: '#5a6e7f',
                            },
                        }}
                    />
                </div>

                <div className="details">
                    {labels.map((label, i) => (
                        <div className="detail mb-3" key={i}>
                            <div
                                className="dot"
                                style={{
                                    backgroundColor: colors[i],
                                }}
                            />
                            <p className="mb-0">{`${label?.status} (${label?.__meta__?.ticket_count})`}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TicketStatusPie;
