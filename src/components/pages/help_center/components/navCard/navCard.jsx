/* eslint-disable react/prop-types */
// @ts-nocheck
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as Folder } from '../../../../../assets/icons/Folder.svg';
import './navCard.scss';
import { slugify, kbBrandKit, isSubdomainApp } from '../../../../../helper';

function NavCard({ title, folders }) {
    const { tenantdomain } = useParams();
    return (
        <div className="nav-card">
            <Link
                to={`${isSubdomainApp() ? `/${tenantdomain || ''}` : ''}/knowledgebase/${slugify(title.toLowerCase())}`}
            >
                <div className="nav-icon">
                    <Folder fill={kbBrandKit({ bgCol: 0 })?.backgroundColor} />
                </div>
                <div>
                    <p className="title">{title}</p>
                    <div className="description">{/* <p>{folders[0]?.name}</p> */}</div>
                </div>
                <p className="article-count">{folders[0]?.__meta__?.totalPublishedArticles}</p>
            </Link>
        </div>
    );
}

export default NavCard;
