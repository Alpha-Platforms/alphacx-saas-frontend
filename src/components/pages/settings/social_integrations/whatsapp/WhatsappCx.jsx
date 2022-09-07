// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { css } from '@emotion/css';
import Spinner from 'react-bootstrap/Spinner';

function WhatsappCx() {
    const appSocket = useSelector((state) => state.socket.appSocket);
    const socketMessage = useSelector((state) => state.socket.socketMessage);
    const [isInitiating, setIsInitiating] = useState(false);

    const initiateWhatsapp = () => {
        console.log('Attempting to initiate whatsapp');
        appSocket?.triggerWhatsappInit();
        console.log('appsocket => ', appSocket);
    };

    useEffect(() => {
        console.log('socketMessage => ', socketMessage);
    }, [socketMessage]);

    return (
        <>
            <p className="mt-3">
                <strong>Connect via WhatsappCX</strong>
            </p>

            <div className="mt-5 mb-5 col-md-8">
                <button
                    type="button"
                    className={`btn ${css({ backgroundColor: '#25D366', color: 'white' })}`}
                    onClick={initiateWhatsapp}
                >
                    {isInitiating ? (
                        <span className="text-light d-flex justify-content-center align-items-center">
                            <Spinner
                                as="span"
                                size="sm"
                                animation="border"
                                variant="light"
                                aria-hidden="true"
                                role="status"
                            />
                            <span className="ms-1"> Loading...</span>
                        </span>
                    ) : (
                        <span className="">
                            <i className="bi-whatsapp" /> Connect account
                        </span>
                    )}
                </button>
            </div>
        </>
    );
}

export default WhatsappCx;
