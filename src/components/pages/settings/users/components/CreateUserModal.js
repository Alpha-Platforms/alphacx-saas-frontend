// @ts-nocheck
import {useState, useEffect} from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import {NotificationManager} from 'react-notifications';
import {addAgent, getAgents, resetAgentCreated} from '../../../../../reduxstore/actions/agentActions';
import {countrycodes} from '../../../../shared/countrycodes';
import RSelect from "react-select";

const CreateUserModal = ({
    createModalShow,
    setCreateModalShow,
    isAgentCreated,
    groups,
    addAgent,
    getAgents,
    resetAgentCreated
}) => {
    const [modalInputs,
        setModalInputs] = useState({
        firstName: '',
        lastName: '',
        email: '',
        avater: '',
        phoneNumber: '',
        description: '',
        teams: [],
        role: 'Agent',
        ccode: '+234'
    });

    const [creatingUser, setCreatingUser] = useState(false);
    const [RSTeams, setRSTeams] = useState([])

    // F U N C T I O N S
    const loadRSTeams = () => {
        const mappedTeams = groups.map(item => {
            return {label: item.name, value: item.id}            
        })
        setRSTeams(mappedTeams)
    }

    const handleModalInput = e => {
        const {name, value} = e.target;
        setModalInputs(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleModalRSInput = (values, {name}) => {
        const selectedTeams = values.map(item => item.value)

        setModalInputs(prev => ({
            ...prev,
            [name]: selectedTeams
        }));
    }

    const handleUserCreation = () => {
        const {firstName, lastName, email, teams, role, phoneNumber} = modalInputs;

        if (!firstName || !lastName || !email || teams.length === 0  ) {
            // all field not available
            NotificationManager.error('All fields are required', 'Error');
        } else {
            setCreatingUser(true);
            // all fields are passed

            // The request function
            addAgent({firstName, lastName, email, groupIds: teams, role, phoneNumber});
        }
    }

    useEffect(() => {
        if (isAgentCreated) {
            resetAgentCreated();
            NotificationManager.success("User created successfully", 'Successful');
            getAgents();
            setModalInputs({
                firstName: '',
                lastName: '',
                email: '',
                avater: '',
                phoneNumber: '',
                description: '',
                teams: [],
                role: 'Agent'
            });
            setCreateModalShow(false);
            setCreatingUser(false);
        } else {
            setCreatingUser(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAgentCreated]);

    //create user modal
    return (
        <Modal
            show={createModalShow}
            onHide={() => setCreateModalShow(false)}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body>
                <div className="col-12 p-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className="f-16">Create User Record</h3>
                        <div>
                            {/* <button
                                type="button"
                                className="btn bg-outline-custom d-inline-block btn-sm px-5 f-12 text-at-blue-light">Import User</button> */}
                        </div>
                    </div>
                    <div>
                        <form action="">
                            <div className="d-flex flex-row w-100 justify-content-between mt-3">
                                <div className="form-group w-100 me-2">
                                    <label className="f-12" htmlFor="fullName">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        className="form-control form-control w-100"
                                        id="fullName"
                                        value={modalInputs.firstName}
                                        onChange={handleModalInput}/>

                                </div>
                                <div className="form-group w-100 ms-2">
                                    <label className="f-12" htmlFor="fullName">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control form-control w-100"
                                        id="fullName"
                                        name="lastName"
                                        value={modalInputs.lastName}
                                        onChange={handleModalInput}/>
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <label className="f-12" htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    className="form-control form-control"
                                    id="email"
                                    name="email"
                                    value={modalInputs.email}
                                    onChange={handleModalInput}/>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="workphone" className="form-label">Work Phone</label>
                                <div className="input-group mb-3 workphone-group">
                                    <div className="input-group-prepend workphone-dd-wrapper">
                                    <span><img src={`https://www.countryflags.io/${countrycodes.find(x => x.dial_code === modalInputs.ccode)?.code || ''}/flat/64.png`} alt="" /></span><select defaultValue="+234" className="d-inline mt-0" name="ccode" id="ccode" value={modalInputs.ccode} onChange={handleModalInput}>
                                            {countrycodes.sort((a, b) => Number(a.dial_code.slice(1)) - Number(b.dial_code.slice(1))).map(cc => <option value={cc.dial_code}>{cc.dial_code}</option>)}
                                        </select>
                                    </div>
                                    <input type="tel" className="form-control" name="phoneNumber" id="workphone" value={modalInputs.phoneNumber} aria-label="work phone" aria-describedby="workphone" onChange={handleModalInput}/>
                                </div>
                            </div>

                            <div className="form-group mt-3">
                                <label className="f-12" htmlFor="email">Team(s)</label>
                                <RSelect
                                    className=""
                                    isClearable={false}
                                    name="teams"
                                    isMulti
                                    placeholder="select one or more teams"
                                    // value={modalInputs.teams}
                                    onMenuOpen={() => loadRSTeams()}
                                    options={RSTeams}
                                    onChange={handleModalRSInput}
                                />
                            </div>

                            <div className="form-group mt-3">
                                <label className="f-12" htmlFor="level">Role</label>
                                <select
                                    name="role"
                                    className="form-select"
                                    onChange={handleModalInput}
                                    value={modalInputs.role}>
                                    <option value=""></option>
                                    <option value="Administrator">Administrator</option>
                                    <option value="Supervisor">Supervisor</option>
                                    <option value="Agent">Agent</option>
                                    {/* {groups.map(({name, id}) => <option value={id}>{name}</option>)} */}
                                    
                                </select>
                            </div>
                            <div className="text-end">
                                <button
                                    type="button"
                                    className="btn btn-custom float-end w-25 mt-4 mb-2"
                                    onClick={handleUserCreation}
                                    disabled={creatingUser}
                                    id="createUser">{creatingUser ? 'Creating...' : 'Create'}</button>
                            </div>
                        </form>
                    </div>

                </div>
            </Modal.Body>
        </Modal>
    )
};

const mapStateToProps = (state, ownProps) => ({isAgentCreated: state.agent.isAgentCreated, groups: state.group.groups});

export default connect(mapStateToProps, {resetAgentCreated, addAgent, getAgents})(CreateUserModal);
