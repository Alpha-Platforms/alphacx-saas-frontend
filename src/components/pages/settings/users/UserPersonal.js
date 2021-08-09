import '../../../../styles/Setting.css';
import ImageDefault from '../../../../assets/svgicons/image-default.svg';
import {Link} from 'react-router-dom';

const UserPersonal = () => {

    return (
        <div className="pb-3">
            <div className="card card-body bg-white border-0 p-5">
                <div id="mainContentHeader">
                    <span className="text-muted f-14">
                        <Link to="/settings">Settings</Link>&nbsp;&nbsp;&nbsp;
                        <i className="bi bi-chevron-right"></i>&nbsp;&nbsp;&nbsp;
                        <span>Users</span>
                    </span>
                </div>

                <h5 className="my-3 f-16 fw-500 text-dark">Personal Information Settings</h5>

                <div className="position-relative">
                    <div id="imgDefault"
                        className="rounded-3 d-flex justify-content-center align-items-center me-5 position-absolute">
                        <div className="d-inline-block">
                            <img src={ImageDefault} alt="" className="pe-none"/>
                        </div>
                    </div>
                    <form className="w-75">
                        <div className="form-group mt-3">
                            <label htmlFor="userFirstName" className="mb-1">First Name</label>
                            <input
                                type="email"
                                className="form-control"
                                id="userFirstName"
                                placeholder="Seun"/>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="userLastName" className="mb-1">Last Name</label>
                            <input
                                type="password"
                                className="form-control"
                                id="userLastName"
                                placeholder="Orofin"/>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="userEmail" className="mb-1">Email</label>
                            <input
                                type="password"
                                className="form-control"
                                id="userEmail"
                                placeholder="seunorofin@gmail.com"/>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="userRole" className="mb-1">Role</label>
                            <input
                                type="password"
                                className="form-control"
                                id="userRole"
                                placeholder="Orofin"/>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="userTeam" className="mb-1">Team</label>
                            <input
                                type="password"
                                className="form-control"
                                id="userTeam"
                                placeholder="department"/>
                        </div>
                        <div className="mt-4 pt-1">
                            <button type="submit" className="btn btn-primary btn-sm bg-at-blue-light">Password Reset</button>
                        </div>
                    </form>
                </div>

            </div>

        </div>
    );
}

export default UserPersonal;