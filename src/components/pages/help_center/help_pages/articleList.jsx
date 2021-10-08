// @ts-nocheck
import React from "react";
import { useEffect, Fragment } from "react";
import { useState } from "react";
import { NotificationManager } from "react-notifications";
import { useLocation, useParams, Link } from "react-router-dom";
import { HelpNavIcon } from "../../../../assets/images/svgs";
import { httpGetMain, httpGetMainKB, invalidTenant } from "../../../../helpers/httpMethods";
import HelpNavBar from "../../../Layout/helpNavBar";
import TopBar from "../components/topBar/topBar";
import { faqs, navigation } from "../faq";
import "./articleList.scss";
import ScaleLoader from "react-spinners/ScaleLoader";
import {slugify} from '../../../../helper';

const ArticleList = () => {
  let query = useQuery();
  let { category } = useParams();
  const pageUrl = useLocation().pathname;
  const info = navigation.filter((i) => pageUrl.includes(i.link));
  const [pageInfo, setPageInfo] = useState(info);
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [policyLoading, setPolicyLoading] = useState(true);
  const [shouldReturn404, setShouldReturn404] = useState(false);
  const icons = [
    "work",
    "account",
    "subscription",
    "users",
    "settings",
    "document",
  ];

  console.log('articles => ', articles);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const fetchAllArticles = async () => {
    const res = await httpGetMainKB(`articles/category?slug=${category}`);
    setPolicyLoading(false);
    if (res === invalidTenant) {
      setShouldReturn404(true);
    } else {
      if (res?.status == "success") {
        let folders = res?.data?.folders;
        let articles = [];
        for (let index = 0; index < folders.length; index++) {
          articles = [...articles, ...folders[index].articles];
        }
        console.clear();
        console.log("articles", articles);
        console.log(pageUrl);
  
        setArticles(articles);
      } else {
        // return NotificationManager.error(res?.er?.message, "Error", 4000);
        return NotificationManager.error('', 'No Articles Found', 4000);
      }
    }
    
  };

  useEffect(() => {
    fetchAllArticles();
  }, []);
  return (
    <Fragment>
      {policyLoading ? <div className="cust-table-loader"><ScaleLoader loading={policyLoading} color={"#006298"}/></div> : !shouldReturn404 ? <Fragment>
        <HelpNavBar activeBG={true} />
        <TopBar />
        {/* {policyLoading && (
          <div
            className={`cust-table-loader ${
              policyLoading && "add-loader-opacity"
            }`}
          >
            <ScaleLoader loading={policyLoading} color={"#006298"} />
          </div>
        )} */}
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
              <Link
                key={i}
                to={`${pageUrl}/${slugify(item?.title?.toLowerCase())}`}
              >
                <div className="article-link">
                  <h3 className="title">{item?.title}</h3>
                  {/* <p className="description">{item.solution}</p> */}
                </div>
              </Link>
              // /${item.title
              //   .toLowerCase()
              //   .replaceAll(" ", "-")}?id=${item.id}
            ))}
            {
              (!policyLoading && articles.length === 0) && <div>No Articles Found.</div>
            }
          </div>
          <div className="sidebar">
            <p className="header">Need Support?</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <button>Contact Support</button>
          </div>
        </div>
      </Fragment> : <div
            style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
        }}>
            <h1>404 - Tenant Not Found</h1>
        </div>}
    </Fragment>
  );
};

export default ArticleList;
