/* eslint-disable */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentTicketLoading } from '../../reduxstore/actions/ticketActions';
import { setCurrentCustomerLoading } from '../../reduxstore/actions/customerActions';

function ScrollToTop({
    isCurrentTicketLoaded,
    setCurrentTicketLoading,
    isCurrentCustomerLoaded,
    setCurrentCustomerLoading,
}) {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        // on page change set current ticket state to loading...
        if (isCurrentTicketLoaded) {
            setCurrentTicketLoading();
        }

        // on page change set current customer state to loading...
        if (isCurrentCustomerLoaded) {
            setCurrentCustomerLoading();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return null;
}

const mapStateToProps = (state, ownProps) => ({
    isCurrentTicketLoaded: state.ticket.isCurrentTicketLoaded,
    isCurrentCustomerLoaded: state.customer.isCurrentCustomerLoaded,
});

export default connect(mapStateToProps, { setCurrentTicketLoading, setCurrentCustomerLoading })(ScrollToTop);
