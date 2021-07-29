import {useState, useEffect} from 'react'
import { ThemeProvider as MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import {Dropdown} from 'react-bootstrap';
import {connect} from 'react-redux';
import tableIcons from '../../../../assets/materialicons/tableIcons';
import ScaleLoader from 'react-spinners/ScaleLoader';
import {TablePagination} from '@material-ui/core';
import {getPaginatedUsers} from '../../../../reduxstore/actions/userActions';
import CreateUserModal from './components/CreateUserModal';
import ImportUserModal from './components/ImportUserModal';
import InviteUserModal from './components/InviteUserModal';
// import moment from 'moment';,
// import {ReactComponent as CardDesignSvg} from '../../../../assets/icons/Card-Design.svg';


import '../../../../styles/Setting.css';
const UserList = ({users, meta, getPaginatedUsers, isUsersLoaded}) => {
    const [createModalShow,
        setCreateModalShow] = useState(false);
    const [inviteModalShow,
        setInviteModalShow] = useState(false);
    const [importModalShow, setImportModalShow] = useState(false);
    const [changingRow, setChangingRow] = useState(false);
    const [userLoading, setUserLoading] = useState(false);

    useEffect(() => {
            setUserLoading(!isUsersLoaded);
            if (isUsersLoaded) {
                setChangingRow(false);
            }
    }, [isUsersLoaded]);


    const AlphacxMTPagination = props => {
        const {
            ActionsComponent,
            onChangePage,
            onChangeRowsPerPage,
            ...tablePaginationProps
        } = props;
        
        return (
        <TablePagination
            {...tablePaginationProps}
            rowsPerPageOptions={[10, 20, 30]}
            rowsPerPage={meta?.itemsPerPage || 5}
            count={Number(meta?.totalItems || 20)}
            page={(meta?.currentPage || 1) - 1}
            onPageChange={onChangePage}
            // when the number of rows per page changes
            onRowsPerPageChange={event => {
                        setChangingRow(true);
                        getPaginatedUsers(event.target.value, 1);
                        }}
            ActionsComponent={(subprops) => {
                const { onPageChange, ...actionsComponentProps } = subprops;
                return (
                    <ActionsComponent
                    {...actionsComponentProps}
                    onChangePage={(event, newPage) => {
                        // fetch tickets with new current page
                        getPaginatedUsers(meta.itemsPerPage, newPage + 1);
                        }}
                    onRowsPerPageChange={event => {
                        // fetch tickets with new rows per page
                        getPaginatedUsers(event.target.value, meta.currentPage);
                    }}
                    />
                );
                }}
        />
    )}


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

    return (
        <div>
            {userLoading && <div className="cust-table-loader"><ScaleLoader loading={userLoading} color={"#006298"}/></div>}
            <div className="card card-body bg-white border-0 p-5">
                <div id="mainContentHeader">
                    <span className="text-muted f-14">
                        Settings
                        <i className="bi bi-chevron-right"></i>
                        <span className="text-custom">Users</span>
                    </span>
                </div>

                <h5 className="my-3 f-16 fw-500 text-dark">User Management</h5>
                <div className="d-flex justify-content-between align-items-center flex-row">
                    <div>
                        <p className="w-50 text-custom-gray f-12">Service level Agreement(SLA) Policies
                            help you setup and maintain targets for the duration within which your teams
                            respond and resolve rickets. Learn more</p>
                        <p className="text-custom-gray f-12">
                            <i className="bi bi-info-circle"></i>The first matching SLA policy will be
                            applied to tickets with matching conditions</p>
                    </div>
                    <div>
                        <Dropdown className="new-user-dropdown">
                            <Dropdown.Toggle
                                id="dropdown-basic"
                                className="btn btn-custom btn-sm dropdown-toggle px-4 bg-at-blue-light">
                                New User
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="f-12 p-2">
                                <Dropdown.Item as="button" onClick={() => setCreateModalShow(true)}>New User</Dropdown.Item>
                                <Dropdown.Divider/>
                                <Dropdown.Item
                                    className="text-muted"
                                    as="button"
                                    onClick={() => setInviteModalShow(true)}>Invite User</Dropdown.Item>
                                <Dropdown.Divider/>
                                <Dropdown.Item className="text-muted" as="button" onClick={() => setImportModalShow(true)}>Import User</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <div className="form-group">
                    <input
                        type="search"
                        className="form-control search-bar form-control-sm w-50 ps-5 f-12"
                        placeholder="Search agents"/>
                </div>

                <div id="alphacxMTable" className="mb-3 acx-user-table">
                    {(users && !changingRow) && <MuiThemeProvider theme={tableTheme}>
                        <MaterialTable
                            title = ""
                            icons = {
                                tableIcons
                            }
                            columns = {
                                [
                                    {
                                        title: 'First Name',
                                        field: 'firstName',
                                        width: '10%'
                                    }, {
                                        title: 'Last Name',
                                        field: 'lastName'
                                    }, {
                                        title: 'Email Address',
                                        field: 'emailAddress'
                                    }, {
                                        title: 'Role',
                                        field: 'role'
                                    }, {
                                        title: 'Group',
                                        field: 'group'
                                    }, {
                                        title: 'Created',
                                        field: 'created'
                                    }, {
                                        title: 'Action',
                                        field: 'action',
                                        render: rowDate => (<div class="form-check form-switch">
                                                <input class="form-check-input form-check-input-lg mt-1" type="checkbox"/>
                                            </div>)
                                    }
                                ]
                            }
                            data = {users.map(({firstname,
                                lastname,
                                role,
                                company,
                                email,
                                group,
                                created_at,
                                id}) => ({
                                firstName: firstname && firstname,
                                lastName: firstname && firstname,
                                emailAddress: email,
                                role,
                                group: 'Head Office',
                                // created: moment(created_at).format('DD MMM, YYYY'),
                                created: '13 Apr 2021',
                                contact: {firstname, lastname, id}
                            }))
                            }
                            options = {{
                                search: false,
                                selection: true,
                                // exportButton: true,
                                tableLayout: 'auto',
                                paging: true,
                                pageSize: meta?.itemsPerPage || 10,
                                headerStyle: {
                                    // backgroundColor: '#f8f9fa'
                                },
                                rowStyle: {
                                    backgroundColor: '#f8f9fa'
                                }
                                // filtering: true
                            }}
                            components={{ 
                                Pagination: AlphacxMTPagination
                            }}
                        />
                    </MuiThemeProvider>}
                </div>

                {/* <div className="text-center empty-state" id="agent-empty">
                    <CardDesignSvg/>
                    <p className="text-center f-16">
                        You currently have no Agent record at
                        <br/>
                        the moment
                    </p>
                    <button
                        className="btn btn-sm px-5 btn-custom"
                        onClick={() => setCreateModalShow(true)}>
                        New User
                    </button>
                </div> */}
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
    isUsersLoaded: state.user.isUsersLoaded
})

export default connect(mapStateToProps, {getPaginatedUsers})(UserList);