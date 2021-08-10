import React from "react";
import "./CannedResponsesSettings.scss";
import RightArrow from "../../../../assets/imgF/arrow_right.png";
import { Link } from "react-router-dom";
import { httpGetMain } from "../../../../helpers/httpMethods";
import { useState } from "react";
import { NotificationManager } from "react-notifications";
import { useEffect } from "react";
import { ReactComponent as DotSvg } from "../../../../assets/icons/dots.svg";
import { Dropdown } from "react-bootstrap";
import MaterialTable from "material-table";
import { TablePagination } from "@material-ui/core";
import tableIcons from "../../../../assets/materialicons/tableIcons";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
import "../../../../styles/Ticket.css";

const AlphacxMTPagination = (props) => {
  const {
    ActionsComponent,
    onChangePage,
    onChangeRowsPerPage,
    ...tablePaginationProps
  } = props;
  const [changingRow, setChangingRow] = useState(false);
  return (
    <TablePagination
      {...tablePaginationProps}
      rowsPerPageOptions={[10, 20, 30]}
      rowsPerPage={10}
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
const CannedResponsesSettings = () => {
  const [allResponses, setAllResponses] = useState([]);
  const [fetchCount, setFetchCount] = useState(0);

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
  const tableColumns = [
    {
      title: "Title",
      field: "title",
      width: "40%",
    },
    {
      title: "Message",
      field: "message",
    },

    {
      title: "",
      field: "dropdownAction",
      render: (rowData) => (
        <Dropdown id="cust-table-dropdown" className="ticket-status-dropdown">
          <Dropdown.Toggle variant="transparent" size="sm">
            <span className="cust-table-dots">
              <DotSvg />
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="1">
              <Link to="/settings/users/personal-info-settings">
                <span className="black-text">Edit</span>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item eventKey="2">
              <span className="black-text">Delete</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];
  const getAllResponces = async () => {
    const res = await httpGetMain("canned-responses");

    if (res?.status == "success") {
      // setLoadingTicks(true);
      // setTickets(res?.data?.tickets);
      // setLoadingTicks(false);
      console.clear();
      console.log(res?.data);
      setFetchCount(1);
      setAllResponses(res?.data);
    } else {
      // setLoadingTicks(false);
      console.clear();
      console.log("error", res);
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };

  useEffect(() => {
    if (fetchCount == 0) {
      getAllResponces();
    }
  }, [setAllResponses]);
  return (
    <div className="canned-reponses">
      <div className="card card-body bg-white border-0">
        <div id="mainContentHeader mb-3">
          <h6 className="text-muted f-14">
            <Link to="/settings">
              <span className="text-custom">Settings</span>
            </Link>{" "}
            <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
            {/* <object data="../assets/alphatickets/icons/right-arrow.svg"
                            className="img-fluid mx-2 me-3"></object> */}
            <span>Canned Responses</span>
          </h6>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mt-3 mb-4 f-16 fw-bold">Canned Responses</h5>
          <div>
            <Link
              className="btn btn-sm ms-2 f-12 bg-custom px-4 w-45"
              to="canned-response/new-response"
            >
              New Canned Response
            </Link>
          </div>
        </div>

        <div className="ticket-table-wrapper" style={{ paddingTop: 70 }}>
          <div
            id="alphacxMTable"
            className="pb-5 acx-ticket-cust-table acx-ticket-table p-4"
          >
            {/* {fetchCount > 0 && allResponses && ( */}
            <MuiThemeProvider theme={tableTheme}>
              <MaterialTable
                columns={tableColumns}
                title=""
                icons={tableIcons}
                data={allResponses?.map(({ title, message }) => ({
                  title,
                  message: message.substring(0, 90) + "...",
                }))}
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
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CannedResponsesSettings;
