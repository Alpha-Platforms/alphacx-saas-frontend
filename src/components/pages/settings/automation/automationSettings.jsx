import React, { useEffect, useState } from "react";
import "../help_center/helpCenter.scss";
import "./automationSettings.scss";
import RightArrow from "../../../../assets/imgF/arrow_right.png";
import TripleDot from "../../../../assets/imgF/triple_dot.png";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
import { TablePagination } from "@material-ui/core";
import tableIcons from "../../../../assets/materialicons/tableIcons";
import { ReactComponent as DotSvg } from "../../../../assets/icons/dots.svg";
import { Dropdown } from "react-bootstrap";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
import "../../../../styles/Ticket.css";
import { httpDelete, httpGetMain } from "../../../../helpers/httpMethods";
import { NotificationManager } from "react-notifications";
import { Modal } from "react-responsive-modal";
import ScaleLoader from "react-spinners/ScaleLoader";

const AutomationSettings = () => {
  const [automationPolicies, setAutomationPolicies] = useState([]);
  const [tableMeta, setTableMeta] = useState({});
  const [deleteUrl, setDeleteUrl] = useState("");
  const [openDeleteActionModal, SetOpenDeleteActionModal] = useState(false);
  const [policyLoading, setPolicyLoading] = useState(false);

  // const handleStatusToogle = (index) => {
  //   let policies = SLApolicies;
  //   policies[index].active = !policies[index].active;

  //   setSLApolicies(policies);
  // };
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
      title: "Automation Policy",
      field: "name",
      width: "5%",
    },
    {
      title: "",
      field: "id",
      width: "50px",
    },
    {
      title: "",
      field: "staus",
      width: "100px",
    },
    {
      title: "",
      field: "status",
      width: "50px",
    },
    {
      title: "",
      field: "dropdownAction",
      width: "50px",
      render: (rowData) => (
        <Dropdown id="cust-table-dropdown" className="ticket-status-dropdown">
          <Dropdown.Toggle variant="transparent" size="sm">
            <span className="cust-table-dots">
              <DotSvg />
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="1">
              <span
                className="black-text"
                onClick={() => {
                  window.location.href = `/settings/automation/edit/${
                    automationPolicies[rowData.tableData.id].id
                  }`;
                }}
              >
                Edit
              </span>
            </Dropdown.Item>
            <Dropdown.Item eventKey="2">
              <span
                className="black-text"
                onClick={() => {
                  SetOpenDeleteActionModal(true);
                  setDeleteUrl(automationPolicies[rowData.tableData.id].id);
                }}
              >
                Delete
              </span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
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
        rowsPerPage={tableMeta?.itemsPerPage || 5}
        count={Number(tableMeta?.totalItems || 20)}
        page={(tableMeta?.currentPage || 1) - 1}
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
  // --------------------------
  // FUnction to delete an automation Policy by ID
  // --------------------------
  const deleteAutomation = async () => {
    SetOpenDeleteActionModal(false);
    setPolicyLoading(true);
    const res = await httpDelete("sla", { agreementId: deleteUrl });
    setPolicyLoading(false);
    if (res?.status === "success") {
      NotificationManager.success(res.data.message, "Success", 4000);
    } else {
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };

  const getAllAutomation = async () => {
    const res = await httpGetMain("sla");
    if (res?.status === "success") {
      console.clear();
      console.log(res?.data?.agreement);
      setTableMeta(res?.data?.meta);
      setAutomationPolicies(res?.data?.agreement);
    } else {
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };

  useEffect(() => {
    getAllAutomation();
  }, []);

  return (
    <div className="help-center-settings automation-settings">
      {policyLoading && (
        <div
          className={`cust-table-loader ${
            policyLoading && "add-loader-opacity"
          }`}
        >
          <ScaleLoader loading={policyLoading} color={"#006298"} />
        </div>
      )}
      <Modal
        open={openDeleteActionModal}
        onClose={() => SetOpenDeleteActionModal(false)}
        center
      >
        <div className="p-5 w-100">
          <h6 className="mb-5">Are you sure you want to delete this Policy?</h6>
          <div className="d-flex justify-content-center">
            <a
              className="btn f-12 bg-outline-custom cancel px-4"
              onClick={() => SetOpenDeleteActionModal(false)}
            >
              Cancel
            </a>
            <a
              className="btn ms-2 f-12 bg-custom px-4"
              onClick={deleteAutomation}
            >
              Confirm
            </a>
          </div>
        </div>
      </Modal>
      <div className="card card-body bg-white border-0 mt-4">
        <div id="mainContentHeader">
          <h6 className="text-muted f-14">
            <Link to="/settings">
              <span className="text-custom">Settings</span>
            </Link>{" "}
            <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
            {/* <object data="../assets/alphatickets/icons/right-arrow.svg"
                            className="img-fluid mx-2 me-3"></object> */}
            <span>Automations</span>
          </h6>
        </div>
        <div id="settings">
          <div className="d-flex justify-content-between align-baseline">
            <h5 className="mt-3 mb-4 f-16 fw-bold">Automation</h5>
            <div>
              <Link
                className="btn btn-sm ms-2 f-12 bg-custom px-4 w-45"
                to="automation/new-policy"
              >
                Add Automation
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
              className="pb-5 acx-ticket-cust-table acx-ticket-table fit-content p-4"
            >
              <MuiThemeProvider theme={tableTheme}>
                <MaterialTable
                  columns={tableColumns}
                  title=""
                  icons={tableIcons}
                  data={automationPolicies.map(({ name, id }, i) => ({
                    name,
                    // status: (
                    //   <div className="form-check form-switch d-flex align-items-center">
                    //     {/* <input
                    //       className="form-check-input"
                    //       type="checkbox"
                    //       id="security-switch"
                    //       checked

                    //     /> */}
                    //   </div>
                    // ),
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
