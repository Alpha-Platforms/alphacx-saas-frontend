import {useState} from 'react';
import {ReactComponent as HamburgerSvg} from '../../../../../assets/icons/hamburger.svg';
// import {ReactComponent as FormMinusSvg} from '../../../../../assets/icons/form-minus.svg';
import {ReactComponent as DeleteGreySvg} from '../../../../../assets/icons/Delete-grey.svg';
import {ReactComponent as EditGreySvg} from '../../../../../assets/icons/Edit-grey.svg';
import {connect} from 'react-redux';
import AddStatusModal from './AddStatusModal';

const TicketSettingsTab = ({statuses}) => {

    const gtcCol = ({gridTemplateColumns: "210px 1fr"});
    const [addModalShow, setAddModalShow] = useState(false);

    return (
        <div className="my-3 mt-4">
            <div className="w-75">
                <div style={gtcCol} className="mb-4 d-grid align-items-center">
                    <div>
                        <label htmlFor="ticket-distribution" className="form-label d-inline-block">Ticket Distribution:</label>
                    </div>
                    <div>
                        <select
                            name="ticket-distribution"
                            id="ticket-distribution"
                            className="form-select"
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
                            name="ticket-closes"
                            type="text"
                            className="form-control d-inline-block w-25"
                            id="ticket-closes"
                            placeholder="30"/>&nbsp;&nbsp;<span>days of reply.</span>
                    </div>
                </div>

                <div style={gtcCol} className="mb-4 mt-4 d-grid align-items-start">
                    <div>
                        <label htmlFor="ticket-supplt" className="form-label d-inline-block">Ticket Status:</label>
                    </div>
                    <div>
                        <div>
                            <div className="text-center ">
                                <div className="fieldsWrapper pb-3" id="ticketFieldWrapper">

                                    {statuses && statuses.map(({status}, idx) => <div key={idx} className="fieldParent d-flex my-2">
                                        <button
                                            type="button"
                                            className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                                            <HamburgerSvg />
                                        </button>
                                        <div className="w-100 d-flex align-items-center justify-content-between ps-4">
                                            <span>{status}</span>
                                            <span></span>

                                        </div>
                                        <div className="d-flex">
                                            <button
                                                type="button"
                                                className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0">
                                                <EditGreySvg />
                                            </button>
                                            <button
                                                type="button"
                                                className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0">
                                                <DeleteGreySvg />
                                            </button>
                                        </div>
                                    </div>)}

                                </div>

                                <div className="text-start mt-2">
                                    <button
                                        className="btn btn-link text-decoration-none text-at-blue-light" onClick={() => setAddModalShow(true)}>+ Add Status</button>
                                </div>

                                <div id="changeActionBtn" className="text-end mt-4 d-none">
                                    <button
                                        id="discardChangesBtn"
                                        style={{
                                        border: "1px solid var(--at-blue-light)"
                                    }}
                                        type="button"
                                        className="btn btn-outline btn-sm px-3 me-3 text-at-blue-light">Discard Changes</button>
                                    <button
                                        type="button"
                                        className="btn btn-sm bg-at-blue-light text-white px-4"
                                        data-bs-toggle="modal"
                                        data-bs-dismiss="modal"
                                        data-bs-target="#ticketCreated">Save Changes</button>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <AddStatusModal createModalShow={addModalShow} setCreateModalShow={setAddModalShow} />
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    statuses: state.status.statuses
});

export default connect(mapStateToProps, null)(TicketSettingsTab);
