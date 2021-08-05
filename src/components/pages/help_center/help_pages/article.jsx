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

const Article = () => {
  const file_name = "blog-one.md";
  const [articleContent, setArticleContent] = useState("");

  async function getMarkdownFile(title) {
    // const { post } = params;
    const content = await import(`./article_markdowns/${title}`);
    const data = matter(content.default);

    console.log(JSON.stringify(data));
    setArticleContent(JSON.stringify(data));

    // return {
    //   props: {
    //     markdown: JSON.stringify(data),
    //   },
    // };
  }
  useEffect(() => {
    // getMarkdownFile(file_name);
    import(`./article_markdowns/${file_name}`)
      .then((res) => {
        fetch(res.default)
          .then((res) => res.text())
          .then((res) => setArticleContent(res))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
  return (
    <>
      <HelpNavBar activeBG={true} />
      <TopBar />
      <div className="help-article">
        <div className="content">
          {/* <Markdown>{post}</Markdown> */}
          <ReactMarkdown children={articleContent} className="line-break" />
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
