/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disabled */
// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Calendar from 'react-calendar';
import dayjs from 'dayjs';
import { ReactComponent as SearchIcon } from '../../../../assets/icons/search.svg';
import { ReactComponent as TicketCalender } from '../../../../assets/icons/Ticketcalendar.svg';
import { getSearchedCustomers } from '../../tickets/CreateTicketModal';
import 'react-calendar/dist/Calendar.css';
import { uuid } from '../../../../helper';
import { getAgents } from '../../../../reduxstore/actions/agentActions';

const options = ['Channel', 'Contact', 'Status', 'Personnel', 'Interval', 'Search', 'Category', 'Priority', 'Rating'];

const colors = ['#FF4D35', '#0796F7', '#00BB2D', '#3D642D', '#CB2821', '#ED760E', '#A03472', '#C2B078', '#781F19'];

const handleFilter = (id, color, setFilters, label, value) => {
    setFilters((prev) => {
        // check if a filter with the same label and id exists in the filter array (excluding label check for interval filter);
        if (prev.find((item) => (id === 'Interval' ? true : item.label === label) && item?.id === id)) {
            // check an item in the filter array has current filter label
            return prev.map((item) => {
                if (item?.label === label && item?.id === id) {
                    // return new stuff
                    return { ...item, id, color, label, value, uuid: uuid() };
                }
                return item;
            });
        }
        return [...prev, { id, color, label, value, uuid: uuid() }];
    });
};

function DropdownChannel({ id, color, setFilters }) {
    return (
        <div className="filter-dropdown-channel">
            <ul>
                <li onClick={() => handleFilter(id, color, setFilters, 'Helpdesk', `helpdesk`)}>Helpdesk</li>
                <li onClick={() => handleFilter(id, color, setFilters, 'Live Chat', `livechat`)}>Live Chat</li>
                <li onClick={() => handleFilter(id, color, setFilters, 'Email', `email`)}>Email</li>
                <li onClick={() => handleFilter(id, color, setFilters, 'WhatsApp', `whatsapp`)}>WhatsApp</li>
                <li onClick={() => handleFilter(id, color, setFilters, 'Facebook', `facebook`)}>Facebook</li>
            </ul>
        </div>
    );
}

function DropdownStatus({ id, color, setFilters }) {
    const status = useSelector((state) => state.status);

    return (
        <div className="filter-dropdown-status">
            <ul>
                {status.isStatusesLoaded &&
                    status.statuses?.map((item) => (
                        <li
                            key={item?.id}
                            onClick={() => handleFilter(id, color, setFilters, item?.status, `${item?.id}`)}
                        >
                            {item?.status}
                        </li>
                    ))}
            </ul>
        </div>
    );
}

function DropdownContact({ id, color, setFilters }) {
    const [searchInput, setSearchInput] = useState('');
    const [customerLoading, setCustomerLoading] = useState(false);
    const [customers, setCustomers] = useState(null);

    useEffect(() => {
        if (searchInput) {
            (async () => {
                setCustomerLoading(true);
                const custs = await getSearchedCustomers(searchInput);
                setCustomerLoading(false);
                setCustomers(custs?.slice(0, 9));
            })();
        }
    }, [searchInput]);

    return (
        <div className="filter-dropdown-contact">
            <div>
                <span>
                    <SearchIcon />
                </span>
                <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
            </div>
            {customerLoading && <span className="fdc-loading">Loading...</span>}
            {customers &&
                (customers?.length === 0 ? (
                    !customerLoading && <div>No contact found</div>
                ) : (
                    <ul>
                        {customers.map((item) => (
                            <li
                                key={item?.value}
                                onClick={() => handleFilter(id, color, setFilters, item?.label, `${item?.value}`)}
                            >
                                {item?.label}
                            </li>
                        ))}
                    </ul>
                ))}
        </div>
    );
}

function DropdownInterval({ id, color, setFilters }) {
    const [startActive, setStartActive] = useState(true);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [activate, setActivate] = useState(false);

    useEffect(() => {
        if (activate) {
            handleFilter(
                id,
                color,
                setFilters,
                `${dayjs(startDate).format('DD MMMM')} - ${dayjs(endDate).format('DD MMMM')}`,
                `start_date=${dayjs(startDate).format('MM-DD-YYYY')}&end_date=${dayjs(endDate).format('MM-DD-YYYY')}`,
            );
        }
    }, [startDate, endDate, activate]);

    return (
        <div className="filter-dropdown-interval">
            <div>
                <span
                    onClick={() => (!activate && setActivate(true)) || setStartActive(true)}
                    className={startActive ? 'active' : ''}
                >
                    <i>
                        <TicketCalender />
                    </i>{' '}
                    {dayjs(startDate).format('DD MMMM')}
                </span>
                <span
                    onClick={() => (!activate && setActivate(true)) || setStartActive(false)}
                    className={!startActive ? 'active' : ''}
                >
                    <i>
                        <TicketCalender />
                    </i>{' '}
                    {dayjs(endDate).format('DD MMMM')}
                </span>
            </div>
            <div>
                {startActive ? (
                    <Calendar
                        onChange={(val) => (!activate && setActivate(true)) || setStartDate(val)}
                        value={startDate}
                    />
                ) : (
                    <Calendar onChange={(val) => (!activate && setActivate(true)) || setEndDate(val)} value={endDate} />
                )}
            </div>
        </div>
    );
}

function DropdownPersonnel({ id, color, setFilters }) {
    const [searchInput, setSearchInput] = useState('');
    const [personnels, setPersonnels] = useState('');
    // const [personnelLoading, setPersonnelLoading] = useState(false);
    // get all agents from the redux
    const agent = useSelector((state) => state.agent);

    useEffect(() => {
        if (searchInput || searchInput === '') {
            if (Array.isArray(agent?.agents)) {
                const regex = new RegExp(`${searchInput}`, 'gi');
                const searchedAgents = agent?.agents
                    ?.filter(
                        (item) => regex.test(item?.firstname) || regex.test(item?.lastname) || regex.test(item?.email),
                    )
                    .slice(0, 9);
                setPersonnels(searchedAgents);
            }
        }
    }, [searchInput]);

    return (
        <div className="filter-dropdown-personnel">
            <div>
                <span>
                    <SearchIcon />
                </span>
                <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
            </div>
            {personnels &&
                (personnels?.length === 0 ? (
                    <div>No personnel found</div>
                ) : (
                    <ul>
                        {personnels.map((item) => (
                            <li
                                key={item?.id}
                                onClick={() =>
                                    handleFilter(
                                        id,
                                        color,
                                        setFilters,
                                        `${item?.firstname} ${item?.lastname}`,
                                        `${item?.id}`,
                                    )
                                }
                            >{`${item?.firstname} ${item?.lastname}`}</li>
                        ))}
                    </ul>
                ))}
        </div>
    );
}

function DropdownCategory({ id, color, setFilters }) {
    const [searchInput, setSearchInput] = useState('');
    const [categories, setCategories] = useState('');
    // const [categoryLoading, setCategoryLoading] = useState(false);
    // get all agents from the redux
    const category = useSelector((state) => state.category);

    useEffect(() => {
        if (searchInput || searchInput === '') {
            if (Array.isArray(category?.categories)) {
                const regex = new RegExp(`${searchInput}`, 'gi');
                const searchedAgents = category?.categories?.filter((item) => regex.test(item?.name)).slice(0, 9);
                setCategories(searchedAgents);
            }
        }
    }, [searchInput]);

    return (
        <div className="filter-dropdown-category">
            <div>
                <span>
                    <SearchIcon />
                </span>
                <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
            </div>
            {categories &&
                (categories?.length === 0 ? (
                    <div>No category found</div>
                ) : (
                    <ul>
                        {categories.map((item) => (
                            <li
                                key={item?.id}
                                onClick={() => handleFilter(id, color, setFilters, `${item?.name}`, `${item?.id}`)}
                            >{`${item?.name}`}</li>
                        ))}
                    </ul>
                ))}
        </div>
    );
}

function DropdownPriority({ id, color, setFilters }) {
    const [searchInput, setSearchInput] = useState('');
    const [priorities, setPriorities] = useState('');
    // const [priorityLoading, setPriorityLoading] = useState(false);
    // get all agents from the redux
    const priority = useSelector((state) => state.priority);

    useEffect(() => {
        if (searchInput || searchInput === '') {
            if (Array.isArray(priority?.priorities)) {
                const regex = new RegExp(`${searchInput}`, 'gi');
                const searchedAgents = priority?.priorities?.filter((item) => regex.test(item?.name)).slice(0, 9);
                setPriorities(searchedAgents);
            }
        }
    }, [searchInput]);

    return (
        <div className="filter-dropdown-priority">
            <div>
                <span>
                    <SearchIcon />
                </span>
                <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
            </div>
            {priorities &&
                (priorities?.length === 0 ? (
                    <div>No priority found</div>
                ) : (
                    <ul>
                        {priorities.map((item) => (
                            <li
                                key={item?.id}
                                onClick={() => handleFilter(id, color, setFilters, `${item?.name}`, `${item?.id}`)}
                            >{`${item?.name}`}</li>
                        ))}
                    </ul>
                ))}
        </div>
    );
}

function DropdownSearch({ id, color, setFilters }) {
    const [searchInput, setSearchInput] = useState('');

    return (
        <div className="filter-dropdown-search">
            <div>
                <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
            </div>
            <div>
                {searchInput && (
                    <button
                        type="button"
                        onClick={() =>
                            handleFilter(id, color, setFilters, searchInput, `${searchInput}`) || setSearchInput('')
                        }
                    >
                        Add
                    </button>
                )}
            </div>
        </div>
    );
}

function DropdownRating({ id, color, setFilters }) {
    const [searchInput, setSearchInput] = useState(0);

    return (
        <div className="filter-dropdown-rating">
            <div>
                <input
                    type="number"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    min={0}
                    max={5}
                />
            </div>
            <div>
                {(searchInput || searchInput === 0) && (
                    <button
                        type="button"
                        onClick={() =>
                            handleFilter(id, color, setFilters, searchInput, `${searchInput}`) || setSearchInput(0)
                        }
                    >
                        Add
                    </button>
                )}
            </div>
        </div>
    );
}

function FilterDropdown({ active, setFilters }) {
    const [activeOption, setActiveOption] = useState('Channel');
    const isUserAuthenticated = useSelector((state) => state.userAuth?.isUserAuthenticated);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isUserAuthenticated) {
            dispatch(getAgents());
            // getSupervisors();
            // getAdmins();
            // getObservers();
        }
    }, [isUserAuthenticated]);

    return (
        <div className="filter-dropdown-wrapper">
            <div className={`filter-dropdown ${active ? 'active' : ''}`}>
                <div>
                    <ul>
                        {options.map((item) => (
                            <li onClick={() => setActiveOption(item)} className={activeOption === item ? 'active' : ''}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    {activeOption === 'Channel' && (
                        <DropdownChannel
                            id={activeOption}
                            color={colors[options.indexOf(activeOption)]}
                            setFilters={setFilters}
                        />
                    )}
                    {activeOption === 'Status' && (
                        <DropdownStatus
                            id={activeOption}
                            color={colors[options.indexOf(activeOption)]}
                            setFilters={setFilters}
                        />
                    )}
                    {activeOption === 'Contact' && (
                        <DropdownContact
                            id={activeOption}
                            color={colors[options.indexOf(activeOption)]}
                            setFilters={setFilters}
                        />
                    )}
                    {activeOption === 'Interval' && (
                        <DropdownInterval
                            id={activeOption}
                            color={colors[options.indexOf(activeOption)]}
                            setFilters={setFilters}
                        />
                    )}
                    {activeOption === 'Personnel' && (
                        <DropdownPersonnel
                            id={activeOption}
                            color={colors[options.indexOf(activeOption)]}
                            setFilters={setFilters}
                        />
                    )}
                    {activeOption === 'Category' && (
                        <DropdownCategory
                            id={activeOption}
                            color={colors[options.indexOf(activeOption)]}
                            setFilters={setFilters}
                        />
                    )}
                    {activeOption === 'Priority' && (
                        <DropdownPriority
                            id={activeOption}
                            color={colors[options.indexOf(activeOption)]}
                            setFilters={setFilters}
                        />
                    )}
                    {activeOption === 'Search' && (
                        <DropdownSearch
                            id={activeOption}
                            color={colors[options.indexOf(activeOption)]}
                            setFilters={setFilters}
                        />
                    )}
                    {activeOption === 'Rating' && (
                        <DropdownRating
                            id={activeOption}
                            color={colors[options.indexOf(activeOption)]}
                            setFilters={setFilters}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default FilterDropdown;

/* 
channels
> Helpdesk
> Email
> Livechat
> Facebook
> Whatsapp
*/
