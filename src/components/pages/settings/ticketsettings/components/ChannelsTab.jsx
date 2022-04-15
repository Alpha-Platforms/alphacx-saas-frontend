/* eslint-disable */
import React, { useState, useEffect } from 'react';
//
import { connect } from 'react-redux';
//
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//
import { ReactComponent as EditGreySvg } from '../../../../../assets/icons/Edit-grey.svg';
import { ReactComponent as HamburgerSvg } from '../../../../../assets/icons/hamburger.svg';
import { ReactComponent as DeleteGreySvg } from '../../../../../assets/icons/Delete-grey.svg';
//
import { getChannels, updateChannel, addChannel } from '../../../../../reduxstore/actions/channelActions';
import AddChannelModal from './AddChannelModal';

function ChannelsTab({ channels, isChannelsLoaded, getChannels, updateChannel, addChannel }) {
    const [addModalShow, setAddModalShow] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editInfo, setEditInfo] = useState(null);
    const [modalChannel, setModalChannel] = useState({
        id: '',
        name: '',
    });
    //
    const [newChannels, addNewChannels] = useState(channels);
    //
    useEffect(() => {
        getChannels();
    }, []);
    //
    const openAddChannel = () => {
        setIsEditing(false);
        setAddModalShow(true);
    };

    function openEditStage(name, id) {
        setEditInfo({ name, id });
        setModalChannel({ name, id });
        setIsEditing(true);
        setAddModalShow(true);
    }

    return (
        <div className="my-3 mt-4">
            <Row className="">
                <Col md={9} sm={12} lg={8} className="mb-4 mt-4">
                    <div className="">
                        <label htmlFor="ticket-channels" className="form-label d-inline-block">
                            Channels:
                        </label>
                    </div>
                    <div className="text-center ">
                        <div className="fieldsWrapper pb-3" id="ticketFieldWrapper">
                            {channels &&
                                channels.map(({ name, status, id }, idx) => (
                                    <div key={idx} className="fieldParent d-flex my-2">
                                        {/* <button
                                    type="button"
                                    className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                                    <HamburgerSvg />
                                </button> */}
                                        <div className="d-flex flex-grow-1 align-items-center justify-content-between">
                                            <span className="text-capitalize">
                                                {name.trim().replace(/^\w/, (c) => c.toUpperCase())}
                                            </span>
                                        </div>
                                        {/* <div className="d-flex align-items-center justify-content-between me-5">
                                    <span>{status}</span>
                                </div> */}
                                        <div className="d-flex">
                                            <button
                                                type="button"
                                                onClick={() => openEditStage(name, id)}
                                                className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0"
                                            >
                                                <EditGreySvg />
                                            </button>
                                            {/* <button
                                        type="button"
                                        className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0">
                                        <DeleteGreySvg />
                                    </button> */}
                                        </div>
                                    </div>
                                ))}
                        </div>

                        <div className="text-start mt-2">
                            {/* <button
                                className="btn btn-link text-decoration-none text-at-blue-light" disabled={true} onClick={openAddChannel}>+ Add Stage</button> */}
                            <button
                                className="btn btn-link text-decoration-none btn-sm border"
                                disabled={false}
                                onClick={openAddChannel}
                            >
                                + Add Channel
                            </button>
                        </div>
                    </div>
                </Col>
            </Row>

            <AddChannelModal
                createModalShow={addModalShow}
                setCreateModalShow={setAddModalShow}
                isEditing={isEditing}
                editInfo={editInfo}
                setChannels={addNewChannels}
                modalChannel={modalChannel}
                setModalChannel={setModalChannel}
            />
        </div>
    );
}

const mapStateToProps = (state, ownProps) => ({
    channels: state.channel.channels,
    isChannelsLoaded: state.channel.isChannelsLoaded,
});

export default connect(mapStateToProps, { getChannels, updateChannel, addChannel })(ChannelsTab);
