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

const options = ['Channel', 'Contact', 'Status', 'Personnel', 'Interval', 'Search', 'Category', 'Priority'];



const DropdownChannel = () => {
    return (
        <div className="filter-dropdown-channel">
            <ul>
                <li>Helpdesk</li>
                <li>Live Chat</li>
                <li>Email</li>
                <li>Whats</li>
                <li>Email</li>
            </ul>
        </div>
    );
};

const DropdownStatus = () => {
    const status = useSelector((state) => state.status);

    return (
        <div className="filter-dropdown-status">
            <ul>
                {
                    status.isStatusesLoaded && status.statuses?.map((item) => <li key={item?.id}>{ item?.status }</li>)
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
                <span onClick={() => setStartActive(true)}><i><TicketCalender /></i> 14 February</span>
                <span onClick={() => setStartActive(false)}><i><TicketCalender /></i> 14 February</span>
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
                {activeOption === 'Channel' && <DropdownChannel />}
                {activeOption === 'Status' && <DropdownStatus />}
                {activeOption === 'Contact' && <DropdownContact />}
                {activeOption === 'Interval' && <DropdownInterval />}
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