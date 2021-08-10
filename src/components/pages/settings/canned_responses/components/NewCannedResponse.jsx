import React from "react";
import RightArrow from "../../../../../assets/imgF/arrow_right.png";
import { Link } from "react-router-dom";
import EditorBox from "../../../../reusables/EditorBox";
import { useState } from "react";
import "./NewCannedResponse.scss";
import Responce from "./Responce";

const NewCannedResponse = () => {
  const [newResponse, setNewResponse] = useState({
    message: "",
  });
  return (
    <div className="new-canned-response">
      <div className="card card-body bg-white border-0 form">
        <div id="mainContentHeader mb-5">
          <h6 className="text-muted f-14">
            <Link to="/settings">
              <span className="text-custom">Settings</span>
            </Link>{" "}
            <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
            {/* <object data="../assets/alphatickets/icons/right-arrow.svg"
                            className="img-fluid mx-2 me-3"></object> */}
            <Link to="/settings/canned-responses">
              <span className="text-custom">Canned Responses</span>{" "}
            </Link>
            <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
            <span>New Canned Response</span>
          </h6>
        </div>
        <h5 className="mt-3 mb-2 f-16 fw-bold">New Canned Response</h5>
        <div className="d-flex">
          <div className="col-md-8">
            <div class="form-group mb-4" style={{ paddingTop: 30 }}>
              <label for="name" class="form-label f-14">
                Response Title
              </label>
              <input
                type="tdiv.colext"
                class="form-control form-control-sm"
                id="name"
                placeholder="Your request has been received"
              />
            </div>
            <div class="form-group mb-4">
              <label for="name" class="form-label f-14">
                Message
              </label>
              <EditorBox
                text={newResponse.message}
                textParent={newResponse}
                updateText={setNewResponse}
              />
            </div>
            <div class="form-group mb-5">
              <label for="name" class="form-label f-14">
                Attachment (If Any)
              </label>
              <div className="add-files">
                <p>Add file or drag file here</p>
              </div>
            </div>
            <div className="float-end mb-5">
              <Link
                to="/settings/canned-responses"
                className="btn btn-sm f-12 bg-outline-custom cancel px-4"
              >
                Cancel
              </Link>
              <a
                href="automation-table.html"
                className="btn btn-sm ms-2 f-12 bg-custom px-4"
                data-bs-toggle="modal"
                data-bs-target="#successModal"
              >
                Save Changes
              </a>
            </div>
          </div>
          <div className="response-list">
            {/* <Responce /> */}
            <p>Folder: Inquiry (0)</p>
            <div className="responses">
              <p>You do not have any canned responses. Create New</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCannedResponse;
