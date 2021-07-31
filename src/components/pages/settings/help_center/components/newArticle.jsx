import React, { useState } from "react";
import RightArrow from "../../../../../assets/imgF/arrow_right.png";
import EmptyArticle from "../../../../../assets/images/empty_article.png";
import "./newArticle.scss";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";

import boldB from "../../../../../assets/imgF/boldB.png";
import Smiley from "../../../../../assets/imgF/Smiley.png";
import editorImg from "../../../../../assets/imgF/editorImg.png";
import TextItalic from "../../../../../assets/imgF/TextItalic.png";
import TextUnderline from "../../../../../assets/imgF/TextUnderline.png";
import TextAlignLeft from "../../../../../assets/imgF/TextAlignLeft.png";
import TextAlignCenter from "../../../../../assets/imgF/TextAlignCenter.png";
import TextAlignRight from "../../../../../assets/imgF/TextAlignRight.png";

const NewArticle = () => {
  const initialState = EditorState.createWithContent(
    ContentState.createFromText("")
  );

  const [newPost, setNewPost] = useState({
    category: ["Data", "big", "get started"],
    tag: ["Data", "big", "get started"],
  });
  const [editorState, setEditorState] = useState(initialState);
  const onEditorStateChange = (editorState) => {
    // handleDescriptionValidation(editorState);

    const plainText = editorState.getCurrentContent().getPlainText();
    const richText = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setEditorState(editorState);
    // setReplyTicket({ plainText, richText });
    console.log(">>>>", richText, richText);
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
  return (
    <div id="mainContent" class="container settings-email help-center">
      <main class="mb-5">
        <div id="mainContent" class="container">
          <div class="card card-body bg-white border-0 p-5 mt-4">
            <div id="mainContentHeader">
              <h6 class="text-muted f-14">
                Settings{" "}
                <img src={RightArrow} alt="" class="img-fluid mx-2 me-3" />
                <span class="text-custom">Help Center</span>
              </h6>
            </div>
            <div class="d-flex justify-content-between flex-row">
              <h5 class="mt-3 mb-4 fs-6 fw-bold">Help Center Settings</h5>
            </div>

            <div className="new-article">
              <div className="main-content">
                <div className="articleTitle form-group mb-4">
                  <input
                    type="search"
                    class="form-control form-control-sm f-12 search-bar px-5 d-block"
                    placeholder="Enter article title ..."
                  />
                </div>
                <div className="editorContainer">
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
                        inputAccept:
                          "image/gif,image/jpeg,image/jpg,image/png,image/svg",
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
                    editorClassName="editorClassName"
                    onEditorStateChange={(editor) =>
                      onEditorStateChange(editor)
                    }
                  />
                </div>
              </div>
              <div className="side-content">
                <div className="action_btns">
                  <div>
                    <a
                      class="btn btn-primary btn-sm preview ms-2"
                      href="/settings/help-center/article"
                    >
                      <span>Preview</span>
                    </a>
                  </div>
                  <div className="action_btns">
                    <div>
                      <a
                        class="btn btn-primary btn-sm ms-2"
                        href="/settings/help-center/article"
                      >
                        <span>Save</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="category mb-4">
                  <p>Category</p>
                  <div className="category-holder">
                    {/* {newPost.category ? (
                      <div className="cat">
                        jjjj
                        <p>{"cat"}</p>
                      </div>
                    ) : null} */}
                    {newPost.category.map((cat, i) => (
                      <div key={i} className="cat">
                        <p>{cat}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="category">
                  <p>Tag</p>
                  <div className="category-holder">
                    {/* {newPost.category ? (
                      <div className="cat">
                        jjjj
                        <p>{"cat"}</p>
                      </div>
                    ) : null} */}
                    {newPost.category.map((cat, i) => (
                      <div key={i} className="cat">
                        <p>{cat}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewArticle;
