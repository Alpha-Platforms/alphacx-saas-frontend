import React, { useEffect, useState } from "react";
import "../help_center/helpCenter.scss";
import "./automationSettings.scss";
import RightArrow from "../../../../assets/imgF/arrow_right.png";
import TripleDot from "../../../../assets/imgF/triple_dot.png";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
import { TablePagination } from "@material-ui/core";
import tableIcons from "../../../../assets/materialicons/tableIcons";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
import "../../../../styles/Ticket.css";

const AutomationSettings = () => {
  const [SLApolicies, setSLApolicies] = useState([
    { name: "Default Policy", active: true },
  ]);

  const handleStatusToogle = (index) => {
    let policies = SLApolicies;
    policies[index].active = !policies[index].active;

    setSLApolicies(policies);
  };
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
      title: "SLA Policy",
      field: "slaPolicy",
    },
    {
      title: "Status",
      field: "status",
    },
    {
      title: "Action",
      field: "action",
      width: "10%",
    },
  ];
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
  useEffect(() => {
    console.log("changed");
  }, [SLApolicies]);
  return (
    <div className="help-center-settings automation-settings">
      <div className="card card-body bg-white border-0 p-5 mt-4">
        <div id="mainContentHeader">
          <h6 className="text-muted f-14">
            <Link to="/settings">
              <span className="text-custom">Settings</span>
            </Link>{" "}
            <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
            {/* <object data="../assets/alphatickets/icons/right-arrow.svg"
                            className="img-fluid mx-2 me-3"></object> */}
            <span>Automation Settings</span>
          </h6>
        </div>
        <div id="settings">
          <div className="d-flex justify-content-between align-baseline">
            <h5 className="mt-3 mb-4 f-16 fw-bold">SLA Policies</h5>
            <div>
              <Link
                className="btn btn-sm ms-2 f-12 bg-custom px-4 w-45"
                to="automation/new-policy"
              >
                Add policy
              </Link>
              {/* <a
                className="btn btn-sm ms-2 f-12 bg-custom px-4 w-45"
                // onClick={handleSubmitNewArticle}
              >
                Add policy
              </a> */}
            </div>
          </div>
          <p className="w-50 f-12">
            Service level Agreement(SLA) Policies help you setup and maintain
            targets for the duration within which your teams respond and resolve
            rickets. Learn more
          </p>

          <p className="mt-5 f-12">
            {/* <object data="../assets/alphatickets/icons/info-icon.svg" className="me-1 img-fluid"></object>The */}
            first matching SLA policy will be applied to tickets wuth matching
            conditions
          </p>
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
                  data={SLApolicies.map(({ name, active }, i) => ({
                    slaPolicy: name,
                    status: (
                      <div className="form-check form-switch d-flex align-items-center">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="security-switch"
                          checked={active}
                          onChange={(e) => {
                            console.log(e.target.checked);
                            let policies = SLApolicies;
                            policies[i].active = e.target.checked;
                            policies[i].name = "checked";
                            console.log(policies);
                            setSLApolicies(policies);
                          }}
                        />
                      </div>
                    ),
                    action: (
                      <button
                        className="actions-btn"
                        // onClick={() => setShowActions(!showActions)}
                      >
                        <img src={TripleDot} alt="" style={{ height: 20 }} />
                      </button>
                    ),
                  }))}
                  // data={[
                  //   {
                  //     slaPolicy: "Default",
                  //     status: "active",
                  //     actions: "delete",
                  //   },
                  // ]}
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
          {/* <table className="table mt-4">
            <thead className="bg-custom f-14">
              <tr>
                <th className="ps-5 border-top-right">SLA Policy</th>
                <th className="border-top-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {SLApolicies.map((policy, i) => (
                <TableItem
                  key={i}
                  i={i}
                  policy={policy}
                  handleStatusToogle={handleStatusToogle}
                />
              ))}
            </tbody>
          </table> */}
          {/* <div className="text-center m-5 p-5 empty-state">
            <object data="../assets/alphatickets//icons/carousel.svg" className="img-fluid"></object>
            <p className="text-center">
              You currently have Policy record at <br /> the moment
            </p>
            <a
              href="./automation-form.html"
              className="btn btn-sm bg-custom mt-2 add-policy"
            >
              Add Automation
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AutomationSettings;
