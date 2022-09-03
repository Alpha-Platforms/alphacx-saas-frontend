/* eslint-disable react/prop-types */
// @ts-nocheck
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/css';
import { SendIcon, CancelIconC } from '../../../../../assets/images/svgs';
import './accordion.scss';
import { slugify, kbBrandKit, isSubdomainApp } from '../../../../../helper';

function AccordionLink({ question, solution, category }) {
    const [open /* , setOpen */] = useState(false);
    const urlDomain = new URLSearchParams(window.location.search).get('domain');

    // const handleAction = () => {
    //     // console.log('actioned');
    //     // setOpen(!open);
    // };
    return (
        <Link
            to={`/knowledgebase/${slugify(category || '')}/${slugify(question || '')}${
                isSubdomainApp ? `?domain=${urlDomain || ''}` : ''
            }`}
            className={`accordion ${open ? 'expand' : ''} ${css({ '&:hover': { ...kbBrandKit({ col: 0 }) } })}`}
        >
            <div className="question" /* onClick={handleAction} */>
                <p>{question}</p>
                <button type="button">
                    {open ? <CancelIconC /> : <SendIcon size={30} fill={kbBrandKit({ bgCol: 0 })?.backgroundColor} />}
                </button>
            </div>
            <div className="solution">
                <p>{solution}</p>
            </div>
        </Link>
    );
}

export default AccordionLink;
