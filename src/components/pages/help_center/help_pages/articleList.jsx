/* eslint-disable consistent-return */
// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { NotificationManager } from 'react-notifications';
import { useLocation, useParams, Link } from 'react-router-dom';
import MoonLoader from 'react-spinners/MoonLoader';
import { useDispatch } from 'react-redux';
import { httpGetMainKB, invalidTenant } from '../../../../helpers/httpMethods';
import HelpNavBar from '../../../Layout/helpNavBar';
import TopBar from '../components/topBar/topBar';
import './articleList.scss';
import { slugify, kbBrandKit, uuid, isSubdomainApp } from '../../../../helper';
import { ReactComponent as Paper } from '../../../../assets/icons/Paper.svg';
import { ReactComponent as Folder } from '../../../../assets/icons/Folder.svg';
import NotFound from '../../error/NotFound';
import { setKbBrandKit } from '../../../../reduxstore/actions/tenantInfoActions';

function ArticleList() {
    const dispatch = useDispatch();
    const { category } = useParams();
    const pageUrl = useLocation().pathname;
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [shouldReturn404, setShouldReturn404] = useState(false);
    const [catName, setCatName] = useState('');
    const urlDomain = new URLSearchParams(window.location.search).get('domain');

    const fetchAllArticles = async () => {
        const res = await httpGetMainKB(`articles/category?slug=${category}`);
        dispatch(setKbBrandKit(res?.branding));
        setLoading(false);
        if (res === invalidTenant) {
            setShouldReturn404(true);
        } else if (res?.status === 'success') {
            setArticles(res?.data?.articles);
            setCatName(res?.data?.name);
        } else {
            return NotificationManager.error('', 'No Articles Found', 4000);
        }
    };

    useEffect(() => {
        fetchAllArticles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return loading ? (
        <div className="cust-table-loader">
            <MoonLoader loading color={kbBrandKit({ bgCol: 0, default: true })?.backgroundColor} size={30} />
        </div>
    ) : !shouldReturn404 ? (
        <>
            <HelpNavBar activeBG />
            <TopBar />
            <div className="article-list">
                <h3 className="nav-info mb-0 pb-3" style={{ marginLeft: '-5px' }}>
                    <Folder fill={kbBrandKit({ bgCol: 0 })?.backgroundColor} />{' '}
                    <span className="ms-2 pt-1 ">{catName}</span>
                </h3>
                <div className="articles cat-articles">
                    {articles
                        ?.filter((item) => item?.isPublished)
                        ?.map((item) => (
                            <Link
                                key={uuid()}
                                to={`${pageUrl}/${slugify(item?.title?.toLowerCase())}${
                                    isSubdomainApp ? `?domain=${urlDomain || ''}` : ''
                                }`}
                            >
                                <div className="article-link">
                                    <p className="title">
                                        <Paper /> <span className="d-inline-block ms-2">{item?.title}</span>
                                    </p>
                                </div>
                            </Link>
                        ))}
                    {!loading && articles.length === 0 && <h4>No Articles Found.</h4>}
                </div>
            </div>
        </>
    ) : (
        <NotFound showCta={false} />
    );
}

export default ArticleList;
