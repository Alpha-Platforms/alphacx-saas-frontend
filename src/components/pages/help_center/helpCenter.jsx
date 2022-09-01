/* eslint-disable consistent-return */
/* eslint-disabled */
// @ts-nocheck
import React, { useState, useEffect, Fragment } from 'react';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import MoonLoader from 'react-spinners/MoonLoader';
import { css } from '@emotion/css';
import { useDispatch } from 'react-redux';
import HelpNavBar from '../../Layout/helpNavBar';
import AccordionLink from './components/accordion/AccordionLink';
import NavCard from './components/navCard/navCard';
import './helpCenter.scss';
// import LogoBG from '../../../assets/imgF/logoBG.png';
import { httpGetMainKB, invalidTenant } from '../../../helpers/httpMethods';
import { setKbBrandKit } from '../../../reduxstore/actions/tenantInfoActions';
import { kbBrandKit, isSubdomainApp } from '../../../helper';
import NotFound from '../error/NotFound';
import KbSearch from './components/kbsearch/KbSearch';

function HelpCenter() {
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const [shouldReturn404, setShouldReturn404] = useState(false);
    const [loading, setLoading] = useState(true);
    const [popularArticle, setPopularArticle] = useState([]);
    const icons = ['work', 'account', 'subscription', 'users', 'settings', 'document'];
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

    const fetchPopularArticles = async () => {
        const res = await httpGetMainKB('articles/most-popular');
        if (res?.status === 'success') {
            setPopularArticle(res?.data);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchPopularArticles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return loading ? (
        <div className="cust-table-loader">
            <MoonLoader loading={loading} color={kbBrandKit({ bgCol: 0, default: true })?.backgroundColor} size={30} />
        </div>
    ) : !shouldReturn404 ? (
        <>
            <HelpNavBar />
            <div className="help-center">
                <div className={`search-container ${css({ ...kbBrandKit({ bgCol: 0 }) })}`}>
                    {/* <img src={LogoBG} alt="" className="logo-bg" /> */}
                    {/* COMMENT SEARCH FIELD */}
                    <h3>Knowledge Base</h3>
                    {/* <div className="searchbar">
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
                            <button type="button" className={`${css({ ...kbBrandKit({ bgCol: 0 }) })}`}>
                                <SendIcon size={30} fill={kbBrandKit({ bgCol: 0 })?.backgroundColor} />
                            </button>
                        </form>
                    </div> */}
                    <div className="kb-home-search-bar mt-4">
                        <KbSearch isHome />
                    </div>
                </div>
                {categories.length === 0 ? (
                    <div
                        style={{
                            margin: '0 1rem',
                            textAlign: 'center',
                            padding: '6rem 0',
                        }}
                    >
                        <h2>No Categories or Articles found.</h2>
                    </div>
                ) : (
                    <div className="navigation-cards">
                        <div className="nav-cards">
                            {categories?.slice(0, 8)?.map((cat, i) => (
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
                        {categories.length > 8 && (
                            <div>
                                <Link
                                    to={`/knowledge-base/categories${
                                        isSubdomainApp ? `?domain=${urlDomain || ''}` : ''
                                    }`}
                                    className={`show-all-cat btn py-2 px-3 bg-at-blue-light ${css({
                                        ...kbBrandKit({ bgCol: 0 }),
                                        color: 'white',
                                        '&:hover': { ...kbBrandKit({ bgCol: 30 }), color: 'white' },
                                    })}`}
                                >
                                    View all categories
                                </Link>
                            </div>
                        )}

                        {Array.isArray(popularArticle) && popularArticle?.length > 0 && (
                            <div className="popular-questions">
                                <h3>Most Popular Articles</h3>
                                <div className="accordions">
                                    {popularArticle?.map((item) => (
                                        <AccordionLink
                                            key={item.id}
                                            question={item.title}
                                            solution={item.solution}
                                            category={item.folder?.category?.name}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    ) : (
        <NotFound showCta={false} />
    );
}

export default HelpCenter;
