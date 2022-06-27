/* eslint-disable */
// @ts-nocheck
import { useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import { Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import MoonLoader from 'react-spinners/MoonLoader';
import { TablePagination } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import moment from 'moment';
import Swal from 'sweetalert2';
import tableIcons from '../../../../assets/materialicons/tableIcons';
import { getPaginatedUsers, updateUser } from '../../../../reduxstore/actions/userActions';
import CreateUserModal from './components/CreateUserModal';
import ImportUserModal from './components/ImportUserModal';
import InviteUserModal from './components/InviteUserModal';
import { ReactComponent as DotSvg } from '../../../../assets/icons/dots.svg';
import { ReactComponent as DeleteSvg } from '../../../../assets/icons/Delete.svg';
import { ReactComponent as DeleteGreySvg } from '../../../../assets/icons/Delete-grey.svg';
import { ReactComponent as ArrowDownSvg } from '../../../../assets/icons/arrow-down.svg';
// import {ReactComponent as CardDesignSvg} from '../../../../assets/icons/Card-Design.svg';
import { wordCapitalize, getUserInitials } from '../../../../helper';

import { getAgents, negateActiveState } from '../../../../reduxstore/actions/agentActions';
import { getAdmins } from '../../../../reduxstore/actions/adminActions';
import { getSupervisors } from '../../../../reduxstore/actions/supervisorActions';
import { getObservers } from '../../../../reduxstore/actions/observerActions';
import '../../../../styles/Setting.css';
import { NotificationManager } from 'react-notifications';
import AccessControl from '../../auth/accessControl.jsx';

function UserList({
    users,
    meta,
    getPaginatedUsers,
    isUsersLoaded,
    agents,
    admins,
    supervisors,
    observers,
    isAgentsLoaded,
    // groups,
    negateActiveState,
    isAdminsLoaded,
    isSupervisorLoaded,
    isUserAuthenticated,
    signedUser,
    getAgents,
    getAdmins,
    getSupervisors,
    getObservers,
    authenticatedUserRole,
}) {
    //
    const location = useLocation();
    //
    const [createModalShow, setCreateModalShow] = useState(false);
    const [inviteModalShow, setInviteModalShow] = useState(false);
    const [importModalShow, setImportModalShow] = useState(false);
    const [userLoading, setUserLoading] = useState(false);
    const [combinedUsers, setCombinedUsers] = useState([]);
    const [canAddUser, setCanAddUser] = useState(false);

    const activatedUsers = combinedUsers.filter((user) => user?.isActivated);

  

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
            // getPaginatedUsers(50, 1);
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
        } else {
            NotificationManager.error('Something went wrong', 'Error');
        }
    };

    const tenantSubscription = JSON.parse(window.localStorage.getItem('tenantSubscription'));
    const numOfSubUsers = tenantSubscription?.subscription?.no_of_users || 0;
    
    function handleActiveChange() {
        const { name, isActivated, id, role } = this;
        if (authenticatedUserRole !== 'Administrator' && authenticatedUserRole !== 'Supervisor') return;
        if (activatedUsers.length >= numOfSubUsers && !isActivated) return;

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
                        {(tenantSubscription?.plan?.name === 'Free Plan' && combinedUsers.length > 3) ||
                        ((tenantSubscription?.plan?.name !== 'Free Plan' && tenantSubscription?.plan?.name !== 'Alpha Trial') &&
                            combinedUsers.length > tenantSubscription?.subscription?.no_of_users) ? (
                            <br />
                        ) : (
                            <AccessControl>
                                {tenantSubscription && <button
                                    className="btn btn-custom btn-sm px-4 bg-at-blue-light py-2"
                                    onClick={() => setCreateModalShow(true)}
                                >
                                    New User
                                </button>}
                            </AccessControl>
                        )}

                        {/* <Dropdown className="new-user-dropdown" id="new-user-dropdown">
              <Dropdown.Toggle
                id="dropdown-basic"
                className="btn btn-custom btn-sm dropdown-toggle px-4 bg-at-blue-light py-2"
              >
                <span>New User</span> <ArrowDownSvg />
              </Dropdown.Toggle>

              <Dropdown.Menu className="f-12">
                <Dropdown.Item
                  as="button"
                  onClick={() => setCreateModalShow(true)}
                >
                  <span className="black-text">New User</span>
                </Dropdown.Item>
                <Dropdown.Item
                  className="text-muted"
                  as="button"
                  onClick={() => setInviteModalShow(true)}
                >
                  Invite User
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
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
                                        render: (rowData) => {return rowData.group && (
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
                                                { rowData?.group?.length > 1 &&
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
                                                }
                                                { rowData?.group?.length > 2 &&
                                                    <span className="badge rounded-pill text-muted border px-2 py-1 my-1">
                                                       {`+${rowData?.group?.length - 2}`}
                                                    </span>
                                                }
                                            </div>
                                        )},
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
                                            </div>
                                        ),
                                    },
                                ]}
                                data={combinedUsers.map(
                                    ({
                                        firstname,
                                        lastname,
                                        role,
                                        company,
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

const mapStateToProps = (state, ownProps) => ({
    users: state.user.users,
    meta: state.user.meta,
    isUsersLoaded: state.user.isUsersLoaded,
    agents: state.agent.agents,
    admins: state.admin.admins,
    supervisors: state.supervisor.supervisors,
    observers: state.observer.observers,
    isAgentsLoaded: state.agent.isAgentsLoaded,
    isAdminsLoaded: state.admin.isAdminsLoaded,
    isSupervisorLoaded: state.supervisor.isSupervisorsLoaded,
    // groups: state.group.groups,
    isUserAuthenticated: state.userAuth.isUserAuthenticated,
    signedUser: state.userAuth.user,
    authenticatedUserRole: state.userAuth.user.role,
});

export default connect(mapStateToProps, {
    getPaginatedUsers,
    getAgents,
    getSupervisors,
    getAdmins,
    negateActiveState,
    getObservers,
})(UserList);
