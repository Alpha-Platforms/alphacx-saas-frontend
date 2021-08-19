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
            <div className="w-75">
                <div style={gtcCol} className="mb-4 d-grid align-items-center">
                    <div>
                        <label htmlFor="ticket-distribution" className="form-label d-inline-block">Ticket Distribution:</label>
                    </div>
                    <div>
                        <select
                            name="distribution"
                            id="ticket-distribution"
                            className="form-select"
                            value={tabInputs.distributon}
                            onChange={handleInputChange}
                            aria-label="Default select example">
                            <option selected></option>
                            <option value="cherry-picking">Cherry Picking</option>
                            <option value="efficient">Efficient</option>
                            <option value="least-busy">Least Busy</option>
                            <option value="manual">Manual</option>
                            <option value="round-robin">Round Robin</option>
                        </select>
                    </div>
                </div>

                <div style={gtcCol} className="mb-4 d-grid align-items-center">
                    <div>
                        <label htmlFor="ticket-closes" className="form-label d-inline-block">Ticket autoclose after</label>
                    </div>
                    <div
                        id="ticket-closes-wrapper"
                        className="position-relative"
                        data-side-text="days of reply.">
                        <input
                            name="autoclose"
                            type="text"
                            className="form-control d-inline-block w-25"
                            id="ticket-closes"
                            value={tabInputs.autoclose}
                            onChange={handleInputChange}
                            placeholder="30"/>&nbsp;&nbsp;<span>days of reply.</span>
                    </div>
                </div>

                <div id="changeActionBtn" className="text-end mt-4">
                    {/* <button
                        id="discardChangesBtn"
                        style={{
                        border: "1px solid var(--at-blue-light)"
                    }}
                        type="button"
                        className="btn btn-outline btn-sm px-3 me-3 text-at-blue-light">Discard Changes</button> */}
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
