/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/react-in-jsx-scope */
// @ts-nocheck
import { useState, useRef } from 'react';
// import {Modal} from 'react-bootstrap';
import { Modal } from 'react-responsive-modal';
import { css } from '@emotion/css';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import RSelect from 'react-select';
import SimpleReactValidator from 'simple-react-validator';
import { textCapitalize, brandKit } from '../../../../../helper';
import { addAgent, getAgents, resetAgentCreated } from '../../../../../reduxstore/actions/agentActions';
import { countrycodes } from '../../../../shared/countrycodes';
// import { Validate } from '../../../../../helpers/validateInput';
import { getSubscription } from '../../../../../reduxstore/actions/subscriptionAction';

// eslint-disable-next-line no-shadow
function CreateUserModal({ createModalShow, setCreateModalShow, groups, addAgent, getSubscription }) {
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
    const [, forceUpdate] = useState(false);

    const simpleValidator = useRef(
        new SimpleReactValidator({
            element: (message) => <div className="formErrorMsg">{message}</div>,
            // autoForceUpdate: true,
        }),
    );

    // F U N C T I O N S
    const loadRSTeams = () => {
        const mappedTeams = groups.map((item) => {
            return { label: textCapitalize(item.name), value: item.id };
        });
        setRSTeams(mappedTeams);
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

        if (!simpleValidator.current.allValid()) {
            // show all errors if exist
            simpleValidator.current.showMessages();
            return forceUpdate((prev) => !prev);
        }

        setCreatingUser(true);

        const body = { firstName, lastName, email, groupIds: teams, role, phoneNumber };

        // The request function
        return addAgent(
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
                getSubscription();
            },
            (err) => {
                setCreatingUser(false);
                NotificationManager.error(`${err}`, 'Error', 4000);
            },
        );
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

    const showValidateMessageFor = (type) => {
        if (type) {
            simpleValidator.current.showMessageFor(type);
            forceUpdate((prev) => !prev);
        }
    };

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
            <div className="col-12 p-4 pb-5 mb-3">
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
                                    First Name <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="form-control form-control w-100"
                                    id="fullName"
                                    value={modalInputs.firstName}
                                    onChange={handleModalInput}
                                    onBlur={() => showValidateMessageFor('First name')}
                                />
                                {
                                    /* simple validation */
                                    simpleValidator.current.message('First name', modalInputs.firstName, 'required')
                                }
                            </div>
                            <div className="form-group w-100 ms-2">
                                <label className="f-12" htmlFor="fullName">
                                    Last Name <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-control w-100"
                                    id="fullName"
                                    name="lastName"
                                    value={modalInputs.lastName}
                                    onChange={handleModalInput}
                                    onBlur={() => showValidateMessageFor('Last name')}
                                />
                                {
                                    /* simple validation */
                                    simpleValidator.current.message('Last name', modalInputs.lastName, 'required')
                                }
                            </div>
                        </div>
                        <div className="form-group mt-3">
                            <label className="f-12" htmlFor="email">
                                Email Address <span className="text-danger">*</span>
                            </label>
                            <input
                                type="email"
                                className="form-control form-control"
                                id="email"
                                name="email"
                                value={modalInputs.email}
                                onChange={handleModalInput}
                                onBlur={() => showValidateMessageFor('Email')}
                            />
                            {
                                /* simple validation */
                                simpleValidator.current.message('Email', modalInputs.email, 'required|email')
                            }
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
                                            .map((cc, index) => (
                                                <option value={cc.dial_code} key={index}>
                                                    {cc.dial_code}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <input
                                    type="tel"
                                    className="form-control"
                                    name="phoneNumber"
                                    id="workphone"
                                    value={modalInputs.phoneNumber}
                                    aria-label="work phone"
                                    ariaDescribedby="workphone"
                                    onChange={handleModalInput}
                                    onBlur={() => showValidateMessageFor('Work phone')}
                                />
                                {
                                    /* simple validation */
                                    simpleValidator.current.message('Work phone', modalInputs.phoneNumber, 'phone')
                                }
                            </div>
                        </div>

                        <div className="form-group mt-3">
                            <label className="f-12" htmlFor="email">
                                Team(s) <span className="text-danger">*</span>
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
                            {
                                /* simple validation */
                                simpleValidator.current.message(
                                    'Team(s)',
                                    modalInputs.teams.length === 0 ? '' : 'has_value',
                                    'required',
                                )
                            }
                        </div>

                        <div className="form-group mt-3">
                            <label className="f-12" htmlFor="level">
                                Role <span className="text-danger">*</span>
                            </label>
                            <select
                                name="role"
                                className="form-select"
                                onChange={handleModalInput}
                                value={modalInputs.role}
                                id="level"
                            >
                                <option value="Administrator">Administrator</option>
                                <option value="Supervisor">Supervisor</option>
                                <option value="Agent">Agent</option>
                                <option value="Observer">Observer</option>
                                {/* {groups.map(({name, id}) => <option value={id}>{name}</option>)} */}
                            </select>
                            {
                                /* simple validation */
                                simpleValidator.current.message('Role', modalInputs.role, 'required')
                            }
                        </div>
                        <div className="text-end">
                            <button
                                type="button"
                                className={`btn float-end w-25 mt-4 mb-4 ${css({
                                    ...brandKit({ bgCol: 0 }),
                                    color: 'white',
                                    '&:hover': { ...brandKit({ bgCol: 30 }), color: 'white' },
                                })}`}
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

const mapStateToProps = (state) => ({
    isAgentCreated: state.agent.isAgentCreated,
    groups: state.group.groups,
});

export default connect(mapStateToProps, { resetAgentCreated, addAgent, getAgents, getSubscription })(CreateUserModal);
