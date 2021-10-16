// @ts-nocheck
import React, { useState, useEffect, Fragment } from "react";
import { SearchIconNavbr, SendIcon } from "../../../assets/images/svgs";
import HelpNavBar from "../../Layout/helpNavBar";
import AccordionLink from "./components/accordion/AccordionLink";
import NavCard from "./components/navCard/navCard";
import { faqs } from "./faq";
import "./helpCenter.scss";
import LogoBG from "../../../assets/imgF/logoBG.png";
import { httpGetMain, getTenantDomain, httpGetMainKB, invalidTenant } from "../../../helpers/httpMethods";
import { NotificationManager } from "react-notifications";
import ScaleLoader from 'react-spinners/ScaleLoader';
import {Link} from 'react-router-dom';
import {shuffleArray} from '../../../helper';


const HelpCenter = () => {
  const [categories, setCategories] = useState([]);
  const [shouldReturn404, setShouldReturn404] = useState(false);
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const icons = [
    "work",
    "account",
    "subscription",
    "users",
    "settings",
    "document",
  ];
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.value);
  };

  const fetchCategories = async () => {
    const res = await httpGetMainKB("articles/categories");
    setLoading(false);
    if (res === invalidTenant) {
      setShouldReturn404(true);
    } else {
      if (res?.status == "success") {
        let categories = res?.data;
        console.clear();
        setCategories(categories);
        let articles = [];
        categories.forEach((cat, idx) => {
          cat?.folders?.forEach((folder, idx) => {
            folder?.articles?.forEach((art, idx) => {
              articles.push({...art, catName: cat?.name});
            })
          });
        })
        // console.clear();
      setArticles(articles);
      } else {
        return NotificationManager.error(res?.er?.message, "Error", 4000);
      }
    }

  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <Fragment>
      {loading ? <div className="cust-table-loader"><ScaleLoader loading={loading} color={"#006298"}/></div> : !shouldReturn404 ? <Fragment>
        <HelpNavBar />
        <div className="help-center">
          <div className="search-container">
            <img src={LogoBG} alt="" className="logo-bg" />
            <h3>How can we help?</h3>
            <div className="searchbar">
              <div className="icon">
                <SearchIconNavbr />
              </div>
              <form>
                <input
                  type="text"
                  value={search}
                  placeholder="Search knowledge base"
                  onChange={handleChange}
                />
                <button>
                  <SendIcon size={30} />
                </button>
              </form>
            </div>
          </div>
          {categories.length === 0 ? <div style={{ 
            margin: '0 1rem',
            textAlign: 'center',
            padding: '6rem 0'
           }}>
            <h2>No Categories or Articles found.</h2>
          </div> : <div className="navigation-cards">
            <div className="nav-cards">
              {categories?.slice(0, 6)?.map((cat, i) => (
                <NavCard
                  key={`item-${i + 1}`}
                  icon={icons[i]}
                  title={cat.name}
                  folders={cat.folders}
                  id={cat.id}
                  // link={nav.link}
                />
              ))}
            </div>
              {categories.length > 6 && <div>
              <Link to="/knowledge-base/categories" className="show-all-cat">Show all categories</Link>
            </div>}
            

            <div className="popular-questions">
              <h3>Most Popular Articles</h3>
              <div className="accordions">
                {shuffleArray(articles)?.slice(0, 5).map((item) => (
                  <AccordionLink
                    key={item.id}
                    question={item.title}
                    solution={item.solution}
                    category={item.catName}
                  />
                ))}
              </div>
            </div>
          </div>}
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

export default HelpCenter;
