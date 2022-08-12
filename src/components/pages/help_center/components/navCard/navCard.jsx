/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as DocSvg } from '../../../../../assets/icons/Document2.svg';
import { ReactComponent as Folder } from '../../../../../assets/icons/Folder.svg';
import './navCard.scss';
import { slugify, textCapitalize } from '../../../../../helper';

function NavCard({ title, icon, folders, id }) {
    return (
        <div className="nav-card">
            <Link to={`/knowledge-base/${slugify(title.toLowerCase())}` || '/knowledge-base'}>
                <div className="nav-icon">
                    <Folder />
                </div>
                <div>
                    <p className="title">{title}</p>
                    <div className="description">
                        {/* <p>{folders[0]?.name}</p> */}
                    </div>
                </div>
                <p className="article-count">{folders[0]?.__meta__?.totalPublishedArticles}</p>
            </Link>
        </div>
    );
}

export default NavCard;
