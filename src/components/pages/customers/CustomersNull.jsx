/* eslint-disable */
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { ReactComponent as TicketStarSvg } from '../../../assets/svgicons/Ticket-Star.svg';
import { ReactComponent as TicketsEmptySvg } from '../../../assets/svgicons/tickets-empty.svg';
import { ReactComponent as UploadSvg } from '../../../assets/svgicons/Upload.svg';
import SideNavBar from '../../Layout/SideNavBar';

function CustomersNull() {
    const [createModalShow, setCreateModalShow] = useState(false);
    return (
        <>
            <div className="card card-body bg-white border-0 p-5 mt-4">
                <div id="settings" className="text-center py-5 my-5">
                    <div>
                        <TicketsEmptySvg />
                    </div>
                    <p className="my-3">You have no customer record at the moment</p>
                    <button
                        type="button"
                        className="btn btn-sm bg-at-blue px-md-3 mx-md-3"
                        onClick={() => setCreateModalShow(true)}
                    >
                        <TicketStarSvg />
                        &nbsp; New Customer
                    </button>

                    <button type="button" className="btn btn-sm btn-outline-secondary px-md-3 mx-md-1">
                        <UploadSvg />
                        &nbsp;Import
                    </button>
                </div>
            </div>

            <Modal
                show={createModalShow}
                onHide={() => setCreateModalShow(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <div className="col-12 p-4">
                        <h5 className="mb-3">Create Customer</h5>
                        <form className="needs-validation mb-5" noValidate>
                            <div className="row g-3 pt-3">
                                <div className="col-12 mt-2">
                                    <label htmlFor="title" className="form-label">
                                        Full Name
                                    </label>
                                    <input type="text" className="form-control" />
                                </div>

                                <div className="col-12 mt-3">
                                    <label htmlFor="title" className="form-label">
                                        Title
                                    </label>
                                    <input type="text" className="form-control" />
                                </div>

                                <div className="col-12 mt-3">
                                    <label htmlFor="title" className="form-label">
                                        Company
                                    </label>
                                    <input type="text" className="form-control" />
                                </div>

                                <div className="col-12 mt-3">
                                    <label htmlFor="title" className="form-label">
                                        Email Address
                                    </label>
                                    <input type="text" className="form-control" />
                                </div>

                                <div className="col-12 mt-3">
                                    <label htmlFor="title" className="form-label">
                                        Work Phone
                                    </label>
                                    <input type="text" className="form-control" />
                                </div>

                                <div className="col-12 mt-3">
                                    <label htmlFor="title" className="form-label">
                                        Facebook
                                    </label>
                                    <input type="text" className="form-control" />
                                </div>

                                <div className="col-12 mt-3">
                                    <label htmlFor="title" className="form-label">
                                        Twitter
                                    </label>
                                    <input type="text" className="form-control" />
                                </div>

                                <div className="col-12 mt-3">
                                    <label htmlFor="description" className="form-label">
                                        Address
                                    </label>
                                    <textarea name="description" className="form-control" />
                                </div>
                            </div>

                            <button
                                className="btn btn-sm bg-at-blue-light mt-1 mt-sm-3 float-end pt-1 pe-3 ps-3"
                                type="submit"
                                data-bs-toggle="modal"
                                data-bs-target="#contactCreated"
                                data-bs-dismiss="modal"
                            >
                                Create
                            </button>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default CustomersNull;
