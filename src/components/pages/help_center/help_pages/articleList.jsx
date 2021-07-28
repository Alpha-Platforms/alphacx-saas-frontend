import { Link } from "@material-ui/icons";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { HelpNavIcon } from "../../../../assets/images/svgs";
import HelpNavBar from "../../../Layout/helpNavBar";
import TopBar from "../components/topBar/topBar";
import { faqs, navigation } from "../faq";
import "./articleList.scss";

const ArticleList = () => {
  let { topic } = useParams();
  const pageUrl = useLocation().pathname;
  const info = navigation.filter((i) => pageUrl.includes(i.link));
  const [pageInfo, setPageInfo] = useState(info);

  return (
    <>
      <HelpNavBar activeBG={true} />
      <TopBar />

      <div className="article-list">
        <div className="nav-info">
          <HelpNavIcon name={pageInfo[0].icon} size={70} />
          <div className="textInfo">
            <h3>{pageInfo[0].title}</h3>
            <div>
              {pageInfo[0].items.map((item, i) => (
                <p key={i}>
                  {item}
                  {i !== pageInfo[0].items.length - 1 ? "," : ""}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="articles">
          {faqs.map((item, i) => (
            <a
              key={i}
              href={
                topic + "/" + item.question.toLowerCase().replaceAll(" ", "-")
              }
            >
              <div className="article-link">
                <h3 className="title">{item.question}</h3>
                <p className="description">{item.solution}</p>
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
