import React, { useEffect, useState } from "react";
import "../help_center/helpCenter.scss";
import "./automationSettings.scss";
import RightArrow from "../../../../assets/imgF/arrow_right.png";
import TripleDot from "../../../../assets/imgF/triple_dot.png";
import { Link } from "react-router-dom";

const TableItem = ({ policy, handleStatusToogle, i }) => {
  const [showActions, setShowActions] = useState(false);
  return (
    <tr className="table-item">
      <th className="ps-5">{policy.name}</th>
      <th>
        <button
          className={`status-toogle ${policy.active ? "active" : ""}`}
          onClick={() => handleStatusToogle(i)}
        >
          <div className="circle" />
        </button>

        <button
          className="actions-btn"
          onClick={() => setShowActions(!showActions)}
        >
          <img src={TripleDot} alt="" />
        </button>
        {showActions && (
          <div className="actions-drop">
            <p>Edit</p>
            <p>Delete</p>
          </div>
        )}
      </th>
    </tr>
  );
};

const AutomationSettings = () => {
  const [SLApolicies, SetSLApolicies] = useState([
    { name: "Default Policy", active: true },
  ]);

  const handleStatusToogle = (index) => {
    let policies = SLApolicies;
    policies[index].active = !policies[index].active;

    SetSLApolicies(policies);
  };

  useEffect(() => {
    console.log("changed");
  }, [SLApolicies]);
  return (
    <div
      id="mainContent"
      className="container help-center-settings automation-settings"
    >
      <div className="card card-body bg-white border-0 p-5 mt-4">
        <div id="mainContentHeader">
          <h6 className="text-muted f-14">
            Settings{" "}
            <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
            {/* <object data="../assets/alphatickets/icons/right-arrow.svg"
                            className="img-fluid mx-2 me-3"></object> */}
            <span className="text-custom">Automation Settings</span>
          </h6>
        </div>
        <div id="settings">
          <div className="d-flex justify-content-between align-baseline">
            <h5 className="mt-3 mb-4 f-16 fw-bold">SLA Policies</h5>
            <div>
              <Link
                className="btn btn-sm f-14 px-5 btn-custom bt"
                to="automation/new-policy"
              >
                Add policy
              </Link>
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

          <table className="table mt-4">
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
          </table>
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
