import { useState, useEffect } from 'react';
import {ReactComponent as UploadSvg} from '../../../assets/svgicons//Upload.svg';
import {ReactComponent as EditSvg} from '../../../assets/svgicons//Edit.svg';
import {ReactComponent as MoreSvg} from '../../../assets/svgicons//more.svg';
import {ReactComponent as ImportSvg} from '../../../assets/svgicons//import.svg';
import {ReactComponent as DeleteSvg} from '../../../assets/svgicons//Delete.svg';
import SideNavBar from '../../Layout/SideNavBar';
import {Modal, Dropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../../styles/Customer.css'
import {getCustomers} from '../../../reduxstore/actions/customerActions';
import {NotificationManager} from 'react-notifications';
import ScaleLoader from 'react-spinners/ScaleLoader';
// import { config } from './../../config/keys';

const CustomerList = ({isCustomersLoaded, customers, getCustomers, meta}) => {
    const [createModalShow,
        setCreateModalShow] = useState(false);
    const [uploadModalShow,
        setUploadModalShow] = useState(false);
    const [editModalShow,
        setEditModalShow] = useState(false);
    const [custLoading, setCustLoading] = useState(false);

    const getUserInitials = (name) => {
            const nameArr = name.split(' ');
            const firstInitial = nameArr[0] && nameArr[0][0];
            const secondInitial = nameArr[1] && nameArr[1][0];
            const result = `${firstInitial
                ? firstInitial
                : ''}${secondInitial
                    ? secondInitial
                    : ''}`;
            return <span>{result}</span>;
        }

        let firstItemNo,
            lastItemNo;

        console.log("meta", meta);
        const {totalItems, itemsPerPage, currentPage, totalPages} = meta;

        if (meta) {
            firstItemNo = ((currentPage - 1) * itemsPerPage) + 1;
            lastItemNo = ((firstItemNo + itemsPerPage) - 1) > Number(totalItems)
                ? Number(totalItems)
                : ((firstItemNo + itemsPerPage) - 1);
        }

        console.log(firstItemNo, lastItemNo);

        const getNextCustomers = () => {
            if (!navigator.onLine) {
                return NotificationManager.error('Please check your internet', 'Opps!', 3000);
            }
            getCustomers(currentPage + 1);
        }

        const getPreviousCustomers = () => {
            if (!navigator.onLine) {
                return NotificationManager.error('Please check your internet', 'Opps!', 3000);
            }
            getCustomers(currentPage - 1);
        }

        useEffect(() => {
            setCustLoading(!isCustomersLoaded);
        }, [isCustomersLoaded])

        return (
            <SideNavBar navbarTitle="Customer List" parentCap="container-fluid">
                <div className="cust-table-loader"><ScaleLoader loading={custLoading} color={"#006298"} /></div>

                <div className="m-4">

                    <div
                        className="d-flex justify-content-between flex-wrap bg-light rounded-top-big flex-md-nowrap align-items-center p-4">

                        <div>
                            <div className="input-group input-group-sm has-validation">

                                <span className="input-group-text bg-transparent border-end-0">

                                    <i className="bi-search"></i>

                                </span>

                                <input
                                    type="text"
                                    className="form-control bg-transparent border-start-0 pe-4"
                                    placeholder="Search all contacts"
                                    required=""/>

                            </div>
                        </div>

                        <div className="btn-toolbar mb-md-0">

                            <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary px-md-3 mx-md-3"
                                onClick={() => setUploadModalShow(true)}>
                                <UploadSvg/>&nbsp;Import
                            </button>

                            <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary px-md-3 mx-md-3">
                                <ImportSvg/>&nbsp;Export
                            </button>

                            {meta && <div className="px-4 pt-2">{firstItemNo}
                                - {lastItemNo}
                                of {totalItems}</div>}

                            {meta && <div className="btn-group me-2">
                                <button
                                    type="button"
                                    onClick={getPreviousCustomers}
                                    disabled={currentPage <= 1}
                                    className="btn btn-sm btn-outline-secondary">
                                    <i className="bi-chevron-left"></i>
                                </button>
                                <button
                                    type="button"
                                    onClick={getNextCustomers}
                                    disabled={currentPage >= totalPages}
                                    className="btn btn-sm btn-outline-secondary">
                                    <i className="bi-chevron-right"></i>
                                </button>
                            </div>}
                        </div>

                    </div>

                    <table
                        id="customerTable"
                        className="table bg-white rounded-bottom-big overflow-hidden">
                        <thead className="bg-light border-0">
                            <tr className="border-0">
                                <th className="text-center">
                                    <input type="checkbox" className="form-check-input customer-select-all"/>
                                </th>
                                <th>Contact</th>
                                <th>Title</th>
                                <th>Company</th>
                                <th>Email Address</th>
                                <th>Work Phone</th>
                                <th>Facebook</th>
                                <th>Twitter</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {isCustomersLoaded && customers.map(({
                                    firstname,
                                    lastname,
                                    title,
                                    company,
                                    email,
                                    phone_number,
                                    facebook,
                                    twitter,
                                    theme
                                }, idx) => (
                                    <tr key={idx}>
                                        <td>
                                            <input type="checkbox" className="form-check-input customer-select"/>
                                        </td>
                                        <td>
                                            <div className="d-flex user-initials-sm">
                                                <div
                                                    className={`user-initials ${theme
                                                    ? theme
                                                    : 'red'}`}>{getUserInitials(`${firstname} ${lastname}`)}</div>
                                                <div className="ms-2 mt-1"><Link to="#">{`${firstname} ${lastname}`}</Link></div>
                                            </div>
                                        </td>
                                        <td>{title ? title : 'Mr.'}</td>
                                        <td>{company ? company : 'Gillete'}</td>
                                        <td>{email && email}</td>
                                        <td>{phone_number && phone_number}</td>
                                        <td>{facebook ? facebook : 'sadwolf227'}</td>
                                        <td>{twitter ? twitter : 'silverfrog195'}</td>
                                        <td>
                                            <Dropdown>
                                                <Dropdown.Toggle
                                                    className="btn dropdown-toggle no-caret bg-transparent border-0 pt-0"
                                                    variant=""
                                                    id="dropdown-basic">
                                                    <MoreSvg/>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu
                                                    className="mw-auto"
                                                    style={{
                                                    minWidth: '0',
                                                    boxShadow: '-3px 3px 15px 7px rgba(0, 0, 0, 0.1)'
                                                }}>
                                                    <Dropdown.Item as="button" onClick={() => setEditModalShow(true)}><EditSvg/>&nbsp;&nbsp;<span>Edit</span>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item as="button"><DeleteSvg/>&nbsp;&nbsp;<span className="d-inline-block mb-0 pb-0">Delete</span>
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>

                                        </td>
                                    </tr>
                                ))}

                        </tbody>
                    </table>
                </div>

                {/* <div className="card card-body bg-white border-0 p-5 mt-4">

                <div id="settings" className="text-center py-5 my-5">
                    <div>
                        <TicketsEmptySvg/>
                    </div>
                    <p className="my-3">You have no customer record at the moment</p>
                    <button
                        type="button"
                        className="btn btn-sm bg-at-blue px-md-3 mx-md-3"
                        onClick={() => setCreateModalShow(true)}>
                        <TicketStarSvg/>
                        &nbsp; New Customer
                    </button>

                    <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary px-md-3 mx-md-1">
                        <UploadSvg/>&nbsp;Import
                    </button>

                </div>
            </div> */}

                {/* Create new customer modal */}
                <Modal
                    show={createModalShow}
                    onHide={() => setCreateModalShow(false)}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Body>
                        <div className="col-12 p-4">
                            <h5 className="mb-3">Create Customer</h5>
                            <form className="needs-validation mb-5" noValidate>
                                <div className="row g-3 pt-3">

                                    <div className="col-12 mt-2">
                                        <label htmlFor="title" className="form-label">Full Name</label>
                                        <input type="text" className="form-control"/>
                                    </div>

                                    <div className="col-12 mt-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="text" className="form-control"/>
                                    </div>

                                    <div className="col-12 mt-3">
                                        <label htmlFor="title" className="form-label">Company</label>
                                        <input type="text" className="form-control"/>
                                    </div>

                                    <div className="col-12 mt-3">
                                        <label htmlFor="title" className="form-label">Email Address</label>
                                        <input type="text" className="form-control"/>
                                    </div>

                                    <div className="col-12 mt-3">
                                        <label htmlFor="title" className="form-label">Work Phone</label>
                                        <input type="text" className="form-control"/>
                                    </div>

                                    <div className="col-12 mt-3">
                                        <label htmlFor="title" className="form-label">Facebook</label>
                                        <input type="text" className="form-control"/>
                                    </div>

                                    <div className="col-12 mt-3">
                                        <label htmlFor="title" className="form-label">Twitter</label>
                                        <input type="text" className="form-control"/>
                                    </div>

                                    <div className="col-12 mt-3">
                                        <label htmlFor="description" className="form-label">Address</label>
                                        <textarea name="description" className="form-control"></textarea>
                                    </div>

                                </div>

                                <button
                                    className="btn btn-sm bg-at-blue-light mt-1 mt-sm-3 float-end pt-1 pe-3 ps-3"
                                    type="submit"
                                    data-bs-toggle="modal"
                                    data-bs-target="#contactCreated"
                                    data-bs-dismiss="modal">Create</button>

                            </form>
                        </div>
                    </Modal.Body>
                </Modal>

                {/* Upload csv modal */}
                <Modal
                    show={uploadModalShow}
                    onHide={() => setUploadModalShow(false)}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Body>
                        <div className="col-12 p-3">
                            <h5 className="mb-3">Import Customer</h5>
                            <form className="needs-validation" noValidate>
                                <div className="row g-3">

                                    <div className="col-12">
                                        <input type="file" className="" id="file-picker"/>
                                        <label
                                            htmlFor="file-picker"
                                            className="form-label w-100 file-picker text-at-blue border-0 py-4">
                                            <UploadSvg/>
                                            <h5>Upload a file</h5>
                                            <p className="text-muted">or drag and drop your CSV file here</p>
                                        </label>

                                    </div>

                                </div>

                                <button className="btn btn-sm bg-at-blue mt-1 mt-sm-3 float-end " type="submit">Save Changes</button>

                            </form>
                        </div>
                    </Modal.Body>
                </Modal>

                {/* Edit Customer modal */}
                <Modal
                    show={editModalShow}
                    onHide={() => setEditModalShow(false)}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Body>
                        <div className="col-12 p-5">
                            <h5 className="mb-3">Edit Customer</h5>
                            <form className="needs-validation" noValidate>
                                <div className="row g-3 pt-3">

                                    <div className="col-12 mt-2">
                                        <label htmlFor="title" className="form-label">Full Name</label>
                                        <input type="text" className="form-control"/>
                                    </div>

                                    <div className="col-12 mt-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="text" className="form-control"/>
                                    </div>

                                    <div className="col-12 mt-3">
                                        <label htmlFor="title" className="form-label">Company</label>
                                        <input type="text" className="form-control"/>
                                    </div>

                                    <div className="col-12 mt-3">
                                        <label htmlFor="title" className="form-label">Email Address</label>
                                        <input type="text" className="form-control"/>
                                    </div>

                                    <div className="col-12 mt-3">
                                        <label htmlFor="title" className="form-label">Work Phone</label>
                                        <input type="text" className="form-control"/>
                                    </div>

                                    <div className="col-12 mt-3">
                                        <label htmlFor="title" className="form-label">Facebook</label>
                                        <input type="text" className="form-control"/>
                                    </div>

                                    <div className="col-12 mt-3">
                                        <label htmlFor="title" className="form-label">Twitter</label>
                                        <input type="text" className="form-control"/>
                                    </div>

                                    <div className="col-12 mt-3">
                                        <label htmlFor="description" className="form-label">Address</label>
                                        <textarea name="description" className="form-control"></textarea>
                                    </div>

                                </div>

                                <button
                                    className="btn btn-sm bg-at-blue mt-1 mt-sm-3 float-end pt-1 pe-3 ps-3"
                                    type="submit"
                                    data-bs-toggle="modal"
                                    data-bs-target="#contactCreated"
                                    data-bs-dismiss="modal">Edit</button>

                            </form>
                        </div>

                    </Modal.Body>
                </Modal>

            </SideNavBar>

        )
    }

    const mapStateToProps = (state, ownProps) => ({customers: state.customer.customers, isCustomersLoaded: state.customer.isCustomersLoaded, meta: state.customer.meta})

    export default connect(mapStateToProps, {getCustomers})(CustomerList);