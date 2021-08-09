import React from "react";
import "./CannedResponsesSettings.scss";
import RightArrow from "../../../../assets/imgF/arrow_right.png";
import { Link } from "react-router-dom";

const CannedResponsesSettings = () => {
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
        <div className="d-flex justify-content-between align-baseline">
          {/* <div class="form-group"> */}
          <input
            type="search"
            class="form-control form-control-sm f-12 search-bar mt-2 px-5 d-block w-50"
            placeholder="Search email addresses"
          />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default CannedResponsesSettings;
