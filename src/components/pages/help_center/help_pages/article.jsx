import React, { useState, useEffect } from "react";
import HelpNavBar from "../../../Layout/helpNavBar";
import TopBar from "../components/topBar/topBar";
import Markdown from "markdown-to-jsx";
import Approve from "../../../../assets/icons/approve.png";
import Reject from "../../../../assets/icons/reject.png";
import "./article.scss";
import Accordion from "../components/accordion/Accordion";
import StarRating from "../components/starRating/starRating";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { httpGetMain } from "../../../../helpers/httpMethods";
import { useLocation } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import ScaleLoader from "react-spinners/ScaleLoader";

const Article = () => {
  let query = useQuery();
  const file_name = "blog-one.md";

  const [policyLoading, setPolicyLoading] = useState(false);
  const [articleContent, setArticleContent] = useState({});
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const fetchArticleDetails = async (categories) => {
    setPolicyLoading(true);
    const res = await httpGetMain(`article/${query.get("id")}`);
    if (res?.status == "success") {
      console.log(res);
      setArticleContent(res?.data);
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
      <TopBar />
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

// export async function getServerSideProps({ params }) {
//   const { article } = params;
//   const content = await import(`./article_markdowns/${post}.md`);
//   const data = matter(content.default);

//   console.log(data);

//   return {
//     props: {
//       markdown: JSON.stringify(data),
//     },
//   };
// }
