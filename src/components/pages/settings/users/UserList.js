//@ts-nocheck
import { useState, useEffect } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import tableIcons from "../../../../assets/materialicons/tableIcons";
import ScaleLoader from "react-spinners/ScaleLoader";
import { TablePagination } from "@material-ui/core";
import { getPaginatedUsers } from "../../../../reduxstore/actions/userActions";
import CreateUserModal from "./components/CreateUserModal";
import ImportUserModal from "./components/ImportUserModal";
import InviteUserModal from "./components/InviteUserModal";
import { ReactComponent as DotSvg } from "../../../../assets/icons/dots.svg";
import { ReactComponent as DeleteSvg } from "../../../../assets/icons/Delete.svg";
import { ReactComponent as DeleteGreySvg } from "../../../../assets/icons/Delete-grey.svg";
import { ReactComponent as ArrowDownSvg } from "../../../../assets/icons/arrow-down.svg";
import { Link } from "react-router-dom";
import moment from 'moment';
// import {ReactComponent as CardDesignSvg} from '../../../../assets/icons/Card-Design.svg';
import Swal from "sweetalert2";
import { wordCapitalize, getUserInitials } from "../../../../helper";
import {updateUser} from '../../../../reduxstore/actions/userActions';
import {getAgents, negateActiveState} from '../../../../reduxstore/actions/agentActions';
import {getAdmins} from '../../../../reduxstore/actions/adminActions';
import {getSupervisors} from '../../../../reduxstore/actions/supervisorActions';
import "../../../../styles/Setting.css";
import {NotificationManager} from 'react-notifications';

const UserList = ({
  users,
  meta,
  getPaginatedUsers,
  isUsersLoaded,
  agents,
  admins,
  supervisors,
  isAgentsLoaded,
  groups,
  negateActiveState,
  isAdminsLoaded,
  isSupervisorLoaded,
  isUserAuthenticated,
  signedUser,
  getAgents,
  getAdmins,
  getSupervisors
}) => {

  const [createModalShow, setCreateModalShow] = useState(false);
  const [inviteModalShow, setInviteModalShow] = useState(false);
  const [importModalShow, setImportModalShow] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [accessControl, setAccessControl] = useState(false)

  useEffect(() => {
    setAccessControl(signedUser.role === "Administrator");
  }, [])

  useEffect(() => {
    if (isUserAuthenticated) {
        // get the first set of users
        // getPaginatedUsers(10, 1);
        getAgents();
        getSupervisors();
        getAdmins();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [isUserAuthenticated]);

  
  // useEffect(() => {
  //   setUserLoading(!agents);
  //   if (isAgentsLoaded) {
  //     setUserLoading(false);
  //   }
  // }, [isAgentsLoaded]);
  
  function AlphacxMTPagination2(props) {
    const {
      ActionsComponent,
      onChangePage,
      onChangeRowsPerPage,
      ...tablePaginationProps
    } = props;
  
    return (
      <TablePagination
        {...tablePaginationProps}
        // @ts-expect-error onChangePage was renamed to onPageChange
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
        ActionsComponent={(subprops) => {
          const { onPageChange, ...actionsComponentProps } = subprops;
          return (
            // @ts-expect-error ActionsComponent is provided by material-table
            <ActionsComponent
              {...actionsComponentProps}
              onChangePage={onPageChange}
            />
          );
        }}
      />
    );
  }


  const themes = ['red', 'blue', 'yellow', 'purple'];
  
  const tableTheme = createTheme({
    palette: {
      primary: {
        main: "rgba(0, 98, 152)",
      },
      secondary: {
        main: "rgba(0, 98, 152)",
      },
    },
  });

  const changeActiveState = async (id, isActivated) => {
    const userRes = await updateUser({
      id,
      role: "Agent",
      isActivated: !isActivated ? true : "false"
    });
    console.log('userRes: ', userRes);
    if (userRes?.status === 'success') {
      NotificationManager.success('Info has been updated', 'Success');
      // getAgents()
      negateActiveState(id);
  } else {
      NotificationManager.error('Something went wrong', 'Error');
  }

  }

  function handleActiveChange() {
    const { name, isActivated, id } = this;
    
    Swal.fire({
      title: isActivated ? "Deactivate?" : "Activate?",
      text: `Do you want to ${
        isActivated ? "deactivate" : "activate"
      } ${wordCapitalize(name)}`,
      showCancelButton: true,
      confirmButtonColor: "#006298",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Deactivate or Activated user");
        changeActiveState(id, isActivated);
      } else {
        console.log("Do nothing");
      }
    });
  }


  return (
    <div>
      {userLoading && (
        <div className="cust-table-loader">
          <ScaleLoader loading={userLoading} color={"#006298"} />
        </div>
      )}
      <div className="card card-body bg-white border-0 p-0 mb-4">
        <div id="mainContentHeader">
          <span className="text-muted f-14">
            <Link to="/settings">Settings</Link>&nbsp;&nbsp;&nbsp;
            <i className="bi bi-chevron-right"></i>&nbsp;&nbsp;&nbsp;
            <span>Users</span>
          </span>
        </div>

        <h5 className="my-3 f-16 fw-500 text-dark">User Management</h5>
        <div className="d-flex justify-content-between align-items-center flex-row">
          <div>
            
            <p className="text-custom-gray f-12"></p>
          </div>
          <div className="mt-3">
            
            { accessControl &&
              <button className="btn btn-custom btn-sm px-4 bg-at-blue-light py-2" onClick={() => setCreateModalShow(true)}>New User</button>
            }

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

          {(isAgentsLoaded && isAdminsLoaded && isSupervisorLoaded) ? (
        <div id="alphacxMTable" className="mb-3 acx-user-table acx-user-table-2">
            <MuiThemeProvider theme={tableTheme}>
              <MaterialTable
                title=""
                icons={tableIcons}
                columns={[
                  {
                    title: "Name",
                    field: "name",
                    render: ({contact}) => (<div className="d-flex user-initials-sm align-items-center">
                          <div>
                          <div
                            className={`user-initials ${contact.theme
                            ? contact.theme
                            : themes[Math.floor(Math.random() * 4)]}`}>{contact.avatar ? <img src={contact.avatar} className="cust-avatar" alt="" /> : getUserInitials(`${contact.firstname} ${contact.lastname}`)}</div>
                          </div>
                            <div className="ms-2">
                                <Link to={`/settings/profile/${contact.id}`} style={{ textTransform: 'capitalize' }}>{`${contact.firstname} ${contact.lastname}`}</Link>
                            </div>
                        </div>),
                    width: "10%",
                  },
                  {
                    title: "Email Address",
                    field: "emailAddress",
                  },
                  {
                    title: "Role",
                    field: "role",
                  },
                  {
                    title: "Team",
                    field: "group",
                  },
                  {
                    title: "Created",
                    field: "created",
                  },
                  {
                    title: "Active",
                    field: "action",
                    render: (rowData) => (
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input form-check-input-lg mt-1"
                          checked={rowData.isActivated}
                          onChange={handleActiveChange.bind({
                            name: rowData.name,
                            isActivated: rowData.isActivated,
                            id: rowData.userId
                          })}
                          readOnly={true}
                          type="checkbox"
                        />
                      </div>
                    ),
                  },
                ]}
                data={[...admins,...supervisors, ...agents].map(
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
                    group_id,
                    avatar
                  }) => ({
                    name: `${firstname} ${lastname}`,
                    emailAddress: email,
                    role,
                    group: groups.map( (item, index) => <span>{`${item.group.name}${groups.length-1 > index? ", ":" "}`}</span>),
                    created: moment(created_at).format('DD MMM, YYYY'),
                    // created: "13 Apr 2021",
                    contact: { firstname, lastname, id, avatar },
                    isActivated,
                    userId: id
                  })
                )}
                options={{
                  search: false,
                  selection: false,
                  // exportButton: true,
                  tableLayout: "auto",
                  paging: true,
                  pageSize: meta?.itemsPerPage || 10,
                  headerStyle: {
                    backgroundColor: "#f8f9fa",
                  },
                  rowStyle: {
                    // backgroundColor: '#f8f9fa'
                  },
                  // filtering: true
                }}
                components={
                  {
                    Pagination: AlphacxMTPagination2
                  }
                }
              />
            </MuiThemeProvider>
        </div>
          ) : <div className="cust-table-loader">
          <ScaleLoader loading={true} color={"#006298"} />
        </div>}
      </div>

      <CreateUserModal
        createModalShow={createModalShow}
        setCreateModalShow={setCreateModalShow}
      />
      <InviteUserModal
        inviteModalShow={inviteModalShow}
        setInviteModalShow={setInviteModalShow}
      />
      <ImportUserModal
        importModalShow={importModalShow}
        setImportModalShow={setImportModalShow}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  users: state.user.users,
  meta: state.user.meta,
  isUsersLoaded: state.user.isUsersLoaded,
  agents: state.agent.agents,
  admins: state.admin.admins,
  supervisors: state.supervisor.supervisors,
  isAgentsLoaded: state.agent.isAgentsLoaded,
  isAdminsLoaded: state.admin.isAdminsLoaded,
  isSupervisorLoaded: state.supervisor.isSupervisorsLoaded,
  groups: state.group.groups,
  isUserAuthenticated: state.userAuth.isUserAuthenticated,
  signedUser: state.userAuth.user
});

export default connect(mapStateToProps, { getPaginatedUsers, getAgents, getSupervisors, getAdmins, negateActiveState })(UserList);
