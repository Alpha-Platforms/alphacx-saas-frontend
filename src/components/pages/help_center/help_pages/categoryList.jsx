// @ts-nocheck
import React from "react";
import {useEffect, Fragment} from "react";
import {useState} from "react";
import {NotificationManager} from "react-notifications";
import {useLocation, useParams, Link} from "react-router-dom";
import {HelpNavIcon} from "../../../../assets/images/svgs";
import {httpGetMain, httpGetMainKB, invalidTenant} from "../../../../helpers/httpMethods";
import HelpNavBar from "../../../Layout/helpNavBar";
import TopBar from "../components/topBar/topBar";
import {faqs, navigation} from "../faq";
import "./articleList.scss";
import ScaleLoader from "react-spinners/ScaleLoader";
import {slugify, textCapitalize} from '../../../../helper';
import { ReactComponent as Folder } from "../../../../assets/icons/Folder.svg";

const ArticleCategoryList = () => {
    let query = useQuery();
    let {category} = useParams();
    const pageUrl = useLocation().pathname;
    const info = navigation.filter((i) => pageUrl.includes(i.link));
    const [categories,
        setCategories] = useState([]);
    const [policyLoading,
        setPolicyLoading] = useState(true);
    const [shouldReturn404,
        setShouldReturn404] = useState(false);

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const fetchCategories = async() => {
        const res = await httpGetMainKB("articles/categories");
        setPolicyLoading(false);
        if (res === invalidTenant) {
            setShouldReturn404(true);
        } else {
            if (res
                ?.status == "success") {
                let categories = res
                    ?.data;
                console.clear();
                // console.log(categories);
                setCategories(categories);
            } else {
                return NotificationManager.error(res
                    ?.er
                        ?.message, "Error", 4000);
            }
        }

    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <Fragment>
            {policyLoading
                ? <div className="cust-table-loader"><ScaleLoader loading={policyLoading} color={"#006298"}/></div>
                : !shouldReturn404
                    ? <Fragment>
                            <HelpNavBar activeBG={true}/>
                            <TopBar/>

                            <div className="article-list">
                                <h3 className="nav-info mb-0 pb-3">Categories</h3>
                                <div className="articles">
                                    {categories.map((item, i) => (
                                        <Link
                                            key={i}
                                            to={`/knowledge-base/${slugify(item
                                            ?.name
                                                ?.toLowerCase())}`}>
                                            <div className="article-link category-link">
                                                <p className="title"><Folder/> <span className="d-inline-block ms-2">{textCapitalize(item
                                                        ?.name)}</span></p>
                                                {/* <p className="description">{item.solution}</p> */}
                                            </div>
                                        </Link>
                                    // /${item.title   .toLowerCase()   .replaceAll(" ", "-")}?id=${item.id}
                                    ))}
                                    {(!policyLoading && categories.length === 0) && <h4>No Articles Found.</h4>
}
                                </div>
                                {/* <div className="sidebar">
                                    <p className="header">Need Support?</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    <button>Contact Support</button>
                                </div> */}
                            </div>
                        </Fragment>
                    : <div
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

export default ArticleCategoryList;
