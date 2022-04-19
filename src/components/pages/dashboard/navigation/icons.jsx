/* eslint-disable */
import * as React from 'react';
import PropTypes from 'prop-types';

function DashboardIcon({ name, color }) {
    return name === 'home' ? (
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                clipRule="evenodd"
                d="M3 6.5C3 3.875 3.028 3 6.5 3s3.5.875 3.5 3.5.011 3.5-3.5 3.5S3 9.125 3 6.5zM14 6.5c0-2.625.028-3.5 3.5-3.5s3.5.875 3.5 3.5.011 3.5-3.5 3.5S14 9.125 14 6.5zM3 16.5c0-2.625.028-3.5 3.5-3.5s3.5.875 3.5 3.5.011 3.5-3.5 3.5S3 19.125 3 16.5zM14 16.5c0-2.625.028-3.5 3.5-3.5s3.5.875 3.5 3.5.011 3.5-3.5 3.5-3.5-.875-3.5-3.5z"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ) : name === 'ticket' ? (
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                clipRule="evenodd"
                d="M17.857 20.417a3.393 3.393 0 003.393-3.391v-2.702a2.24 2.24 0 01-.001-4.478h.001v-2.7a3.392 3.392 0 00-3.388-3.396H6.144A3.394 3.394 0 002.75 7.142v2.791a2.163 2.163 0 012.239 2.152 2.237 2.237 0 01-2.233 2.239H2.75v2.7a3.392 3.392 0 003.391 3.393h11.716z"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                clipRule="evenodd"
                d="M12.371 9.063l.616 1.247c.06.122.176.207.311.227l1.377.201c.341.05.476.468.23.707l-.996.97a.417.417 0 00-.12.367l.235 1.37a.414.414 0 01-.6.437l-1.232-.647a.412.412 0 00-.386 0l-1.23.647a.415.415 0 01-.602-.437l.235-1.37a.414.414 0 00-.12-.367l-.995-.97a.414.414 0 01.23-.707l1.376-.201a.416.416 0 00.312-.227l.615-1.247a.415.415 0 01.744 0z"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ) : name === 'profile' ? (
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                clipRule="evenodd"
                d="M11.985 15.346c-3.868 0-7.17.585-7.17 2.926 0 2.342 3.281 2.948 7.17 2.948 3.867 0 7.17-.586 7.17-2.927 0-2.34-3.282-2.947-7.17-2.947z"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                clipRule="evenodd"
                d="M11.985 12.006A4.596 4.596 0 107.389 7.41a4.58 4.58 0 004.564 4.596h.032z"
                stroke={color}
                strokeWidth={1.429}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ) : name === 'graph' ? (
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                clipRule="evenodd"
                d="M17.278 13.89c.674 0 1.24.556 1.138 1.223-.606 3.92-3.962 6.83-8.009 6.83A8.107 8.107 0 012.3 13.837c0-3.688 2.802-7.124 5.957-7.901.678-.167 1.372.31 1.372 1.007 0 4.729.16 5.952 1.057 6.617.898.665 1.954.33 6.592.33z"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                clipRule="evenodd"
                d="M21.692 9.951c.054-3.038-3.678-7.935-8.225-7.85a.679.679 0 00-.653.653c-.114 2.498.04 5.735.127 7.202a.89.89 0 00.84.843c1.509.086 4.864.204 7.326-.169a.695.695 0 00.585-.679z"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ) : name === 'setting' ? (
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                clipRule="evenodd"
                d="M20.806 7.623l-.622-1.08a1.913 1.913 0 00-2.609-.705v0a1.904 1.904 0 01-2.608-.677 1.832 1.832 0 01-.257-.916v0a1.913 1.913 0 00-1.913-1.968h-1.254A1.904 1.904 0 009.64 4.19v0a1.913 1.913 0 01-1.913 1.886 1.83 1.83 0 01-.915-.256v0a1.913 1.913 0 00-2.609.704l-.668 1.099a1.913 1.913 0 00.696 2.609v0a1.913 1.913 0 010 3.313v0a1.904 1.904 0 00-.696 2.6v0l.632 1.089a1.913 1.913 0 002.608.741v0a1.894 1.894 0 012.6.696c.164.277.253.593.256.915v0c0 1.057.857 1.913 1.913 1.913h1.254c1.053 0 1.908-.85 1.913-1.904v0a1.904 1.904 0 011.913-1.913c.322.009.636.097.916.257v0a1.913 1.913 0 002.608-.696v0l.66-1.098a1.904 1.904 0 00-.696-2.61v0a1.904 1.904 0 01-.696-2.608c.166-.29.406-.53.696-.695v0a1.913 1.913 0 00.695-2.6v0-.01z"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle
                cx={12.175}
                cy={11.888}
                r={2.636}
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ) : name === 'logout' ? (
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.32 22H6.433A4.439 4.439 0 012 17.565V6.436A4.44 4.44 0 016.433 2h4.876a4.441 4.441 0 014.436 4.436v.932a.75.75 0 01-1.5 0v-.932A2.939 2.939 0 0011.309 3.5H6.433A2.937 2.937 0 003.5 6.436v11.129A2.937 2.937 0 006.433 20.5h4.886a2.929 2.929 0 002.925-2.924v-.943a.75.75 0 011.5 0v.943A4.43 4.43 0 0111.32 22z"
                fill={color}
            />
            <mask id="prefix__a" maskUnits="userSpaceOnUse" x={8} y={11} width={15} height={2}>
                <path fillRule="evenodd" clipRule="evenodd" d="M8.996 11.25h13.541v1.5H8.997v-1.5z" fill={color} />
            </mask>
            <g mask="url(#prefix__a)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M21.787 12.75H9.747a.75.75 0 010-1.5h12.04a.75.75 0 010 1.5z"
                    fill={color}
                />
            </g>
            <g>
                <mask id="prefix__b" maskUnits="userSpaceOnUse" x={18} y={8} width={5} height={8}>
                    <path fillRule="evenodd" clipRule="evenodd" d="M18.11 8.336h4.427v7.33H18.11v-7.33z" fill={color} />
                </mask>
                <g mask="url(#prefix__b)">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.86 15.667a.75.75 0 01-.529-1.281L20.725 12 18.33 9.617a.749.749 0 111.058-1.062l2.928 2.915a.746.746 0 010 1.062l-2.928 2.916a.747.747 0 01-.53.219z"
                        fill={color}
                    />
                </g>
            </g>
        </svg>
    ) : name === 'logo' ? (
        <svg width={48} height={26} viewBox="0 0 48 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M42.71 10.082c-.983-.376-1.572-.824-1.994-1.802-1.808-4.214-5.487-6.011-9.918-4.922-.738.183-1.463.809-2.148-.078C20.406-2.649 11.918-.4 7.89 8.887c-.519 1.19-1.372 1.151-2.188 1.45-5.333 1.955-7.342 7.73-4.225 12.18 1.094 1.557 2.753 2.351 4.288 3.324 1.654-.106 3.371.342 4.94-.467 1.74-.896 3.337-1.917 5.121.14.643.737 2.072.693 2.662-.477.551-1.098-.159-1.69-1.204-2.129-1.43-.597-1.103-1.647-.513-2.76 1.285-2.437 1.951-5.043 1.928-7.817-.01-1.007-.327-1.777-1.425-1.826-.969-.043-1.376.598-1.482 1.518-.086.756.226 1.613-.546 2.283-1.065-1.19-1.9-2.654-3.41-3.261-1.357-.55-1.27-1.277-.758-2.39 2.825-6.083 11.05-7.556 15.893-2.73 1.228 1.223 2.096 1.71 3.841.717 3.156-1.801 6.805.077 7.448 3.71.235 1.324.657 1.892 2.005 2.157 3.304.646 5.078 2.948 4.752 5.833-.316 2.803-2.633 4.595-6.014 4.61-3.903.019-7.812.01-11.715 0-.82 0-1.63.004-2.082.842-.489.906.106 1.503.672 2.086 4.623-.005 9.25.02 13.874-.029 3.98-.038 7.4-2.837 8.095-6.522.753-3.988-1.285-7.774-5.136-9.248zM12.949 18.64c0 2.495-2.004 4.262-4.886 4.315-2.72.048-5.079-2.215-5.136-4.932-.058-2.64 2.311-5.067 4.982-5.1 2.993-.04 5.04 2.282 5.04 5.717z"
                fill={color}
            />
        </svg>
    ) : null;
}
DashboardIcon.propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
};

DashboardIcon.defaultProps = {
    name: '',
    color: 'white',
};

export default DashboardIcon;
