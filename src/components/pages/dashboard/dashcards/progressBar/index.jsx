/* eslint-disable */
import React from 'react';
import './progressBar.scss';
import PropTypes from 'prop-types';

function ProgressBar({ title, value, color }) {
    return (
        <div className="progressbar">
            <div className="top-details">
                <p className="title">{title}</p>
                <p className="value" style={{ color }}>
                    {value}
                </p>
            </div>
            <div className="track" style={{ backgroundColor: `${color}38` }}>
                <div className="bar" style={{ backgroundColor: color }} />
            </div>
        </div>
    );
}

ProgressBar.propTypes = {
    title: PropTypes.string,
    color: PropTypes.string,
    value: PropTypes.number,
};

ProgressBar.defaultProps = {
    title: '',
    color: '#1870A1',
    value: 0,
};
export default ProgressBar;
