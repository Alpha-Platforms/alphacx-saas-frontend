// @ts-nocheck
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
// import { Dropdown } from "react-bootstrap";
import { exportTable, textCapitalize } from "../../../helper";
import SaveAlt from "@material-ui/icons/SaveAlt";
import { ReactComponent as StarUnactiveSvg } from "../../../assets/icons/Star-unactive.svg";
import { ReactComponent as StarYellowSvg } from "../../../assets/icons/Star-yellow.svg";
import { NotificationManager } from 'react-notifications';
import { httpDeleteMain, httpDelete, httpGetMain } from './../../../helpers/httpMethods';
// import Dropdown from 'react-multilevel-dropdown';
import Dropdown, {
  DropdownToggle,
  DropdownMenu,
  DropdownMenuWrapper,
  MenuItem,
  DropdownButton
} from '@trendmicro/react-dropdown';
import { Modal } from "react-responsive-modal";
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-buttons/dist/react-buttons.css';
import '@trendmicro/react-dropdown/dist/react-dropdown.css';
import {multiIncludes} from '../../../helper';
import {accessControlFunctions} from '../../../config/accessControlList';
// import { Button, ButtonGroup, ButtonToolbar } from '@trendmicro/react-buttons';

export const ExportDropdown = ({handlePDFExport, handleCSVExport, addLeftMargin, exportAll}) => {
  const [exportMenuOpen, setExportMenuOpen] = useState(false);


  return <Dropdown id="export-dropdown-main" className={`ticket-export-dropdown ${addLeftMargin ? 'mg-lft' : ''}`}>
  <DropdownToggle onClick={() => setExportMenuOpen(!exportMenuOpen)}><SaveAlt /></DropdownToggle>
  <DropdownMenu className="export-dd-menu" style={{ display: exportMenuOpen ? "block" : "none" }} onMouseLeave={() => setExportMenuOpen(false) }>
      <MenuItem className="export-dd-child">
        Export Selected Tickets
          <MenuItem onClick={() => handlePDFExport('selected')}>
              As PDF
          </MenuItem>
          <MenuItem onClick={() => handleCSVExport('selected')}>
            AS CSV
          </MenuItem>
      </MenuItem>
      {exportAll && <MenuItem className="export-dd-child">
          Export All Ticket
          <MenuItem onClick={() => handlePDFExport('all')}>
              As PDF
          </MenuItem>
          <MenuItem onClick={() => handleCSVExport('all')}>
              AS CSV
          </MenuItem>
      </MenuItem>}
  </DropdownMenu>
</Dropdown>
}

const TicketList = ({
  isTicketsLoaded,
  tickets,
  meta,
  getPaginatedTickets,
  isUserAuthenticated,
  user
}) => {
  const [ticketLoading, setTicketLoading] = useState(false);
  const [createModalShow, setCreateModalShow] = useState(false);
  const [changingRow, setChangingRow] = useState(false);
  const [rowsSelected, setRowsSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  let selectedRows = [];

  useEffect(() => {
    if (isUserAuthenticated) {
        // get first set of tickets
        getPaginatedTickets(50, 1);
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
      // console.clear()
    }
  }, [isTicketsLoaded])

  useEffect(() => {
    const deleteBtnWrapper = window.document.querySelector('#delete-btn-wrapper');
    deleteBtnWrapper.classList.add('d-none');
  })

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
        rowsPerPageOptions={[10, 20, 30, 50, 100, 150, 200]}
        rowsPerPage={meta?.itemsPerPage || 50}
        count={Number(meta?.totalItems || 20)}
        page={(meta?.currentPage || 1) - 1}
        onPageChange={onChangePage}
        // when the number of rows per page changes
        onRowsPerPageChange={(event) => {
          // setChangingRow(true);
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
              {ratingArr.map((x, index) => <span key={index} className="table-ratings-span">{x ? <StarYellowSvg /> : <StarUnactiveSvg />}</span>)}
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

  const handleCSVExport = async (type) => {
    if (tickets) {
      if (type === "selected") {
        if (selectedRows.length === 0) return;
        const data =
        selectedRows.length !== 0
          ? selectedRows
          : tickets.map(
              ({ customer, subject, id, category, created_at, status, assignee, rating, ticket_id }) => ({
                name: `${customer.firstname} ${customer.lastname == "default" ? "" : customer.lastname || "" }`,
                email: customer.email,
                subject,
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
      } else if (type === "all") {
        setLoading(true);
        const res = await httpGetMain(`tickets?per_page=${meta?.totalItems}&page=${1}`);
        setLoading(false);
        if (res?.status === 'success') {
          const data = res?.data?.tickets?.map(
            ({ customer, subject, id, category, created_at, status, assignee, rating, ticket_id  }) => ({
              name: `${textCapitalize(customer?.firstname || '')} ${textCapitalize(customer.lastname === "default"? "" : customer.lastname ? customer?.lastname : '')}`,
              email: customer.email,
              subject,
              // ticketId: id.slice(-8),
              ticketId: ticket_id,
              category: category.name,
              created: moment(created_at).format("DD MMM, YYYY"),
              state: status,
              assignedTo: textCapitalize(`${assignee?.firstname || ""} ${assignee?.lastname || ""}`),
              rating: rating || 0
            })
          );
          exportTable(tableColumns, data, "csv", "TicketExport");
        } else {
          NotificationManager.error('Tickets could not be retrieved', 'Error');
        }
      }
    }
  }

  const handlePDFExport = async (type) => {
    if (tickets) {
      if (type === "selected") {
        if (selectedRows.length === 0) return;
        const data =
          selectedRows.length !== 0
            ? selectedRows
            : tickets.map(
                ({ customer, subject, id, category, created_at, status, assignee, rating, ticket_id  }) => ({
                  name: textCapitalize(`${customer.firstname} ${customer.lastname == "default"? "" : customer.lastname || ""}`),
                  email: customer.email,
                  subject,
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
      } else if (type === "all") {
        setLoading(true);
        const res = await httpGetMain(`tickets?per_page=${meta?.totalItems}&page=${1}`);
        setLoading(false);
        if (res?.status === 'success') {
          const data = res?.data?.tickets?.map(
            ({ customer, subject, id, category, created_at, status, assignee, rating, ticket_id  }) => ({
              name: `${textCapitalize(customer?.firstname || 'Firstname')} ${textCapitalize(customer.lastname === "default"? "" : customer.lastname ? customer?.lastname : '')}`,
              email: customer.email,
              subject,
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
        } else {
          NotificationManager.error('Tickets could not be retrieved', 'Error');
        }
      }
    }
  };

  const handleSelectionChange = (rows) => {
    if (!multiIncludes(accessControlFunctions[user?.role], ["delete_ticket"])) return
    
    selectedRows = rows;

    const deleteBtnWrapper = window.document.querySelector('#delete-btn-wrapper');
    const selectedRowCount = window.document.querySelector('#selected-row-count');
    const ticketDeleteBtn = window.document.querySelector('#ticket-delete-btn');

    // setTimeout(() => setRowsSelected(rows), 2000);
    selectedRowCount.innerHTML = rows.length;

    // show or hide button base on selected row count
    if (rows.length > 0) {
      deleteBtnWrapper?.classList.remove('d-none');
    } else {
      deleteBtnWrapper?.classList.add('d-none');
    }

    if (rows.length === 1) {
      ticketDeleteBtn.disabled = false;
    } else {
      ticketDeleteBtn.disabled = false;
    }
  };


  const handleDeleteTicket = async () => {
    closeTicketDeleteModal();
    // const deleteBtnWrapper = window.document.querySelector('#delete-btn-wrapper');
    const selectedRowCount = window.document.querySelector('#selected-row-count');
    // const ticketDeleteBtn = window.document.querySelector('#ticket-delete-btn');

    // setRowsSelected([]);
    if (selectedRows.length > 0) {

      if (selectedRows.length === 1 ) {

        setTicketLoading(true);
        const res = await httpDeleteMain(`tickets/${selectedRows[0]?.ticketUid}`);
        selectedRows = [];
        selectedRowCount.innerHTML = 0;

        if (res?.status === "success") {
          NotificationManager.success('Ticket Deleted', 'Success', 4000);
          getPaginatedTickets(50, 1, () => {
            setTicketLoading(false);
          }, () => {
            setTicketLoading(false);
          })

        } else {
          setTicketLoading(false);
          return NotificationManager.error(res?.er?.message, "Error", 4000);
        }
      } else {

        const ticketIds = selectedRows.map(row => row.ticketUid);

        const reqBody = { ids: ticketIds }

        setTicketLoading(true);
        const res = await httpDeleteMain(`tickets`, JSON.stringify(reqBody));
        selectedRows = [];
        selectedRowCount.innerHTML = 0;

        if (res?.status === "success") {
          NotificationManager.success('Ticket Deleted', 'Success', 4000);
          getPaginatedTickets(50, 1, () => {
            setTicketLoading(false);
          }, () => {
            setTicketLoading(false);
          })
        } else {
          setTicketLoading(false);
          return NotificationManager.error(res?.er?.message, "Error", 4000);
        }
      }

    } 
  }

  const openTicketDeleteModal = () => {
    const ticketDeleteModal = document.querySelector('#ticket-delete-confirm-modal');
    ticketDeleteModal.classList.remove('d-none');
  }

  const closeTicketDeleteModal = () => {
    const ticketDeleteModal = document.querySelector('#ticket-delete-confirm-modal');
    ticketDeleteModal.classList.add('d-none');
  }


  return (
    <div>
      {(ticketLoading || loading) && (
        <div
          className={`cust-table-loader ${
            ticketLoading && "add-loader-opacity"
          }`}
        >
          <ScaleLoader loading={true} color={"#006298"} />
        </div>
      )}
      <div className="ticket-table-wrapper">
        <div
          style={{ background: "#fefdfd" }}
          className={`d-flex justify-content-start flex-wrap rounded-top-04 flex-md-nowrap align-items-center p-4 px-3 ${
            ticketLoading && "rounded-bottom-04"
          }`}
        >

          <div className="btn-toolbar mb-md-0">
            <ExportDropdown handlePDFExport={handlePDFExport} handleCSVExport={handleCSVExport} addLeftMargin={true} exportAll={true} />
            {/* <Dropdown id="export-dropdown-main">
              <Dropdown.Toggle
                id="export-dropdown"
                className="reset-btn-outline btn ticket-export-btn"
              >
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
            </Dropdown> */}

            {/* <Dropdown ----------   COMMENTED DUE TO react-multilevel-dropdown PEER DEP ISSUES / FIND A REPLACEMENT   --------------
              title={<SaveAlt />}
              id="export-dropdown-main"
            >
              <Dropdown.Item>
                Export Selected Tickets
                <Dropdown.Submenu position="right">
                  <Dropdown.Item onClick={() => handlePDFExport('selected')}>
                    As PDF
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleCSVExport('selected')}>
                    As CSV
                  </Dropdown.Item>
                </Dropdown.Submenu>
              </Dropdown.Item>
              <Dropdown.Item>
                Export All Ticketss
                <Dropdown.Submenu position="right">
                  <Dropdown.Item onClick={() => handlePDFExport('all')}>
                    As PDF
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleCSVExport('all')}>
                    As CSV
                  </Dropdown.Item>
                </Dropdown.Submenu>
              </Dropdown.Item>
            </Dropdown> */}
          </div>

              <div id="delete-btn-wrapper" className="delete-btn-wrapper d-none">
                <div>
                  <button onClick={openTicketDeleteModal} id="ticket-delete-btn" className="btn" type="button"><i className="bi bi-trash"></i></button>
                </div>
                <div>
                  <span><span id="selected-row-count">0</span> ticket(s) selected</span>
                </div>
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
                    key: ticket_id,
                    name: `${customer?.firstname} ${customer?.lastname === "default"? "" : customer?.lastname || ""}`,
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
                  pageSize: meta?.itemsPerPage || 50,
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
      <div><div id='ticket-delete-confirm-modal' className="react-responsive-modal-root d-none" data-testid="root"><div className="react-responsive-modal-overlay" data-testid="overlay" aria-hidden="true"  style={{animation: "300ms ease 0s 1 normal none running react-responsive-modal-overlay-in"}}></div><div className="react-responsive-modal-container react-responsive-modal-containerCenter" onClick={closeTicketDeleteModal} data-testid="modal-container"><div className="react-responsive-modal-modal" role="dialog" aria-modal="true" data-testid="modal" tabindex="-1" style={{animation: "300ms ease 0s 1 normal none running react-responsive-modal-modal-in"}} onClick={(e) => e.stopPropagation()}><div className="p-5 w-100"><h6 className="mb-5">Are you sure you want to delete?</h6><div className="d-flex justify-content-center"><button className="btn btn-sm f-12 border cancel px-4" onClick={closeTicketDeleteModal}>Cancel</button><button className="btn btn-sm ms-2 f-12 bg-custom px-4" onClick={handleDeleteTicket}>Yes</button></div></div><button className="react-responsive-modal-closeButton" data-testid="close-button"><svg width="28" height="28" viewBox="0 0 36 36" data-testid="close-icon"><path d="M28.5 9.62L26.38 7.5 18 15.88 9.62 7.5 7.5 9.62 15.88 18 7.5 26.38l2.12 2.12L18 20.12l8.38 8.38 2.12-2.12L20.12 18z"></path></svg></button></div></div></div></div>

      {/* delete confirm modal */} 
      {/* -------------             modal open deselects selected tickets. Fix later              --------------- */}
      <Modal
        open={false}
        // onClose={() => setShowDeleteConfirm(false)}
        center
      >
        <div className="p-5 w-100">
          <h6 className="mb-5">Are you sure you want to delete this item?</h6>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-sm f-12 border cancel px-4"
              // onClick={() => setShowDeleteConfirm(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-sm ms-2 f-12 bg-custom px-4"
              onClick={(e) => {}}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  tickets: state.ticket.tickets,
  isTicketsLoaded: state.ticket.isTicketsLoaded,
  meta: state.ticket.meta,
  isTicketsFullyLoaded: state.ticket.isTicketsFullyLoaded,
  isUserAuthenticated: state.userAuth.isUserAuthenticated,
  user: state.userAuth.user
});

export default connect(mapStateToProps, { getPaginatedTickets })(TicketList);
