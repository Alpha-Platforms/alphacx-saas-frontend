/* eslint-disable */
function NewRole() {
    return (
        <div>
            <div className="card card-body bg-white border-0 p-5 mb-4">
                <div id="mainContentHeader">
                    <h6 className="text-muted f-14">
                        Settings <i className="bi bi-chevron-right" />
                        <span className="text-custom">Roles</span>
                    </h6>
                </div>
                <div className="d-flex justify-content-between flex-row">
                    <h5 className="mt-3 mb-4 f-16 fw-500">Agent Roles</h5>
                </div>
                <div className="form-group">
                    <label className="f-14 ">Name</label>
                    <input type="text" className="form-control form-control f-12 search-bar mt-1 d-block w-50" />
                </div>
                <div className="bg-role mt-3 align-items-center rounded-top d-flex justify-content-between p-3 border-top-left-right">
                    <h6 className="f-16">Permissions</h6>
                    <div className="select-wrapper">
                        <button className="btn btn-custom btn-sm px-4 f-14">Select all</button>
                        <input
                            className="form-check-input user-select-all w-100 select-all-ctrl"
                            type="checkbox"
                            value="option1"
                        />
                    </div>
                </div>
                <div className="role-form">
                    <div className="mt-4">
                        <p className="f-14">Access Control List (ACL)</p>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input user-select" type="checkbox" value="option1" />
                            <label className="f-12 form-check-label">Create Role</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input user-select" type="checkbox" value="option2" />
                            <label className="f-12 form-check-label">View Role</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input user-select" type="checkbox" value="option3" />
                            <label className="f-12 form-check-label">Update Role</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input user-select" type="checkbox" value="option4" />
                            <label className="f-12 form-check-label">Assign/Remove user(s)</label>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="f-14">Category</p>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input user-select" type="checkbox" value="option1" />
                            <label className="f-12 form-check-label">Create Category</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input user-select" type="checkbox" value="option2" />
                            <label className="f-12 form-check-label">View Category</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input user-select" type="checkbox" value="option3" />
                            <label className="f-12 form-check-label">Update Category</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input user-select" type="checkbox" value="option4" />
                            <label className="f-12 form-check-label">Assign/Category</label>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="f-14">Automation Settings</p>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input user-select" type="checkbox" value="option1" />
                            <label className="f-12 form-check-label">Create Automation Settings</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input user-select" type="checkbox" value="option2" />
                            <label className="f-12 form-check-label">View Automation Settings</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input user-select" type="checkbox" value="option3" />
                            <label className="f-12 form-check-label">Update Automation Settings</label>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="f-14">Application Options</p>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input user-select" type="checkbox" value="option1" />
                            <label className="f-12 form-check-label">Create Application Options</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input user-select" type="checkbox" value="option3" />
                            <label className="f-12 form-check-label">Update Application Options</label>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="f-14">Heirarchy,Loaction & Department</p>
                        <div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input user-select" type="checkbox" value="option1" />
                                <label className="f-12 form-check-label">Create Heirarchy Level(s)</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input user-select" type="checkbox" value="option2" />
                                <label className="f-12 form-check-label">View Heirarchy Level(s)</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input user-select" type="checkbox" value="option3" />
                                <label className="f-12 form-check-label">Update Heirarchy Level(s)</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input user-select" type="checkbox" value="option3" />
                                <label className="f-12 form-check-label">Delete Heirarchy Level(s)</label>
                            </div>
                        </div>
                        <div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input user-select" type="checkbox" value="option1" />
                                <label className="f-12 form-check-label">Create Location Level(s)</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input user-select" type="checkbox" value="option2" />
                                <label className="f-12 form-check-label">View Location Level(s)</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input user-select" type="checkbox" value="option3" />
                                <label className="f-12 form-check-label">Update Location Level(s)</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input user-select" type="checkbox" value="option3" />
                                <label className="f-12 form-check-label">Delete Location Level(s)</label>
                            </div>
                        </div>
                        <div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input user-select" type="checkbox" value="option1" />
                                <label className="f-12 form-check-label">Create Department Level(s)</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input user-select" type="checkbox" value="option2" />
                                <label className="f-12 form-check-label">View Department Level(s)</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input user-select" type="checkbox" value="option3" />
                                <label className="f-12 form-check-label">Update Department Level(s)</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input user-select" type="checkbox" value="option3" />
                                <label className="f-12 form-check-label">Delete Department Level(s)</label>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="f-14">Groups</p>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input user-select" type="checkbox" value="option1" />
                            <label className="f-12 form-check-label">Create Group(s)</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input user-select" type="checkbox" value="option2" />
                            <label className="f-12 form-check-label">View Group(s)</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input user-select" type="checkbox" value="option3" />
                            <label className="f-12 form-check-label">Update Group(s)</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input user-select" type="checkbox" value="option3" />
                            <label className="f-12 form-check-label">Delete Group(s)</label>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="f-14">Forms</p>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input user-select" type="checkbox" value="option1" />
                            <label className="f-12 form-check-label">Create Form(s)</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input user-select" type="checkbox" value="option2" />
                            <label className="f-12 form-check-label">View Form(s)</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input user-select" type="checkbox" value="option3" />
                            <label className="f-12 form-check-label">Update Form(s)</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input user-select" type="checkbox" value="option3" />
                            <label className="f-12 form-check-label">Delete Form(s)</label>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="f-14">Mails</p>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input user-select" type="checkbox" value="option1" />
                            <label className="f-12 form-check-label">Create Mail Messages</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input user-select" type="checkbox" value="option2" />
                            <label className="f-12 form-check-label">View Mail Messages</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input user-select" type="checkbox" value="option3" />
                            <label className="f-12 form-check-label">Update Mail Messages</label>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="f-14">Tickets</p>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input user-select" type="checkbox" value="option1" />
                            <label className="f-12 form-check-label">Close Tickets</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input user-select" type="checkbox" value="option2" />
                            <label className="f-12 form-check-label">Merge Tickets</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input user-select" type="checkbox" value="option3" />
                            <label className="f-12 form-check-label">View Tickets</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input user-select" type="checkbox" value="option1" />
                            <label className="f-12 form-check-label">View Pre-Tickets</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input user-select" type="checkbox" value="option2" />
                            <label className="f-12 form-check-label">Update Pre-Tickets</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input user-select" type="checkbox" value="option3" />
                            <label className="f-12 form-check-label">Reassign Tickets</label>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="f-14">User Management</p>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input user-select" type="checkbox" value="option1" />
                            <label className="f-12 form-check-label">Create User Record</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input user-select" type="checkbox" value="option2" />
                            <label className="f-12 form-check-label">View User Record</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input user-select" type="checkbox" value="option3" />
                            <label className="f-12 form-check-label">Update User Record</label>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="f-14">Admin Management</p>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input user-select" type="checkbox" value="option1" />
                            <label className="f-12 form-check-label">Create Admin Record</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input user-select" type="checkbox" value="option2" />
                            <label className="f-12 form-check-label">View Admin Record</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input user-select" type="checkbox" value="option3" />
                            <label className="f-12 form-check-label">Update Admin Record</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewRole;
