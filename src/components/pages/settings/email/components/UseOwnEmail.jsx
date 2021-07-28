import React from "react";
import Gmail from "../../../../../assets/imgF/gmail.png";
import OtherMail from "../../../../../assets/imgF/otherMail.png";
import MicrosoftOffice from "../../../../../assets/imgF/microsoftOffice.png";

const UseOwnEmail = () => {
  return (
    <div class="card-body" id="mail-server">
      <p>Email system</p>
      <div class="row gx-3">
        <div class="col-md-3 text-center">
          <a
            class="py-3 px-5 p-sm-3 rounded mail-active bg-outline-mail d-inline-block"
            id="gmail"
          >
            <img src={Gmail} alt="gmail" class="img-fluid" />
          </a>
          <p class="mt-1 description-text f-12 text-muted">Gmail</p>
        </div>
        <div class="col-md-3 text-center">
          <a
            class="py-3 px-4 rounded bg-outline-mail d-inline-block"
            id="microsoft"
          >
            <img src={MicrosoftOffice} alt="microsoft" class="img-fluid" />
          </a>
          <p class="mt-1 description-text f-12 text-muted">
            Microsoft office <br />
            365
          </p>
        </div>
        <div class="col-md-3 text-center">
          <a class="py-3 px-5 p-sm-3 rounded bg-outline-mail d-inline-block">
            <img src={OtherMail} alt="other" class="img-fluid" />
          </a>
          <p class="mt-1 description-text f-12 text-muted">Other</p>
        </div>
      </div>
      <div id="email-controller">
        <h5 class="fs-6 fw-bold mt-2 mb-3">Use Mail Server for</h5>
        <div class="row">
          <div class="col-md-3">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                id="both"
                name="mail-server"
              />
              <label class="form-check-label f-14" for="both">
                Both
              </label>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                id="incoming-only"
                name="mail-server"
                checked
              />
              <label class="form-check-label f-14" for="incoming-only">
                Incoming only
              </label>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                id="outgoing-only"
                name="mail-server"
              />
              <label class="form-check-label f-14" for="outgoing-only">
                Outgoing only
              </label>
            </div>
          </div>
        </div>
        <div class="incoming-mail">
          <h5 class="fs-6 fw-bold mt-4 mb-3">Incoming Mail Settings</h5>
          <div class="row mt-2">
            <div class="col-md-6">
              <div class="form-group">
                <label for="incoming-mail" class="form-label">
                  Incoming Mail Server
                  <span class="text-danger">*</span>
                </label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  placeholder="imap.gmail.com"
                  id="incoming-mail"
                />
                <p class="description-text f-12 text-muted mt-1">
                  IMAP server name to fetch the details
                </p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label for="port" class="form-label">
                  IMAP Port<span class="text-danger">*</span>
                </label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  placeholder="997"
                />
              </div>
            </div>
            <div class="col-md-2 mt-5">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="ssl" />
                <label class="form-check-label" for="ssl">
                  Use SSL
                </label>
              </div>
            </div>
          </div>
          <div class="row ms-1">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" />
              <label class="form-check-label">
                Delete emails from server after fetching ?
              </label>
            </div>
          </div>

          <div>
            <div class="form-group mt-3">
              <label class="form-label">Authentication</label>
              <select class="form-select w-75">
                <option>plain</option>
                <option>plain</option>
                <option>plain</option>
              </select>
            </div>
            <div class="d-flex align-items-center mt-4">
              <div class="vertical-line"></div>
              <div class="ms-4 flex-grow-1">
                <div class="form-group mt-2">
                  <label class="form-label">
                    Username<span class="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control form-control-sm w-75"
                  />
                </div>
                <div class="form-group mt-2">
                  <label class="form-label">
                    Password<span class="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    class="form-control form-control-sm w-75"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="outgoing-mail mt-2">
          <h5 class="fs-6 fw-bold mt-5 mb-3">Outgoing Mail Settings</h5>
          <div class="alert-danger text-dark mt-3 mb-5">
            <p class="p-2">
              Gmail limits the number of emails sent per day{" "}
              <span>
                <a href="#" class="text-custom ms-2">
                  Click here to learn more
                </a>
              </span>
            </p>
          </div>
          <div class="row mt-2">
            <div class="col-md-6">
              <div class="form-group">
                <label for="outgoing-mail" class="form-label">
                  Outgoing Mail Server
                  <span class="text-danger">*</span>
                </label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  placeholder="smtp.gmail.com"
                  id="outgoing-mail"
                />
                <p class="description-text f-12 text-muted mt-1">
                  SMTP server name to fetch the details
                </p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label for="port" class="form-label">
                  SMTP Port<span class="text-danger">*</span>
                </label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  placeholder="997"
                />
              </div>
            </div>
            <div class="col-md-2 mt-5">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="ssl" />
                <label class="form-check-label" for="ssl">
                  Use SSL
                </label>
              </div>
            </div>
          </div>
          <div class="row ms-1">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" />
              <label class="form-check-label">
                Delete emails from server after fetching ?
              </label>
            </div>
          </div>

          <div>
            <div class="form-group mt-3">
              <label class="form-label">Authentication</label>
              <select class="form-select w-75">
                <option>plain</option>
                <option>plain</option>
                <option>plain</option>
              </select>
            </div>
            <div class="d-flex align-items-center mt-4">
              <div class="vertical-line"></div>
              <div class="ms-4 flex-grow-1">
                <div class="form-group mt-2">
                  <label class="form-label">
                    Username<span class="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control form-control-sm w-75"
                  />
                </div>
                <div class="form-group mt-2 mb-4">
                  <label class="form-label">
                    Password<span class="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    class="form-control form-control-sm w-75"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseOwnEmail;
