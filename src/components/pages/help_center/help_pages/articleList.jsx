import { Link } from "@material-ui/icons";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { NotificationManager } from "react-notifications";
import { useLocation, useParams } from "react-router-dom";
import { HelpNavIcon } from "../../../../assets/images/svgs";
import { httpGetMain } from "../../../../helpers/httpMethods";
import HelpNavBar from "../../../Layout/helpNavBar";
import TopBar from "../components/topBar/topBar";
import { faqs, navigation } from "../faq";
import "./articleList.scss";
import ScaleLoader from "react-spinners/ScaleLoader";

const ArticleList = () => {
  let query = useQuery();
  let { topic } = useParams();
  const pageUrl = useLocation().pathname;
  const info = navigation.filter((i) => pageUrl.includes(i.link));
  const [pageInfo, setPageInfo] = useState(info);
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [policyLoading, setPolicyLoading] = useState(true);
  const icons = [
    "work",
    "account",
    "subscription",
    "users",
    "settings",
    "document",
  ];

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  //   function that fetches all available categories
  //    that can be added to an article
  const fetchCategories = async () => {
    const res = await httpGetMain("articles/categories");
    if (res?.status == "success") {
      let categories = res?.data;
      console.clear();
      console.log(categories);
      setCategories(categories);
    } else {
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };

  const fetchAllArticles = async () => {
    const res = await httpGetMain(`articles/categories/${query.get("id")}`);
    setPolicyLoading(false);
    if (res?.status == "success") {
      let folders = res?.data?.folders;
      let articles = [];
      for (let index = 0; index < folders.length; index++) {
        articles = [...articles, ...folders[index].articles];
      }
      console.clear();
      console.log("articles", articles);
      setArticles(articles);
    } else {
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };

  useEffect(() => {
    fetchAllArticles();
  }, []);
  return (
    <>
      <HelpNavBar activeBG={true} />
      <TopBar />
      {policyLoading && (
        <div
          className={`cust-table-loader ${
            policyLoading && "add-loader-opacity"
          }`}
        >
          <ScaleLoader loading={policyLoading} color={"#006298"} />
        </div>
      )}
      <div className="article-list">
        <div className="nav-info">
          {/* <HelpNavIcon name={pageInfo[0].icon} size={70} /> */}
          {/* <div className="textInfo">
            <h3>{pageInfo[0].title}</h3>
            <div>
              {pageInfo[0].items.map((item, i) => (
                <p key={i}>
                  {item}
                  {i !== pageInfo[0].items.length - 1 ? "," : ""}
                </p>
              ))}
            </div>
          </div> */}
        </div>
        <div className="articles">
          {articles.map((item, i) => (
            <a
              key={i}
              href={
                pageUrl +
                "/" +
                item.title.toLowerCase().replaceAll(" ", "-") +
                "?id=" +
                item.id
              }
            >
              <div className="article-link">
                <h3 className="title">{item?.title}</h3>
                {/* <p className="description">{item.solution}</p> */}
              </div>
            </a>
          ))}
        </div>
        <div className="sidebar">
          <p className="header">Need Support?</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <button>Contact Support</button>
        </div>
      </div>
    </>
  );
};

export default ArticleList;
