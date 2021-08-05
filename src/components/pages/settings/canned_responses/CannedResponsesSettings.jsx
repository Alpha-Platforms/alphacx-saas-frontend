import React from "react";
import "./CannedResponsesSettings.scss";
import RightArrow from "../../../../assets/imgF/arrow_right.png";
import { Link } from "react-router-dom";

const CannedResponsesSettings = () => {
  return (
    <div id="mainContent" className="container canned-reponses">
      <div className="card card-body bg-white border-0 p-5 mt-4">
        <div id="mainContentHeader mb-3">
          <h6 className="text-muted f-14">
            Settings{" "}
            <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
            <span className="text-custom">Canned Responses</span>
          </h6>
        </div>
        <h5 className="mt-3 mb-4 f-16 fw-bold">Canned Responses</h5>
        <div className="d-flex justify-content-between align-baseline">
          {/* <div class="form-group"> */}
          <input
            type="search"
            class="form-control form-control-sm f-12 search-bar mt-2 px-5 d-block w-50"
            placeholder="Search email addresses"
          />
          {/* </div> */}
          <div>
            <Link
              className="btn btn-sm f-14 px-5 btn-custom bt"
              to="canned-response/new-response"
            >
              New Canned Response
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CannedResponsesSettings;
