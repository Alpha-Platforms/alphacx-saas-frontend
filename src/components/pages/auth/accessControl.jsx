/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const isAdminRole = false;
function AccessControl({ children, authenticatedUserRole }) {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (authenticatedUserRole === 'Administrator' || authenticatedUserRole === 'Supervisor') {
            setIsAdmin(true);
        }
    }, [authenticatedUserRole]);

    useEffect(() => {}, [isAdmin]);

    return <>{isAdmin ? <>{children}</> : ''}</>;
}

const mapStateToProps = (state, ownProps) => ({
    authenticatedUserRole: state.userAuth.user.role,
});

export default connect(mapStateToProps, null)(AccessControl);
