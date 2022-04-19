/* eslint-disable */
import React, { useState } from 'react';

import { SendIcon, CancelIconC } from '../../../../../assets/images/svgs';
import './accordion.scss';

function Accordion({ question, solution, category }) {
    const [open, setOpen] = useState(false);

    const handleAction = () => {
        console.log('actioned');
        setOpen(!open);
    };
    return (
        <div className={`accordion ${open ? 'expand' : ''}`}>
            <div className="question" onClick={handleAction}>
                <p>{question}</p>
                <button>{open ? <CancelIconC /> : <SendIcon size={30} />}</button>
            </div>
            <div className="solution">
                <p>{solution}</p>
            </div>
        </div>
    );
}

export default Accordion;
