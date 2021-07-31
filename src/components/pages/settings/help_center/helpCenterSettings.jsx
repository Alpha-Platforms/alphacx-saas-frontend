import React from "react";
import "./helpCenter.scss";
import RightArrow from "../../../../assets/imgF/arrow_right.png";
import EmptyArticle from "../../../../assets/images/empty_article.png";

const HelpCenterSettings = () => {
  return (
    <div id="mainContent" class="container settings-email help-center">
      <main class="mb-5">
        <div id="mainContent" class="container">
          <div class="card card-body bg-white border-0 p-5 mt-4">
            <div id="mainContentHeader">
              <h6 class="text-muted f-14">
                Settings{" "}
                <img src={RightArrow} alt="" class="img-fluid mx-2 me-3" />
                <span class="text-custom">Help Center</span>
              </h6>
            </div>
            <div class="d-flex justify-content-between flex-row">
              <h5 class="mt-3 mb-4 fs-6 fw-bold">Help Center Settings</h5>
              <div>
                <a
                  class="btn btn-primary btn-sm ms-2"
                  href="/settings/help-center/article"
                >
                  <span>New Article</span>
                </a>
              </div>
            </div>
            <div class="form-group">
              <input
                type="search"
                class="form-control form-control-sm f-12 search-bar mt-2 px-5 d-block w-50"
                placeholder="Search help center"
              />
            </div>
            <div class="text-center empty-state">
              <img src={EmptyArticle} alt="no article" class="img-fluid mb-4" />
              <p class="text-center">
                You currently have no Help Center Article record at <br />
                the moment
              </p>
              <a
                class="btn btn-sm btn-primary"
                href="/settings/help-center/article"
              >
                New Article
              </a>
            </div>
            <div id="result"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HelpCenterSettings;
