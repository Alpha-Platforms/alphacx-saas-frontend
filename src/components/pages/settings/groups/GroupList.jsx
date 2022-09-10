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
import { NotificationManager } from 'react-notifications';
import { css } from '@emotion/css';
import { wordCapitalize, brandKit } from '../../../../helper';
import tableIcons from '../../../../assets/materialicons/tableIcons';
import { getPaginatedUsers } from '../../../../reduxstore/actions/userActions';
// import moment from 'moment';,
// import {ReactComponent as CardDesignSvg} from '../../../../assets/icons/Card-Design.svg';
import '../../../../styles/Setting.css';
import ProfileIcon, { ReactComponent as ProfileSvg } from '../../../../assets/svgicons/Profile-Light.svg';
import ShowIcon from '../../../../assets/icons/Show.svg';

import AddGroupModal from './components/AddGroupModal';
import AddMemberModal from './components/AddMemberModal';
import { ReactComponent as DotSvg } from '../../../../assets/icons/dots.svg';
import { ReactComponent as DeleteRedIcon } from '../../../../assets/icons/Delete-red.svg';
import { ReactComponent as EditIcon } from '../../../../assets/icons/Edit.svg';
import { httpGetMain } from '../../../../helpers/httpMethods';
import AccessControl from 'components/pages/auth/accessControl';
import { deleteGroup } from '../../../../reduxstore/actions/groupActions';

import { Modal } from 'react-responsive-modal';

function GroupList({ groups, categories, isGroupsLoaded, authenticatedUser, deleteGroup }) {
    //
    const location = useLocation();
    //
    const [addGroupModalShow, setAddGroupModalShow] = useState(false);
    const [addMemberModalShow, setAddMemberModalShow] = useState(false);
    const [ticketCategories, setTicketCategories] = useState([]);
    const [groupId, setGroupId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [groupsLoading, setGroupsLoading] = useState(false);

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [groupToDelete, setGroupToDelete] = useState('');

    const [tagColors] = useState(['acx-bg-green-30', 'acx-bg-red-30', 'acx-bg-blue-light-30', 'acx-bg-blue-30']);

    useEffect(() => {
        setGroupsLoading(!isGroupsLoaded);
    }, [isGroupsLoaded]);

    useEffect(() => {
        if (location.state && location.state.hasOwnProperty('historyAddGroupModalShow')) {
            setAddGroupModalShow(location.state.historyAddGroupModalShow);
        }
    }, [location]);

    const initiateDeleteGroup = (id) => {
        deleteGroup(
            groupToDelete,
            (successMessage) => {
                NotificationManager.success(successMessage, 'Success', 4000);
            },
            (failedMessage) => {
                NotificationManager.error(failedMessage, 'Deletion Error', 4000);
            },
        );
    };

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

    /* const AlphacxMTPagination = (props) => {
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
        onRowsPerPageChange={(event) => {
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
              onRowsPerPageChange={(event) => {
                // fetch tickets with new rows per page
                getPaginatedUsers(event.target.value, meta.currentPage);
              }}
            />
          );
        }}
      />
    );
  }; */

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

    const handleGroupEdit = function () {
        setIsEditing(true);
        const { id } = this;
        setGroupId(id);
        setAddGroupModalShow(true);
    };

    const handleGroupAdd = () => {
        setIsEditing(false);
        setAddGroupModalShow(true);
    };

    return (
        <div>
            {groupsLoading && (
                <div className="cust-table-loader">
                    <MoonLoader loading={groupsLoading} color={brandKit({ bgCol: 0 })?.backgroundColor} size={30} />
                </div>
            )}
            <div className="card card-body bg-white p-0 border-0">
                <div id="mainContentHeader" className="breadcrumb">
                    <span className="text-muted f-14">
                        <Link to="/settings">Settings</Link>&nbsp;&nbsp;&nbsp;
                        <i className="bi bi-chevron-right" />
                        &nbsp;&nbsp;&nbsp;
                        <span>Teams</span>
                    </span>
                </div>

                <h5 className="fw-bold">Teams</h5>

                <div className="d-flex justify-content-between flex-wrap rounded-top-04 flex-md-nowrap align-items-center p-4 px-3 pe-0">
                    <div />

                    <div className="btn-toolbar mb-md-0 mt-3">
                        {/* <button
              onClick={() => setAddMemberModalShow(true)}
              type="button"
              className="btn border-1 border btn-sm btn-outline-secondary ps-md-3 ms-md-3 reset-btn-outline me-3"
            >
              <img src={ProfileIcon} alt="" />
              &nbsp;Add Member
            </button> */}

                        <AccessControl>
                            <button
                                onClick={handleGroupAdd}
                                type="button"
                                className={`btn btn-sm px-3 mx-1 ${css({
                                    ...brandKit({ bgCol: 0 }),
                                    color: 'white',
                                    '&:hover': { ...brandKit({ bgCol: 30 }), color: 'white' },
                                })}`}
                            >
                                &nbsp;Add Team
                            </button>
                        </AccessControl>
                    </div>
                </div>

                <div id="alphacxMTable" className="pb-2 acx-group-table acx-user-table-2 fit-content">
                    {groups && (
                        <MuiThemeProvider theme={tableTheme}>
                            <MaterialTable
                                title=""
                                icons={tableIcons}
                                columns={[
                                    {
                                        title: 'Name',
                                        field: 'name',
                                    },
                                    {
                                        title: 'Description',
                                        field: 'description',
                                        width: '40%',
                                    },
                                    {
                                        title: 'Category',
                                        field: 'category',
                                        width: '40%',

                                        render: (rowData) => (
                                            <div className="table-tags">
                                                {rowData.category.map(
                                                    (item, index) =>
                                                        index <= 1 && (
                                                            <span className="badge rounded-pill acx-bg-gray-30 px-3 py-2 me-1 my-1">
                                                                {item.category.name}
                                                            </span>
                                                        ),
                                                )}

                                                {rowData.category.length > 2 && (
                                                    <span className="badge rounded-pill text-muted border px-2 py-1 my-1">{`+${
                                                        rowData.category.length - 2
                                                    }`}</span>
                                                )}
                                            </div>
                                        ),
                                    },
                                    {
                                        title: 'Action',
                                        field: 'action',
                                        render: (rowData) => (
                                            <div className="form-check form-switch">
                                                <button
                                                    type="submit"
                                                    className="user-delete-btn me-2 d-inline-block"
                                                    onClick={handleGroupEdit.bind({ id: rowData.id })}
                                                >
                                                    <EditIcon />
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="user-delete-btn ms-3 d-inline-block"
                                                    onClick={() => {setShowDeleteConfirm(true); setGroupToDelete(rowData?.id)}}
                                                >
                                                    <DeleteRedIcon />
                                                </button>
                                            </div>
                                        ),
                                    },
                                ]}
                                data={groups.map(({ id, name, description, category_id, groupCategories }) => ({
                                    name: wordCapitalize(name),
                                    description: wordCapitalize(description),
                                    members: 5,
                                    category: groupCategories,
                                    updated: '21 Jul 2021',
                                    id,
                                }))}
                                options={{
                                    search: true,
                                    selection: false,
                                    // exportButton: true,
                                    tableLayout: 'auto',
                                    paging: true,
                                    pageSize: 50,
                                    rowStyle: {
                                        backgroundColor: '#fff',
                                    },
                                    headerStyle: {
                                        backgroundColor: '#f8f9fa',
                                    },
                                }}
                                components={{
                                    Pagination: AlphacxMTPagination2,
                                }}
                            />
                        </MuiThemeProvider>
                    )}
                </div>
            </div>

            <AddGroupModal
                addGroupModalShow={addGroupModalShow}
                setAddGroupModalShow={setAddGroupModalShow}
                category={ticketCategories}
                groupId={groupId}
                isEditing={isEditing}
            />
            <AddMemberModal
                addMemberModalShow={addMemberModalShow}
                setAddMemberModalShow={setAddMemberModalShow}
                groups={groups}
            />

            <Modal open={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} center>
                <div className="p-5 w-100">
                    <h6 className="mb-5">Are you sure you want to delete this item?</h6>
                    <div className="d-flex justify-content-center">
                        <button
                            className="btn btn-sm f-12 border cancel px-4"
                            onClick={() => setShowDeleteConfirm(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className={`btn btn-sm ms-2 f-12 bg-custom px-4 ${css({
                                ...brandKit({ bgCol: 0 }),
                                color: 'white',
                                '&:hover': { ...brandKit({ bgCol: 30 }), color: 'white' },
                            })}`}
                            onClick={(e) => {
                                e.preventDefault();
                                initiateDeleteGroup(groupToDelete);
                                setShowDeleteConfirm(false);
                            }}
                        >
                            Yes
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => ({
    groups: state.group.groups,
    meta: state.user.meta,
    isUsersLoaded: state.user.isUsersLoaded,
    categories: state.category.categories,
    isGroupsLoaded: state.group.isGroupsLoaded,
    authenticatedUser: state.userAuth.user,
});

export default connect(mapStateToProps, { deleteGroup })(GroupList);
