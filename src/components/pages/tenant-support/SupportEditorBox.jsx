// @ts-nocheck
import React, { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import draftToHtml from 'draftjs-to-html';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import LinkImg from '../../../assets/imgF/insertLink.png';
import TextUnderline from '../../../assets/imgF/TextUnderline.png';
import TextItalic from '../../../assets/imgF/TextItalic.png';
import boldB from '../../../assets/imgF/boldB.png';
import Smiley from '../../../assets/imgF/Smiley.png';
import editorImg from '../../../assets/imgF/editorImg.png';
import BackArrow from '../../../assets/imgF/back.png';
import { SendMsgIcon } from '../../../assets/images/svgs';
import { multiIncludes } from '../../../helper';
import { accessControlFunctions } from '../../../config/accessControlList';

function SupportEditorBox() {
    const initialState = EditorState.createWithContent(ContentState.createFromText(''));
    const [editorState, setEditorState] = useState(initialState);
    const [replyTicket, setReplyTicket] = useState({
        plainText: '',
        richText: '',
    });
    const [replyType, setReplyType] = useState('reply');
    const [editorUploadImg, setEditorUploadImg] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [sendingReply] = useState(false);

    const user = useSelector((state) => state.userAuth?.user);
    console.log('user from store => ', user);

    const onEditorStateChange = (newEditorState) => {
        const plainText = newEditorState.getCurrentContent().getPlainText();
        const richText = draftToHtml(convertToRaw(newEditorState.getCurrentContent()));
        setEditorState(newEditorState);
        setReplyTicket({ plainText, richText });
    };

    const uploadImageCallBack = (file) => {
        // long story short, every time we upload an image, we
        // need to save it to the state so we can get it's data
        // later when we decide what to do with it.

        // Make sure you have a uploadImages: [] as your default state
        const uploadedImages = [];

        const imageObject = {
            file,
            localSrc: URL.createObjectURL(file),
        };

        uploadedImages.push(imageObject);

        // this.setState(uploadedImages: uploadedImages)
        // We need to return a promise with the image src
        // the img src we will use here will be what's needed
        // to preview it in the browser. This will be different than what
        // we will see in the index.md file we generate.
        return new Promise((resolve) => {
            const data = new FormData();

            data.append('file', file);
            data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
            data.append('cloud_name', process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
            axios
                .post(`${process.env.REACT_APP_CLOUDINARY_BASE_URL}/image/upload`, data)
                .then(async (res) => {
                    imageObject.src = res.data?.url;
                    setEditorUploadImg(replyTicket.plainText + editorUploadImg + (res.data?.url || ''));
                    setAttachments((prev) => [...prev, res.data?.url]);
                    resolve({ data: { link: res.data?.url } });
                })
                .catch(() => {
                    NotificationManager.error('Photo could not be uploaded', 'Error');
                });
        });
    };

    const handleSendMessage = () => console.log('attempting reply');

    return (
        <div className="support-editor-box">
            <div className="conversationCommentBox">
                <div className="single-chat-ckeditor position-relative">
                    <div className="showBackArrowOnMobile">
                        <img src={BackArrow} alt="" />
                    </div>
                    <Editor
                        // disabled={ticket[0].status.status === 'Closed'}
                        // readOnly={ticket[0].status.status === 'Closed'}
                        editorState={editorState}
                        toolbar={{
                            // options: ['emoji', 'inline', 'image', 'link'],
                            options: ['emoji', 'inline', 'link'],

                            inline: {
                                inDropdown: false,
                                className: undefined,
                                component: undefined,
                                dropdownClassName: undefined,
                                options: ['bold', 'italic', 'underline'],
                                bold: { icon: boldB, className: undefined },
                                italic: { icon: TextItalic, className: undefined },
                                underline: {
                                    icon: TextUnderline,
                                    className: undefined,
                                },
                            },

                            image: {
                                icon: editorImg,
                                className: undefined,
                                component: undefined,
                                popupClassName: undefined,
                                urlEnabled: true,
                                uploadEnabled: true,
                                alignmentEnabled: 'LEFT',
                                uploadCallback: uploadImageCallBack,
                                previewImage: true,
                                inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                                alt: { present: false, mandatory: false },
                                defaultSize: {
                                    height: 'auto',
                                    width: '300px',
                                },
                            },
                            emoji: {
                                icon: Smiley,
                            },
                            link: {
                                inDropdown: false,
                                showOpenOptionOnHover: true,
                                defaultTargetOption: '_blank',
                                options: ['link', 'unlink'],
                                link: { icon: LinkImg, className: undefined },
                                unlink: { className: undefined },
                            },
                            blockType: {
                                inDropdown: true,
                            },

                            list: {
                                inDropdown: true,
                            },

                            history: {
                                inDropdown: true,
                            },
                        }}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="support-editor-wrapper"
                        editorClassName="support-editor"
                        onEditorStateChange={(editor) => onEditorStateChange(editor)}
                    />

                    <div className="sendMsg">
                        <button type="button" disabled={sendingReply} onClick={() => handleSendMessage()}>
                            <SendMsgIcon /> Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SupportEditorBox;
