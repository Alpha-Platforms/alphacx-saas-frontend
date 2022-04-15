/* eslint-disable */
import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { SendIcon, CancelIconC } from '../../../../../assets/images/svgs';
import './accordion.scss';
import { slugify } from '../../../../../helper';

function AccordionLink({ question, solution, category }) {
    const [open, setOpen] = useState(false);

    const handleAction = () => {
        console.log('actioned');
        // setOpen(!open);
    };
    return (
        <Link
            to={`/knowledge-base/${slugify(category || '')}/${slugify(question || '')}`}
            className={`accordion ${open ? 'expand' : ''}`}
        >
            <div className="question" onClick={handleAction}>
                <p>{question}</p>
                <button>{open ? <CancelIconC /> : <SendIcon size={30} />}</button>
            </div>
            <div className="solution">
                <p>{solution}</p>
            </div>
        </Link>
    );
}

export default AccordionLink;
