import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {setCurrentTicketLoading} from '../../reduxstore/actions/ticketActions';
import {connect} from 'react-redux';

const ScrollToTop = ({isCurrentTicketLoaded, setCurrentTicketLoading}) => {
    const {pathname} = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        if (isCurrentTicketLoaded) {
            setCurrentTicketLoading();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return null;
}

const mapStateToProps = (state, ownProps) => ({
    isCurrentTicketLoaded: state.ticket.isCurrentTicketLoaded
});

export default connect(mapStateToProps, {setCurrentTicketLoading})(ScrollToTop);