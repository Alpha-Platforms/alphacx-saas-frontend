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
import { uuid } from '../../../../helper';

const options = ['Channel', 'Contact', 'Status', 'Personnel', 'Interval', 'Search', 'Category', 'Priority'];

const colors = ['#FF4D35', '#0796F7', '#00BB2D', '#3D642D', '#6C6960', '#ED760E', '#A03472', '#C2B078'];


const handleFilter = (id, color, setFilters, label, value) => {
    setFilters((prev) => {
        if (prev.find((item) => item.label === label)) {
            // check an item in the filter array has current filter label
            return prev.map((item) => {
                if (item?.label === label) {
                    // return new stuff
                    return { ...item, id, color, label, value, uuid: uuid() }
                } 
                return item;
            });
        }
        return [...prev, { id, color, label, value, uuid: uuid() }];
    });
}


const DropdownChannel = ({ id, color, setFilters }) => {


    return (
        <div className="filter-dropdown-channel">
            <ul>
                <li onClick={() => handleFilter(id, color, setFilters, 'Helpdesk', `${id.toLowerCase()}=helpdesk`)}>Helpdesk</li>
                <li onClick={() => handleFilter(id, color, setFilters, 'Live Chat', `${id.toLowerCase()}=livechat`)}>Live Chat</li>
                <li onClick={() => handleFilter(id, color, setFilters, 'Email', `${id.toLowerCase()}=email`)}>Email</li>
                <li onClick={() => handleFilter(id, color, setFilters, 'WhatsApp', `${id.toLowerCase()}=whatsapp`)}>WhatsApp</li>
                <li onClick={() => handleFilter(id, color, setFilters, 'Facebook', `${id.toLowerCase()}=facebook`)}>Facebook</li>
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
                    status.isStatusesLoaded && status.statuses?.map((item) => <li key={item?.id} onClick={() => handleFilter(id, color, setFilters, item?.status, `${id.toLowerCase()}=${item?.id}`)}>{ item?.status }</li>)
                }
            </ul>
        </div>
    );
}

const DropdownContact = ({ id, color, setFilters }) => {
    const [searchInput, setSearchInput] = useState('');
    const [customerLoading, setCustomerLoading] = useState(false);
    const [customers, setCustomers] = useState(null);

    useEffect(() => {
        if (searchInput) {
            (async () => {
                setCustomerLoading(true);
                const customers = await getSearchedCustomers(searchInput);
                setCustomerLoading(false);
                setCustomers(customers?.slice(0, 9));
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
                            { customers.map((item) => <li key={item?.value} onClick={() => handleFilter(id, color, setFilters, item?.label, `${id.toLowerCase()}=${item?.value}`)}>{ item?.label }</li>) }
                        </ul>
                    )
                }
            </>}
        </div>
    );
}

const DropdownInterval = ({ id, color, setFilters }) => {
    const [startActive, setStartActive] = useState(true);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [activate, setActivate] = useState(false);

    useEffect(() => {
        if (activate) {
            handleFilter(id, color, setFilters, `${dayjs(startDate).format('DD MMMM')} - ${dayjs(endDate).format('DD MMMM')}`, `start_date=${dayjs(startDate).format('DD-MM-YYYY')}&end_date=${dayjs(endDate).format('DD-MM-YYYY')}`);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate, endDate, activate]);

    return (
        <div className="filter-dropdown-interval">
            <div>
                <span onClick={() => (!activate && setActivate(true)) || setStartActive(true)} className={startActive ? 'active' : ''}><i><TicketCalender /></i> {dayjs(startDate).format('DD MMMM')}</span>
                <span onClick={() => (!activate && setActivate(true)) || setStartActive(false)} className={!startActive ? 'active' : ''}><i><TicketCalender /></i> {dayjs(endDate).format('DD MMMM')}</span>
            </div>
            <div>
                {startActive ? <Calendar onChange={(val) => (!activate && setActivate(true)) || setStartDate(val)} value={startDate} /> : <Calendar onChange={(val) => (!activate && setActivate(true)) || setEndDate(val)} value={endDate} />}
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