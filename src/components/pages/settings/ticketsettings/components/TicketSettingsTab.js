import {ReactComponent as HamburgerSvg} from '../../../../../assets/icons/hamburger.svg';
import {ReactComponent as FormMinusSvg} from '../../../../../assets/icons/form-minus.svg';

const TicketSettingsTab = () => {

    const gtcCol = ({gridTemplateColumns: "210px 1fr"});

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

                <div>
                    <div style={gtcCol} className="mb-2 d-grid align-items-center">
                        <div>
                            <label htmlFor="ticket-id-prefix" className="form-label d-inline-block">Ticket ID Prefix:</label>
                        </div>
                        <div>
                            <input
                                name="ticket-id-prefix"
                                type="text"
                                className="form-control d-inline-block"
                                id="ticket-id-prefix"
                                placeholder="ACX/"/>
                        </div>
                    </div>
                    <div style={gtcCol} className="mb-3 d-grid align-items-center">
                        <div></div>
                        <div>
                            <span
                                id="currentYearPrefixBtn"
                                className="ticketIDPrefixBtn bg-at-blue-lighter cursor-pointer rounded-pill px-2 py-1 f-13 text-at-blue-light me-2">Current Year</span>
                            <span
                                id="currentMonthPrefixBtn"
                                className="ticketIDPrefixBtn bg-at-blue-lighter cursor-pointer rounded-pill px-2 py-1 f-13 text-at-blue-light me-2">Current Month</span>
                            <span
                                id="currentDayPrefixBtn"
                                className="ticketIDPrefixBtn bg-at-blue-lighter cursor-pointer rounded-pill px-2 py-1 f-13 text-at-blue-light me-2">Current Day</span>
                        </div>
                    </div>
                </div>

                <div style={gtcCol} className="mb-4 mt-4 d-grid align-items-center">
                    <div>
                        <label htmlFor="ticket-number-series" className="form-label d-inline-block">Ticket Number Series:</label>
                    </div>
                    <div>
                        <input
                            name="ticket-number-series"
                            type="text"
                            className="form-control d-inline-block"
                            id="ticket-number-series"
                            placeholder="00001"/>
                    </div>
                </div>

                <div style={gtcCol} className="mb-4 d-grid align-items-center">
                    <div>
                        <label htmlFor="next-ticket-number" className="form-label d-inline-block">Next ticket number starts from:</label>
                    </div>
                    <div>
                        <input
                            name="next-ticket-number"
                            type="text"
                            className="form-control d-inline-block"
                            id="next-ticket-number"
                            placeholder="0000581"/>
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
                            className="form-control d-inline-block"
                            id="ticket-closes"
                            placeholder="30"/>
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

                                    <div className="fieldParent d-flex my-2">
                                        <button
                                            type="button"
                                            className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                                            <HamburgerSvg />
                                        </button>
                                        <div className="w-100 d-flex align-items-center justify-content-between ps-4">
                                            <span>Open</span>
                                            <span></span>

                                        </div>
                                        <button
                                            onclick="deleteField(event)"
                                            type="button"
                                            className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0">
                                            <FormMinusSvg />
                                        </button>
                                    </div>

                                    <div className="fieldParent d-flex my-2">
                                        <button
                                            type="button"
                                            className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                                            <HamburgerSvg />
                                        </button>
                                        <div className="w-100 d-flex align-items-center justify-content-between ps-4">
                                            <span>Pending</span>
                                            <span></span>

                                        </div>
                                        <button
                                            onclick="deleteField(event)"
                                            type="button"
                                            className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0">
                                            <FormMinusSvg />
                                        </button>
                                    </div>

                                    <div className="fieldParent d-flex my-2">
                                        <button
                                            type="button"
                                            className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                                            <HamburgerSvg />
                                        </button>
                                        <div className="w-100 d-flex align-items-center justify-content-between ps-4">
                                            <span>In-Progress</span>
                                            <span></span>

                                        </div>
                                        <button
                                            onclick="deleteField(event)"
                                            type="button"
                                            className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0">
                                            <FormMinusSvg />
                                        </button>
                                    </div>

                                    <div className="fieldParent d-flex my-2">
                                        <button
                                            type="button"
                                            className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                                            <HamburgerSvg />
                                        </button>
                                        <div className="w-100 d-flex align-items-center justify-content-between ps-4">
                                            <span>Awaiting Customer Feedback</span>
                                            <span></span>

                                        </div>
                                        <button
                                            onclick="deleteField(event)"
                                            type="button"
                                            className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0">
                                            <FormMinusSvg />
                                        </button>
                                    </div>

                                    <div className="fieldParent d-flex my-2">
                                        <button
                                            type="button"
                                            className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                                            <HamburgerSvg />
                                        </button>
                                        <div className="w-100 d-flex align-items-center justify-content-between ps-4">
                                            <span>Closed</span>
                                            <span></span>

                                        </div>
                                        <button
                                            onclick="deleteField(event)"
                                            type="button"
                                            className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0">
                                            <FormMinusSvg />
                                        </button>
                                    </div>

                                </div>

                                <div className="text-start mt-2">
                                    <button
                                        className="btn btn-link text-decoration-none text-at-blue-light"
                                        data-bs-toggle="modal"
                                        data-bs-target="#addFieldModal">+ Add or Edit Status</button>
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
        </div>
    )
}

export default TicketSettingsTab;
