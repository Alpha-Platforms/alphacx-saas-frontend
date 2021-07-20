import {useState} from 'react';
import {ReactComponent as UploadSvg} from '../../../assets/svgicons//Upload.svg';
import {ReactComponent as EditSvg} from '../../../assets/svgicons//Edit.svg';
import {ReactComponent as MoreSvg} from '../../../assets/svgicons//more.svg';
import {ReactComponent as ImportSvg} from '../../../assets/svgicons//import.svg';
import {ReactComponent as DeleteSvg} from '../../../assets/svgicons//Delete.svg';
import SideNavBar from '../../Layout/SideNavBar';
import {Modal, Dropdown} from 'react-bootstrap';
// import {Link} from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const OrganisationList = () => {
    const [createModalShow,
        setCreateModalShow] = useState(false);
    const [uploadModalShow,
        setUploadModalShow] = useState(false);
    const [editModalShow,
        setEditModalShow] = useState(false);
    const customers = [
        {
            company: 'Gillete Group',
            email_address: 'info@gilletgroup.com',
            work_phone: '(201) 555-0124',
            location: 'Lagos, Nigeria',
            subscription_type: 'SaaS',
            linkedin: 'gillettegroup',
            facebook: 'gilletegroupng',
            twitter: 'gillettegroupng',
            theme: 'red'
        }, {
            company: 'Gillete Group',
            email_address: 'info@gilletgroup.com',
            work_phone: '(201) 555-0124',
            location: 'Lagos, Nigeria',
            subscription_type: 'SaaS',
            linkedin: 'gillettegroup',
            facebook: 'gilletegroupng',
            twitter: 'gillettegroupng',
            theme: 'green'
        }, {
            company: 'Gillete Group',
            email_address: 'info@gilletgroup.com',
            work_phone: '(201) 555-0124',
            location: 'Lagos, Nigeria',
            subscription_type: 'SaaS',
            linkedin: 'gillettegroup',
            facebook: 'gilletegroupng',
            twitter: 'gillettegroupng',
            theme: 'blue'
        }, {
            company: 'Gillete Group',
            email_address: 'info@gilletgroup.com',
            work_phone: '(201) 555-0124',
            location: 'Lagos, Nigeria',
            subscription_type: 'SaaS',
            linkedin: 'gillettegroup',
            facebook: 'gilletegroupng',
            twitter: 'gillettegroupng',
            theme: 'yellow'
        }, {
            company: 'Gillete Group',
            email_address: 'info@gilletgroup.com',
            work_phone: '(201) 555-0124',
            location: 'Lagos, Nigeria',
            subscription_type: 'SaaS',
            linkedin: 'gillettegroup',
            facebook: 'gilletegroupng',
            twitter: 'gillettegroupng',
            theme: 'purple'
        }
    ];

    const getUserInitials = (name) => {
        const nameArr = name.split(' ');
        const firstInitial = nameArr[0] && nameArr[0][0];
        const secondInitial = nameArr[1] && nameArr[1][0];
        const result = `${firstInitial ? firstInitial : ''}${secondInitial ? secondInitial : ''}`;
        return <span>{result}</span>;    
    }

    return (
        <SideNavBar navbarTitle="Customer List" parentCap="container-fluid">

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
                                placeholder="Search all organisations"
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

                        <div className="px-4 pt-2">1 - 11 of 11</div>

                        <div className="btn-group me-2">
                            <button type="button" className="btn btn-sm btn-outline-secondary">
                                <i className="bi-chevron-left"></i>
                            </button>
                            <button type="button" className="btn btn-sm btn-outline-secondary">
                                <i className="bi-chevron-right"></i>
                            </button>
                        </div>
                    </div>

                </div>

                <table className="table bg-white rounded-bottom-big overflow-hidden">
                    <thead className="bg-light border-0">
                        <tr className="border-0">
                            <th className="text-center">
                                <input type="checkbox" className="form-check-input customer-select-all"/>
                            </th>
                            <th>Organisation</th>
                            <th>Email Address</th>
                            <th>Work Phone</th>
                            <th>Location</th>
                            <th>Subscription Type</th>
                            <th>LinkedIn</th>
                            <th>Facebook</th>
                            <th>Twitter</th>
                        </tr>
                    </thead>
                    <tbody>

                        {customers && customers.map(({
                            company,
                            email_address,
                            work_phone,
                            location,
                            subscription_type,
                            linkedin,
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
                                        <div className={`user-initials ${theme ? theme : 'red'}`}>{getUserInitials(company)}</div>
                                        <div className="ms-2 mt-1">{company}</div>
                                    </div>
                                </td>
                                <td>{email_address}</td>
                                <td>{work_phone}</td>
                                <td>{location}</td>
                                <td>{subscription_type}</td>
                                <td>{linkedin}</td>
                                <td>{facebook}</td>
                                <td>{twitter}</td>
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
                        <form className="needs-validation mb-5" novalidate>
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
                        <form className="needs-validation" novalidate>
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
                        <form className="needs-validation" novalidate>
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

export default OrganisationList;