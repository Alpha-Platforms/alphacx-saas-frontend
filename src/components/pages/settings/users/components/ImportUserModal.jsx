/* eslint-disable */
import React from 'react';
import { Modal } from 'react-bootstrap';

function ImportUserModal({ importModalShow, setImportModalShow }) {
    return (
        <Modal
            show={importModalShow}
            onHide={() => setImportModalShow(false)}
            aria-labelledby="contained-modal-title-vcenter"
            size="lg"
            centered
        >
            <Modal.Body>
                <div className="modal-content border-0 p-2 pt-3 pb-5">
                    <div className="modal-body w-100" id="new-modal">
                        <h3 className="f-16">Import User</h3>
                        <p className="f-12 text-muted">
                            We've mapped the columns from the CSV to the contact fields in your account. Please review
                            and map additional columns if they haven't been mapped already
                        </p>
                        <div className="row gx-5 mt-2">
                            <div className="col-md-3 fw-bold f-12 mt-2">
                                <p>First Name</p>
                            </div>
                            <div className="col-md-3">
                                <select className="form-select form-select-sm f-12 mx-3" id="hour2">
                                    <option>Any</option>
                                    <option>Any</option>
                                </select>
                            </div>
                            <div className="col-md-3 mt-2">
                                <p className="f-12 fw-bold">Jerome Bell</p>
                            </div>
                        </div>

                        <div className="row gx-5 mt-2">
                            <div className="col-md-3 fw-bold f-12 mt-2">
                                <p>Last Name</p>
                            </div>
                            <div className="col-md-3">
                                <select className="form-select form-select-sm f-12 mx-3" id="hour2">
                                    <option>Any</option>
                                    <option>Any</option>
                                </select>
                            </div>
                            <div className="col-md-3 mt-2">
                                <p className="f-12 fw-bold">Mr.</p>
                            </div>
                        </div>

                        <div className="row gx-5 mt-2">
                            <div className="col-md-3 fw-bold f-12 mt-2">
                                <p>Department</p>
                            </div>
                            <div className="col-md-3">
                                <select className="form-select form-select-sm f-12 mx-3" id="hour2">
                                    <option>Any</option>
                                    <option>Any</option>
                                </select>
                            </div>
                            <div className="col-md-3 mt-2">
                                <p className="f-12 fw-bold">Gillete</p>
                            </div>
                        </div>
                        <div className="row gx-5 mt-2">
                            <div className="col-md-3 fw-bold f-12 mt-2">
                                <p>Email {/* <Address></Address> */}</p>
                            </div>
                            <div className="col-md-3">
                                <select className="form-select form-select-sm f-12 mx-3" id="hour2">
                                    <option>Any</option>
                                    <option>Any</option>
                                </select>
                            </div>
                        </div>
                        <div className="row gx-5 mt-2">
                            <div className="col-md-3 fw-bold f-12 mt-2">
                                <p>Work Phone</p>
                            </div>
                            <div className="col-md-3">
                                <select className="form-select form-select-sm f-12 mx-3" id="hour2">
                                    <option>Any</option>
                                    <option>Any</option>
                                </select>
                            </div>
                        </div>
                        <div className="row gx-5 mt-2">
                            <div className="col-md-3 fw-bold f-12 mt-2">
                                <p>Role</p>
                            </div>
                            <div className="col-md-3">
                                <select className="form-select form-select-sm f-12 mx-3" id="hour2">
                                    <option>Any</option>
                                    <option>Any</option>
                                </select>
                            </div>
                        </div>
                        <div className="row gx-5 mt-2">
                            <div className="col-md-3 fw-bold f-12 mt-2">
                                <p>Group</p>
                            </div>
                            <div className="col-md-3">
                                <select className="form-select form-select-sm f-12 mx-3" id="hour2">
                                    <option>Any</option>
                                    <option>Any</option>
                                </select>
                            </div>
                        </div>
                        <div className="row gx-5 mt-2">
                            <div className="col-md-3 fw-bold f-12 mt-2">
                                <p>Address</p>
                            </div>
                            <div className="col-md-3">
                                <select className="form-select form-select-sm f-12 mx-3" id="hour2">
                                    <option>Any</option>
                                    <option>Any</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-row justify-content-end align-items-end px-3">
                        <button
                            type="button"
                            data-bs-dismiss="modal"
                            className="btn bg-outline-custom btn-sm float-start w-25 mt-4 mb-2 text-center btn-add me-3"
                            onClick={() => setImportModalShow(false)}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-custom btn-sm float-start w-25 mt-4 mb-2"
                            data-bs-dismiss="modal"
                            data-bs-toggle="modal"
                            data-bs-target="#successModal"
                        >
                            Import
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ImportUserModal;
