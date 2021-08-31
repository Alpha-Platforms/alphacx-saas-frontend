import {useState} from 'react';
import {connect} from 'react-redux';

const TicketSettingsTab = ({statuses}) => {

    const [changesMade, setChangesMade] = useState(false);
    const [tabInputs, setTabInputs] = useState({
        distribution: '',
        autoclose: ''
    })

    const gtcCol = ({gridTemplateColumns: "210px 1fr"});

    const handleInputChange = e => {
        const {name, value} = e.target;
        setTabInputs(prev => ({
            ...prev,
            [name]: value
        }));
        !changesMade && setChangesMade(true);
    }

    return (
        <div className="my-3 mt-4">
            <div className="col-md-8">
                <div className="ticket-dist-row1">
                    <div className="">
                        <div>
                            <label htmlFor="ticket-distribution" className="form-label">Ticket Distribution:</label>
                        </div>
                        <div>
                            <select
                                name="distribution"
                                id="ticket-distribution"
                                className="form-select"
                                defaultValue="load-balancer"
                                value={tabInputs.distributon}
                                onChange={handleInputChange}
                                aria-label="Default select example">
                                <option selected></option>
                                <option value="load-balancer">Load Balancer</option>
                                <option value="round-robin">Round Robin</option>
                            </select>
                        </div>
                    </div>

                    <div className="">
                        <div>
                            <label htmlFor="ticket-closes" className="form-label">Ticket autoclose after</label>
                        </div>
                        <div
                            style={{ width: '8.5rem'}}
                            id="ticket-closes-wrapper"
                            className="position-relative ticket-closes-wrapper">
                            <input
                                name="autoclose"
                                type="number"
                                className="form-control d-inline-block"
                                id="ticket-closes"
                                value={tabInputs.autoclose}
                                onChange={handleInputChange}
                                placeholder="30"/>
                            <span>Days</span>
                        </div>
                    </div>
                </div>

                <div id="changeActionBtn" className="text-end mt-4">
                    {changesMade && <button
                        type="button"
                        className="btn btn-sm bg-at-blue-light text-white px-4"
                        data-bs-toggle="modal"
                        data-bs-dismiss="modal"
                        data-bs-target="#ticketCreated">Save Changes</button>}
                </div>

            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({statuses: state.status.statuses});

export default connect(mapStateToProps, null)(TicketSettingsTab);
