/* eslint-disable */
// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { capitalize } from '@material-ui/core';
import Lightbox from 'react-image-lightbox';
import { dateFormater } from '../../helpers/dateFormater';
import { ReactComponent as TypePdf } from '../../../assets/icons/Filetypepdf.svg';
import { ReactComponent as TypeCsv } from '../../../assets/icons/Filetypecsv.svg';
import { ReactComponent as TypeDocx } from '../../../assets/icons/Filetypedocx.svg';
import { ReactComponent as TypeXlsx } from '../../../assets/icons/Filetypexlsx.svg';
import { ReactComponent as TypeImg } from '../../../assets/icons/Filetypeimg.svg';
import 'react-image-lightbox/style.css';

export default function TicketTimeline({ ticket, UserInfo, isTicketDetails, timeLine = true }) {
    const [timeStampsMsg, setTimeStampsMsg] = useState([]);

    const [lightboxState, setLightboxState] = useState({
        idx: 0,
        isOpen: false,
    });

    useEffect(() => {
        sortMsges(ticket[0].history);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const sortMsges = (msgs) => {
        const resultTimestamps = msgs.filter((observation) => {
            return observation.response.includes('Ticket Stage has been marked');
        });
        setTimeStampsMsg(resultTimestamps);
    };

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
        <div className='zeelz' style={{ width: '100%', height: '100%', borderLeft: '1px solid rgb(241, 241, 241)' }}>


            <div className="user-profile-conversation-page tktimeline-wrapper">
                {timeLine ? (
                    <div className="container-timeline">
                        <div className="box">
                            <div className="borderContaner">
                                <div className="circle" />
                                <div className="img" />
                            </div>
                            <div className="textTimeLineSec">
                                <span>
                                    This message is assigned to{' '}
                                    {`${capitalize(ticket[0]?.assignee?.firstname || '')} ${capitalize(
                                        ticket[0]?.assignee?.lastname || '',
                                    )}`}
                                </span>
                                <div className="timeLinehashtags">
                                    <div style={{ textTransform: 'uppercase' }}>
                                        #{ticket[0]?.id.slice(ticket[0]?.id?.length - 8)}
                                    </div>
                                    <div>{dateFormater(ticket[0].created_at)}</div>
                                </div>
                            </div>
                        </div>

                        {ticket[0].history.length === 0 ? (
                            ''
                        ) : (
                            <div className="box">
                                <div className="borderContaner">
                                    <div className="circle" />
                                    <div className="img" />
                                </div>
                                <div className="textTimeLineSec">
                                    <span>
                                        {`${capitalize(ticket[0]?.assignee?.firstname || '')} ${capitalize(
                                            ticket[0]?.assignee?.lastname || '',
                                        )}`}{' '}
                                        picked up this chat
                                    </span>
                                    <div className="timeLinehashtags">
                                        <div style={{ textTransform: 'uppercase' }}>
                                            #{ticket[0]?.id.slice(ticket[0]?.id?.length - 8)}
                                        </div>
                                        <div>{dateFormater(ticket[0].created_at)}</div>
                                        {/* {console.log(ticket[0])} */}
                                    </div>
                                </div>
                            </div>
                        )}
                        {timeStampsMsg.map((data) => {
                            return (
                                <div key={data.id} className="box">
                                    <div className="borderContaner">
                                        <div className="circle" />
                                        <div className="img" />
                                    </div>
                                    <div className="textTimeLineSec">
                                        <span>
                                            This {`${data.response}`} by{' '}
                                            <span className="fst-italic">{`${
                                                data?.user?.firstname ? capitalize(data?.user?.firstname) : ''
                                            } ${data?.user?.lastname == 'default' ? '' : data?.user?.lastname}`}</span>
                                        </span>
                                        <div className="timeLinehashtags flex-column align-items-start">
                                            <div>
                                                <a href={`#${data?.id}`} className="acx-link-primary d-block">
                                                    Ticket{' '}
                                                    {`${data.response.replace('Ticket Stage has been marked as ', '')}`}
                                                </a>
                                            </div>
                                            <div>{dateFormater(data.created_at)}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    ''
                )}
            </div>

            <div className="ticket-attachment">
                <div className="d-flex justify-content-center border-top border-bottom mx-2 pt-2">                    
                    <p
                        style={{
                            fontSize: '11px',
                            textAlign: 'center'
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
                                    (lightboxState.idx + ticketImageAttachments.length - 1) %
                                    ticketImageAttachments.length,
                            }))
                        }
                        onMoveNextRequest={() =>
                            setLightboxState((prev) => ({
                                ...prev,
                                idx: (lightboxState.idx + 1) % ticketImageAttachments.length,
                            }))
                        }
                        imageCaption={
                            ticketAttachments.find((img) => img.link === ticketImageAttachments[lightboxState.idx])
                                ?.name
                        }
                        enableZoom
                    />
                )}
            </div>
        </div>
    );
}
