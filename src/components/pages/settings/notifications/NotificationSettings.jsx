import React from "react";
import { useState } from "react";
import "./NotificationSettings.scss";
import TripleDot from "../../../../assets/imgF/triple_dot.png";
import RightArrow from "../../../../assets/imgF/arrow_right.png";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
import { TablePagination } from "@material-ui/core";
import tableIcons from "../../../../assets/materialicons/tableIcons";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
import "../../../../styles/Ticket.css";

const NotificationSettings = () => {
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
  const [changingRow, setChangingRow] = useState(false);
  const tableColumns = [
    {
      title: "Name",
      field: "name",
      // render: (rowData) => (
      //   <Link to="#" style={{ textTransform: "capitalize" }}>
      //     {rowData.name}
      //   </Link>
      // ),
    },
    {
      title: "Notification Category",
      field: "category",
      width: "40%",
      // render: (rowData) => (
      //   <Link
      //     to={`/tickets/${rowData.ticketId}`}
      //     style={{ textTransform: "uppercase" }}
      //   >
      //     {rowData.ticketId.slice(-8)}
      //   </Link>
      // ),
    },
    {
      title: "Subject",
      field: "subject",
      width: "40%",
    },
    {
      title: "Description",
      field: "description",
    },
  ];
  const [notifications, setNotifications] = useState([
    {
      name: "Welcome Message",
      category: "Email",
      subject: "Welcome to AlphaCX",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      name: "Welcome Message",
      category: "SMS",
      subject: "Welcome to AlphaCX",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      name: "Welcome Message",
      category: "WhatsApp",
      subject: "Welcome to AlphaCX",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ]);

  const AlphacxMTPagination = (props) => {
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
        rowsPerPage={5}
        count={20}
        page={1 - 1}
        onPageChange={onChangePage}
        // when the number of rows per page changes
        onRowsPerPageChange={(event) => {
          setChangingRow(true);
          // getPaginatedTickets(event.target.value, 1);
        }}
        ActionsComponent={(subprops) => {
          const { onPageChange, ...actionsComponentProps } = subprops;
          return (
            <ActionsComponent
              {...actionsComponentProps}
              onChangePage={(event, newPage) => {
                // fetch tickets with new current page
                // getPaginatedTickets(meta.itemsPerPage, newPage + 1);
              }}
              onRowsPerPageChange={(event) => {
                // fetch tickets with new rows per page
                // getPaginatedTickets(event.target.value, meta.currentPage);
              }}
            />
          );
        }}
      />
    );
  };
  return (
    <div className="notification-settings">
      <div className="card card-body bg-white border-0 p-5 mt-4">
        <div id="mainContentHeader">
          <h6 className="text-muted f-14">
            Settings{" "}
            <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
            {/* <object data="../assets/alphatickets/icons/right-arrow.svg"
                            className="img-fluid mx-2 me-3"></object> */}
            <span className="text-custom">Notification Settings</span>
          </h6>
        </div>
        <div className="d-flex justify-content-between align-baseline">
          <h5 className="mt-3 mb-4 f-16 fw-bold">Email Management</h5>
          <div>
            <Link
              className="btn btn-sm f-14 px-5 btn-custom bt"
              to="/settings/notifications/email-template"
            >
              Add Notification
            </Link>
          </div>
        </div>
        <div className="ticket-table-wrapper" style={{ paddingTop: 70 }}>
          <div
            id="alphacxMTable"
            className="pb-5 acx-ticket-cust-table acx-ticket-table p-4"
          >
            <MuiThemeProvider theme={tableTheme}>
              <MaterialTable
                columns={tableColumns}
                title=""
                icons={tableIcons}
                data={notifications.map(
                  ({ name, category, subject, description }) => ({
                    name: name,
                    category,
                    subject,
                    description,
                  })
                )}
                options={{
                  search: true,
                  selection: true,
                  // exportButton: true,
                  tableLayout: "auto",
                  paging: true,
                  pageSize: 10,
                  headerStyle: {
                    // backgroundColor: '#f8f9fa'
                    backgroundColor: "#fefdfd",
                  },
                }}
                components={{
                  Pagination: AlphacxMTPagination,
                }}
              />
            </MuiThemeProvider>
          </div>
        </div>
        {/* <div className="articleList">
          <div className="header">
            <p>Name</p>
            <p>Notification Category</p>
            <p>Subject</p>
            <p>Description </p>
          </div>
          {notifications?.map((not, i) => (
            <TableItem key={i} not={not} />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default NotificationSettings;
