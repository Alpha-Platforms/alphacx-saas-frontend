import {useState, useEffect} from 'react'
// import {ReactComponent as CardDesignSvg} from '../../../../assets/icons/Card-Design.svg';
import {ReactComponent as FormMinusSvg} from '../../../../assets/icons/form-minus.svg';
import {ReactComponent as AddButtonSvg} from '../../../../assets/icons/add-button.svg';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import {Dropdown, Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import tableIcons from '../../../../assets/materialicons/tableIcons';
// import moment from 'moment';,
import ScaleLoader from 'react-spinners/ScaleLoader';
import {TablePagination} from '@material-ui/core';
import {getPaginatedUsers} from '../../../../reduxstore/actions/userActions';


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

            {/* Upload csv modal */}
            <Modal
                show={createModalShow}
                onHide={() => setCreateModalShow(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Body>
                    <div className="col-12 p-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <h3 className="f-16">Create User Record</h3>
                            <div>
                                <button
                                    type="button"
                                    className="btn bg-outline-custom d-inline-block btn-sm px-5 f-12 text-at-blue-light">Import User</button>
                            </div>
                        </div>
                        <div>
                            <form action="">
                                <div className="d-flex flex-row w-100 justify-content-between mt-3">
                                    <div className="form-group w-100 me-2">
                                        <label className="f-12" for="#fullName">First Name</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm w-100"
                                            id="fullName"/>
                                    </div>
                                    <div className="form-group w-100 ms-2">
                                        <label className="f-12" for="#fullName">Last Name</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm w-100"
                                            id="fullName"/>
                                    </div>
                                </div>
                                <div className="form-group mt-3">
                                    <label className="f-12" for="#email">Email Address</label>
                                    <input type="text" className="form-control form-control-sm" id="email"/>
                                </div>
                                <div className="form-group mt-3">
                                    <label className="f-12" for="#role">Role</label>
                                    <input type="text" className="form-control form-control-sm" id="role"/>
                                </div>
                                <div className="form-group mt-3">
                                    <label className="f-12" for="#level">Group (Optional)</label>
                                    <input type="text" className="form-control form-control-sm" id="level"/>
                                </div>
                                <div className="text-end">
                                    <button
                                        type="button"
                                        className="btn btn-custom btn-sm float-end w-25 mt-4 mb-2"
                                        id="createUser">Create</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>

            {/* Invite user modal */}
            <Modal
                show={inviteModalShow}
                onHide={() => setInviteModalShow(false)}
                aria-labelledby="contained-modal-title-vcenter"
                size="lg"
                centered>
                <Modal.Body>
                    <div className="modal-body w-100" id="new-modal">
                        <h3 className="f-16">Invite User</h3>
                        <div className="invite-info-row">
                            <div className="row gx-2">
                                <div className="col-md-4">
                                    <div className="form-group mt-4">
                                        <label className="f-14 mb-1" for="#fullName">First Name</label>
                                        <input type="text" className="form-control form-control-sm" id="fullName"/>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mt-4">
                                        <label className="f-14 mb-1" for="#role">Last Name</label>
                                        <input type="text" className="form-control form-control-sm" id="role"/>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mt-4">
                                        <label className="f-14 mb-1" for="#email">Email Address</label>
                                        <input type="text" className="form-control form-control-sm" id="email"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group mt-4">
                                    <label className="f-14 mb-1" for="#email"></label>
                                    <span className="fs-3 d-inline ms-2 cursor mt-3 d-inline-block">
                                        <FormMinusSvg/>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex flex-row justify-content-between px-3">
                    <button type="button"
                        className="btn bg-outline-custom btn-sm float-start w-25 mt-4 mb-2 text-center btn-add">Add
                        more&nbsp;<AddButtonSvg/></button>
                    <button type="button" className="btn btn-custom btn-sm float-start w-25 mt-4 mb-2"
                        data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#successModal">Send
                        Invite</button>
                </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Invite user modal */}
            <Modal
                show={importModalShow}
                onHide={() => setImportModalShow(false)}
                aria-labelledby="contained-modal-title-vcenter"
                size="lg"
                centered>
                <Modal.Body>
                <div className="modal-content border-0 p-2 pt-3 pb-5">
                <div className="modal-body w-100" id="new-modal">
                    <h3 className="f-16">Import User</h3>
                    <p className="f-12 text-muted">We've mapped the columns from the CSV to the contact fields in your
                        account. Please review and map additional columns if they haven't been mapped already</p>
                    <div className="row gx-5 mt-2">
                        <div className="col-md-3 fw-bold f-12 mt-2">
                            <p>First Name</p>
                        </div>
                        <div className="col-md-3">
                            <select className="form-select form-select-sm f-12 mx-3" id="hour2">
                                <option>Any</option>
                                <option>Any</option>
                            </select>
                        </div>
                        <div className="col-md-3 mt-2">
                            <p className="f-12 fw-bold">Jerome Bell</p>
                        </div>
                    </div>

                    <div className="row gx-5 mt-2">
                        <div className="col-md-3 fw-bold f-12 mt-2">
                            <p>Last Name</p>
                        </div>
                        <div className="col-md-3">
                            <select className="form-select form-select-sm f-12 mx-3" id="hour2">
                                <option>Any</option>
                                <option>Any</option>
                            </select>
                        </div>
                        <div className="col-md-3 mt-2">
                            <p className="f-12 fw-bold">Mr.</p>
                        </div>
                    </div>

                    <div className="row gx-5 mt-2">
                        <div className="col-md-3 fw-bold f-12 mt-2">
                            <p>Department</p>
                        </div>
                        <div className="col-md-3">
                            <select className="form-select form-select-sm f-12 mx-3" id="hour2">
                                <option>Any</option>
                                <option>Any</option>
                            </select>
                        </div>
                        <div className="col-md-3 mt-2">
                            <p className="f-12 fw-bold">Gillete</p>
                        </div>
                    </div>
                    <div className="row gx-5 mt-2">
                        <div className="col-md-3 fw-bold f-12 mt-2">
                            <p>Email
                            {/* <Address></Address> */}
                            </p>
                        </div>
                        <div className="col-md-3">
                            <select className="form-select form-select-sm f-12 mx-3" id="hour2">
                                <option>Any</option>
                                <option>Any</option>
                            </select>
                        </div>
                    </div>
                    <div className="row gx-5 mt-2">
                        <div className="col-md-3 fw-bold f-12 mt-2">
                            <p>Work Phone</p>
                        </div>
                        <div className="col-md-3">
                            <select className="form-select form-select-sm f-12 mx-3" id="hour2">
                                <option>Any</option>
                                <option>Any</option>
                            </select>
                        </div>
                    </div>
                    <div className="row gx-5 mt-2">
                        <div className="col-md-3 fw-bold f-12 mt-2">
                            <p>Role</p>
                        </div>
                        <div className="col-md-3">
                            <select className="form-select form-select-sm f-12 mx-3" id="hour2">
                                <option>Any</option>
                                <option>Any</option>
                            </select>
                        </div>
                    </div>
                    <div className="row gx-5 mt-2">
                        <div className="col-md-3 fw-bold f-12 mt-2">
                            <p>Group</p>
                        </div>
                        <div className="col-md-3">
                            <select className="form-select form-select-sm f-12 mx-3" id="hour2">
                                <option>Any</option>
                                <option>Any</option>
                            </select>
                        </div>
                    </div>
                    <div className="row gx-5 mt-2">
                        <div className="col-md-3 fw-bold f-12 mt-2">
                            <p>Address</p>
                        </div>
                        <div className="col-md-3">
                            <select className="form-select form-select-sm f-12 mx-3" id="hour2">
                                <option>Any</option>
                                <option>Any</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-end align-items-end px-3">
                    <button type="button" data-bs-dismiss="modal"
                        className="btn bg-outline-custom btn-sm float-start w-25 mt-4 mb-2 text-center btn-add me-3" onClick={() => setImportModalShow(false)}>Cancel</button>
                    <button type="button" className="btn btn-custom btn-sm float-start w-25 mt-4 mb-2"
                        data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#successModal">Import</button>
                </div>
            </div>
                </Modal.Body>
            </Modal>

        </div>
    );
}

const mapStateToProps = (state, ownProps) => ({
    users: state.user.users,
    meta: state.user.meta,
    isUsersLoaded: state.user.isUsersLoaded
})

export default connect(mapStateToProps, {getPaginatedUsers})(UserList);