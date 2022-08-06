/* eslint-disable */
// @ts-nocheck
import React from 'react';
import { useEffect, Fragment } from 'react';
import { useState } from 'react';
import { NotificationManager } from 'react-notifications';
import { useLocation, useParams, Link } from 'react-router-dom';
import MoonLoader from 'react-spinners/MoonLoader';
import { HelpNavIcon } from '../../../../assets/images/svgs';
import { httpGetMain, httpGetMainKB, invalidTenant } from '../../../../helpers/httpMethods';
import HelpNavBar from '../../../Layout/helpNavBar';
import TopBar from '../components/topBar/topBar';
import { faqs, navigation } from '../faq';
import './articleList.scss';
import { slugify } from '../../../../helper';
import { ReactComponent as Paper } from '../../../../assets/icons/Paper.svg';
import Folder from '../../../../assets/icons/Folder.svg';
import NotFound from '../../error/NotFound';

function ArticleList() {
    const query = useQuery();
    const { category } = useParams();
    const pageUrl = useLocation().pathname;
    const info = navigation.filter((i) => pageUrl.includes(i.link));
    const [pageInfo, setPageInfo] = useState(info);
    const [categories, setCategories] = useState([]);
    const [articles, setArticles] = useState([]);
    const [policyLoading, setPolicyLoading] = useState(true);
    const [shouldReturn404, setShouldReturn404] = useState(false);
    const [catName, setCatName] = useState('');
    const location = useLocation();
    const icons = ['work', 'account', 'subscription', 'users', 'settings', 'document'];

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const fetchAllArticles = async () => {
        const res = await httpGetMainKB(`articles/category?slug=${category}`);
        setPolicyLoading(false);
        if (res === invalidTenant) {
            setShouldReturn404(true);
        } else if (res?.status == 'success') {
            setArticles(res?.data?.articles);
            setCatName(res?.data?.name);
        } else {
            // return NotificationManager.error(res?.er?.message, "Error", 4000);
            return NotificationManager.error('', 'No Articles Found', 4000);
        }
    };

    useEffect(() => {
        fetchAllArticles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            {policyLoading ? (
                <div className="cust-table-loader">
                    <MoonLoader loading={policyLoading} color="#006298" size={30} />
                </div>
            ) : !shouldReturn404 ? (
                <>
                    <HelpNavBar activeBG />
                    <TopBar />
                    {/* {policyLoading && (
          <div
            className={`cust-table-loader ${
              policyLoading && "add-loader-opacity"
            }`}
          >
            <MoonLoader loading={policyLoading} color={"#006298"} size={30} />
          </div>
        )} */}
                    <div className="article-list">
                        <h3 className="nav-info mb-0 pb-3" style={{ marginLeft: '-5px' }}>
                            <img src={Folder} alt="" width="30px" /> <span className="ms-2 pt-1 ">{catName}</span>
                        </h3>
                        <div className="articles cat-articles">
                            {articles?.filter((item) => item?.isPublished)?.map((item, i) => (
                                <Link key={i} to={`${pageUrl}/${slugify(item?.title?.toLowerCase())}`}>
                                    <div className="article-link">
                                        <p className="title">
                                            <Paper /> <span className="d-inline-block ms-2">{item?.title}</span>
                                        </p>
                                        {/* <p className="description">{item.solution}</p> */}
                                    </div>
                                </Link>
                                // /${item.title
                                //   .toLowerCase()
                                //   .replaceAll(" ", "-")}?id=${item.id}
                            ))}
                            {!policyLoading && articles.length === 0 && <h4>No Articles Found.</h4>}
                        </div>
                        {/* <div className="sidebar">
            <p className="header">Need Support?</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <button>Contact Support</button>
          </div> */}
                    </div>
                </>
            ) : <NotFound showCta={false} />}
        </>
    );
}

export default ArticleList;
