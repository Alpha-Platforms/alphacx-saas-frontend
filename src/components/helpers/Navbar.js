import ManImage from '../../assets/images/man.jpg';
import {ReactComponent as NotificationBellSvg} from '../../assets/svgicons/new.svg';
import '../../styles/Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({navbarTitle}) => {
    return (
        <div
            className="d-flex justify-content-between flex-wrap bg-white mb-1 flex-md-nowrap align-items-center border-bottom px-5 py-3">

            <div className="page-title">
                <span className="h6 mh">{navbarTitle && navbarTitle}</span>
            </div>

            <div className="btn-toolbar mb-2 mb-md-0">

                {/* <!-- search popup --> <!-- .navbar-collapse  --> */}
                <div className="collapse" id="searchBox">
                    <form>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Enter search term"
                            aria-label="Search"/>
                    </form>
                </div>
                {/* <!-- / search popup --> */}

                <Link
                    className="link-secondary mt-2 collapsed"
                    to="#"
                    aria-label="Search"
                    aria-controls="searchBox"
                    data-bs-toggle="collapse"
                    data-bs-target="#searchBox">

                    <i className="bi-search" style={{ fontSize: '1.2rem' }}></i>
                </Link>&nbsp;

                <Link className="btn me-2" to="#">
                    <NotificationBellSvg/>
                </Link>

                <Link to="#" className="user-avatar">
                    <img src={ManImage} loading="lazy" alt="" className="image"/></Link>

            </div>

        </div>
    )
}

export default Navbar;