// @ts-nocheck
import React, { useState, useEffect } from 'react'
import FilterDropdown from './components/FilterDropdown';
import '../../../styles/ReportsFilter.scss';
import { PlusIcon } from '../../../assets/SvgIconsSet';
import tableIcons from "../../../assets/materialicons/tableIcons";
import { ReactComponent as StarUnactiveSvg } from "../../../assets/icons/Star-unactive.svg";
import { ReactComponent as StarYellowSvg } from "../../../assets/icons/Star-yellow.svg";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
import MaterialTable from "material-table";
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import { TablePagination } from "@material-ui/core";
import { httpGetMain } from '../../../helpers/httpMethods';

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



const Tickets = ({ tickets, meta, handleFilterApply }) => {

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
          handleFilterApply(event.target.value, 1);
        }}
        ActionsComponent={(subprops) => {
          const { onPageChange, ...actionsComponentProps } = subprops;
          return (
            <ActionsComponent
              {...actionsComponentProps}
              onChangePage={(event, newPage) => {
                // fetch tickets with new current page
                handleFilterApply(meta.itemsPerPage, newPage + 1);
              }}
              onRowsPerPageChange={(event) => {
                // fetch tickets with new rows per page
                handleFilterApply(event.target.value, meta.currentPage);
              }}
            />
          );
        }}
      />
    );
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

  return (
    <div
          id="alphacxMTable"
          className="pb-5 acx-ticket-cust-table acx-ticket-table fit-content"
        >
          {tickets && (
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
                    created: dayjs(created_at).format("DD MMM, YYYY"),
                    status: status?.status,
                    assignedTo: `${assignee?.firstname || ""} ${assignee?.lastname || ""}`,
                    rating: rating,
                    assigneeId: assignee?.id,
                    statusId: status?.id,
                    createdTime: new Date(created_at || Date.now()).getTime()
                  })
                )}
                options={{
                  search: false,
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
                // onSelectionChange={handleSelectionChange}
              />
            </MuiThemeProvider>
          )}
        </div>
  );
}

// const get

const ReportsFilter = () => {
  const [dropdownActive, setDropdownActive] = useState(false);
  const [filters, setFilters] = useState([]);
  const [ticketData, setTicketData] = useState({ tickets: null, meta: null });
  
  useEffect(() => {
    const filterDropdown = window.document.querySelector('.filter-dropdown');
    const handleDocClick = (e) => {
      if (filterDropdown) {
        if (!filterDropdown.contains(e.target)) {
          dropdownActive && setDropdownActive(false);
        }
      }
    }; 

    window.document.addEventListener('click', handleDocClick, true);

    return () => window.document.removeEventListener('click', handleDocClick, true);
  }, [dropdownActive]);

  console.log('FILTERS => ', filters);

  const handleFilterApply = async (itemsPerPage, currentPage) => {
     const res = await httpGetMain(`tickets?${filters.map((item) => item?.value).join('&')}&per_page=${itemsPerPage}&page=${currentPage}`);
     if (res?.status === 'success' && res?.data) {
       setTicketData((prev) => ({ ...prev, ...res?.data }));
     }

     console.log('respone => ', res);
  }

  console.log('ticketData => ', ticketData);

  return (
    <div className="reports-filter-wrapper">
      <h2>Filter Options</h2>
      <p>Select the Add Filter button to filter and generate your reports</p>
      <div>
        <button onClick={() => !dropdownActive && setDropdownActive(true)}><PlusIcon /> Add Filter</button>
        {filters.map((item) => <span key={item?.id} onClick={() => setFilters((prev) => prev.filter((x) => x?.id !== item?.id))} style={{ color: item?.color, background: `${item?.color}10` }}>{ item?.label } &nbsp;&nbsp;&nbsp;×</span>)}
        {filters.length > 0 && <button onClick={() => handleFilterApply(50, 1)}>Apply Filter</button>}
      </div>

      <FilterDropdown active={dropdownActive} setFilters={setFilters} />

      <div className="reports-filter-body">
        {ticketData?.tickets && <Tickets handleFilterApply={handleFilterApply} tickets={ticketData.tickets} meta={ticketData.meta} />}
      </div>
    </div>
  )
}

export default ReportsFilter;