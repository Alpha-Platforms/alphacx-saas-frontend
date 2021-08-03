import React, { useState } from "react";
import RightArrow from "../../../../../assets/imgF/arrow_right.png";
import EmptyArticle from "../../../../../assets/images/empty_article.png";
import "./newArticle.scss";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import AddCategory from "../../../../../assets/imgF/addCategory.png";
import boldB from "../../../../../assets/imgF/boldB.png";
import Smiley from "../../../../../assets/imgF/Smiley.png";
import editorImg from "../../../../../assets/imgF/editorImg.png";
import TextItalic from "../../../../../assets/imgF/TextItalic.png";
import TextUnderline from "../../../../../assets/imgF/TextUnderline.png";
import TextAlignLeft from "../../../../../assets/imgF/TextAlignLeft.png";
import TextAlignCenter from "../../../../../assets/imgF/TextAlignCenter.png";
import TextAlignRight from "../../../../../assets/imgF/TextAlignRight.png";
import { useEffect } from "react";
import { httpGetMain, httpPostMain } from "../../../../../helpers/httpMethods";
import { NotificationManager } from "react-notifications";

// 67796966-e0c2-44db-b184-cc4a7e19bee0
const NewArticle = () => {
  const initialState = EditorState.createWithContent(
    ContentState.createFromText("")
  );

  const [compState, setCompState] = useState({
    showCategories: false,
    showTags: false,
  });

  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
    richText: "",
    category: [],
    tag: [],
    publishGlobal: false,
    publishEnglish: false,
  });
  const [categories, setCategories] = useState([]);

  const [editorState, setEditorState] = useState(initialState);

  const addCategory = (value) => {
    let newCategory = [...newPost.category, value];
    setNewPost({ ...newPost, category: newCategory });
    setCompState({ ...compState, showCategories: false });
    setCategories(categories.filter((item) => item.id !== value.id));
  };
  const removeCategory = (value) => {
    setNewPost({
      ...newPost,
      category: newPost.category.filter((item) => item.id !== value.id),
    });
    setCategories([...categories, value]);
  };

  const onEditorStateChange = (editorState) => {
    // handleDescriptionValidation(editorState);

    const plainText = editorState.getCurrentContent().getPlainText();
    const richText = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setEditorState(editorState);
    setNewPost({ ...newPost, richText });
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

  //   function that fetches all available categories
  //    that can be added to an article
  const fetchCategories = async () => {
    const res = await httpGetMain("articles/categories");
    if (res?.status == "success") {
      console.clear();
      console.log("categories", res?.data);
      let categories = res?.data;
      setCategories(categories);
    } else {
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };

  const handleSubmitNewArticle = async () => {
    const data = {
      title: newPost.title,
      body: newPost.richText,
      folderId: "67796966-e0c2-44db-b184-cc4a7e19bee0",
    };
    console.log("article", data);

    const res = await httpPostMain("articles", data);
    if (res?.status == "success") {
      console.clear();
      console.log("sent", res);
    } else {
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
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
                    value={newPost.title}
                    onChange={(e) =>
                      setNewPost({ ...newPost, title: e.target.value })
                    }
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
                        onClick={handleSubmitNewArticle}
                      >
                        <span>Save</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="category mb-4">
                  <p>Category</p>
                  <div className="category-holder">
                    {newPost?.category.map((cat, i) => (
                      <div key={i} className="cat">
                        <p>{cat.name}</p>
                        <span onClick={() => removeCategory(cat)}>x</span>
                      </div>
                    ))}
                    <img
                      src={AddCategory}
                      className="add-icon"
                      alt=""
                      onClick={() => {
                        setCompState({
                          ...compState,
                          showCategories: !compState?.showCategories,
                        });
                      }}
                    />

                    {/* drop list to show all categories to select from ,, */}

                    {compState.showCategories && (
                      <div className={"drop-list"}>
                        {categories?.map((item, i) => (
                          <p key={i} onClick={() => addCategory(item)}>
                            {item.name}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="category mb-4">
                  <p>Tag</p>
                  <div className="category-holder">
                    {/* {newPost.category.map((cat, i) => (
                      <div key={i} className="cat">
                        <p>{cat}</p>
                        <span>x</span>
                      </div>
                    ))} */}
                    <img src={AddCategory} className="add-icon" alt="" />
                  </div>
                </div>

                <div className="toogles">
                  <div className="toogle mb-4">
                    <p>Published globally</p>
                    <button
                      className={newPost.publishGlobal ? "active" : ""}
                      onClick={() =>
                        setNewPost({
                          ...newPost,
                          publishGlobal: !newPost.publishGlobal,
                        })
                      }
                    >
                      <div className="ball"></div>
                    </button>
                  </div>
                  <div className="toogle">
                    <p>Published in English</p>
                    <button
                      className={newPost.publishEnglish ? "active" : ""}
                      onClick={() =>
                        setNewPost({
                          ...newPost,
                          publishEnglish: !newPost.publishEnglish,
                        })
                      }
                    >
                      <div className="ball"></div>
                    </button>
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
