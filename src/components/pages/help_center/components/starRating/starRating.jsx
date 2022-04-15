/* eslint-disable */
import React, { useState } from 'react';

import { HelpIcons } from '../../../../../assets/images/svgs';
import './starRating.scss';

function StarRating({ numOfStars, checked }) {
    const [activeStars, setActiveStars] = useState(checked || 0);

    const handleRating = (value) => {
        setActiveStars(value + 1);
    };
    return (
        <div className="star_rating" style={{ display: 'flex' }}>
            {[...Array(numOfStars)].map((value, index) => (
                <div
                    key={index}
                    className="star"
                    style={{ cursor: 'pointer' }}
                    // onClick={() => handleRating(index)}
                >
                    <HelpIcons name="star" color={index + 1 <= activeStars ? '#DFB300' : '#F2F2F2'} />
                </div>
            ))}
        </div>
    );
}

export default StarRating;
