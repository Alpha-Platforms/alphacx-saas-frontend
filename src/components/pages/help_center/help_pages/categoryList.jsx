/* eslint-disable consistent-return */
// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import { css } from '@emotion/css';
import { useDispatch } from 'react-redux';
import MoonLoader from 'react-spinners/MoonLoader';
import { httpGetMainKB, invalidTenant } from '../../../../helpers/httpMethods';
import HelpNavBar from '../../../Layout/helpNavBar';
import TopBar from '../components/topBar/topBar';
import './articleList.scss';
import { slugify, uuid, kbBrandKit, isSubdomainApp } from '../../../../helper';
import { ReactComponent as Folder } from '../../../../assets/icons/Folder.svg';
import NotFound from '../../error/NotFound';
import { setKbBrandKit } from '../../../../reduxstore/actions/tenantInfoActions';

function ArticleCategoryList() {
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [shouldReturn404, setShouldReturn404] = useState(false);

    const urlDomain = new URLSearchParams(window.location.search).get('domain');

    const fetchCategories = async () => {
        const res = await httpGetMainKB('articles/categories');
        dispatch(setKbBrandKit(res?.branding));
        setLoading(false);
        if (res === invalidTenant) {
            setShouldReturn404(true);
        } else if (res?.status === 'success') {
            const gottenCategories = res?.data;
            setCategories(gottenCategories);
        } else {
            return NotificationManager.error(res?.er?.message, 'Error', 4000);
        }
    };

    useEffect(() => {
        fetchCategories();
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
                <h3 className="nav-info mb-0 pb-3">Categories</h3>
                <div className="articles">
                    {categories.map((item) => (
                        <Link
                            key={uuid()}
                            to={`/knowledgebase/${slugify(item?.name?.toLowerCase())}${
                                isSubdomainApp ? `?domain=${urlDomain || ''}` : ''
                            }`}
                            className={`${css({ '&:hover': { ...kbBrandKit({ col: 0 }) } })}`}
                        >
                            <div className="article-link category-link">
                                <p className="title">
                                    <div>
                                        <Folder fill={kbBrandKit({ bgCol: 0 })?.backgroundColor} />{' '}
                                        <span className="d-inline-block ms-2">{item?.name}</span>
                                    </div>
                                    <span className="d-inline-block ms-2">
                                        {item?.folders[0]?.__meta__?.totalPublishedArticles} Article
                                        {Number(item?.folders[0]?.__meta__?.totalPublishedArticles) > 1 ? 's' : ''}
                                    </span>
                                </p>
                                {/* <p className="description">{item.solution}</p> */}
                            </div>
                        </Link>
                        // /${item.title   .toLowerCase()   .replaceAll(" ", "-")}?id=${item.id}
                    ))}
                    {!loading && categories.length === 0 && <h4>No Articles Found.</h4>}
                </div>
                {/* <div className="sidebar">
                                    <p className="header">Need Support?</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    <button>Contact Support</button>
                                </div> */}
            </div>
        </>
    ) : (
        <NotFound showCta={false} />
    );
}

export default ArticleCategoryList;
