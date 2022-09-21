// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { css } from '@emotion/css';
import Spinner from 'react-bootstrap/Spinner';
import QRCode from 'react-qr-code';

function WhatsappCx() {
    const appSocket = useSelector((state) => state.socket.appSocket);
    const socketMessage = useSelector((state) => state.socket.socketMessage);
    const [isInitiating, setIsInitiating] = useState(false);
    const [qrCode, setQrCode] = useState('');
    const [isClientReady, setIsClientReady] = useState(false);

    const initiateWhatsapp = () => {
        setIsInitiating(true);
        appSocket?.triggerWhatsappInit();
    };

    useEffect(() => {
        console.log('socketMessage => ', socketMessage);

        // qr code generated
        if (
            socketMessage?.type === 'whatsAppHook' &&
            socketMessage?.status === 'incoming' &&
            socketMessage?.data?.event === 'qr'
        ) {
            setQrCode(socketMessage?.data?.QR);
            setIsInitiating(false);
        }

        // devices has been linked
        if (
            socketMessage?.type === 'whatsAppHook' &&
            socketMessage?.status === 'incoming' &&
            socketMessage?.data?.event === 'ready'
        ) {
            setIsClientReady(true);
        }
    }, [socketMessage]);

    return (
        <>
            <p className="mt-3">
                <strong>Connect via WhatsappCX</strong>
            </p>

            <div className="mt-4 mb-5 col-md-8">
                {isClientReady ? (
                    <div>Account Connected</div>
                ) : (
                    !qrCode && (
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
                    )
                )}
                {qrCode && !isClientReady && (
                    <div className="whatsapp-qrcode-wrapper mt-3">
                        <p>
                            Open WhatsApp &gt; <strong>Linked Devices</strong> &gt; <strong>Link a Device</strong> and
                            scan the below QR code to connect account:
                        </p>
                        <QRCode value={qrCode} />
                    </div>
                )}
            </div>
        </>
    );
}

export default WhatsappCx;
