import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ReactComponent as UploadSvg } from "../../../assets/svgicons/Upload.svg";
import { ReactComponent as ImportSvg } from "../../../assets/svgicons/import.svg";
import TicketStarIcon from "../../../assets/svgicons//Ticket-Star.svg";
import MaterialTable from "material-table";
import { TablePagination } from "@material-ui/core";
import tableIcons from "../../../assets/materialicons/tableIcons";
import "../../../styles/Ticket.css";
import ScaleLoader from "react-spinners/ScaleLoader";
import moment from "moment";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
import { getPaginatedTickets } from "../../../reduxstore/actions/ticketActions";
import CreateTicketModal from "./CreateTicketModal";
import { Dropdown } from "react-bootstrap";
import { exportTable, textCapitalize } from "../../../helper";
import SaveAlt from "@material-ui/icons/SaveAlt";
import { ReactComponent as StarUnactiveSvg } from "../../../assets/icons/Star-unactive.svg";
import { ReactComponent as StarYellowSvg } from "../../../assets/icons/Star-yellow.svg";

const TicketList = ({
  isTicketsLoaded,
  tickets,
  meta,
  getPaginatedTickets,
  isUserAuthenticated
}) => {
  const [ticketLoading, setTicketLoading] = useState(false);
  const [createModalShow, setCreateModalShow] = useState(false);
  const [changingRow, setChangingRow] = useState(false);
  let selectedRows = [];

  useEffect(() => {
    if (isUserAuthenticated) {
        // get first set of tickets
        getPaginatedTickets(10, 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [isUserAuthenticated]);

  useEffect(() => {
    setTicketLoading(!isTicketsLoaded);
    if (isTicketsLoaded) {
      setChangingRow(false);
    }
  }, [isTicketsLoaded]);

  useEffect(() => {
    if(isTicketsLoaded){
      console.clear()
    }
  }, [isTicketsLoaded])

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

  const handleExportBtn = () => {
    // const exportBtn = document.querySelector('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit');
    // exportBtn && exportBtn.click();
  };

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
        rowsPerPage={meta?.itemsPerPage || 5}
        count={Number(meta?.totalItems || 20)}
        page={(meta?.currentPage || 1) - 1}
        onPageChange={onChangePage}
        // when the number of rows per page changes
        onRowsPerPageChange={(event) => {
          setChangingRow(true);
          getPaginatedTickets(event.target.value, 1);
        }}
        ActionsComponent={(subprops) => {
          const { onPageChange, ...actionsComponentProps } = subprops;
          return (
            <ActionsComponent
              {...actionsComponentProps}
              onChangePage={(event, newPage) => {
                // fetch tickets with new current page
                getPaginatedTickets(meta.itemsPerPage, newPage + 1);
              }}
              onRowsPerPageChange={(event) => {
                // fetch tickets with new rows per page
                getPaginatedTickets(event.target.value, meta.currentPage);
              }}
            />
          );
        }}
      />
    );
  };

  const getStatusColor = (status, id) => {
    /* switch (status) {
      case "Pending":
        return "orange";
      case "Resolved":
        return "green";
      case "In Review":
        return "yellow";
      case "Awaiting User Reply":
        return "awaiting";
      case "Closed":
        return "red";
      default:
        return "";
    } */

    if (id) {
      switch (id.slice(0, 13)) {
        case "23838da6-0566":
          return "orange";
        case "dafcab89-2b7f":
          return "green";
        case "23838ae4-1223":
          return "yellow";
        case "23838da6-1223":
          return "awaiting";
        case "23838ec5-0566":
          return "red";
        default:
          return "";
      }
    }
  };

  const getRatingStar = (rating = 0) => {
    
    if (!rating) {
      rating = 0;
    } else if (typeof rating?.value !== "number") {
      rating = 0;
    } else {
      rating = rating?.value;
    }

    const ratingArr = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= rating)  {
        ratingArr.push(true)
      } else {
        ratingArr.push(false);
      }

    }

    return (<div className={"table-ratings"}>
              {ratingArr.map(x => <span className="table-ratings-span">{x ? <StarYellowSvg /> : <StarUnactiveSvg />}</span>)}
          </div>);
  }

  const tableColumns = [
    {
      title: "Name",
      field: "contact",
      render: (rowData) => (
        <Link
          to={`/customers/${rowData.customerId}`}
          style={{ textTransform: "capitalize" }}
        >
          {rowData.name}
        </Link>
      ),
    },
    {
      title: "Ticket ID",
      field: "ticketId",
      width: "40%",
      render: (rowData) => (
        <Link
          to={`/tickets/${rowData.ticketUid}`}
          style={{ textTransform: "uppercase" }}
        >
          {rowData.ticketId}
        </Link>
      ),
    },
    {
      title: "Subject",
      field: "subject",
      width: "40%",
    },
    {
      title: "Category",
      field: "category",
    },
    {
      title: "Stage",
      field: "status",
      render: (rowData) => (
        <div className={`ticket-state ${getStatusColor(rowData.status, rowData.statusId)}`}>
          <Link to="#" className="btn btn-sm">
            {rowData.status}
          </Link>
        </div>
      ),
    },
    {
      title: "Assigned to",
      field: "assignedTo",
      render: (rowData) => rowData.assignedTo.trim() ?  <Link to={`/settings/profile/${rowData.assigneeId}`} style={{ textTransform: "capitalize" }}>
          {rowData.assignedTo}
        </Link> : <span className="text-muted acx-fs-8">Unassigned</span>,

    },
    // {
    //     title: 'Status',
    //     field: 'status',
    //     render: rowData => (<Dropdown className="ticket-status-dropdown">
    //                             <Dropdown.Toggle variant="transparent" size="sm">
    //                                 Open
    //                             </Dropdown.Toggle>
    //                             <Dropdown.Menu>
    //                                 <Dropdown.Item eventKey="1">Open</Dropdown.Item>
    //                                 <Dropdown.Item eventKey="2">Pending</Dropdown.Item>
    //                                 <Dropdown.Item eventKey="3">Resolved</Dropdown.Item>
    //                                 <Dropdown.Item eventKey="4">Closed</Dropdown.Item>
    //                             </Dropdown.Menu>
    //                         </Dropdown>)
    //     // render: rowData => (<select name="ticket-status-select" id="ticket-status-select">
    //     //                         <option value="open">Open</option>
    //     //                         <option value="pending">Pending</option>
    //     //                         <option value="resolved">Resolved</option>
    //     //                         <option value="closed">Closed</option>
    //     //                     </select>)
    // },
    // {
    //     title: 'Tags',
    //     field: 'tags',
    //     render: rowData => (<div className={"table-tags"}><span className="badge rounded-pill acx-bg-purple-30 px-3 py-2 me-1">Customer Data</span><span className="badge rounded-pill text-muted border px-2 py-1">+2</span></div>)
    // },
    {
      title: "Ratings",
      field: "rating",
      render: (rowData) => getRatingStar(rowData.rating),
    },
    {
      title: "Created",
      field: "createdTime",
      render: (rowData) => rowData.created,
    },
  ];

  const handleCSVExport = () => {
    if (tickets) {
      const data =
        selectedRows.length !== 0
          ? selectedRows
          : tickets.map(
              ({ customer, subject, id, category, created_at, status, assignee, rating, ticket_id }) => ({
                name: `${customer.firstname} ${customer.lastname == "default" ? "" : customer.lastname || "" }`,
                email: customer.email,
                subject: `${subject.substr(0, 25)}...`,
                ticketUid: id,
                ticketId: ticket_id,
                category: category.name,
                created: moment(created_at).format("DD MMM, YYYY"),
                state: status,
                assignedTo: textCapitalize(`${assignee?.firstname || ""} ${assignee?.lastname || ""}`),
                rating: rating || 0
              })
            );
      exportTable(tableColumns, data, "csv", "TicketExport");
    }
  };

  const handlePDFExport = () => {
    if (tickets) {
      const data =
        selectedRows.length !== 0
          ? selectedRows
          : tickets.map(
              ({ customer, subject, id, category, created_at, status, assignee, rating, ticket_id  }) => ({
                name: textCapitalize(`${customer.firstname} ${customer.lastname == "default"? "" : customer.lastname || ""}`),
                email: customer.email,
                subject: `${subject.substr(0, 25)}...`,
                // ticketId: id.slice(-8),
                ticketId: ticket_id,
                category: category.name,
                created: moment(created_at).format("DD MMM, YYYY"),
                state: status,
                assignedTo: textCapitalize(`${assignee?.firstname || ""} ${assignee?.lastname || ""}`),
                rating: rating || 0
              })
            );
      exportTable(tableColumns, data, "pdf", "TicketExport");
    }
  };

  const handleSelectionChange = (rows) => {
    selectedRows = rows;
  };

  return (
    <div>
      {ticketLoading && (
        <div
          className={`cust-table-loader ${
            ticketLoading && "add-loader-opacity"
          }`}
        >
          <ScaleLoader loading={ticketLoading} color={"#006298"} />
        </div>
      )}
      <div className="ticket-table-wrapper">
        <div
          style={{ background: "#fefdfd" }}
          className={`d-flex justify-content-start flex-wrap rounded-top-04 flex-md-nowrap align-items-center p-4 px-3 ${
            ticketLoading && "rounded-bottom-04"
          }`}
        >
          {/*                     <div>
                        
                    </div> */}

          <div className="btn-toolbar mb-md-0">
            {/* <button
                            type="button"
                            className="btn btn-sm bg-at-blue-light px-md-3 mx-1"
                            onClick={() => setCreateModalShow(true)}>
                            <img src={TicketStarIcon} style={{ transform: 'scale(0.8)', display: 'inline-block' }} alt=""/>&nbsp;New Ticket
                        </button>

                        <button
                            onClick={handleExportBtn}
                            type="button"
                            className="btn btn-sm btn-outline-secondary ps-md-3 mx-md-3 reset-btn-outline">
                            <UploadSvg/>&nbsp;Import
                        </button> */}

            <Dropdown id="export-dropdown-main">
              <Dropdown.Toggle
                id="export-dropdown"
                className="reset-btn-outline btn ticket-export-btn"
              >
                {/* <ImportSvg/>&nbsp;Export */}
                <SaveAlt />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as="button" onClick={handlePDFExport}>
                  As PDF
                </Dropdown.Item>
                <Dropdown.Item as="button" onClick={handleCSVExport}>
                  As CSV
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <div
          id="alphacxMTable"
          className="pb-5 acx-ticket-cust-table acx-ticket-table fit-content"
        >
          {tickets && !changingRow && (
            <MuiThemeProvider theme={tableTheme}>
              <MaterialTable
                title=""
                icons={tableIcons}
                columns={tableColumns}
                data={tickets.map(
                  ({
                    customer,
                    subject,
                    id,
                    category,
                    created_at,
                    status,
                    assignee,
                    rating,
                    ticket_id
                  }) => ({
                    name: `${customer?.firstname} ${customer?.lastname == "default"? "" : customer?.lastname || ""}`,
                    customerId: customer?.id,
                    ticketId: ticket_id,
                    ticketUid: id,
                    email: customer?.email,
                    subject: `${subject?.substr(0, 25)}...`,
                    category: category?.name,
                    created: moment(created_at).format("DD MMM, YYYY"),
                    status: status?.status,
                    assignedTo: `${assignee?.firstname || ""} ${assignee?.lastname || ""}`,
                    rating: rating,
                    assigneeId: assignee?.id,
                    statusId: status?.id,
                    createdTime: new Date(created_at || Date.now()).getTime()
                  })
                )}
                options={{
                  search: true,
                  selection: true,
                  // exportButton: true,
                  tableLayout: "auto",
                  paging: true,
                  pageSize: meta?.itemsPerPage || 10,
                  headerStyle: {
                    // backgroundColor: '#f8f9fa'
                    backgroundColor: "#fefdfd",
                  },
                }}
                components={{
                  Pagination: AlphacxMTPagination,
                }}
                localization={{
                  body: {
                    emptyDataSourceMessage: "No tickets to display",
                  },
                }}
                onSelectionChange={handleSelectionChange}
              />
            </MuiThemeProvider>
          )}
        </div>
      </div>

      <CreateTicketModal
        createModalShow={createModalShow}
        setCreateModalShow={setCreateModalShow}
        setChangingRow={setChangingRow}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  tickets: state.ticket.tickets,
  isTicketsLoaded: state.ticket.isTicketsLoaded,
  meta: state.ticket.meta,
  isTicketsFullyLoaded: state.ticket.isTicketsFullyLoaded,
  isUserAuthenticated: state.userAuth.isUserAuthenticated
});

export default connect(mapStateToProps, { getPaginatedTickets })(TicketList);
