import React, { useState, useEffect } from "react";
import { SearchIconNavbr, SendIcon } from "../../../assets/images/svgs";
import HelpNavBar from "../../Layout/helpNavBar";
import Accordion from "./components/accordion/Accordion";
import NavCard from "./components/navCard/navCard";
import { faqs } from "./faq";
import "./helpCenter.scss";
import LogoBG from "../../../assets/imgF/logoBG.png";
import { httpGetMain } from "../../../helpers/httpMethods";
import { NotificationManager } from "react-notifications";

const HelpCenter = () => {
  const [categories, setCategories] = useState([]);
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

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <>
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
        <div className="navigation-cards">
          <div className="nav-cards">
            {categories.map((cat, i) => (
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

          <div className="popular-questions">
            <h3>Most Popular Questions</h3>
            <div className="accordions">
              {faqs.map((item) => (
                <Accordion
                  key={item.id}
                  question={item.question}
                  solution={item.solution}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpCenter;
