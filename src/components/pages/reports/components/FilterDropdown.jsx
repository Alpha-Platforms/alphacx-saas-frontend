// @ts-nocheck
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { ReactComponent as SearchIcon } from '../../../../assets/icons/search.svg'; 
import { ReactComponent as TicketCalender } from '../../../../assets/icons/Ticketcalendar.svg'; 
import { getSearchedCustomers } from '../../tickets/CreateTicketModal';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import dayjs from 'dayjs';

const options = ['Channel', 'Contact', 'Status', 'Personnel', 'Interval', 'Search', 'Category', 'Priority'];

const colors = ['#FF4D35', '#0796F7', '#00BB2D', '#3D642D', '#6C6960', '#ED760E', '#A03472', '#C2B078'];


const handleFilter = (id, color, setFilters, label, value) => {
    setFilters((prev) => {
        if (prev.find((item) => item.id === id)) {
            // object exists in filters array
            return prev.map((item) => {
                if (item?.id === id) {
                    return { ...item, id, color, label, value }
                } 
                return item;
            });
        }
        return [...prev, { id, color, label, value }];
    });
}


const DropdownChannel = ({ id, color, setFilters }) => {


    return (
        <div className="filter-dropdown-channel">
            <ul>
                <li onClick={() => handleFilter(id, color, setFilters, 'Helpdesk', 'helpdesk')}>Helpdesk</li>
                <li onClick={() => handleFilter(id, color, setFilters, 'Live Chat', 'livechat')}>Live Chat</li>
                <li onClick={() => handleFilter(id, color, setFilters, 'Email', 'email')}>Email</li>
                <li onClick={() => handleFilter(id, color, setFilters, 'WhatsApp', 'whatsapp')}>WhatsApp</li>
                <li onClick={() => handleFilter(id, color, setFilters, 'Facebook', 'facebook')}>Facebook</li>
            </ul>
        </div>
    );
};

const DropdownStatus = ({ id, color, setFilters }) => {
    const status = useSelector((state) => state.status);

    return (
        <div className="filter-dropdown-status">
            <ul>
                {
                    status.isStatusesLoaded && status.statuses?.map((item) => <li key={item?.id} onClick={() => handleFilter(id, color, setFilters, item?.status, item?.id)}>{ item?.status }</li>)
                }
            </ul>
        </div>
    );
}

const DropdownContact = () => {
    const [searchInput, setSearchInput] = useState('');
    const [customerLoading, setCustomerLoading] = useState(false);
    const [customers, setCustomers] = useState(null);

    useEffect(() => {
        if (searchInput) {
            (async () => {
                setCustomerLoading(true);
                const customers = await getSearchedCustomers(searchInput);
                setCustomerLoading(false);
                setCustomers(customers);
                console.log('customers => ', customers);
            })();
        }
    }, [searchInput])

    return (
        <div className="filter-dropdown-contact">
            <div>
                <span><SearchIcon /></span>
                <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
            </div>
            {customerLoading && <span className='fdc-loading'>Loading...</span>}
            {customers && <>
                {customers?.length === 0 ? (!customerLoading && <div>No contact found</div>) : (
                        <ul>
                            { customers.map((item) => <li key={item?.value} >{ item?.label }</li>) }
                        </ul>
                    )
                }
            </>}
        </div>
    );
}

const DropdownInterval = () => {
    const [startActive, setStartActive] = useState(true);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    console.log('start => ', startDate, 'end => ', endDate);

    return (
        <div className="filter-dropdown-interval">
            <div>
                <span onClick={() => setStartActive(true)} className={startActive ? 'active' : ''}><i><TicketCalender /></i> {dayjs(startDate).format('DD MMMM')}</span>
                <span onClick={() => setStartActive(false)} className={!startActive ? 'active' : ''}><i><TicketCalender /></i> {dayjs(endDate).format('DD MMMM')}</span>
            </div>
            <div>
                {startActive ? <Calendar onChange={setStartDate} value={startDate} /> : <Calendar onChange={setEndDate} value={endDate} />}
            </div>
        </div>
    );
}

const FilterDropdown = ({ active, setFilters }) => {
  const [activeOption, setActiveOption] = useState('Channel');

  return (
    <div className="filter-dropdown-wrapper">
        <div className={`filter-dropdown ${active ? 'active': ''}`}>
            <div>
                <ul>
                    {options.map((item) => <li onClick={() => setActiveOption(item)} className={activeOption === item ? 'active': ''}>{ item }</li>)}
                </ul>
            </div>
            <div>
                {activeOption === 'Channel' && <DropdownChannel id={activeOption} color={colors[options.indexOf(activeOption)]} setFilters={setFilters}  />}
                {activeOption === 'Status' && <DropdownStatus id={activeOption} color={colors[options.indexOf(activeOption)]} setFilters={setFilters} />}
                {activeOption === 'Contact' && <DropdownContact id={activeOption} color={colors[options.indexOf(activeOption)]} setFilters={setFilters} />}
                {activeOption === 'Interval' && <DropdownInterval id={activeOption} color={colors[options.indexOf(activeOption)]} setFilters={setFilters} />}
            </div>
        </div>
    </div>
  )
}

export default FilterDropdown

/* 
channels
> Helpdesk
> Email
> Livechat
> Facebook
> Whatsapp
*/