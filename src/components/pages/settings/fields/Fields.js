import {useState} from 'react';
import '../../../../styles/Setting.css';
import {Tabs, Tab} from 'react-bootstrap';
import {ReactComponent as HamburgerSvg} from '../../../../assets/icons/hamburger.svg';
import {ReactComponent as FormMinusSvg} from '../../../../assets/icons/form-minus.svg';
import {ReactComponent as FormMinusNeutralSvg} from '../../../../assets/icons/form-minus-neutral.svg';
import {Modal} from 'react-bootstrap';
// import {Link} from 'react-router-dom';

const Fields = () => {
    const [tabKey,
        setTabKey] = useState('contact-field');
    const [addModalShow,
        setAddModalShow] = useState(false);

    return (
        <div>
            <div className="card card-body bg-white border-0 p-5">
                <div id="mainContentHeader">
                    <span className="text-muted f-14">
                        Settings
                        <i className="bi bi-chevron-right"></i>
                        <span className="text-custom">Fields</span>
                    </span>
                </div>

                <div className="mt-4">
                    <ul className="nav nav-pills" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${ (tabKey === 'contact-field') && 'active'} text-muted`}
                                id="pills-customer-tab"
                                type="button"
                                role="tab"
                                onClick={() => setTabKey('contact-field')}
                                aria-controls="customer-field-view"
                                aria-selected="true">Contact Field</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${ (tabKey === 'ticket-field') && 'active'} text-muted`}
                                id="pills-ticket-tab"
                                onClick={() => setTabKey('ticket-field')}
                                type="button"
                                role="tab"
                                aria-controls="ticket-field-view"
                                aria-selected="false">Ticket Field</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${ (tabKey === 'user-field') && 'active'} text-muted`}
                                id="pills-user-tab"
                                onClick={() => setTabKey('user-field')}
                                type="button"
                                role="tab"
                                aria-controls="user-field-view"
                                aria-selected="false">User Field</button>
                        </li>
                    </ul>
                </div>

                <div className="field-tab-wrapper">
                    {/* Ticket History Tab */}
                    <Tabs
                        id="fieldTabs"
                        activeKey={tabKey}
                        onSelect={(k) => setTabKey(k)}
                        className="mb-3">
                        <Tab eventKey="contact-field" className="px-2">
                            <div>

                                <div className="border border-1 w-75 p-5 mt-3">
                                    <div className="text-center py-4">
                                        <div className="fieldsWrapper pb-3" id="customerFieldWrapper">
                                            <div className="fieldParent d-flex my-2">
                                                <button
                                                    type="button"
                                                    className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                                                    <HamburgerSvg/>
                                                </button>
                                                <div className="w-100 d-flex align-items-center justify-content-between ps-4">
                                                    <span>First Name</span>
                                                    <span>Required</span>

                                                </div>
                                                <button
                                                    type="button"
                                                    className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0">
                                                    <FormMinusNeutralSvg/>

                                                </button>
                                            </div>

                                            <div className="fieldParent d-flex my-2">
                                                <button
                                                    type="button"
                                                    className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                                                    <HamburgerSvg/>
                                                </button>
                                                <div className="w-100 d-flex align-items-center justify-content-between ps-4">
                                                    <span>Last Name</span>
                                                    <span>Required</span>

                                                </div>
                                                <button
                                                    type="button"
                                                    className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0">
                                                    <FormMinusNeutralSvg/>

                                                </button>
                                            </div>

                                            <div className="fieldParent d-flex my-2">
                                                <button
                                                    type="button"
                                                    className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                                                    <HamburgerSvg/>
                                                </button>
                                                <div className="w-100 d-flex align-items-center justify-content-between ps-4">
                                                    <span>Title</span>
                                                    <span>Required</span>

                                                </div>
                                                <button
                                                    type="button"
                                                    className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0">
                                                    <FormMinusNeutralSvg/>

                                                </button>
                                            </div>

                                            <div className="fieldParent d-flex my-2">
                                                <button
                                                    type="button"
                                                    className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                                                    <HamburgerSvg/>
                                                </button>
                                                <div className="w-100 d-flex align-items-center justify-content-between ps-4">
                                                    <span>Email Address</span>
                                                    <span>Required</span>

                                                </div>
                                                <button
                                                    type="button"
                                                    className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0">
                                                    <FormMinusNeutralSvg/>

                                                </button>
                                            </div>

                                            <div className="fieldParent d-flex my-2">
                                                <button
                                                    type="button"
                                                    className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                                                    <HamburgerSvg/>
                                                </button>
                                                <div className="w-100 d-flex align-items-center justify-content-between ps-4">
                                                    <span>Company</span>
                                                    <span>Required</span>

                                                </div>
                                                <button
                                                    type="button"
                                                    className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0">
                                                    <FormMinusSvg/>
                                                </button>
                                            </div>

                                            <div className="fieldParent d-flex my-2">
                                                <button
                                                    type="button"
                                                    className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                                                    <HamburgerSvg/>
                                                </button>
                                                <div className="w-100 d-flex align-items-center justify-content-between ps-4">
                                                    <span>Work Phone</span>
                                                    <span>Required</span>

                                                </div>
                                                <button
                                                    type="button"
                                                    className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0">
                                                    <FormMinusSvg/>
                                                </button>
                                            </div>

                                            <div className="fieldParent d-flex my-2">
                                                <button
                                                    type="button"
                                                    className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                                                    <HamburgerSvg/>
                                                </button>
                                                <div className="w-100 d-flex align-items-center justify-content-between ps-4">
                                                    <span>Facebook</span>
                                                    <span>Required</span>

                                                </div>
                                                <button
                                                    type="button"
                                                    className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0">
                                                    <FormMinusSvg/>
                                                </button>
                                            </div>

                                            <div className="fieldParent d-flex my-2">
                                                <button
                                                    type="button"
                                                    className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                                                    <HamburgerSvg/>
                                                </button>
                                                <div className="w-100 d-flex align-items-center justify-content-between ps-4">
                                                    <span>Twitter</span>
                                                    <span>Required</span>

                                                </div>
                                                <button
                                                    type="button"
                                                    className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0">
                                                    <FormMinusSvg/>
                                                </button>
                                            </div>

                                        </div>

                                        <div className="text-start mt-2">
                                            <button
                                                className="btn btn-link text-decoration-none text-at-blue-light"
                                                onClick={() => setAddModalShow(true)}>+ Add New Field</button>
                                        </div>

                                        <div className="text-end mt-4">
                                            <button
                                                style={{
                                                border: "1px solid var(--at-blue-light)"
                                            }}
                                                type="button"
                                                className="btn btn-outline btn-sm px-3 me-3 text-at-blue-light">Discard Changes</button>
                                            <button type="button" className="btn btn-sm bg-at-blue-light text-white px-4">Save Changes</button>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </Tab>

                        {/* Ticket Field Tab */}
                        <Tab eventKey="ticket-field" className="px-2">
                            <div>
                                <div className="border border-1 w-75 p-5 mt-3">
                                    <div className="text-center py-4">
                                        <div className="fieldsWrapper pb-3" id="ticketFieldWrapper">

                                            <div className="fieldParent d-flex my-2">
                                                <button
                                                    type="button"
                                                    className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                                                    <HamburgerSvg/>
                                                </button>
                                                <div className="w-100 d-flex align-items-center justify-content-between ps-4">
                                                    <span>Contact</span>
                                                    <span>Required</span>

                                                </div>
                                                <button
                                                    type="button"
                                                    className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0">
                                                    <FormMinusSvg/>
                                                </button>
                                            </div>

                                            <div className="fieldParent d-flex my-2">
                                                <button
                                                    type="button"
                                                    className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                                                    <HamburgerSvg/>
                                                </button>
                                                <div className="w-100 d-flex align-items-center justify-content-between ps-4">
                                                    <span>Category</span>
                                                    <span>Required</span>

                                                </div>
                                                <button
                                                    type="button"
                                                    className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0">
                                                    <FormMinusSvg/>
                                                </button>
                                            </div>

                                            <div className="fieldParent d-flex my-2">
                                                <button
                                                    type="button"
                                                    className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                                                    <HamburgerSvg/>
                                                </button>
                                                <div className="w-100 d-flex align-items-center justify-content-between ps-4">
                                                    <span>Subject</span>
                                                    <span>Required</span>

                                                </div>
                                                <button
                                                    type="button"
                                                    className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0">
                                                    <FormMinusSvg/>
                                                </button>
                                            </div>

                                            <div className="fieldParent d-flex my-2">
                                                <button
                                                    type="button"
                                                    className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                                                    <HamburgerSvg/>
                                                </button>
                                                <div className="w-100 d-flex align-items-center justify-content-between ps-4">
                                                    <span>Priority</span>
                                                    <span>Required</span>

                                                </div>
                                                <button
                                                    type="button"
                                                    className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0">
                                                    <FormMinusSvg/>
                                                </button>
                                            </div>

                                            <div className="fieldParent d-flex my-2">
                                                <button
                                                    type="button"
                                                    className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                                                    <HamburgerSvg/>
                                                </button>
                                                <div className="w-100 d-flex align-items-center justify-content-between ps-4">
                                                    <span>Attach File</span>
                                                    <span>Required</span>

                                                </div>
                                                <button
                                                    type="button"
                                                    className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0">
                                                    <FormMinusSvg/>
                                                </button>
                                            </div>

                                        </div>

                                        <div className="text-start mt-2">
                                            <button
                                                className="btn btn-link text-decoration-none text-at-blue-light"
                                                onClick={() => setAddModalShow(true)}>+ Add New Field</button>
                                        </div>

                                        <div className="text-end mt-4">
                                            <button
                                                style={{
                                                border: "1px solid var(--at-blue-light)"
                                            }}
                                                type="button"
                                                className="btn btn-outline btn-sm px-3 me-3 text-at-blue-light">Discard Changes</button>
                                            <button type="button" className="btn btn-sm bg-at-blue-light text-white px-4">Save Changes</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </Tab>

                        {/* User Field Tab */}
                        <Tab eventKey="user-field" className="px-2">
                            <div className="border border-1 w-75 p-5 mt-3">
                                <div className="text-center py-4">
                                    <div className="fieldsWrapper pb-3" id="userFieldWrapper">

                                        <div className="fieldParent d-flex my-2">
                                            <button
                                                type="button"
                                                className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                                                <HamburgerSvg/>
                                            </button>
                                            <div className="w-100 d-flex align-items-center justify-content-between ps-4">
                                                <span>First Name</span>
                                                <span>Required</span>

                                            </div>
                                            <button
                                                type="button"
                                                className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0">
                                                <FormMinusNeutralSvg/>
                                            </button>
                                        </div>

                                        <div className="fieldParent d-flex my-2">
                                            <button
                                                type="button"
                                                className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                                                <HamburgerSvg/>
                                            </button>
                                            <div className="w-100 d-flex align-items-center justify-content-between ps-4">
                                                <span>Last Name</span>
                                                <span>Required</span>

                                            </div>
                                            <button
                                                type="button"
                                                className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0">
                                                <FormMinusNeutralSvg/>
                                            </button>
                                        </div>

                                        <div className="fieldParent d-flex my-2">
                                            <button
                                                type="button"
                                                className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                                                <HamburgerSvg/>
                                            </button>
                                            <div className="w-100 d-flex align-items-center justify-content-between ps-4">
                                                <span>Login ID</span>
                                                <span>Required</span>

                                            </div>
                                            <button
                                                type="button"
                                                className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0">
                                                <FormMinusNeutralSvg/>
                                            </button>
                                        </div>

                                        <div className="fieldParent d-flex my-2">
                                            <button
                                                type="button"
                                                className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                                                <HamburgerSvg/>
                                            </button>
                                            <div className="w-100 d-flex align-items-center justify-content-between ps-4">
                                                <span>Email Address</span>
                                                <span>Required</span>

                                            </div>
                                            <button
                                                type="button"
                                                className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0">
                                                <FormMinusNeutralSvg/>
                                            </button>
                                        </div>

                                        <div className="fieldParent d-flex my-2">
                                            <button
                                                type="button"
                                                className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                                                <HamburgerSvg/>
                                            </button>
                                            <div className="w-100 d-flex align-items-center justify-content-between ps-4">
                                                <span>Phone</span>
                                                <span>Required</span>

                                            </div>
                                            <button
                                                type="button"
                                                className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0">
                                                <FormMinusSvg/>
                                            </button>
                                        </div>

                                        <div className="fieldParent d-flex my-2">
                                            <button
                                                type="button"
                                                className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                                                <HamburgerSvg/>
                                            </button>
                                            <div className="w-100 d-flex align-items-center justify-content-between ps-4">
                                                <span>Role</span>
                                                <span>Required</span>

                                            </div>
                                            <button
                                                type="button"
                                                className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0">
                                                <FormMinusSvg/>
                                            </button>
                                        </div>

                                        <div className="fieldParent d-flex my-2">
                                            <button
                                                type="button"
                                                className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                                                <HamburgerSvg/>
                                            </button>
                                            <div className="w-100 d-flex align-items-center justify-content-between ps-4">
                                                <span>Heirarchy Level</span>
                                                <span>Required</span>

                                            </div>
                                            <button
                                                type="button"
                                                className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0">
                                                <FormMinusSvg/>
                                            </button>
                                        </div>

                                        <div className="fieldParent d-flex my-2">
                                            <button
                                                type="button"
                                                className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                                                <HamburgerSvg/>
                                            </button>
                                            <div className="w-100 d-flex align-items-center justify-content-between ps-4">
                                                <span>Location</span>
                                                <span>Required</span>

                                            </div>
                                            <button
                                                type="button"
                                                className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0">
                                                <FormMinusSvg/>
                                            </button>
                                        </div>

                                        <div className="fieldParent d-flex my-2">
                                            <button
                                                type="button"
                                                className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                                                <HamburgerSvg/>
                                            </button>
                                            <div className="w-100 d-flex align-items-center justify-content-between ps-4">
                                                <span>Department</span>
                                                <span>Required</span>

                                            </div>
                                            <button
                                                type="button"
                                                className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0">
                                                <FormMinusSvg/>
                                            </button>
                                        </div>

                                    </div>

                                    <div className="text-start mt-2">
                                        <button
                                            className="btn btn-link text-decoration-none text-at-blue-light"
                                            onClick={() => setAddModalShow(true)}>+ Add New Field</button>
                                    </div>

                                    <div className="text-end mt-4">
                                        <button
                                            style={{
                                            border: "1px solid var(--at-blue-light)"
                                        }}
                                            type="button"
                                            className="btn btn-outline btn-sm px-3 me-3 text-at-blue-light">Discard Changes</button>
                                        <button type="button" className="btn btn-sm bg-at-blue-light text-white px-4">Save Changes</button>
                                    </div>

                                </div>
                            </div>
                        </Tab>

                    </Tabs>
                </div>

            </div>

            {/* Invite user modal */}
            <Modal
                show={addModalShow}
                onHide={() => setAddModalShow(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Body>
                    <div className="modal-content border-0">
                        <div className="modal-body ">
                            <h3 className="f-16 text-black">Add New field</h3>
                            <form action="">
                                <div className="form-group mt-3">
                                    <label className="f-12" for="fieldName">Field Name</label>
                                    <input
                                        type="text"
                                        name="field-name"
                                        className="form-control form-control-sm"
                                        id="fieldName"/>
                                </div>
                                <div className="form-group mt-3">
                                    <label className="f-12 form-select-label" for="fieldType">Field Type</label>
                                    <select
                                        name="field-type"
                                        className="form-select form-select-sm f-12 py-2"
                                        id="fieldType">
                                        <option value="single-line-text">Single line text</option>
                                        <option value="dropdown">Dropdown</option>
                                        <option value="paragraph">Paragraph</option>
                                        <option value="date">Date</option>
                                        <option value="attach-file">Attach File</option>
                                        <option value="checkbox">Checkbox</option>
                                        <option value="email">Email</option>
                                        <option value="phone">Phone</option>
                                        <option value="user">User</option>
                                        <option value="contact">Contact</option>
                                    </select>
                                </div>

                                <div id="allOptionsContainer">
                                    <div className="form-group mt-3 d-none" id="fieldOptionsWrapper">
                                        <label className="f-12 d-block">Options</label>
                                        <div className="optionsWrapper" id="optionsWrapper"></div>
                                        <button
                                            onclick="addOption(event)"
                                            type="button"
                                            className="no-focus btn btn-link f-12 text-decoration-none text-at-blue-light">+ Add option</button>
                                    </div>
                                </div>

                                <div className="form-group mt-3">
                                    <label className="f-12" for="makeOptional">Make field optional</label>
                                    <div className="form-check form-switch mt-1">
                                        <input
                                            name="optional"
                                            className="legendInput legend-input form-check-input form-check-input-lg mt-1"
                                            type="checkbox"
                                            id="makeOptional"/>
                                    </div>
                                </div>
                                <div className="text-end">
                                    <button
                                        type="button"
                                        style={{
                                        border: "1px solid var(--at-blue-light)"
                                    }}
                                        className="btn btn-sm btn-outline-secondary w-25 me-1 text-at-blue-light">Cancel</button>
                                    <btn type="button" className="btn btn-custom btn-sm w-25 d-inline-block">Add Field</btn>

                                </div>

                            </form>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        </div>
    );
}

export default Fields;