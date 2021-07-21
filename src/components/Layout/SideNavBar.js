import {Fragment} from 'react';
import Navbar from '../../components/helpers/Navbar'
import Sidebar from '../../components/helpers/Sidebar';

const SideNavBar = ({children, navbarTitle, parentCap}) => {
    return (
        <Fragment>
            <Sidebar/>
            <main className="mb-5">
                <div className="container-fluid pe-0 ps-0 mx-auto">
                    <Navbar navbarTitle={navbarTitle}/>
                </div>

                <div
                    id="mainContent"
                    className={parentCap
                    ? parentCap
                    : "container"}>{children}</div>

            </main>

        </Fragment>
    )
}

export default SideNavBar;
