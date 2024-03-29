/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import DashboardIcon from '../../navigation/icons';
import './totalCard.scss';

function TotalCard({ title, value, icon, color }) {
    return (
        <div className="total-card">
            <div className="icon" style={{ backgroundColor: `${color}18` }}>
                <DashboardIcon name={icon} color={color} />
            </div>
            <div className="details">
                <p className="title">{title}</p>
                <p className="value" style={{ color }}>
                    {value}
                </p>
            </div>
        </div>
    );
}
TotalCard.propTypes = {
    icon: PropTypes.string,
    color: PropTypes.string,
    value: PropTypes.number,
};

TotalCard.defaultProps = {
    icon: 'ticket',
    color: '#1870A1',
    value: 0,
};
export default TotalCard;
