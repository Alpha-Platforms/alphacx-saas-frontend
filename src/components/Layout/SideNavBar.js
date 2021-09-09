import React, {Fragment, useContext} from 'react';
import Navbar from '../../components/helpers/Navbar'
// import Sidebar from '../../components/helpers/Sidebar';
import Sidebar from './Sidebar';
import {LayoutContext} from './../../context/layoutContext';

const SideNavBar = ({children, navbarTitle, parentCap}) => {
    const {appReduceSidebarWidth} = useContext(LayoutContext);
    /*

    margin-left: var(--sidebar-width) !important;
    width: calc(100% - var(--sidebar-width)) !important;
    */
    return (
        <Fragment>
            <Sidebar/>
            <main
                id="siteMain"
                style={{
                marginLeft: `${appReduceSidebarWidth
                    ? '240px'
                    : '50px'}`,
                width: `calc(100% - ${appReduceSidebarWidth
                    ? '240px'
                    : '50px'})`
            }}
                className="mb-5">
                <div className="container-fluid pe-0 ps-0 mx-auto">
                    <Navbar navbarTitle={navbarTitle}/>
                </div>

                <div id="mainContent" className={parentCap ? parentCap : "container"}>{children}</div>
            </main>

        </Fragment>
    )
}

export default SideNavBar;
