import React from "react";
import HelpNavBar from "../../../Layout/helpNavBar";
import TopBar from "../components/topBar/topBar";
import { faqs } from "../faq";
import "./article.scss";

const ArticleList = () => {
  return (
    <>
      <HelpNavBar activeBG={true} />
      <TopBar />

      <div className="article-list">
        <div className="articles">
          {faqs.map((item) => (
            <div className="article-link">
              <h3 className="title">{item.question}</h3>
              <p className="description">{item.solution}</p>
            </div>
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
