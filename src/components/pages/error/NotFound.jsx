import React from 'react';
// proper 404 UI later
// eslint-disable-next-line react/prop-types
function NotFound({ showCta }) {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <h3 style={{ marginRight: '25px' }}>404</h3>
            <div style={{ paddingLeft: '25px', borderLeft: 'solid 1px', verticalAlign: 'middle' }}>
                <p
                    style={{
                        padding: '16px 0',
                        margin: '0',
                    }}
                >
                    This page could not be found
                </p>
            </div>
            {showCta && (
                <a href="/" className="border border-secondary btn-outline-secondary ms-2 px-3 py-1">
                    Home
                </a>
            )}
        </div>
    );
}

export default NotFound;
