import {useState, useEffect} from 'react'
import { ThemeProvider as MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import {Dropdown} from 'react-bootstrap';
import {connect} from 'react-redux';
import tableIcons from '../../../../assets/materialicons/tableIcons';
import ScaleLoader from 'react-spinners/ScaleLoader';
import {TablePagination} from '@material-ui/core';
import {getPaginatedUsers} from '../../../../reduxstore/actions/userActions';
// import moment from 'moment';,
// import {ReactComponent as CardDesignSvg} from '../../../../assets/icons/Card-Design.svg';
import '../../../../styles/Setting.css';
import {ReactComponent as ProfileSvg} from '../../../../assets/svgicons/Profile-Light.svg';
import ShowIcon from '../../../../assets/icons/Show.svg';
import ProfileIcon from '../../../../assets/svgicons/Profile-Light.svg';
import AddGroupModal from './components/AddGroupModal';
import AddMemberModal from './components/AddMemberModal';
import {Link} from 'react-router-dom';
import {ReactComponent as DotSvg} from '../../../../assets/icons/dots.svg';

const GroupList = ({groups, meta, getPaginatedUsers, isUsersLoaded}) => {
    const [addGroupModalShow,
        setAddGroupModalShow] = useState(false);
    const [addMemberModalShow,
        setAddMemberModalShow] = useState(false);

    /* useEffect(() => {
            setUserLoading(!isUsersLoaded);
            if (isUsersLoaded) {
                setChangingRow(false);
            }
    }, [isUsersLoaded]); */


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
                        // setChangingRow(true);
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
            <div className="card card-body bg-white p-0 border-0">
                <div id="mainContentHeader" className="breadcrumb">
                    <span className="text-muted f-14">
                        <Link to="/settings">Settings</Link>&nbsp;&nbsp;&nbsp;
                        <i className="bi bi-chevron-right"></i>&nbsp;&nbsp;&nbsp;
                        <span>Teams</span>
                    </span>
                </div>

                <h5 className="fw-bold">Teams</h5>

                <div
                    className={`d-flex justify-content-between flex-wrap rounded-top-04 flex-md-nowrap align-items-center p-4 px-3`}>

                    <div>
                        
                    </div>

                    <div className="btn-toolbar mb-md-0 mt-3">
                        <button
                            onClick={() => setAddMemberModalShow(true)}
                            type="button"
                            className="btn border-1 border btn-sm btn-outline-secondary ps-md-3 ms-md-3 reset-btn-outline me-3">
                            <img src={ProfileIcon} alt="" />&nbsp;Add Member
                        </button>

                        <button
                            onClick={() => setAddGroupModalShow(true)}
                            type="button"
                            className="btn btn-sm bg-at-blue-light px-md-3 mx-1">
                            &nbsp;Add Team
                        </button>
                    </div>

                </div>

                <div id="alphacxMTable" className="pb-2 acx-group-table">
                    {groups && <MuiThemeProvider theme={tableTheme}>
                        <MaterialTable
                            title = ""
                            icons = {
                                tableIcons
                            }
                            columns = {
                                [
                                    {
                                        title: 'Name',
                                        field: 'name'
                                    }, {
                                        title: 'Description',
                                        field: 'description',
                                        width: '40%'
                                    }, {
                                        title: 'Members',
                                        field: 'members'
                                    }, {
                                        title: 'Created',
                                        field: 'created'
                                    }, {
                                        title: 'Updated',
                                        field: 'updated'
                                    }, {
                                        title: 'Action',
                                        field: 'action',
                                        render: rowData => (<Dropdown id="cust-table-dropdown" className="ticket-status-dropdown">
                                                                <Dropdown.Toggle variant="transparent" size="sm">
                                                                    <span className="cust-table-dots"><DotSvg/></span>
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item eventKey="1"><Link to="#"><span className="black-text">Edit</span></Link></Dropdown.Item>
                                                                    <Dropdown.Item eventKey="2"><span className="black-text">Delete</span></Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>)
                                    },
                                ]
                            }
                            data = {groups.map(({name, description}) => ({
                                name,
                                description,
                                members: 5,
                                created: '13 Apr 2021',
                                updated: '21 Jul 2021',
                            }))
                            }
                            options = {{
                                search: true,
                                selection: true,
                                // exportButton: true,
                                tableLayout: 'auto',
                                paging: true,
                                rowStyle: {
                                    backgroundColor: '#fff'
                                },
                                headerStyle: {
                                    backgroundColor: '#f8f9fa'
                                }
                            }}
                            components={{ 
                                // Pagination: AlphacxMTPagination
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

            <AddGroupModal addGroupModalShow={addGroupModalShow} setAddGroupModalShow={setAddGroupModalShow} />
            <AddMemberModal addMemberModalShow={addMemberModalShow} setAddMemberModalShow={setAddMemberModalShow} groups={groups} />

        </div>
    );
}

const mapStateToProps = (state, ownProps) => ({
    groups: state.group.groups,
    meta: state.user.meta,
    isUsersLoaded: state.user.isUsersLoaded
})

export default connect(mapStateToProps, null)(GroupList);