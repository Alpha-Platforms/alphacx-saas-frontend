import {useState} from 'react';
import {ReactComponent as HamburgerSvg} from '../../../../../assets/icons/hamburger.svg';
// import {ReactComponent as FormMinusSvg} from '../../../../../assets/icons/form-minus.svg';
import {ReactComponent as DeleteGreySvg} from '../../../../../assets/icons/Delete-grey.svg';
import {ReactComponent as EditGreySvg} from '../../../../../assets/icons/Edit-grey.svg';
import {connect} from 'react-redux';
import AddStatusModal from './AddStatusModal';

const TicketStatusTab = ({statuses}) => {

    const gtcCol = ({gridTemplateColumns: "210px 1fr"});
    const [addModalShow, setAddModalShow] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editInfo, setEditInfo] = useState(null);

    const openAddStage = () => {
        setAddModalShow(true)
        isEditing && setIsEditing(false);
    }

    function openEditStage() {
        const {id, status} = this;
        setEditInfo({id, status});
        setIsEditing(true);
        setAddModalShow(true);

    }

    return (
        <div className="my-3 mt-4">
            <div className="w-75">
                <div style={gtcCol} className="mb-4 mt-4 d-grid align-items-start">
                    <div>
                        <label htmlFor="ticket-supplt" className="form-label d-inline-block">Ticket Stage:</label>
                    </div>
                    <div>
                        <div>
                            <div className="text-center ">
                                <div className="fieldsWrapper pb-3" id="ticketFieldWrapper">

                                    {statuses && statuses.map(({status, id}, idx) => <div key={idx} className="fieldParent d-flex my-2">
                                        {/* <button
                                            type="button"
                                            className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                                            <HamburgerSvg />
                                        </button> */}
                                        <div className="w-100 d-flex align-items-center justify-content-between">
                                            <span>{status}</span>
                                            <span></span>
                                        </div>
                                        <div className="d-flex">
                                            <button
                                                type="button"
                                                onClick={openEditStage.bind({status, id})}
                                                className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0">
                                                <EditGreySvg />
                                            </button>
                                            {/* <button
                                                type="button"
                                                className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0">
                                                <DeleteGreySvg />
                                            </button> */}
                                        </div>
                                    </div>)}

                                </div>

                                <div className="text-start mt-2">
                                    <button
                                        className="btn btn-link text-decoration-none text-at-blue-light" disabled={true} onClick={openAddStage}>+ Add Stage</button>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <AddStatusModal createModalShow={addModalShow} setCreateModalShow={setAddModalShow} isEditing={isEditing} editInfo={editInfo} />
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    statuses: state.status.statuses
});

export default connect(mapStateToProps, null)(TicketStatusTab);
