/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
// @ts-nocheck
import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import { ReactComponent as TypePdf } from '../../../assets/icons/Filetypepdf.svg';
import { ReactComponent as TypeCsv } from '../../../assets/icons/Filetypecsv.svg';
import { ReactComponent as TypeDocx } from '../../../assets/icons/Filetypedocx.svg';
import { ReactComponent as TypeXlsx } from '../../../assets/icons/Filetypexlsx.svg';
import { ReactComponent as TypeImg } from '../../../assets/icons/Filetypeimg.svg';

function TicketAttachment({ ticket, className }) {
    const [lightboxState, setLightboxState] = useState({
        idx: 0,
        isOpen: false,
    });
    /* ticket attachment logic */

    const ticketAttachments = [ticket[0]?.attachment]
        .filter((x) => !!x)
        .map((file) => {
            const fileSplit = file.split('.');
            const slashSplit = file.split('/');
            return {
                link: file,
                ext: fileSplit[fileSplit.length - 1],
                name: slashSplit[slashSplit.length - 1],
            };
        });

    const ticketImageAttachments = ticketAttachments
        .filter(
            (attach) => attach.ext === 'jpg' || attach.ext === 'jpeg' || attach.ext === 'png' || attach.ext === 'gif',
        )
        .map((imgObj) => imgObj?.link);

    // console.log('ticketAttachments => ', ticketAttachments);

    return (
        <div className={`ticket-attachment ${className ?? ''}`.trim()}>
            <div className="d-flex justify-content-center border-top mx-2 pt-2">
                <p
                    style={{
                        fontSize: '11px',
                        textAlign: 'center',
                    }}
                >
                    Attachments
                </p>
            </div>

            <ul className="attach-wrapper">
                {ticketAttachments.map((attach) => {
                    switch (attach?.ext) {
                        case 'jpg':
                        case 'png':
                        case 'jpeg':
                        case 'gif':
                            return (
                                <li>
                                    <a
                                        href="#"
                                        onClick={() =>
                                            setLightboxState((prev) => ({
                                                ...prev,
                                                isOpen: true,
                                                idx: ticketImageAttachments.indexOf(attach?.link),
                                            }))
                                        }
                                    >
                                        <div>
                                            <TypeImg />
                                        </div>
                                        <div>{attach.name}</div>
                                    </a>
                                </li>
                            );
                        case 'pdf':
                            return (
                                <li>
                                    <a href={attach?.link} target="_blank" rel="noopener noreferrer">
                                        <div>
                                            <TypePdf />
                                        </div>
                                        <div>{attach.name}</div>
                                    </a>
                                </li>
                            );
                        case 'csv':
                            return (
                                <li>
                                    <a
                                        href={attach?.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download={attach.name}
                                    >
                                        <div>
                                            <TypeCsv />
                                        </div>
                                        <div>{attach.name}</div>
                                    </a>
                                </li>
                            );
                        case 'docx':
                        case 'doc':
                            return (
                                <li>
                                    <a
                                        href={attach?.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download={attach.name}
                                    >
                                        <div>
                                            <TypeDocx />
                                        </div>
                                        <div>{attach.name}</div>
                                    </a>
                                </li>
                            );
                        case 'xlsx':
                        case 'xls':
                            return (
                                <li>
                                    <a
                                        href={attach?.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download={attach.name}
                                    >
                                        <div>
                                            <TypeXlsx />
                                        </div>
                                        <div>{attach.name}</div>
                                    </a>
                                </li>
                            );
                        default:
                            return (
                                <li>
                                    <a
                                        href={attach?.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download={attach.name}
                                    >
                                        <div>
                                            <TypePdf />
                                        </div>
                                        <div>{attach.name}</div>
                                    </a>
                                </li>
                            );
                    }
                })}
            </ul>

            {lightboxState.isOpen && (
                <Lightbox
                    mainSrc={ticketImageAttachments[lightboxState.idx]}
                    nextSrc={ticketImageAttachments[(lightboxState.idx + 1) % ticketImageAttachments.length]}
                    prevSrc={
                        ticketImageAttachments[
                            (lightboxState.idx + ticketImageAttachments.length - 1) % ticketImageAttachments.length
                        ]
                    }
                    onCloseRequest={() => setLightboxState((prev) => ({ ...prev, isOpen: false }))}
                    onMovePrevRequest={() =>
                        setLightboxState((prev) => ({
                            ...prev,
                            idx:
                                (lightboxState.idx + ticketImageAttachments.length - 1) % ticketImageAttachments.length,
                        }))
                    }
                    onMoveNextRequest={() =>
                        setLightboxState((prev) => ({
                            ...prev,
                            idx: (lightboxState.idx + 1) % ticketImageAttachments.length,
                        }))
                    }
                    imageCaption={
                        ticketAttachments.find((img) => img.link === ticketImageAttachments[lightboxState.idx])?.name
                    }
                    enableZoom
                />
            )}
        </div>
    );
}

export default TicketAttachment;
