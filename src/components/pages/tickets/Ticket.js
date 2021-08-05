import {useState, Fragment, useEffect, useContext} from 'react';
import TicketIcon from '../../../assets/svgicons/Ticket.svg';
import WorkIcon from '../../../assets/svgicons/Work.svg';
import ProfileLightIcon from '../../../assets/svgicons/Profile-Light.svg';
import FolderIcon from '../../../assets/icons/Folder.svg';
import '../../../styles/Ticket.css';
import ScaleLoader from 'react-spinners/ScaleLoader';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import {getCurrentTicket} from '../../../reduxstore/actions/ticketActions';
import {getUserInitials} from '../../../helper';
import UserProfile from '../conersations/userProfile';
import { dateFormater } from "../../helpers/dateFormater";
import {
  StarIconTicket,
  SendMsgIcon,
  ExpandChat,
} from "../../../assets/images/svgs";
import moment from 'moment';
import { capitalize } from '@material-ui/core';
import ClipLoader from "react-spinners/ClipLoader";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import BackArrow from "../../../assets/imgF/back.png";
import editorImg from "../../../assets/imgF/editorImg.png";
import Smiley from "../../../assets/imgF/Smiley.png";
import boldB from "../../../assets/imgF/boldB.png";
import TextItalic from "../../../assets/imgF/TextItalic.png";
import TextUnderline from "../../../assets/imgF/TextUnderline.png";
import capitalizeFirstLetter from "../../helpers/capitalizeFirstLetter";
import { SocketDataContext } from "../../../context/socket";
import { NotificationManager } from 'react-notifications';
import {
  httpGetMain,
  httpPostMain,
  httpPatchMain,
} from "../../../helpers/httpMethods";


const CircleIcon = (props) => <span className="cust-grey-circle"><img src={props.icon} alt="" className="pe-none"/></span>;

const Ticket = ({isTicketLoaded, getCurrentTicket, isCurrentTicketLoaded, currentTicket}) => {

    const {id} = useParams();
    const [SenderInfo, setSenderInfo] = useState({});

    const initialState = EditorState.createWithContent(
      ContentState.createFromText("")
    );

    useEffect(() => {
        // get current ticket when component mounts
        getCurrentTicket(id);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
      if (currentTicket) {
        const {customer, subject} = currentTicket;
        setSenderInfo(currentTicket);
      }

    }, [currentTicket]);

    // console.log("current ticket from tick", currentTicket);



    /** >>>>> FROM CODE-UI-ANDY */

    const [loadSelectedMsg, setloadSelectedMsg] = useState("");
    const [tickets, setTickets] = useState([]);
    const [filterTicketsState, setFilterTicketsState] = useState([]);
    const [ticket, setTicket] = useState([]);
    const [LoadingTick, setLoadingTicks] = useState(true);
    const [loadSingleTicket, setLoadSingleTicket] = useState(false);
    // const [SenderInfo, setSenderInfo] = useState(false);
    const [singleTicketFullInfo, setTingleTicketFullInfo] = useState(false);
    const [Category, setCategory] = useState([]);
    const [editorState, setEditorState] = useState(initialState);
    const [firstTimeLoad, setfirstTimeLoad] = useState(true);
    const [MessageSenderId, setMessageSenderId] = useState("");
    const [TicketId, setTicketId] = useState("");
    const [showUserProfile, setshowUserProfile] = useState(false);
    const [ReplyTicket, setReplyTicket] = useState({
      plainText: "",
      richText: "",
    });
    const [Statues, setStatues] = useState([]);
    const [UserInfo, setUserInfo] = useState({});
    const [ChatCol, setChatCol] = useState({
      col1: "",
      col2: "",
    });
    const [openSaveTicketModal, setopenSaveTicketModal] = useState(false);
    const [filterChat, setFilterChat] = useState("system");
    const [saveTicket, setSaveTicket] = useState({
      customer: "",
      subject: "",
      description: [],
      category: "",
    });

    const [sendingReply, setsendingReply] = useState(false);
    const [msgHistory, setMsgHistory] = useState([]);
    const [wsTickets, setwsTickets] = useState([]);
    const [categoryUpdate, setCategoryUpdate] = useState("");
    const [noResponseFound, setNoResponseFound] = useState(true);
    const [TodayMsges, setTodayMsges] = useState([]);
    const [YesterdayMsges, setYesterdayMsges] = useState([]);
    const [AchiveMsges, setAchiveMsges] = useState([]);
    const [ShowAchive, setShowAchive] = useState(false);
    const [channel, setchannel] = useState("All");
    const [status, setstatus] = useState("All");


    const {
      AppSocket,
      //wsTickets,
      setWsTicketFilter,
      wsTicketFilter,
      // setMsgHistory,
      // msgHistory,
    } = useContext(SocketDataContext);


    useEffect(() => {
      AppSocket.createConnection();
      AppSocket.io.on(`ws_tickets`, (data) => {
        console.log("this are Ticketsss", data?.data?.tickets);
        setwsTickets(data?.data?.tickets);
      });
      AppSocket.io.on(`message`, (data) => {
        console.log("this are history msbsg", data);
        // console.log(UserInfo);
        let msg = {
          created_at: data.created_at,
          id: data.history.id,
          plain_response: data.history.plain_response,
          response: data.history.response,
          type: "reply",
          user: data.user,
        };
        console.log("msg>>>", msg);
  
        setMsgHistory((item) => [...item, msg]);
        // sortMsges((item) => [...item, msg]);
      });
      return () => {
        AppSocket.io.disconnect();
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const sortMsges = (msgs) => {
      console.log("msgHis", msgs);
      let Today = [];
  
      let resultToday = msgs.filter((observation) => {
        return (
          moment(observation.created_at).format("DD/MM/YYYY") ==
          moment(new Date()).format("DD/MM/YYYY")
        );
      });
      let resultYesterday = msgs.filter((observation) => {
        return (
          moment(observation.created_at).format("DD/MM/YYYY") ==
          moment().add(-1, "days").format("DD/MM/YYYY")
        );
      });
  
      let resultAchive = msgs.filter((observation) => {
        return (
          moment(observation.created_at).format("DD/MM/YYYY") !=
            moment().add(-1, "days").format("DD/MM/YYYY") &&
          moment(observation.created_at).format("DD/MM/YYYY") !=
            moment(new Date()).format("DD/MM/YYYY")
        );
      });
      setTodayMsges(resultToday);
      setYesterdayMsges(resultYesterday);
      setAchiveMsges(resultAchive);
      console.log("Today>>>", resultToday);
      console.log("Yesterdat msg ", resultYesterday);
      console.log("resultAchive msg ", resultAchive);
    };

    function createMarkup(data) {
      return { __html: data };
    }

    const onEditorStateChange = (editorState) => {
      // handleDescriptionValidation(editorState);
  
      const plainText = editorState.getCurrentContent().getPlainText();
      const richText = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      setEditorState(editorState);
      setReplyTicket({ plainText, richText });
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

    const replyTicket = async (reply, attachment) => {
      console.log(reply);
      const data = {
        // type: "note",
        response: reply.richText,
        plainResponse: reply.plainText,
        phoneNumber: singleTicketFullInfo.customer.phone_number,
        // attachment: "",
      };
      console.log(singleTicketFullInfo.customer.phone_number);
      console.log(data);
      // setsendingReply(true);
      const replyData = {
        attachment: null,
        created_at: new Date(),
        plain_response: reply.plainText,
        response: reply.richText,
        // user: SenderInfo?.customer,
        user: ticket[0]?.assignee,
      };
      console.log(replyData);
      setMsgHistory((item) => [...item, replyData]);
      const res = await httpPostMain(
        `tickets/${singleTicketFullInfo.id}/replies`,
        data
      );
      if (res?.status == "success") {
        // setsendingReply(false);
        // ReloadloadSingleMessage();
        setEditorState(initialState);
        setReplyTicket({ plainText: "", richText: "" });
      } else {
        // setLoadingTicks(false);
        setsendingReply(false);
        return NotificationManager.error(res?.er?.message, "Error", 4000);
      }
    };

    console.log("from ticket single");


    /* <<<<<< FROM CODE-UI-ANDY */

    return (
        <Fragment>
            {!isCurrentTicketLoaded
                ? <div className="single-cust-loader"><ScaleLoader loading={true} color={"#006298"}/></div>
                : !currentTicket ? <div>No Ticket Found.</div> : <div
                    style={{
                    gridTemplateColumns: "280px 1fr",
                    border: '1px solid #f1f1f1'
                }}
                    className="d-grid mb-4">
                    <div className="pt-2"><UserProfile ticket={[currentTicket]}  /></div>

                    {/* <div
                        style={{
                        borderRight: '1px solid #f1f1f1'
                    }}
                        className="bg-primary py-5 px-3 bg-white">
                        <div className="user-initials-lg">
                            <div className="user-initials blue me-auto ms-auto">{getUserInitials(`${currentTicket.customer?.firstname} ${currentTicket.customer?.lastname}`)}</div>
                            <div className="text-center mt-3">
                                <h4 className="text-capitalize">{`${currentTicket.customer?.firstname} ${currentTicket.customer?.lastname}`}</h4>
                                <p className="text-muted">Gillette Group International</p>
                            </div>
                        </div>
                        <hr className="op-1"/>
                        <div className="py-3">
                            <ul className="cust-profile-info">
                                <li>
                                    <div><CircleIcon icon={ProfileLightIcon}/></div>
                                    <div>
                                        <h6>Assignee</h6>
                                        <p className="text-muted text-capitalize">{`${currentTicket.assignee.firstname} ${currentTicket.assignee.lastname}`}</p>
                                    </div>
                                </li>
                                <li>
                                    <div><CircleIcon icon={TicketIcon}/></div>
                                    <div>
                                        <h6>ID</h6>
                                        <p className="text-muted">{id?.slice(-8).toUpperCase()}</p>
                                    </div>
                                </li>
                                <li>
                                    <div><CircleIcon icon={WorkIcon}/></div>
                                    <div>
                                        <h6>Priority</h6>
                                        <p className="text-muted">{currentTicket.priority?.name}</p>
                                    </div>
                                </li>
                                <li>
                                    <div><CircleIcon icon={FolderIcon}/></div>
                                    <div>
                                        <h6>Stage</h6>
                                        <p className="text-muted">{currentTicket.status?.status}</p>
                                    </div>
                                </li>
                            </ul>

                        </div>

                        <hr className="op-1"/>

                        <div className="text-center mt-4">

                        </div>
                    </div> */}

                    <div
                        style={{
                        overflowX: "hidden"
                    }}
                        className="bg-secondary py-3 pt-0 bg-white">

                        Conversation Part






                        

                    </div>

                </div>}

        </Fragment>
    )
}

const mapStateToProps = (state, ownProps) => ({tickets: state.ticket.tickets, isTicketLoaded: state.ticket.isTicketLoaded, isCurrentTicketLoaded: state.ticket.isCurrentTicketLoaded, currentTicket: state.ticket.currentTicket});

export default connect(mapStateToProps, {getCurrentTicket})(Ticket);