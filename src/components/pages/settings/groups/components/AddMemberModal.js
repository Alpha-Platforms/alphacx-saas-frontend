import {Modal} from 'react-bootstrap';

const AddMemberModal = ({addMemberModalShow, setAddMemberModalShow, groups}) => {

    //create user modal
    return (
        <Modal
            show={addMemberModalShow}
            onHide={() => setAddMemberModalShow(false)}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body>
                <div className="col-12 p-3">
                    <h6 className="fw-bold">Add New Member</h6>
                    <form action="">
                        <div className="form-group mt-3">
                            <label className="form-label" for="groupName">Group Name</label>
                            <select name="" id="groupName" className="form-control form-select mb-2">
                                {groups.map(group => <option value={group.name}>{group.name}</option>)}
                            </select>

                            <input type="text" id="searchUser" className="form-control"
                                placeholder="Search users, roles or groups"/>

                            <div id="searchBox" className="row hider p-3 justify-content-between border mx-0">

                                <div className="col-9">
                                    <div className="tab-content" id="nav-tabContent">

                                        <div className="tab-pane fade show active" id="customerUsers" role="tabpanel"
                                            aria-labelledby="customerUsers-list">

                                            <ul className="list-unstyled">
                                                <li className="d-flex align-items-center user-initials-sm">
                                                    <p className="user-initials red me-2">so</p>
                                                    <p>steph.okafor@alphacx.com</p>
                                                </li>
                                                <li className="d-flex align-items-center user-initials-sm">
                                                    <p className="user-initials yellow me-2">jw</p>
                                                    <p>john.wokoma@alphacx.com</p>
                                                </li>
                                                <li className="d-flex align-items-center user-initials-sm">
                                                    <p className="user-initials green me-2">ra</p>
                                                    <p>raheemah.adesanya@alphacx.com</p>
                                                </li>
                                            </ul>

                                        </div>

                                        <div className="tab-pane fade" id="customerRoles" role="tabpanel"
                                            aria-labelledby="customerRoles-list">

                                            <ul className="list-unstyled">
                                                <li>
                                                    <p role="button" className="user-entity" data-role="roleId">Account
                                                        Administrator</p>
                                                </li>
                                                <li>
                                                    <p role="button" className="user-entity" data-role="roleId">
                                                        Administrator</p>
                                                </li>
                                                <li>
                                                    <p role="button" className="user-entity" data-role="roleId">Supervisor
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="tab-pane fade" id="customerGroups" role="tabpanel"
                                            aria-labelledby="customerGroups-list">
                                            <ul className="list-unstyled">
                                                <li>
                                                    <p role="button" className="user-entity" data-group="groupId">Head
                                                        Office</p>
                                                </li>
                                                <li>
                                                    <p role="button" className="user-entity" data-group="groupId">South-West
                                                        Region</p>
                                                </li>
                                                <li>
                                                    <p role="button" className="user-entity" data-group="groupId">North
                                                        Region</p>
                                                </li>
                                            </ul>
                                        </div>


                                    </div>
                                </div>
                                <div className="col-3 border-start">
                                    <div className="list-group group-entity-filter" id="list-tab" role="tablist">

                                        <button className="btn btn-sm mb-1 active" id="customerUsers-list"
                                            data-bs-toggle="list" href="#customerUsers" role="tab"
                                            aria-controls="customerUsers">Users</button>

                                        <button className="btn btn-sm mb-1" id="customerRoles-list" data-bs-toggle="list"
                                            href="#customerRoles" role="tab"
                                            aria-controls="customerRoles">Roles</button>

                                        <button className="btn btn-sm mb-1" id="customerGroups-list" data-bs-toggle="list"
                                            href="#customerGroups" role="tab"
                                            aria-controls="customerGroups">Group</button>

                                    </div>
                                </div>

                            </div>

                            <div className="d-flex justify-content-end">
                                <a href="group-member-list.html" className="btn btn-sm bg-at-blue px-4 mt-3">Add Member</a>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AddMemberModal
