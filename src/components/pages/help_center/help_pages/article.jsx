/* eslint-disable react/no-danger */
// @ts-nocheck
import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import MoonLoader from 'react-spinners/MoonLoader';
import HelpNavBar from '../../../Layout/helpNavBar';
import TopBar from '../components/topBar/topBar';
import Approve from '../../../../assets/icons/approve.png';
import Reject from '../../../../assets/icons/reject.png';
import { httpGetMainKB, invalidTenant } from '../../../../helpers/httpMethods';
import { uuid } from '../../../../helper';
import NotFound from '../../error/NotFound';
import { addHelpfulArticle } from '../../../../reduxstore/actions/kbAction';
import './article.scss';

function Article() {
    const { slug } = useParams();
    const dispatch = useDispatch();

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    const query = useQuery();
    // const file_name = "blog-one.md";

    const [policyLoading, setPolicyLoading] = useState(true);
    const [articleContent, setArticleContent] = useState({});
    const [shouldReturn404, setShouldReturn404] = useState(false);
    const helpfulArticles = useSelector((state) => state.kb?.helpfulArticles);

    const [headings, setHeadings] = useState(null);

    //   function that fetches all available categories
    //    that can be added to an article
    // const fetchCategory = async (id) => {
    //     // console.clear();
    //     const res = await httpGetMainKB(`articles/folder/${id}`);
    //     if (res?.status === 'success') {
    //         const categories = res?.data;
    //     }
    // };

    const fetchArticleDetails = async () => {
        const res = await httpGetMainKB(`article?slug=${slug}`);
        setPolicyLoading(false);
        if (res === invalidTenant) {
            setShouldReturn404(true);
        } else if (res?.status === 'success' && res?.data?.isPublished) {
            setArticleContent(res?.data);
            // fetchCategory(res?.data?.folders[0].id);
        } else {
            setShouldReturn404(true);
            // return NotificationManager.error(res?.er?.message, 'Error', 4000);
        }
    };
    useEffect(() => {
        fetchArticleDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!policyLoading) {
            if (!headings) {
                setTimeout(() => {
                    const h1s = window.document.querySelectorAll('#postBody h1');
                    const h2s = window.document.querySelectorAll('#postBody h2');
                    const h3s = window.document.querySelectorAll('#postBody h3');
                    const h4s = window.document.querySelectorAll('#postBody h4');
                    const h5s = window.document.querySelectorAll('#postBody h5');
                    const h6s = window.document.querySelectorAll('#postBody h6');
                    const headers = [];
                    [...h1s, ...h2s, ...h3s, ...h4s, ...h5s, ...h6s].forEach((el) => {
                        headers.push({
                            id: uuid(),
                            element: el,
                            innerText: el.innerText,
                            distanceToTop: window.pageYOffset + el.getBoundingClientRect().top,
                            active: false,
                        });
                    });
                    setHeadings(headers);
                }, 3000);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [policyLoading]);

    // const handleHeadingClick = (heading) => {
    //     window.scrollTo(0, (heading?.distanceToTop || 150) - 150);
    // };

    const handleHelpful = () => {
        dispatch(addHelpfulArticle(slug));
    };

    return policyLoading ? (
        <div className="cust-table-loader">
            <MoonLoader loading={policyLoading} color="#006298" size={30} />
        </div>
    ) : !shouldReturn404 ? (
        <>
            <HelpNavBar activeBG />
            <TopBar categoryId={query.get('cat')} />
            <div className="help-article">
                <div className="content">
                    <h3 className="title">{articleContent?.title}</h3>
                    <hr />
                    <div
                        id="postBody"
                        className="postBody pt-3"
                        dangerouslySetInnerHTML={{
                            __html: `<span>${articleContent?.body || ''}</span>`,
                        }}
                    />
                    {helpfulArticles.indexOf(slug) === -1 && (
                        <div className="rating">
                            <p>Was this article helpful?</p>
                            <div>
                                <button type="button" onClick={handleHelpful}>
                                    <img src={Approve} alt="" />
                                </button>
                                <button type="button" onClick={handleHelpful}>
                                    <img src={Reject} alt="" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    ) : (
        <NotFound showCta={false} />
    );
}

export default Article;
