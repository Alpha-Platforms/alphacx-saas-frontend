import React, { useEffect } from "react";
import "./helpCenter.scss";
import RightArrow from "../../../../assets/imgF/arrow_right.png";
import EmptyArticle from "../../../../assets/images/empty_article.png";
import { httpGetMain } from "../../../../helpers/httpMethods";
import { NotificationManager } from "react-notifications";
import { useState } from "react";

const HelpCenterSettings = () => {
  const [articles, setArticles] = useState([]);
  const fetchAllArticles = async () => {
    const res = await httpGetMain("articles/categories");
    if (res?.status == "success") {
      console.clear();
      console.log("articles", res?.data[0].folders[1]);
      setArticles(res?.data[0].folders[1]);
      // setLoadingTicks(true);
      // setTickets(res?.data?.tickets);
      // setLoadingTicks(false);
    } else {
      // setLoadingTicks(false);
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };
  const handleCheck = (e, index) => {
    let newArticles = articles;
    newArticles.articles[index].checked = e.target.checked;
    setArticles(newArticles);
  };

  useEffect(() => {
    if (articles.length === 0) {
      fetchAllArticles();
    }
  }, [articles]);
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
            {articles?.articles?.length > 0 && (
              <div className="articleList">
                <div className="header">
                  <input
                    name="isGoing"
                    type="checkbox"
                    checked={false}
                    //   onChange={this.handleInputChange}
                  />
                  <p>Title</p>
                  <p>Status</p>
                  <p>Page Views</p>
                  <p>Author</p>
                  <p>Created at</p>
                  <p>Last modified at</p>
                </div>
                {articles?.articles?.map((art, i) => (
                  <div key={art.id} className="listItem">
                    <input
                      name="isGoing"
                      type="checkbox"
                      checked={art?.checked}
                      onClick={(e) => {
                        handleCheck(e, i);
                      }}
                    />
                    <p>{art.title}</p>
                    <p>Published</p>
                    <p>100</p>
                    <p>Dabo Etela</p>
                    <p>12-05-2021</p>
                    <p>12-05-2021</p>
                  </div>
                ))}
              </div>
            )}
            {!articles?.articles && (
              <div class="text-center empty-state">
                <img
                  src={EmptyArticle}
                  alt="no article"
                  class="img-fluid mb-4"
                />
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
            )}
            {articles?.articles?.length > 0 && (
              <div className="pagination">
                <p>Showing 1-1 of 1 entries</p>
              </div>
            )}
            {/* <div id="result"></div> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HelpCenterSettings;
