/* eslint-disable */
import React, { useEffect, useState, Fragment } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { Modal } from 'react-responsive-modal';
//
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Image from 'react-bootstrap/Image';
//
import StarRatings from 'react-star-ratings';

//
import { httpPostNoAuth, httpGetMainNoAuth } from '../../../helpers/httpMethods';
// resources and assets
import Buke from '../../../assets/svgicons/Buke.svg';
import Logo from '../../../assets/svgicons/Logo.svg';
import '../settings/settings.css';
import { getSubdomainOrUrl } from 'helper';

export default function RatingsForm() {
    const [rating, setRating] = useState(0);
    const [npsScore, setNpsScore] = useState(null);
    const [comment, setComment] = useState('');
    const [processing, setProcessing] = useState(false);
    const [domain, setDomain] = useState('')
    // const [ratingsConfig, setRatingsConfig] = useState({
    //     ratingLabel: 'Satisfied with our customer support service? Click on the stars below to rate us.',
    //     commentLabel: 'Tell us what we can improved upon',
    //     npsLabel: 'How likely are you to recommend us to a friend or colleague?',
    // });

    const [ratingsConfig, setRatingsConfig] = useState({
        ratingLabel: '',
        commentLabel: '',
        npsLabel: '',
    });
    const [appLogo, setAppLogo] = useState('');

    const [showSuccessScreen, setShowSuccessScreen] = useState(false);
    
    const { ticketId, customerId } = useParams();

    const urlQueryParams = new URLSearchParams(window.location.search);

    useEffect(() => {
        let sub = getSubdomainOrUrl();
        if (sub === 'app' || sub === 'dev') sub = urlQueryParams.get('domain');
        setDomain(sub);
        getRatingConfig(sub);

        if (urlQueryParams.get('preview') === 'true') {
            setRatingsConfig({
                npsLabel: window.localStorage.getItem('npsLabel'),
                ratingLabel: window.localStorage.getItem('ratingLabel'),
                commentLabel: window.localStorage.getItem('commentLabel')
            })
        }

    }, []);

    const getRatingConfig = async (sub) => {
        const res = await httpGetMainNoAuth(`settings/rating-config`, {domain: sub});
        if (res?.status === 'success') {
            setRatingsConfig({
                ...ratingsConfig,
                npsLabel: res?.data.npsLabel,
                ratingLabel: res?.data.ratingLabel,
                commentLabel: res?.data.commentLabel,                
            });
            setAppLogo(res?.data?.branding?.appLogo);
        }
    };

    const handleSubmit = async () => {
        setProcessing(true);
        if (ticketId == null) {
            setProcessing(false);
            return NotificationManager.error('ticket id is not defined', 'Error', 4000);
        }
        if (customerId == null) {
            setProcessing(false);
            return NotificationManager.error('user id is not defined', 'Error', 4000);
        }
        if (rating === 0) {
            setProcessing(false);
            return NotificationManager.error('rating must be 1 or more ', 'Error', 4000);
        }
        const data = {
            value: rating,
            npsScore,
            ticketId,
            customerId,
            comment,
        };
        
        const res = await httpPostNoAuth(`ratings?domain=${domain}`, data, {});
        if (res?.status === 'success') {
            setProcessing(false);
            setShowSuccessScreen(true);
            return NotificationManager.success('Thanks for your feedback 😃', 'Success');
        }
        setProcessing(false);
        return NotificationManager.error(res?.er?.message, 'Error', 4000);
    };

    return (
        <>
            <section className="ratings-page bg-white min-vh-100 d-flex flex-column justify-content-center">
                <Container fluid className="">
                    <Row className="justify-content-center">
                        {!showSuccessScreen?
                        (<Col sm={12} md={8} lg={6}>
                            <Form className="mt-3" onSubmit={(e) => e.preventDefault()}>
                                <div className="text-center mb-4">
                                    <h3 className="mb-3">Rate Your Experience</h3>
                                    <p className="">{ratingsConfig.ratingLabel}</p>
                                </div>
                                <div className="p-3 mb-4">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <StarRatings
                                            rating={rating}
                                            starRatedColor="#DFB300"
                                            starEmptyColor="#e2e2e2"
                                            starHoverColor="#DFB300"
                                            starSpacing="4px"
                                            starDimension="40px"
                                            changeRating={(newRating) => {
                                                setRating(newRating);
                                            }}
                                            numberOfStars={5}
                                            name="rating"
                                        />
                                    </div>
                                </div>
                                <hr className="mb-5" />
                                <Form.Group className="mb-5 form-group acx-form-group" controlId="improveMessage">
                                    <Form.Label>{ratingsConfig.commentLabel}</Form.Label>
                                    <Form.Control
                                        onChange={(e) => {
                                            setComment(e.target.value);
                                        }}
                                        className="shadow-sm"
                                        as="textarea"
                                        defaultValue=" "
                                        placeholder="Tell us how we can improve..."
                                        rows={6}
                                    />
                                </Form.Group>
                                <div className="mb-5">
                                    <div className="">
                                        <p className="mb-2">{ratingsConfig.npsLabel}</p>
                                    </div>
                                    <div className="p-3 bg-light border acx-hover-border-primary rounded ">
                                        <div className="d-flex justify-content-between align-items-center">
                                            {(() => {
                                                const rows = [];
                                                for (let i = 0; i <= 10; i++) {
                                                    rows.push(
                                                        <button
                                                            type="button"
                                                            key={i}
                                                            onClick={() => setNpsScore(i)}
                                                            className={`mb-0 btn acx-btn-icon acx-hover-border-primary rounded-1 ${
                                                                npsScore == i ? 'acx-bg-primary' : ''
                                                            }`}
                                                        >
                                                            <span className={`${npsScore == i ? 'text-white' : ''}`}>
                                                                {i}
                                                            </span>
                                                        </button>,
                                                    );
                                                }
                                                return rows;
                                            })()}
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3 text-center">
                                    <Button
                                        type="submit"
                                        onClick={handleSubmit}
                                        size="lg"
                                        disabled={processing || !ticketId && !customerId}
                                        className="acx-btn-primary px-4"
                                    >
                                        {processing ? (
                                            <span className="text-light">
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    variant="light"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />{' '}
                                                Loading...
                                            </span>
                                        ) : (
                                            <span className="text-white">Submit</span>
                                        )}
                                    </Button>
                                </div>
                            </Form>
                        </Col>)
                        :
                        <Col>
                            <div className="text-center">
                                <div className="d-flex justify-content-center my-4">
                                    <Image src={Buke} alt="" />
                                </div>
                                <div className="Auth-header mb-2">
                                    <h3 className="mb-3">Rating Submitted!</h3>
                                    <p className="text-center">
                                        Thank you for rating our services.
                                    </p>
                                    <div className="text-black-50">
                                        Check out <Link to="https://alphacx.co" className="text-black-50 fw-bold">AlphaCX</Link>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        }
                    </Row>
                    <footer className="text-center mb-3">
                        <Image src={appLogo} height="20" width="auto" />
                    </footer>
                </Container>
            </section>
        </>
    );
}
