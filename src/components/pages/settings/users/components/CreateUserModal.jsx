/* eslint-disable */
// @ts-nocheck
import { useState, useEffect } from 'react';
// import {Modal} from 'react-bootstrap';
import { Modal } from 'react-responsive-modal';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import RSelect from 'react-select';
import { textCapitalize } from 'helper';
import { addAgent, getAgents, resetAgentCreated } from '../../../../../reduxstore/actions/agentActions';
import { countrycodes } from '../../../../shared/countrycodes';
import { Validate } from '../../../../../helpers/validateInput';

function CreateUserModal({
    createModalShow,
    setCreateModalShow,
    isAgentCreated,
    groups,
    addAgent,
    getAgents,
    resetAgentCreated,
}) {
    const [modalInputs, setModalInputs] = useState({
        firstName: '',
        lastName: '',
        email: '',
        avater: '',
        phoneNumber: '',
        description: '',
        teams: [],
        role: 'Agent',
        ccode: '+234',
    });

    const [creatingUser, setCreatingUser] = useState(false);
    const [RSTeams, setRSTeams] = useState([]);

    useEffect(() => {
        console.clear();
    }, [modalInputs]);

    // F U N C T I O N S
    const loadRSTeams = () => {
        const mappedTeams = groups.map((item) => {
            return { label: textCapitalize(item.name), value: item.id };
        });
        setRSTeams(mappedTeams);
    };

    // ONBLUR VALIDATION
    const handleBlur = (e) => {
        if (e.target.name === 'email') {
            Validate.email(e, modalInputs, setModalInputs);
        } else if (e.target.name === 'password') {
            Validate.password(e, modalInputs, setModalInputs);
        } else if (e.target.name === 'firstName' || e.target.name === 'lastName') {
            Validate.length(e, modalInputs, setModalInputs);
        } else if (e.target.name === 'phoneNumber') {
            Validate.ngPhone(e, modalInputs, setModalInputs);
        }
    };

    const handleModalInput = (e) => {
        const { name, value } = e.target;
        setModalInputs((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleModalRSInput = (values, { name }) => {
        const selectedTeams = values.map((item) => item.value);

        setModalInputs((prev) => ({
            ...prev,
            [name]: selectedTeams,
        }));
    };

    const handleUserCreation = () => {
        const { firstName, lastName, email, teams, role, phoneNumber } = modalInputs;

        if (!firstName || !lastName || !email || teams.length === 0) {
            // all field not available
            NotificationManager.error('All fields are required', 'Error');
        } else {
            setCreatingUser(true);

            const body = { firstName, lastName, email, groupIds: teams, role, phoneNumber };

            // The request function
            addAgent(
                body,
                () => {
                    setModalInputs({
                        firstName: '',
                        lastName: '',
                        email: '',
                        avater: '',
                        phoneNumber: '',
                        description: '',
                        teams: [],
                        role: 'Agent',
                    });
                    setCreateModalShow(false);
                    setCreatingUser(false);
                    NotificationManager.success(`${body?.role} created successfully`, 'Success', 4000);
                },
                (err) => {
                    setCreatingUser(false);
                    NotificationManager.error(`${err}`, 'Error', 4000);
                },
            );
        }
    };
    /* 
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
    }, [isAgentCreated]); */

    // create user modal
    return (
        <Modal
            // show={createModalShow}
            // onHide={() => setCreateModalShow(false)}
            open={createModalShow}
            onClose={() => setCreateModalShow(false)}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {/* <Modal.Body> */}
            <div className="col-12 p-4 pb-5 mb-3 border">
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
                                <label className="f-12" htmlFor="fullName">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="form-control form-control w-100"
                                    id="fullName"
                                    value={modalInputs.firstName}
                                    onChange={handleModalInput}
                                    onBlur={(e) => handleBlur(e)}
                                />
                            </div>
                            <div className="form-group w-100 ms-2">
                                <label className="f-12" htmlFor="fullName">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-control w-100"
                                    id="fullName"
                                    name="lastName"
                                    value={modalInputs.lastName}
                                    onChange={handleModalInput}
                                    onBlur={(e) => handleBlur(e)}
                                />
                            </div>
                        </div>
                        <div className="form-group mt-3">
                            <label className="f-12" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                type="email"
                                className="form-control form-control"
                                id="email"
                                name="email"
                                value={modalInputs.email}
                                onChange={handleModalInput}
                                onBlur={(e) => handleBlur(e)}
                            />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="workphone" className="form-label">
                                Work Phone
                            </label>
                            <div className="input-group mb-3 workphone-group">
                                <div className="input-group-prepend workphone-dd-wrapper">
                                    <span>
                                        <img
                                            src={`https://www.countryflags.io/${
                                                countrycodes.find((x) => x.dial_code === modalInputs.ccode)?.code || ''
                                            }/flat/64.png`}
                                            alt=""
                                        />
                                    </span>
                                    <select
                                        defaultValue="+234"
                                        className="d-inline mt-0"
                                        name="ccode"
                                        id="ccode"
                                        value={modalInputs.ccode}
                                        onChange={handleModalInput}
                                    >
                                        {countrycodes
                                            .sort((a, b) => Number(a.dial_code.slice(1)) - Number(b.dial_code.slice(1)))
                                            .map((cc) => (
                                                <option value={cc.dial_code}>{cc.dial_code}</option>
                                            ))}
                                    </select>
                                </div>
                                <input
                                    type="tel"
                                    className="form-control"
                                    name="phoneNumber"
                                    id="workphone"
                                    value={modalInputs.phoneNumber}
                                    ariaLabel="work phone"
                                    ariaDescribedby="workphone"
                                    onChange={handleModalInput}
                                    onBlur={(e) => handleBlur(e)}
                                />
                            </div>
                        </div>

                        <div className="form-group mt-3">
                            <label className="f-12" htmlFor="email">
                                Team(s)
                            </label>
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
                            <label className="f-12" htmlFor="level">
                                Role
                            </label>
                            <select
                                name="role"
                                className="form-select"
                                onChange={handleModalInput}
                                value={modalInputs.role}
                            >
                                <option value="" />
                                <option value="Administrator">Administrator</option>
                                <option value="Supervisor">Supervisor</option>
                                <option value="Agent">Agent</option>
                                <option value="Observer">Observer</option>
                                {/* {groups.map(({name, id}) => <option value={id}>{name}</option>)} */}
                            </select>
                        </div>
                        <div className="text-end">
                            <button
                                type="button"
                                className="btn btn-custom float-end w-25 mt-4 mb-4"
                                onClick={handleUserCreation}
                                disabled={creatingUser}
                                id="createUser"
                            >
                                {creatingUser ? 'Creating...' : 'Create'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {/* </Modal.Body> */}
        </Modal>
    );
}

const mapStateToProps = (state, ownProps) => ({
    isAgentCreated: state.agent.isAgentCreated,
    groups: state.group.groups,
});

export default connect(mapStateToProps, { resetAgentCreated, addAgent, getAgents })(CreateUserModal);
