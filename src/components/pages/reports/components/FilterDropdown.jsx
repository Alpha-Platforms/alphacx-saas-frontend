import React from 'react'
import { useState } from 'react'

const options = ['Channel', 'Contact', 'Status', 'Personnel', 'Interval', 'Search', 'Category', 'Priority'];

const FilterDropdown = ({ active }) => {
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
                {activeOption === 'Channel' && (
                    <div className="filter-dropdown-channel">
                        <ul>
                            <li>Helpdesk</li>
                            <li>Live Chat</li>
                            <li>Email</li>
                        </ul>
                    </div>
                )}
                {activeOption === 'Status' && (
                    <div className="filter-dropdown-status">
                        <ul>
                            <li>status one</li>
                            <li>status two</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default FilterDropdown