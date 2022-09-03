/* eslint-disable */
// @ts-nocheck
import React, { useEffect, useState } from 'react';

import { Link, useLocation, useParams } from 'react-router-dom';
import { SearchIconNavbr } from '../../../../../assets/images/svgs';
import './topBar.scss';
import { slugify, isSubdomainApp } from '../../../../../helper';
import KbSearch from '../kbsearch/KbSearch';

function TopBar({ categoryId }) {
    const location = useLocation();
    const [links, setLinks] = useState([]);
    const { tenantdomain } = useParams();

    useEffect(() => {
        const pagelinks = location.pathname.split('/');
        pagelinks.shift();
        pagelinks.shift();
        isSubdomainApp() && pagelinks.shift();
        setLinks(pagelinks);
    }, []);
    return (
        <div className="top-bar">
            <div className="breadcrumbs">
                <Link to={`${isSubdomainApp() ? `/${tenantdomain || ''}` : ''}/knowledgebase`}>
                    <p className="link active">Home</p>
                </Link>
                {links.map((link, i) => (
                    <p key={i} className={`link ${i === links.length - 2 ? 'active' : ''}`}>
                        {i === links.length - 2 ? (
                            <Link to={`${isSubdomainApp() ? `/${tenantdomain || ''}` : ''}/knowledgebase/${slugify(link)}`}>{link.replaceAll('-', ' ')}</Link>
                        ) : (
                            link.replaceAll('-', ' ')
                        )}
                    </p>
                ))}
            </div>
            {/* <div className="search-bar">
                <div className="icon">
                    <SearchIconNavbr />
                </div>
                <form>
                    <input type="text" placeholder="Search help center" />
                </form>
            </div> */}
            <div className="kb-search-bar">
                <KbSearch />
            </div>
        </div>
    );
}

export default TopBar;
