// @ts-nocheck
import React, { useEffect, useState } from "react";
import "../help_center/helpCenter.scss";
import "./automationSettings.scss";
import RightArrow from "../../../../assets/imgF/arrow_right.png";
import TripleDot from "../../../../assets/imgF/triple_dot.png";
import { Link, useHistory } from "react-router-dom";
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
  const history = useHistory();

  const [automationPolicies, setAutomationPolicies] = useState([]);
  const [tableMeta, setTableMeta] = useState({});
  const [deleteUrl, setDeleteUrl] = useState("");
  const [openDeleteActionModal, setOpenDeleteActionModal] = useState(false);
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
        <Dropdown id="cust-table-dropdown" className="ticket-status-dropdown email-dropdown">
          <Dropdown.Toggle variant="transparent" size="sm">
            <span className="cust-table-dots">
              <DotSvg />
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="1" onClick={() => history.push(`/settings/automation/${automationPolicies[rowData.tableData.id].id}`)}>
              <span>
                Edit
              </span>
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => {
                  setOpenDeleteActionModal(true);
                  setDeleteUrl(automationPolicies[rowData.tableData.id].id);
                }}>
              <span
                className="black-text"
              >
                Delete
              </span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];

// --------------------------
// Function to correct material table pagination
// --------------------------
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


  // --------------------------
  // Function to delete an automation Policy by ID
  // --------------------------
  const deleteAutomation = async () => {

    setOpenDeleteActionModal(false);
    setPolicyLoading(true);
    const res = await httpDelete(`sla/${deleteUrl}`);

    setPolicyLoading(false);
    
    if (res?.status === 200 && res?.data?.status === "success") {
      NotificationManager.success(res?.data?.message, "Success");
      
      setAutomationPolicies( prev => {
        return automationPolicies.filter(i => i.id !== deleteUrl)
      })

    } else {
      return NotificationManager.error(res?.message, "Error", 4000);
    }

  };

  // --------------------------
  // Function to fetch automation
  // --------------------------
  const getAllAutomation = async () => {
    setPolicyLoading(true);
    const res = await httpGetMain("sla?per_page=100");
    setPolicyLoading(false);
    if (res?.status === "success") {

      // console.clear();
      // console.log(res?.data?.agreement);

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
        onClose={() => setOpenDeleteActionModal(false)}
        center
      >
        <div className="p-5 w-100">
          <h6 className="mb-4">Are you sure you want to delete this automation?</h6>
          <div className="d-flex justify-content-center">
            <button
              className="btn f-12 bg-outline-custom cancel px-4"
              onClick={() => setOpenDeleteActionModal(false)}
            >
              Cancel
            </button>
            <button
              className="btn ms-2 f-12 bg-custom px-4"
              onClick={deleteAutomation}
            >
              Confirm
            </button>
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
            <span>Automations</span>
          </h6>
        </div>
        <div id="settings">
          <div>
            <h5 className="mt-3 mb-4 f-16 fw-bold">Automation</h5>         
          </div>  
            
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="w-50">
              <p className="small mb-0">
                Automation Policies help you setup and maintain targets for the duration within which your teams respond and resolve tickets.
              </p>
              <p className="text-muted acx-fs-8">First matching automation policy will be applied to tickets wuth matching
                conditions</p>
            </div>
            <Link
              className="btn btn-sm bg-custom"
              to="automation"
            >
              Add Automation
            </Link>
          </div>

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
                  }))}
                  options={{
                    search: true,
                    selection: true,
                    // exportButton: true,
                    tableLayout: "auto",
                    paging: true,
                    pageSize: 10,
                    headerStyle: {
                      backgroundColor: "#fefdfd",
                    },
                  }}
                  components={{
                    Pagination: AlphacxMTPagination2,
                  }}
                />
              </MuiThemeProvider>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AutomationSettings;
