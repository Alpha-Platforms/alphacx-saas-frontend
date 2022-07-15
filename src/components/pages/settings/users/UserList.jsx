/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
// @ts-nocheck
import { useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import MoonLoader from 'react-spinners/MoonLoader';
import { TablePagination } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import moment from 'moment';
import Swal from 'sweetalert2';
import { Modal } from 'react-responsive-modal';
import { NotificationManager } from 'react-notifications';
import tableIcons from '../../../../assets/materialicons/tableIcons';
import { updateUser } from '../../../../reduxstore/actions/userActions';
import CreateUserModal from './components/CreateUserModal';
import ImportUserModal from './components/ImportUserModal';
import InviteUserModal from './components/InviteUserModal';
// import {ReactComponent as CardDesignSvg} from '../../../../assets/icons/Card-Design.svg';
import { wordCapitalize, getUserInitials } from '../../../../helper';

import { getAgents, negateActiveState } from '../../../../reduxstore/actions/agentActions';
import { getAdmins } from '../../../../reduxstore/actions/adminActions';
import { getSupervisors } from '../../../../reduxstore/actions/supervisorActions';
import { getObservers } from '../../../../reduxstore/actions/observerActions';
import '../../../../styles/Setting.css';
import AccessControl from '../../auth/accessControl';
import { getSubscription } from '../../../../reduxstore/actions/subscriptionAction';
import { ReactComponent as DeleteRedIcon } from '../../../../assets/icons/Delete-red.svg';
import { httpDelete } from '../../../../helpers/httpMethods';

function UserList({
    meta,
    agents,
    admins,
    supervisors,
    observers,
    isAgentsLoaded,
    negateActiveState,
    isAdminsLoaded,
    isSupervisorLoaded,
    isUserAuthenticated,
    getAgents,
    getAdmins,
    getSupervisors,
    getObservers,
    authenticatedUserRole,
    tenantSubscription,
    getSubscription,
}) {
    //
    const location = useLocation();
    //
    const [createModalShow, setCreateModalShow] = useState(false);
    const [inviteModalShow, setInviteModalShow] = useState(false);
    const [importModalShow, setImportModalShow] = useState(false);
    const [userLoading] = useState(false);
    const [combinedUsers, setCombinedUsers] = useState([]);
    const [currentUserIdToDelete, setCurrentUserIdToDelete] = useState(null);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    // const activatedUsers = combinedUsers.filter((user) => user?.isActivated);

    useEffect(() => {
        if (authenticatedUserRole === 'Administrator' || authenticatedUserRole === 'Supervisor') {
            const realAdmins = Array.isArray(admins) ? admins : [];
            const realSupervisors = Array.isArray(supervisors) ? supervisors : [];
            const realAgents = Array.isArray(agents) ? agents : [];
            const realObservers = Array.isArray(observers) ? observers : [];
            setCombinedUsers([...realAdmins, ...realSupervisors, ...realAgents, ...realObservers]);
        } else {
            setCombinedUsers([...agents]);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [admins, supervisors, agents, observers]);

    useEffect(() => {
        if (isUserAuthenticated) {
            // get the first set of users
            getAgents();
            getSupervisors();
            getAdmins();
            getObservers();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUserAuthenticated]);

    useEffect(() => {
        if (location.state && location.state.hasOwnProperty('historyCreateModalShow')) {
            setCreateModalShow(location?.state?.historyCreateModalShow);
        }
    }, [location]);

    // useEffect(() => {
    //   setUserLoading(!agents);
    //   if (isAgentsLoaded) {
    //     setUserLoading(false);
    //   }
    // }, [isAgentsLoaded]);

    function AlphacxMTPagination2(props) {
        const { ActionsComponent, onChangePage, onChangeRowsPerPage, ...tablePaginationProps } = props;

        return (
            <TablePagination
                {...tablePaginationProps}
                // @ts-expect-error onChangePage was renamed to onPageChange
                rowsPerPageOptions={[10, 20, 30, 50, 100, 150, 200]}
                onPageChange={onChangePage}
                onRowsPerPageChange={onChangeRowsPerPage}
                ActionsComponent={(subprops) => {
                    const { onPageChange, ...actionsComponentProps } = subprops;
                    return (
                        // @ts-expect-error ActionsComponent is provided by material-table
                        <ActionsComponent {...actionsComponentProps} onChangePage={onPageChange} />
                    );
                }}
            />
        );
    }

    const themes = ['red', 'blue', 'yellow', 'purple'];

    const tableTheme = createTheme({
        palette: {
            primary: {
                main: 'rgba(0, 98, 152)',
            },
            secondary: {
                main: 'rgba(0, 98, 152)',
            },
        },
    });

    const changeActiveState = async (id, isActivated, role) => {
        const userRes = await updateUser({
            id,
            role,
            isActivated: !isActivated,
            // isActivated: !isActivated ? true : "false"
        });
        // console.log('userRes: ', userRes);
        if (userRes?.status === 'success') {
            NotificationManager.success('Info has been updated', 'Success');
            // getAgents()
            negateActiveState(id);
            getSubscription();
        } else {
            NotificationManager.error('Something went wrong', 'Error');
        }
    };

    const numOfSubUsers = tenantSubscription?.subscription?.no_of_users;
    const totalUsers = tenantSubscription?.subscription?.totalUsers;
    const totalActiveUsers = tenantSubscription?.subscription?.totalActiveUsers;

    function handleActiveChange() {
        const { name, isActivated, id, role } = this;
        if (authenticatedUserRole !== 'Administrator' && authenticatedUserRole !== 'Supervisor') return;
        if (totalActiveUsers >= numOfSubUsers && !isActivated) return;

        Swal.fire({
            title: isActivated ? 'Deactivate?' : 'Activate?',
            text: `Do you want to ${isActivated ? 'deactivate' : 'activate'} ${wordCapitalize(name)}`,
            showCancelButton: true,
            confirmButtonColor: '#006298',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                changeActiveState(id, isActivated, role);
            }
        });
    }

    const closeDeleteModal = () => {
        setCurrentUserIdToDelete(null);
        setOpenDeleteModal(false);
    };

    const handleUserDelete = async () => {
        const res = await httpDelete(`users/${currentUserIdToDelete}`);
        if (res?.status === 'success') {
            NotificationManager.success('User deleted successfully', 'Success');
            closeDeleteModal();
            getSubscription();
        }
    };

    const triggerUserDelete = (id) => {
        setCurrentUserIdToDelete(id);
        setOpenDeleteModal(true);
    };

    return (
        <div>
            {userLoading && (
                <div className="cust-table-loader">
                    <MoonLoader loading={userLoading} color="#006298" size={30} />
                </div>
            )}
            <div className="card card-body bg-white border-0 p-0 mb-4">
                <div id="mainContentHeader">
                    <span className="text-muted f-14">
                        <Link to="/settings">Settings</Link>&nbsp;&nbsp;&nbsp;
                        <i className="bi bi-chevron-right" />
                        &nbsp;&nbsp;&nbsp;
                        <span>Users</span>
                    </span>
                </div>
                <h5 className="my-3 f-16 fw-500 text-dark">User Management</h5>
                <div className="d-flex justify-content-between align-items-center flex-row">
                    <div>
                        <p className="text-custom-gray f-12" />
                    </div>
                    <div className="mt-3">
                        {(tenantSubscription?.plan?.name === 'Free Plan' && totalUsers > 3) ||
                        (tenantSubscription?.plan?.name !== 'Free Plan' &&
                            tenantSubscription?.plan?.name !== 'Alpha Trial' &&
                            totalUsers > numOfSubUsers) ? (
                            <br />
                        ) : (
                            <AccessControl>
                                {tenantSubscription && (
                                    <button
                                        type="button"
                                        className="btn btn-custom btn-sm px-4 bg-at-blue-light py-2"
                                        onClick={() => setCreateModalShow(true)}
                                    >
                                        New User
                                    </button>
                                )}
                            </AccessControl>
                        )}
                    </div>
                </div>
                <div className="form-group">
                    {/* <input
                        type="search"
                        className="form-control search-bar form-control-sm w-50 ps-5 f-12"
                        placeholder="Search agents"/> */}
                </div>

                {isAgentsLoaded && isAdminsLoaded && isSupervisorLoaded ? (
                    <div id="alphacxMTable" className="mb-3 acx-user-table-3 acx-user-table-2">
                        <MuiThemeProvider theme={tableTheme}>
                            <MaterialTable
                                title=""
                                icons={tableIcons}
                                columns={[
                                    {
                                        title: 'Name',
                                        field: 'name',
                                        render: ({ contact }) => (
                                            <div className="d-flex user-initials-sm align-items-center">
                                                <div>
                                                    <div
                                                        className={`user-initials ${
                                                            contact.theme
                                                                ? contact.theme
                                                                : themes[Math.floor(Math.random() * 4)]
                                                        }`}
                                                    >
                                                        {contact.avatar ? (
                                                            <img src={contact.avatar} className="cust-avatar" alt="" />
                                                        ) : (
                                                            getUserInitials(`${contact.firstname} ${contact.lastname}`)
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="ms-2">
                                                    <Link
                                                        to={`/settings/profile/${contact.id}`}
                                                        style={{ textTransform: 'capitalize' }}
                                                    >{`${contact.firstname} ${contact.lastname}`}</Link>
                                                </div>
                                            </div>
                                        ),
                                        width: '10%',
                                    },
                                    {
                                        title: 'Email Address',
                                        field: 'emailAddress',
                                    },
                                    {
                                        title: 'Role',
                                        field: 'role',
                                    },
                                    {
                                        title: 'Team(s)',
                                        render: (rowData) => {
                                            return (
                                                rowData.group && (
                                                    <div className="table-tags">
                                                        <span
                                                            className={`badge rounded-pill px-3 py-2 me-1 my-1 ${
                                                                [
                                                                    'acx-bg-purple-30',
                                                                    'acx-bg-red-30',
                                                                    'acx-bg-blue-light-30',
                                                                    'acx-bg-green-30',
                                                                ][Math.ceil(Math.random() * 3) - 1]
                                                            }`}
                                                        >
                                                            {rowData?.group[0]}
                                                        </span>
                                                        {rowData?.group?.length > 1 && (
                                                            <span
                                                                className={`badge rounded-pill px-3 py-2 me-1 my-1 ${
                                                                    [
                                                                        'acx-bg-purple-30',
                                                                        'acx-bg-red-30',
                                                                        'acx-bg-blue-light-30',
                                                                        'acx-bg-green-30',
                                                                    ][Math.ceil(Math.random() * 3) - 1]
                                                                }`}
                                                            >
                                                                {rowData?.group[1]}
                                                            </span>
                                                        )}
                                                        {rowData?.group?.length > 2 && (
                                                            <span className="badge rounded-pill text-muted border px-2 py-1 my-1">
                                                                {`+${Number(rowData?.group?.length) - 2}`}
                                                            </span>
                                                        )}
                                                    </div>
                                                )
                                            );
                                        },
                                    },
                                    {
                                        title: 'Created',
                                        field: 'created',
                                    },
                                    {
                                        title: 'Active',
                                        field: 'action',
                                        render: (rowData) => (
                                            <div className="form-check form-switch">
                                                <input
                                                    className="form-check-input form-check-input-lg mt-1"
                                                    checked={rowData.isActivated}
                                                    onChange={handleActiveChange.bind({
                                                        name: rowData.name,
                                                        isActivated: rowData.isActivated,
                                                        id: rowData.userId,
                                                        role: rowData.role,
                                                    })}
                                                    readOnly
                                                    type="checkbox"
                                                />
                                                {!rowData.isActivated && (
                                                    <button
                                                        type="submit"
                                                        className="user-delete-btn ms-2 d-inline-block"
                                                        onClick={() => triggerUserDelete(rowData?.userId)}
                                                    >
                                                        <DeleteRedIcon />
                                                    </button>
                                                )}
                                            </div>
                                        ),
                                    },
                                ]}
                                data={combinedUsers.map(
                                    ({
                                        firstname,
                                        lastname,
                                        role,
                                        email,
                                        groups,
                                        created_at,
                                        isActivated,
                                        id,
                                        avatar,
                                    }) => ({
                                        name: `${firstname} ${lastname}`,
                                        emailAddress: email,
                                        role,
                                        // group: groups?.map( (item, index) => `${item.group?.name}${groups?.length-1 > index? ", ":" "}`).join(' '),
                                        group: groups?.map((item) => item?.group?.name),
                                        created: created_at && moment(created_at).format('DD MMM, YYYY'),
                                        contact: { firstname, lastname, id, avatar },
                                        isActivated,
                                        userId: id,
                                    }),
                                )}
                                options={{
                                    search: true,
                                    selection: false,
                                    // exportButton: true,
                                    tableLayout: 'auto',
                                    paging: true,
                                    pageSize: 50 || meta?.itemsPerPage,
                                    headerStyle: {
                                        backgroundColor: '#f8f9fa',
                                    },
                                    rowStyle: {
                                        // backgroundColor: '#f8f9fa'
                                    },
                                    // filtering: true
                                }}
                                components={{
                                    Pagination: AlphacxMTPagination2,
                                }}
                            />
                        </MuiThemeProvider>
                        <Modal open={openDeleteModal} onClose={() => closeDeleteModal(false)} center>
                            <div className="p-5 w-100">
                                <h6 className="mb-4">Are you sure you want to delete this user?</h6>
                                <div className="d-flex justify-content-center">
                                    <button
                                        type="button"
                                        className="btn f-12 bg-outline-custom cancel px-4"
                                        onClick={() => closeDeleteModal()}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="btn ms-2 f-12 bg-custom px-4"
                                        onClick={() => handleUserDelete()}
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                ) : (
                    <div className="cust-table-loader">
                        <MoonLoader loading color="#006298" size={30} />
                    </div>
                )}
            </div>

            <CreateUserModal createModalShow={createModalShow} setCreateModalShow={setCreateModalShow} />
            <InviteUserModal inviteModalShow={inviteModalShow} setInviteModalShow={setInviteModalShow} />
            <ImportUserModal importModalShow={importModalShow} setImportModalShow={setImportModalShow} />
        </div>
    );
}

const mapStateToProps = (state) => ({
    meta: state.user.meta,
    agents: state.agent.agents,
    admins: state.admin.admins,
    supervisors: state.supervisor.supervisors,
    observers: state.observer.observers,
    isAgentsLoaded: state.agent.isAgentsLoaded,
    isAdminsLoaded: state.admin.isAdminsLoaded,
    isSupervisorLoaded: state.supervisor.isSupervisorsLoaded,
    isUserAuthenticated: state.userAuth.isUserAuthenticated,
    authenticatedUserRole: state.userAuth.user.role,
    tenantSubscription: state?.subscription?.subscription,
});

export default connect(mapStateToProps, {
    getAgents,
    getSupervisors,
    getAdmins,
    negateActiveState,
    getObservers,
    getSubscription,
})(UserList);
