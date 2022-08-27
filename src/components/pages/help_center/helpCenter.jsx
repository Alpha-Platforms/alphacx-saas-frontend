/* eslint-disable consistent-return */
/* eslint-disabled */
// @ts-nocheck
import React, { useState, useEffect, Fragment } from 'react';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import MoonLoader from 'react-spinners/MoonLoader';
import { SearchIconNavbr, SendIcon } from '../../../assets/images/svgs';
import HelpNavBar from '../../Layout/helpNavBar';
import AccordionLink from './components/accordion/AccordionLink';
import NavCard from './components/navCard/navCard';
import './helpCenter.scss';
import LogoBG from '../../../assets/imgF/logoBG.png';
import { httpGetMainKB, invalidTenant } from '../../../helpers/httpMethods';
// import { kbBrandKit } from '../../../helper';
import NotFound from '../error/NotFound';

function HelpCenter() {
    const [categories, setCategories] = useState([]);
    const [shouldReturn404, setShouldReturn404] = useState(false);
    const [loading, setLoading] = useState(true);
    const [popularArticle, setPopularArticle] = useState([]);
    const icons = ['work', 'account', 'subscription', 'users', 'settings', 'document'];
    const [search, setSearch] = useState('');

    const handleChange = (e) => {
        setSearch(e.value);
    };

    const fetchCategories = async () => {
        const res = await httpGetMainKB('articles/categories');
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
        setLoading(false);
        if (res === invalidTenant) {
            setShouldReturn404(true);
        } else if (res?.status === 'success') {
            setPopularArticle(res?.data);
        } else {
            return NotificationManager.error(res?.er?.message, 'Error', 4000);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchPopularArticles();
    }, []);
    return loading ? (
        <div className="cust-table-loader">
            <MoonLoader loading={loading} color="#006298" size={30} />
        </div>
    ) : !shouldReturn404 ? (
        <>
            <HelpNavBar />
            <div className="help-center">
                <div className="search-container">
                    <img src={LogoBG} alt="" className="logo-bg" />
                    {/* COMMENT SEARCH FIELD */}
                    <h3>Knowledge Base</h3>
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
                            <button type="button">
                                <SendIcon size={30} />
                            </button>
                        </form>
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
                                    to="/knowledge-base/categories"
                                    className="show-all-cat btn py-2 px-3 bg-at-blue-light"
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
