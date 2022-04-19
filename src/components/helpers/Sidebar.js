/* eslint-disable */
import { Link } from 'react-router-dom';
import { ReactComponent as AlphaTicketLogoSvg } from '../../assets/svgicons/AlphaTicket-Logo.svg';
import { ReactComponent as ConversationSvg } from '../../assets/svgicons/conversation.svg';
import { ReactComponent as DashboardSvg } from '../../assets/svgicons/dashboard.svg';
import { ReactComponent as GraphSvg } from '../../assets/svgicons/Graph.svg';
import { ReactComponent as LogoutWhiteSvg } from '../../assets/svgicons/Logout-white.svg';
import { ReactComponent as ProfileSvg } from '../../assets/svgicons/Profile.svg';
import { ReactComponent as SettingSvg } from '../../assets/svgicons/Setting.svg';
import { ReactComponent as TicketStarSvg } from '../../assets/svgicons/Ticket-Star.svg';
import '../../styles/Sidebar.css';

function Sidebar() {
    return (
        <nav id="sidebarMenu" className="d-flex bg-at-blue sidebar collapse">
            <div className="position-sticky w-100">
                <div className="text-center py-4">
                    <Link to="#" className="sidebar-logo w-inline-block">
                        <AlphaTicketLogoSvg />
                    </Link>
                </div>

                <ul className="nav d-flex flex-column h-100 text-center">
                    <li className="nav-item py-3 px-3">
                        <Link className="nav-link active p-0 py-2 rounded-1" aria-current="page" to="#">
                            <DashboardSvg />
                        </Link>
                    </li>
                    <li className="nav-item py-3 px-3">
                        <Link className="nav-link active p-0 py-2 rounded-1" aria-current="page" to="#">
                            <ConversationSvg />
                        </Link>
                    </li>
                    <li className="nav-item py-3 px-3">
                        <Link className="nav-link p-0 py-2 rounded-1" to="#">
                            <TicketStarSvg />
                        </Link>
                    </li>
                    <li className="nav-item py-3 px-3">
                        <Link className="nav-link p-0 py-2 rounded-1" to="#">
                            <ProfileSvg />
                        </Link>
                    </li>
                    <li className="nav-item py-3 px-3">
                        <Link className="nav-link p-0 py-2 rounded-1" to="#">
                            <GraphSvg />
                        </Link>
                    </li>
                    <li className="nav-item py-3 px-3">
                        <Link className="nav-link p-0 py-2 rounded-1" to="#">
                            <SettingSvg />
                        </Link>
                    </li>
                    <li className="nav-item py-3 px-3 mt-auto mb-4">
                        <Link className="nav-link p-0 py-2 rounded-1" to="#">
                            <LogoutWhiteSvg />
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Sidebar;
