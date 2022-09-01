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
    const [npsScore, setNpsScore] = useState(0);
    const [comment, setComment] = useState('');
    const [processing, setProcessing] = useState(false);
    const [domain, setDomain] = useState('')
    const [ratingsConfig, setRatingsConfig] = useState({
        ratingLabel: 'Satisfied with our customer support service? Click on the stars below to rate us.',
        commentLabel: 'Tell us what we can improved upon',
        npsLabel: 'How likely are you to recommend us to a friend or colleague?',
    });
    //
    const [showModal, setShowModal] = useState(false);
    
    const { ticketId, customerId } = useParams();

    const urlQueryParams = new URLSearchParams(window.location.search);

    useEffect(() => {
        let sub = getSubdomainOrUrl();
        if (sub === 'app' || sub === 'dev') sub = urlQueryParams.get('domain');
        setDomain(sub);
        getRatingConfig(sub);
    }, []);

    const getRatingConfig = async (sub) => {
        const res = await httpGetMainNoAuth(`settings/rating-config?domain=${sub}`, {});
        if (res?.status === 'success') {
            setRatingsConfig({
                ...ratingsConfig,
                npsLabel: res?.data.npsLabel,
                ratingLabel: res?.data.ratingLabel,
                commentLabel: res?.data.commentLabel,
            });
        } else {
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
            setShowModal(true);
            return NotificationManager.success('Thanks for your feedback 😃', 'Success');
        }
        setProcessing(false);
        return NotificationManager.error(res?.er?.message, 'Error', 4000);
    };

    const handleHideModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <section className="ratings-page bg-white min-vh-100">
                <Container fluid className="py-5">
                    <Row className="justify-content-center">
                        <Col sm={12} md={8} lg={6}>
                            <Form className="mt-3" onSubmit={(e) => e.preventDefault()}>
                                <div className="text-center mb-4">
                                    <h1 className="mb-3">Rate Your Experience</h1>
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
                        </Col>
                    </Row>
                    <footer className="">
                        <p className="text-center small">
                        We Care <Image src={Logo} className="me-2" height="16" width="auto" />
                        </p>
                    </footer>
                </Container>
            </section>
            <Modal
                open={showModal}
                onClose={handleHideModal}
                aria-labelledby="contained-modal-title-vcenter"
                size="lg"
                centered
            >
                {/* <Modal.Body> */}
                <div className="p-4 saveTicketWrapModal">
                    <div className="text-center">
                        <div className="d-flex justify-content-center my-4">
                            <Image src={Buke} alt="" />
                        </div>
                        <div className="Auth-header mb-2">
                            <h3 className="mb-3">Review Submitted!</h3>
                            <p className="text-center">
                                Thank you for taking out time
                                <br />
                                to rate us
                            </p>
                            <div className="">
                                <Button as="a" href="https://alphacx.co" variant="success" className="">
                                    Continue
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* </Modal.Body> */}
            </Modal>
        </>
    );
}
