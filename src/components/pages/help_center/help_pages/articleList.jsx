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
import {slugify, textCapitalize} from '../../../../helper';

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
  const [catName, setCatName] = useState('');
  const location = useLocation();
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
        // console.clear();
        // console.log("articles", articles);
        // console.log(pageUrl);
  
        setArticles(articles);
      } else {
        // return NotificationManager.error(res?.er?.message, "Error", 4000);
        return NotificationManager.error('', 'No Articles Found', 4000);
      }
    }
    
  };

  useEffect(() => {
    let pagelinks = location.pathname.split("/");
    // console.log("links from article", );
    setCatName(textCapitalize(pagelinks[pagelinks.length - 1]?.replaceAll('-', ' ')));

    fetchAllArticles();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <h2 className="nav-info">{catName}</h2>
          <div className="articles">
            {articles.map((item, i) => (
              <Link
                key={i}
                to={`${pageUrl}/${slugify(item?.title?.toLowerCase())}`}
              >
                <div className="article-link">
                  <h4 className="title">{item?.title}</h4>
                  {/* <p className="description">{item.solution}</p> */}
                </div>
              </Link>
              // /${item.title
              //   .toLowerCase()
              //   .replaceAll(" ", "-")}?id=${item.id}
            ))}
            {
              (!policyLoading && articles.length === 0) && <h1>No Articles Found.</h1>
            }
          </div>
          {/* <div className="sidebar">
            <p className="header">Need Support?</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <button>Contact Support</button>
          </div> */}
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
