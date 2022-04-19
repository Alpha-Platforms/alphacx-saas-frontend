/* eslint-disable */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as CardDesignSvg } from '../../../../assets/icons/Card-Design.svg';

function RoleList() {
    const [rolesAvailable] = useState(true);

    return (
        <div>
            <div className="card card-body bg-white border-0 p-0 mb-4">
                <div id="mainContentHeader">
                    <span className="text-muted f-14">
                        <Link to="/settings">Settings</Link>&nbsp;&nbsp;&nbsp;
                        <i className="bi bi-chevron-right" />
                        &nbsp;&nbsp;&nbsp;
                        <span>Roles</span>
                    </span>
                </div>
                <div className="d-flex justify-content-between flex-row">
                    <h5 className="mt-3 mb-4 f-16 fw-500">Roles</h5>
                    <div>
                        <Link to="/settings/roles/new" className="btn btn-custom px-4 btn-sm">
                            New Role
                        </Link>
                    </div>
                </div>
                <div className="form-group position-relative">
                    <i className="bi bi-search position-absolute d-inline-block role-search-icon" />
                    <input
                        type="search"
                        className="form-control form-control f-12 search-bar mt-2 px-4 d-block w-50"
                        placeholder="Search roles"
                    />
                </div>
                {!rolesAvailable ? (
                    <div>
                        <div className="text-center empty-state">
                            <CardDesignSvg />
                            <p className="text-center f-14">
                                You currently have no Roles record at
                                <br />
                                the moment
                            </p>
                            <Link to="/settings/roles/new" class="btn btn-custom btn-sm px-4">
                                New Role
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="bg-role border-top-left-right mt-4 py-4">
                        <div className="d-flex justify-content-between px-5 mx-5">
                            <div>
                                <h6 className="f-14 text-custom mb-2">Account Administrator</h6>
                                <p className="f-12">
                                    Has complete control of the help desk including access to Account or Billing related
                                    information, and receives invoices.
                                </p>
                            </div>
                            <div className="text-dark">
                                <p className="f-12">1 Agent</p>
                            </div>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between px-5 mx-5">
                            <div>
                                <h6 className="f-14 text-custom mb-2">Administrator</h6>
                                <p className="f-12">
                                    Has complete control of the help desk including access to Account or Billing related
                                    information, and receives invoices.
                                </p>
                            </div>
                            <div className="text-dark">
                                <p className="f-12">No Agent</p>
                            </div>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between px-5 mx-5">
                            <div>
                                <h6 className="f-14 text-custom mb-2">Supervisor</h6>
                                <p className="f-12">
                                    Has complete control of the help desk including access to Account or Billing related
                                    information, and receives invoices.
                                </p>
                            </div>
                            <div className="text-dark">
                                <p className="f-12">No Agent</p>
                            </div>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between px-5 mx-5 border-bottom-left-right">
                            <div>
                                <h6 className="f-14 text-custom mb-2">Agent</h6>
                                <p className="f-12">
                                    Has complete control of the help desk including access to Account or Billing related
                                    information, and receives invoices.
                                </p>
                            </div>
                            <div className="text-dark">
                                <p className="f-12">No Agent</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RoleList;
