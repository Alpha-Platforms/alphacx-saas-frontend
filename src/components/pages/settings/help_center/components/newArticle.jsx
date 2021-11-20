// @ts-nocheck
import React, { useState, Fragment } from "react";
import RightArrow from "../../../../../assets/imgF/arrow_right.png";
import EmptyArticle from "../../../../../assets/images/empty_article.png";
import "./newArticle.scss";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
  Modifier
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
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
import {allowedFiles, getAcceptValue, allowDocs} from '../../../../../helper';
import {config} from '../../../../../config/keys';

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
  const [catState, setCatState] = useState({
    loading: true,
    shouldRender: false
  });
  const [folders, setFolders] = useState([]);
  const [editorState, setEditorState] = useState(initialState);
  const [flInfo, setFlInfo] = useState({title: '', link: '', newWindow: false});

  // File upload state
  const [uploadInfo, setUploadInfo] = useState({
    blob: null,
    msg: 'Add doc file here',
    error: false,
    image: null,
    ownAvatar: '',
    uploadedFileLink: '',
    uploadedFileName: ''
});

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
        setNewPost({ ...newPost, publishGlobal: !publishGlobal });
      } else {
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

  const CustomOption = props => {

    const addText = () => {

      let { contentBlocks, entityMap } = htmlToDraft(`<a href='${flInfo.link}' target="${flInfo.newWindow ? '_blank' : '_self'}">${flInfo.title}</a>`);

      // const {editorState, onChange} = props;
      const contentState = Modifier.replaceWithFragment(editorState.getCurrentContent(), editorState.getSelection(), ContentState.createFromBlockArray(contentBlocks, entityMap).getBlockMap());
      const newEditorState = EditorState.push(editorState, contentState, 'insert-fragment');
      setEditorState(EditorState.forceSelection(newEditorState, contentState.getSelectionAfter()));
    }

    return (
        <div onClick={addText} id="addTextComponent" className="d-none">ACX</div>
    )
}


  const onEditorStateChange = (editorState) => {
    // handleDescriptionValidation(editorState);

    const plainText = editorState.getCurrentContent().getPlainText();
    const richText = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setEditorState(editorState);
    setNewPost({ ...newPost, richText });
    // setReplyTicket({ plainText, richText });
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

    //this.setState(uploadedImages: uploadedImages)

    // We need to return a promise with the image src
    // the img src we will use here will be what's needed
    // to preview it in the browser. This will be different than what
    // we will see in the index.md file we generate.
    return new Promise(async (resolve, reject) => {
        const data = new FormData();
        data.append('file', imageObject.file);
        data.append('upload_preset', config.cloudinaryUploadPreset);
        data.append('cloud_name', config.cloudinaryCloudName);
        try {
          const res = await axios.post(`${config.cloudinaryBaseUrl}/image/upload`, data)
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
      if (!categories || categories?.length === 0) {
        setCatState(prev => ({
          ...prev,
          loading: false,
          shouldRender: false
        }));
      } else {
        setCatState(prev => ({
          ...prev,
          loading: false,
          shouldRender: true
        }));
      }
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

      setNewPost({
        ...newPost,
        title,
        richText: body,
        folderId: folders[0]?.id,
        categoryId: folders[0]?.category?.id
      });

      // convert rich text to plain text in editor
      // const blocksFromHTML = convertFromHTML(body);
      const blocksFromHTML = htmlToDraft(body);
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

    const res = await httpPostMain("articles", data);

    if (res?.status == "success") {
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

  // function to edit/patch existing articles
  const handlePatchArticle = async () => {
    setPolicyLoading(true);
    const data = {
      title: newPost.title,
      body: newPost.richText,
      // categoryId: newPost.categoryId,
      folderId: newPost.folderId
    };
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

  const embedCallbackFunc = () => {
  }

  const handleFileSelect = function (e) {
    // store current input
    const fileInput = e.target

    if (!fileInput.files.length) {
        // No file is selected
        setUploadInfo(prev => ({...prev, msg: 'No file is selected', error: true, blob: null, image: null, ownAvatar: '', uploadedFileName: '', uploadedFileLink: ''}));
        
    } else {
        
        if (fileInput.files[0].type.indexOf("image/") !== -1) {
            // Selected file is an image
            setUploadInfo(prev => ({...prev, msg: 'Add doc file here', error: true, blob: null, image: null, ownAvatar: '', uploadedFileName: '', uploadedFileLink: ''}));
            
        } else if (allowDocs.types.includes(fileInput.files[0].type)) {
            // selected file is a doc
            if (fileInput.files[0].size > allowDocs.maxSize) {
                setUploadInfo(prev => ({...prev, msg: `File exceeds maximum upload size of ${allowDocs.maxSize}`, error: true, blob: null, image: null, ownAvatar: '',  uploadedFileName: '', uploadedFileLink: ''}));
            } else {
                const fileName = fileInput.files[0].name;
                const fileBlob = URL.createObjectURL(fileInput.files[0]);

                setUploadInfo(prev => ({...prev, blob: fileBlob, msg: fileName, error: false, image: fileInput.files[0], ownAvatar: '',  uploadedFileName: '', uploadedFileLink: ''}));
            }
        } else {
            setUploadInfo(prev => ({...prev, msg: 'Selected file is not an image or document', error: true, blob: null, image: null, ownAvatar: '',  uploadedFileName: '', uploadedFileLink: ''}));
        }
    }
}

  const handleFileUpload = () => {
    const fileInput = window.document.querySelector('#doc-file-upload-input');
    if (fileInput) {
      if (fileInput.files[0]) {
        const uploadBtn = window.document.querySelector('.link-file-upload-btn');
        if (uploadBtn) {
          uploadBtn.textContent = 'Uploading...';
          uploadBtn.disabled = true;
        }
        const data = new FormData();
          data.append('file', fileInput.files[0]);
          data.append('upload_preset', config.cloudinaryUploadPreset);
          data.append('cloud_name', config.cloudinaryCloudName);
          axios
              .post(`${config.cloudinaryBaseUrl}/${allowedFiles.types.slice(0,3).includes(uploadInfo.image?.type) ?  'image' : 'raw'}/upload`, data)
              .then(async res => {

                  // add res
                  
                  if (uploadBtn) {
                    uploadBtn.textContent = 'Upload';
                    uploadBtn.disabled = false;
                  }

                  const uploadLabel = window.document.querySelector('#doc-upload-container > label');
                  if (uploadLabel) {
                    uploadLabel.textContent = 'Add doc file here';
                    window.document.querySelector('#doc-upload-container > button')?.classList.add('d-none');
                  } 

                  const linkPopup = window.document.querySelector('.kb-art-link.rdw-link-wrapper > div:nth-child(2)');
                  const fileName = fileInput.files[0]?.name;

                  linkPopup.innerHTML = `
                  <div>
                    <div class="form-group mb-3">
                      <label for="fl-link-title">Link Title</label>
                      <input type="text" class="form-control" id="fl-link-title" value="${fileName}" placeholder="Enter link title">
                    </div>
                    <div class="form-check mb-3">
                      <input type="checkbox" class="form-check-input" id="fl-new-window">
                      <label class="form-check-label" for="fl-new-window">Open link in new window</label>
                    </div>
                    <button type="button" id="fl-add-btn" class="btn btn-primary">Add</button>
                    <button type="button" id="fl-cancel-btn" class="btn btn-light">Cancel</button>
                  </div>
                  `;

                  window.document.querySelector("#fl-add-btn")?.addEventListener('click', () => {
                    const linkTitle = window.document.querySelector('#fl-link-title');
                    const newWindow = window.document.querySelector('#fl-new-window');


                    setFlInfo(prev => ({
                      ...prev,
                      title: linkTitle?.value || fileName,
                      link: res?.data?.secure_url,
                      newWindow: newWindow?.checked
                    }));

                    window.document.querySelector('#addTextComponent')?.click();

                  });
                  window.document.querySelector("#fl-cancel-btn")?.addEventListener('click', () => {
                    window.document.querySelector(".kb-art-link > .rdw-option-wrapper")?.click();
                  });
              })
              .catch(err => {
                  console.log(err);
                  NotificationManager.error("File could not be uploaded", "Error");
                  if (uploadBtn) {
                    uploadBtn.textContent = 'Upload';
                    uploadBtn.disabled = false;
                  }
              });
      }
    }
  }

useEffect(() => {
  const uploadLabel = window.document.querySelector('#doc-upload-container > label');
  if (uploadLabel) {
    uploadLabel.textContent = uploadInfo.msg;
  }
  if (uploadInfo.image) {
    window.document.querySelector('#doc-upload-container > button')?.classList.remove('d-none');
  } else {
    window.document.querySelector('#doc-upload-container > button')?.classList.add('d-none');
  }

}, [uploadInfo]);

  useEffect(() => {
    const linkBtn = window.document.querySelector('.kb-art-link.rdw-link-wrapper > div:nth-child(1)');
  
    linkBtn.addEventListener('click', () => {
      setTimeout(() => {
        const linkPopup = window.document.querySelector('.kb-art-link.rdw-link-wrapper > div:nth-child(2)');
        // const linkPopupLastLabel = window.document.querySelector('.kb-art-link.rdw-link-wrapper > div:nth-child(2) > label:last-of-type');

        if (linkPopup) {
          const uploadContainer = window.document.createElement('div');
          const label = window.document.createElement('label');
          const input = window.document.createElement('input');
          const btn = window.document.createElement('button');

          uploadContainer.setAttribute('id', 'doc-upload-container')
          
          label.setAttribute('for', 'doc-file-upload-input');
          input.setAttribute('type', 'file');
          input.setAttribute('name', 'doc-file-upload-input');
          input.setAttribute('id', 'doc-file-upload-input');
          input.setAttribute('accept', getAcceptValue(allowDocs.ext, allowDocs.types));
          label.append(window.document.createTextNode('Add doc file here'));
          btn.append(window.document.createTextNode('Upload'));
          btn.setAttribute('class', 'link-file-upload-btn bg-at-blue-light bg-white px-3 py-1 mt-1 d-block d-none');

          input.addEventListener('change', handleFileSelect)
          btn.addEventListener('click', handleFileUpload);

          uploadContainer.appendChild(label);
          uploadContainer.appendChild(input);
          uploadContainer.append(btn);


          linkPopup.insertBefore(uploadContainer, linkPopup.childNodes[4]);
        }
      }, 200)

    })

  }, [])

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
            <div id="editorContainer" className="editorContainer">
              <Editor
                editorState={editorState}
                toolbar={{
                  options: [
                    "blockType",
                    "emoji",
                    "inline",
                    "link",
                    "image",

                    // "list",
                    "textAlign",
                    // "colorPicker",
                    // "embedded",
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
                    // inputAccept: "image/gif,imag e/jpeg,image/jpg,image/png,image/svg",
                    inputAccept: getAcceptValue(allowedFiles.ext, allowedFiles.types),
                    alt: { present: true, mandatory: true },
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
                  embedded: {
                    // icon: embedded,
                    className: undefined,
                    component: undefined,
                    popupClassName: undefined,
                    embedCallback: embedCallbackFunc,
                    defaultSize: {
                      height: 'auto',
                      width: 'auto',
                    },
                  },

                  link: {
                    inDropdown: false,
                    className: "kb-art-link",
                    component: undefined,
                    popupClassName: "art-link-popup",
                    dropdownClassName: undefined,
                    showOpenOptionOnHover: true,
                    defaultTargetOption: '_self',
                    options: ['link'],
                    link: { icon: insertLink, className: undefined },
                    unlink: { className: "unlink-icon" }
                  },
                  history: {
                    inDropdown: true,
                  },
                }}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName automation-editor kb-editor"
                placeholder={"Start typing..."}
                onEditorStateChange={(editor) => onEditorStateChange(editor)}
                toolbarCustomButtons={[<CustomOption />]}
              />
            </div>
          </div>
          <div className="side-content col-md-4">
            {catState.loading ? <div>Loading...</div> : !catState.shouldRender ? <div>There is no article category available yet. Go to <Link to="/settings/knowledge-base/categories">Article Categories</Link> page to create one.</div>
             : <Fragment>
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
            </Fragment>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArticle;
