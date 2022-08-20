/* eslint-disable */
import React, { useMemo, useEffect, Fragment, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
//
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

const useQuery = () => {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
};

function TwitterAuth() {
    const [hostName] = useState(() => {
        return window.location.hostname.split('.');
    });
    const query = useQuery();
    //
    const domain = query.get('domain');
    const oauth_token = query.get('oauth_token');
    const oauth_verifier = query.get('oauth_verifier');
    //
    // ?domain=techpoint&oauth_token=aX1kEAAAAAABW87sAAABfxzj6a4&oauth_verifier=nocabDmERvuVSH5XbQNiQjwWhYVnbueZ
    useEffect(() => {
        if (domain && oauth_token && oauth_verifier) {
            console.log(domain, oauth_token, oauth_verifier);
            const origin = window.location.origin;
            window.location.href = `${origin}/settings/integrations/twitter?oauth_token=${oauth_token}&oauth_verifier=${oauth_verifier}`;
           
        } else {
            window.location.href = '/';
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [domain, oauth_token, oauth_verifier]);

    return (
        <section className="twitter-auth-page bg-white min-vh-100">
            <Container fluid className="py-5">
                <Row className="justify-content-center">
                    <Col sm={12} md={8} lg={6}>
                        {/* {domain}
                            {oauth_token}
                            {oauth_verifier} */}
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default TwitterAuth;
