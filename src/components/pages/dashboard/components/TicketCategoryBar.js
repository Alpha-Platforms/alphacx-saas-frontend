import {Dropdown} from 'react-bootstrap';

const TCProgressBar = ({title, value, color}) => {
    return (
        <div className="tc-progressbar">
            <div className="top-details">
                <p className="title">{title}</p>
                <p
                    className="value"
                    style={{
                    color: color
                }}>
                    {value}
                </p>
            </div>
            <div
                className="track"
                style={{
                backgroundColor: `${color}38`
            }}>
                <div
                    className="bar"
                    style={{
                    backgroundColor: color
                }}/>
            </div>
        </div>
    );
};

const TicketCategoryBar = () => {
    return (
        <div className="tcbar-wrapper">
            <div className="dashboard-box-top mb-2 pb-1">
                <div>Ticket Category</div>
                <div>
                    <Dropdown id="cust-table-dropdown" className="ticket-status-dropdown">
                        <Dropdown.Toggle variant="transparent" size="sm">
                            <span className="">Days</span>
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
            <div>
                <TCProgressBar title="Complaints" value={10} color={"#000080"}/>
                <TCProgressBar title="Enquiry" value={15} color={"#51B74F"}/>
                <TCProgressBar title="Request" value={28} color={"#F40D0D"}/>
                <TCProgressBar title="Double deduction" value={10} color={"#662D91"}/>
                <TCProgressBar title="Service pricing" value={10} color={"#0067DD"}/>
                <TCProgressBar title="Account statement" value={10} color={"#FEAE3B"}/>
            </div>
        </div>
    )
}

export default TicketCategoryBar
