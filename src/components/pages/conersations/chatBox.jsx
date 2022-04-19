/* eslint-disable */
import React from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

export default function chatBox({ onEditorStateChange, editorState }) {
    return (
        <div>
            <Editor
                editorState={editorState}
                toolbar={{
                    options: ['emoji', 'inline', 'textAlign', 'image'],

                    inline: {
                        inDropdown: false,
                        className: undefined,
                        component: undefined,
                        dropdownClassName: undefined,
                        options: ['bold', 'italic', 'underline'],
                        bold: { icon: boldB, className: undefined },
                        italic: { icon: TextItalic, className: undefined },
                        underline: { icon: TextUnderline, className: undefined },
                    },

                    image: {
                        icon: editorImg,
                        className: undefined,
                        component: undefined,
                        popupClassName: undefined,
                        urlEnabled: true,
                        uploadEnabled: true,
                        alignmentEnabled: true,
                        uploadCallback: _uploadImageCallBack,
                        previewImage: true,
                        inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                        alt: { present: false, mandatory: false },
                        defaultSize: {
                            height: '2rem',
                            width: 'auto',
                        },
                    },
                    emoji: {
                        icon: Smiley,
                    },
                    blockType: {
                        inDropdown: true,
                    },

                    list: {
                        inDropdown: true,
                    },
                    textAlign: {
                        inDropdown: false,
                        className: undefined,
                        component: undefined,
                        dropdownClassName: undefined,
                        options: ['left', 'center', 'right'],
                        left: { icon: TextAlignLeft, className: undefined },
                        center: { icon: TextAlignCenter, className: undefined },
                        right: { icon: TextAlignRight, className: undefined },
                        // justify: { icon: TextAlignCenter, className: undefined },
                    },

                    link: {
                        inDropdown: true,
                    },

                    history: {
                        inDropdown: true,
                    },
                }}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={(editor) => onEditorStateChange(editor)}
            />
        </div>
    );
}
