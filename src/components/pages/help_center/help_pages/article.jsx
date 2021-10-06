import React, { useState, useEffect } from "react";
import HelpNavBar from "../../../Layout/helpNavBar";
import TopBar from "../components/topBar/topBar";

import Approve from "../../../../assets/icons/approve.png";
import Reject from "../../../../assets/icons/reject.png";
import "./article.scss";
import Accordion from "../components/accordion/Accordion";
import StarRating from "../components/starRating/starRating";
import matter from "gray-matter";

import { httpGetMain, httpGetMainKB } from "../../../../helpers/httpMethods";
import { useLocation, useParams } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import ScaleLoader from "react-spinners/ScaleLoader";

const Article = () => {
  const {slug} = useParams();

  console.log("Slug => ", slug);
  let query = useQuery();
  // const file_name = "blog-one.md";

  const [policyLoading, setPolicyLoading] = useState(false);
  const [articleContent, setArticleContent] = useState({});
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  //   function that fetches all available categories
  //    that can be added to an article
  const fetchCategory = async (id) => {
    console.clear();
    console.log("running", id);
    const res = await httpGetMainKB(`articles/folder/${id}`);
    if (res?.status == "success") {
      let categories = res?.data;
      console.clear();
      console.log(categories);
    }
  };

  const fetchArticleDetails = async (categories) => {
    setPolicyLoading(true);
    const res = await httpGetMainKB(`article?slug=${slug}`);
    if (res?.status == "success") {
      console.log(res);
      setArticleContent(res?.data);
      fetchCategory(res?.data?.folders[0].id);
      setPolicyLoading(false);
    } else {
      setPolicyLoading(false);
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };
  useEffect(() => {
    fetchArticleDetails();
  }, []);
  return (
    <>
      <HelpNavBar activeBG={true} />
      <TopBar categoryId={query.get("cat")} />
      <div className="help-article">
        {policyLoading && (
          <div
            className={`cust-table-loader ${
              policyLoading && "add-loader-opacity"
            }`}
          >
            <ScaleLoader loading={policyLoading} color={"#006298"} />
          </div>
        )}
        <div className="content">
          <h3 className="title mb-5">{articleContent?.title}</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: `<span>${articleContent.body}</span>`,
            }}
          />
          <div className="attachments">
            <Accordion question="Article Attachments" />
          </div>
          <div className="rating">
            <p>Was this article helpful?</p>
            <div>
              <button>
                <img src={Approve} alt="" />
              </button>
              <button>
                <img src={Reject} alt="" />
              </button>
            </div>
          </div>
          <div className="stars">
            <p>Rate this article</p>
            <StarRating numOfStars={5} />
          </div>
        </div>
        <div className="sidebar">
          <p>Content</p>
          <div className="content-nav">
            <p className="active">Heading One</p>
            <p>Heading Two</p>
            <p>Heading Three</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Article;
