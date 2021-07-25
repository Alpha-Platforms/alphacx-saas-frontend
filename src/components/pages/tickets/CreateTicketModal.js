import {useState, useEffect} from 'react';
import {Modal} from 'react-bootstrap';
import PinIcon from '../../../assets/icons/pin.svg';
import {connect} from 'react-redux';
import {addTicket, resetTicketCreated} from '../../../reduxstore/actions/ticketActions';
import { NotificationManager } from 'react-notifications';
import {getPaginatedTickets} from '../../../reduxstore/actions/ticketActions';

const CreateTicketModal = ({
    createModalShow,
    setCreateModalShow,
    categories,
    priorities,
    statuses,
    agents,
    groups,
    addTicket,
    userId,
    isTicketCreated,
    getPaginatedTickets,
    resetTicketCreated
}) => {
    const [selectedTags,
        setSelectedTags] = useState([]);

    const [modalInputs,
        setModalInputs] = useState({
        customer: '',
        category: '',
        priority: '',
        status: '',
        subject: '',
        description: '',
        assignee: '',
        group: ''
    });
    // const [cancelExec, setCancelExec] = useState(false);

    const handleModalInput = e => {
        // get name and curent value of component
        const {name, value} = e.target;
        // set state of inputs in the modal
        setModalInputs(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    function handleTagSelection() {
        const {tag} = this;
        if (selectedTags.includes(tag)) {
            setSelectedTags(prevState => prevState.filter(x => x !== tag));
        } else {
            setSelectedTags(prevState => [
                ...prevState,
                tag
            ]);
        }
    }

    const handleTicketCreation = e => {
        e.preventDefault();
        const {
            customer,
            category,
            priority,
            status,
            subject,
            description,
            assignee,
            group
        } = modalInputs;
        if (!customer || !category || !priority || !status || !subject || !description || !assignee || !group) {
            console.log("All field is required");
        } else {
            console.log("good to go");
            addTicket({
                priorityId: priority,
                assigneeId: assignee,
                description,
                plainDescription: description,
                categoryId: category,
                userId,
                groupId: group,
                statusId: status,
                subject,
                tags: selectedTags
            })
        }
    }

    

    useEffect(() => {
        if (isTicketCreated) {
            resetTicketCreated();
            NotificationManager.success("Successful", 'Ticket created successfully')
            setCreateModalShow(false);
            getPaginatedTickets(5, 1);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isTicketCreated])

    return (
        <Modal
            show={createModalShow}
            onHide={() => setCreateModalShow(false)}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            size="lg">
            <Modal.Body>
                <div className="col-12 p-4 pb-2">
                    <h5 className="mb-3">Create Ticket</h5>
                    <form className="needs-validation mb-5" onSubmit={handleTicketCreation}>
                        <div className="row">
                            <div className="col-6 mt-2 position-relative">
                                <label htmlFor="customer" className="form-label">Customer</label>
                                <input
                                    type="text"
                                    name="customer"
                                    className="form-control"
                                    onChange={handleModalInput}/>
                                <span className="text-at-blue-light f-12 d-inline-block w-100 text-end">Add Customer</span>
                            </div>

                            <div className="col-6 mt-2">
                                <label htmlFor="category" className="form-label">Category</label>
                                <select
                                    className="form-select"
                                    name="category"
                                    aria-label="Category select"
                                    onChange={handleModalInput}>
                                    <option value=""></option>
                                    {categories && categories.map(({id, name}) => <option value={id}>{name}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-6 mt-2 position-relative">
                                <label htmlFor="priority" className="form-label">Priority</label>
                                <select
                                    className="form-select"
                                    name="priority"
                                    aria-label="Priority select"
                                    onChange={handleModalInput}>
                                    <option value=""></option>
                                    {priorities && priorities.map(({id, name}) => <option value={id}>{name}</option>)}
                                </select>
                            </div>

                            <div className="col-6 mt-2">
                                <label htmlFor="status" className="form-label">Status</label>
                                <select
                                    className="form-select"
                                    name="status"
                                    aria-label="Status select"
                                    onChange={handleModalInput}>
                                    <option value=""></option>
                                    {statuses && statuses.map(({id, status}) => <option value={id}>{status}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="row g-3 ">
                            <div className="col-12 mt-3">
                                <label htmlFor="subject" className="form-label">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    className="form-control"
                                    onChange={handleModalInput}/>
                            </div>

                            <div className="col-12 mt-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea
                                    name="description"
                                    id="description"
                                    className="form-control ct-description"
                                    onChange={handleModalInput}></textarea>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-6 mt-3">
                                <label htmlFor="assignee" className="form-label">Assignee</label>
                                <select
                                    className="form-select"
                                    name="assignee"
                                    aria-label="Category select"
                                    onChange={handleModalInput}>
                                    <option value=""></option>
                                    {agents && agents.map(({id, firstname, lastname}) => <option value={id}>{`${firstname} ${lastname}`}</option>)}
                                </select>
                            </div>
                            <div className="col-6 mt-3">
                                <label htmlFor="priority" className="form-label">Group</label>
                                <select
                                    className="form-select"
                                    name="group"
                                    aria-label="Category select"
                                    onChange={handleModalInput}>
                                    <option value=""></option>
                                    {groups && groups.map(({id, name}) => <option value={id}>{name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div>
                            <div className="col-12 mt-3">
                                <label htmlFor="title" className="form-label">Tags</label>
                                <div className="border rounded-2 p-3 py-2">
                                    <label className="text-muted d-block f-12 op-6">Select Tag</label>
                                    <div className="mt-1">
                                        {/* create tag button */}
                                        {[
                                            'Customer Data',
                                            'Active',
                                            'Billing',
                                            'Important',
                                            'Gillete Group',
                                            'Oil & Gas',
                                            'Enquiry',
                                            'Pharmaceuticals',
                                            'Telecommunications',
                                            'Technology'
                                        ].map((x, idx) => <span
                                            key={idx}
                                            className={`badge rounded-pill ${selectedTags.includes(x)
                                            ? 'acx-bg-blue-light-30-bg-25'
                                            : 'acx-bg-blue-light-30'} px-3 py-2 my-1 me-1`}
                                            onClick={handleTagSelection.bind({tag: x})}
                                            style={{
                                            cursor: 'pointer'
                                        }}>{x}&nbsp; ×</span>)}
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 mt-3">
                                <label htmlFor="title" className="form-label">Attachment (If Any)</label>
                                <div
                                    id="ticket-ath-box"
                                    className="border border-1 d-block text-center f-14 p-3"><img src={PinIcon} alt=""/>
                                    <span className="text-at-blue-light">Add file</span>&nbsp;
                                    <span>or drag file here</span>
                                </div>
                            </div>

                        </div>

                        <div className="mt-3 mt-sm-3 pt-3 text-end">
                            <button type="submit" className="btn btn-sm bg-at-blue-light  py-1 px-4">Add Ticket</button>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    )
}
const mapStateToProps = (state, ownProps) => ({
    priorities: state.priority.priorities,
    categories: state.category.categories,
    statuses: state.status.statuses,
    agents: state.agent.agents,
    groups: state.group.groups,
    userId: state.userAuth.user.id,
    isTicketCreated: state.ticket.isTicketCreated
})

export default connect(mapStateToProps, {addTicket, getPaginatedTickets, resetTicketCreated})(CreateTicketModal);
