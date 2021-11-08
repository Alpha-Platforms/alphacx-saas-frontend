import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import AddCategory from "../../assets/imgF/addCategory.png";
import boldB from "../../assets/imgF/boldB.png";
import Smiley from "../../assets/imgF/Smiley.png";
import editorImg from "../../assets/imgF/editorImg.png";
import TextItalic from "../../assets/imgF/TextItalic.png";
import TextUnderline from "../../assets/imgF/TextUnderline.png";
import TextAlignLeft from "../../assets/imgF/TextAlignLeft.png";
import TextAlignCenter from "../../assets/imgF/TextAlignCenter.png";
import TextAlignRight from "../../assets/imgF/TextAlignRight.png";
import "./EditorBox.scss";

const EditorBox = ({
  placeholder,
  text,
  textParent,
  updateText,
  textFormat,
  setPlaceholder,
  updateVal,
  editorClassName
}) => {
  const initialState = EditorState.createWithContent(
    ContentState.createFromText(text)
  );
  const [editorState, setEditorState] = useState(initialState);

  const onEditorStateChange = (editorState) => {
    // handleDescriptionValidation(editorState);

    const plainText = editorState.getCurrentContent().getPlainText();
    const richText = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setEditorState(editorState);
    if (textParent) {
      updateText({
        ...textParent,
        text: textFormat === "plain" ? plainText : richText,
      });
    } else {
      updateText(textFormat === "plain" ? plainText : richText);
    }
    // setNewPost({ ...newPost, richText });
    // setReplyTicket({ plainText, richText });
    // console.log(">>>>", richText, plainText);
  };
  const _uploadImageCallBack = (file) => {
    // long story short, every time we upload an image, we
    // need to save it to the state so we can get it's data
    // later when we decide what to do with it.

    // Make sure you have a uploadImages: [] as your default state
    let uploadedImages = [];

    const imageObject = {
      file: file,
      localSrc: URL.createObjectURL(file),
    };

    uploadedImages.push(imageObject);
    console.log(imageObject);

    //this.setState(uploadedImages: uploadedImages)

    // We need to return a promise with the image src
    // the img src we will use here will be what's needed
    // to preview it in the browser. This will be different than what
    // we will see in the index.md file we generate.
    return new Promise((resolve, reject) => {
      resolve({ data: { link: imageObject.localSrc } });
    });
  };

  useEffect(() => {
    const initialState = EditorState.createWithContent(
      ContentState.createFromText(text)
    );
    setEditorState(initialState);
    if (placeholder) {
      setPlaceholder("");
    }
  }, [placeholder, updateVal]);
  return (
    <div id={editorClassName} className={editorClassName ? `${editorClassName}-container editor-Container` : "editor-Container"}>
      <Editor
        editorState={editorState}
        toolbar={{
          options: [
            "emoji",
            "inline",
            // "blockType",

            // "list",
            "textAlign",
            // "colorPicker",
            // "link",
            // "embedded",
            "image",
          ],
          // inline: {
          //   inDropdown: false,
          //   icon: boldB,
          //   options: ["bold", "underline", "italic"],
          // },

          inline: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ["bold", "italic", "underline"],
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
            alignmentEnabled: true,
            uploadCallback: _uploadImageCallBack,
            previewImage: true,
            inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
            alt: { present: false, mandatory: false },
            defaultSize: {
              height: "auto",
              width: "auto",
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
            options: ["left", "center", "right"],
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
        editorClassName={editorClassName ? editorClassName : "editorClassName"}
        onEditorStateChange={(editor) => onEditorStateChange(editor)}
      />
    </div>
  );
};

export default EditorBox;
