import React, { useState } from "react";
import RightArrow from "../../../../../assets/imgF/arrow_right.png";
import EmptyArticle from "../../../../../assets/images/empty_article.png";
import "./newArticle.scss";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import AddCategory from "../../../../../assets/imgF/addCategory.png";
import boldB from "../../../../../assets/imgF/boldB.png";
import insertLink from "../../../../../assets/imgF/insertLink.png"
import Smiley from "../../../../../assets/imgF/Smiley.png";
import editorImg from "../../../../../assets/imgF/editorImg.png";
import TextItalic from "../../../../../assets/imgF/TextItalic.png";
import TextUnderline from "../../../../../assets/imgF/TextUnderline.png";
import TextAlignLeft from "../../../../../assets/imgF/TextAlignLeft.png";
import TextAlignCenter from "../../../../../assets/imgF/TextAlignCenter.png";
import TextAlignRight from "../../../../../assets/imgF/TextAlignRight.png";
import { useEffect } from "react";
import {
  httpGetMain,
  httpPatchMain,
  httpPostMain,
} from "../../../../../helpers/httpMethods";
import { NotificationManager } from "react-notifications";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import ScaleLoader from "react-spinners/ScaleLoader";
import axios from 'axios';

// 67796966-e0c2-44db-b184-cc4a7e19bee0
const NewArticle = () => {
  let { articleId } = useParams();

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
    categoryId: "",
    folderId: "",
    tag: [],
    publishGlobal: false,
    publishEnglish: false,
  });
  const [policyLoading, setPolicyLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [folders, setFolders] = useState([]);
  const [editorState, setEditorState] = useState(initialState);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handlePublish = () => {
    const { publishGlobal } = newPost;
    Swal.fire({
      title: publishGlobal ? "Unpublish?" : "Publish?",
      text: `Do you want to ${
        publishGlobal ? "unpublish" : "publish"
      } Article on Save?`,
      showCancelButton: true,
      confirmButtonColor: "#006298",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Publish");
        setNewPost({ ...newPost, publishGlobal: !publishGlobal });
      } else {
        console.log("Do nothing");
      }
    });
  };

  // const addCategory = (value) => {
  //   let newCategory = [...newPost.category, value];
  //   setNewPost({ ...newPost, category: newCategory });
  //   setCompState({ ...compState, showCategories: false });
  //   setCategories(categories.filter((item) => item.id !== value.id));
  // };
  // const removeCategory = (value) => {
  //   setNewPost({
  //     ...newPost,
  //     category: newPost.category.filter((item) => item.id !== value.id),
  //   });
  //   setCategories([...categories, value]);
  // };

  const onEditorStateChange = (editorState) => {
    // handleDescriptionValidation(editorState);

    const plainText = editorState.getCurrentContent().getPlainText();
    const richText = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setEditorState(editorState);
    setNewPost({ ...newPost, richText });
    // setReplyTicket({ plainText, richText });
    // console.log(">>>>", richText, plainText);
    console.log(richText);
  };
  const _uploadImageCallBack = (file) => {
    console.log('upload image callback')
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
    return new Promise(async (resolve, reject) => {
        const data = new FormData();
        data.append('file', imageObject.file);
        data.append('upload_preset', 'i5bn3icr');
        data.append('cloud_name', 'alphacx-co');
        try {
          const res = await axios.post(`https://api.cloudinary.com/v1_1/alphacx-co/image/upload`, data)
          resolve({ data: {link: res.data?.url }});
        } catch(err) {
          console.log(err);
          NotificationManager.error("Photo could not be uploaded", "Error");
          reject('Photo not uploaded');
        }
      // resolve({ data: { link: imageObject.localSrc } });
    });
  };

  //   function that fetches all available categories
  //    that can be added to an article
  const fetchCategories = async () => {
    const res = await httpGetMain("articles/categories");
    if (res?.status == "success") {
      let categories = res?.data;
      setCategories(categories);
    } else {
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };

  // function to get folders from selected category
  const getFolders = () => {
    setNewPost({ ...newPost, folderId: "" });
    if (newPost.categoryId === "") {
      setFolders([]);

      return;
    }
    let selectedCategory = categories.filter(
      (item) => item.id === newPost?.categoryId
    );
    let folderId = selectedCategory[0]?.folders[0]?.id;
    setNewPost({ ...newPost, folderId });
    setFolders(selectedCategory[0]?.folders);
  };

  const publishPost = async (id) => {
    const res = await httpPatchMain(`articles/${id}/publish`);
    setPolicyLoading(false);
    if (res?.status == "success") {
      console.log("res", res);
      NotificationManager.success(res.message, "Success", 5000);

      window.location.href = `/settings/knowledge-base`;
    } else {
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };

  // function to fetch article details if in edit mode
  const fetchArticleDetails = async (categories) => {
    setPolicyLoading(true);
    const res = await httpGetMain(`article/${articleId}`);
    if (res?.status == "success") {
      let { title, body, folders } = res?.data;
      console.clear();
      // get category id
      // let folder = folders[0];
      // let categoryId;

      // for (var i = 0; i < categories.length; i++) {
      //   for (var j = 0; j < categories[i].folders.length; j++) {
      //     console.log("[" + i + "]" + "[" + j + "]");
      //     if (categories[i].folders[j].id == folder.id) {
      //       categoryId = categories[i].id;
      //       console.log("found");
      //       break;
      //     }
      //   }
      // }

      setNewPost({
        ...newPost,
        title,
        richText: body,
        folderId: folders[0]?.id,
        categoryId: folders[0]?.category?.id
      });

      // convert rich text to plain text in editor
      const blocksFromHTML = convertFromHTML(body);
      const initialState = EditorState.createWithContent(
        ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        )
      );

      setEditorState(initialState);
      setPolicyLoading(false);
    } else {
      setPolicyLoading(false);
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };

  // function to submut new article
  const handleSubmitNewArticle = async () => {
    setPolicyLoading(true);
    const data = {
      title: newPost.title,
      body: newPost.richText,
      folderId: newPost.folderId,
    };
    console.clear();
    console.log("article", data);

    const res = await httpPostMain("articles", data);

    if (res?.status == "success") {
      console.log("res", res);
      if (newPost?.publishGlobal) {
        publishPost(res?.data?.id);
      }
      setPolicyLoading(false);
      NotificationManager.success(res.message, "Success", 4000);

      window.location.href = `/settings/knowledge-base`;
    } else {
      setPolicyLoading(false);
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };

  console.log('NEW POST => ', newPost);

  // function to edit/patch existing articles
  const handlePatchArticle = async () => {
    setPolicyLoading(true);
    const data = {
      title: newPost.title,
      body: newPost.richText,
      // categoryId: newPost.categoryId,
      folderId: newPost.folderId
    };
    console.log('Data for patch => ', data);
    // return
    console.clear();

    const res = await httpPatchMain(`articles/${articleId}`, data);

    if (res?.status == "success") {
      setPolicyLoading(false);
      NotificationManager.success(res.message, "Success", 4000);

      window.location.href = `/settings/knowledge-base`;
    } else {
      setPolicyLoading(false);
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };

  useEffect(() => {
    fetchCategories();
    if (!articleId) {
    } else {
      fetchArticleDetails(categories);
    }
  }, []);

  useEffect(() => {
    getFolders();
  }, [newPost?.categoryId]);

  return (
    <div className=" settings-email help-center-settings">
      {policyLoading && (
        <div
          className={`cust-table-loader ${
            policyLoading && "add-loader-opacity"
          }`}
        >
          <ScaleLoader loading={policyLoading} color={"#006298"} />
        </div>
      )}
      <div className="card card-body bg-white border-0 p-5 mt-4">
        <div id="mainContentHeader">
          <h6 className="text-muted f-14">
            <Link to="/settings">
              <span className="text-custom">Settings</span>
            </Link>{" "}
            <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
            {/* <object data="../assets/alphatickets/icons/right-arrow.svg"
                            className="img-fluid mx-2 me-3"></object> */}
            <Link to="/settings/knowledge-base">
              <span className="text-custom">Knowledge Base</span>
            </Link>
            <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
            <span>Article</span>
          </h6>
        </div>
        <div className="d-flex justify-content-between flex-row">
          <h5 className="mt-3 mb-4 fs-6 fw-bold">Knowledge Base Settings</h5>
        </div>

        <div className="new-article">
          <div className="main-content col-md-8">
            <div className="articleTitle form-group mb-4">
              <input
                type="search"
                className="form-control form-control-sm f-12 search-bar px-5 d-block"
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
                    "blockType",
                    "emoji",
                    "inline",
                    "link",

                    // "list",
                    "textAlign",
                    // "colorPicker",
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
                    options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
                    className: undefined,
                    component: undefined,
                    dropdownClassName: "artblocktype-dropdown",
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
                    inDropdown: false,
                    className: "art-link",
                    component: undefined,
                    popupClassName: "art-link-popup",
                    dropdownClassName: undefined,
                    showOpenOptionOnHover: true,
                    defaultTargetOption: '_self',
                    options: ['link'],
                    link: { icon: insertLink, className: undefined },
                    unlink: { className: "unlink-icon" },
                    linkCallback: undefined
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
          </div>
          <div className="side-content col-md-4">
            <div className="mb-5 top">
              {/* <Link
                to="/settings/knowledge-base/article"
                className="btn btn-sm f-12 bg-outline-custom cancel px-4 w-50"
              >
                <p>Preview</p>
              </Link> */}
              <button
                className="btn btn-sm ms-2 f-12 bg-custom px-4 w-45"
                onClick={
                  articleId ? handlePatchArticle : handleSubmitNewArticle
                }
                disabled={
                  (newPost.title === "" || newPost.richText === "",
                  newPost.folderId === "")
                }
              >
                Save Changes
              </button>
            </div>

            <div className="category mb-4">
              <p>Category</p>
              <select
                className="form-select form-select-sm f-14"
                name="categoryId"
                value={newPost?.categoryId || ""}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {/* <div className="category-holder">
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



                {compState.showCategories && (
                  <div className={"drop-list"}>
                    {categories?.map((item, i) => (
                      <p key={i} onClick={() => addCategory(item)}>
                        {item.name}
                      </p>
                    ))}
                  </div>
                )}
              </div> */}
            </div>
            {/* <div className="category mb-4">
              <p>Sub Category</p>
              <select
                className="form-select form-select-sm f-14"
                name="folderId"
                value={newPost?.folderId || ""}
                onChange={handleChange}
              >
                <option value="">Select Sub-category</option>
                {newPost.categoryId !== "" &&
                  folders?.map((fol) => (
                    <option key={fol.id} value={fol.id}>
                      {fol.name}
                    </option>
                  ))}
              </select>
            </div> */}
            

            <div className="toogles">
              {!articleId && (
                <div className="toogle mb-4">
                  <p>Published globally</p>
                  <button
                    className={newPost.publishGlobal ? "active" : ""}
                    onClick={handlePublish}
                  >
                    <div className="ball"></div>
                  </button>
                </div>
              )}
              {/* <div className="toogle">
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
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArticle;
