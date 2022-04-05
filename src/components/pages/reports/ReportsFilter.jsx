import React, { useState, useEffect } from 'react'
import FilterDropdown from './components/FilterDropdown';
import '../../../styles/ReportsFilter.scss'

/* 
filters props => { label: '', value: '', color }
*/

const colors = ['#FF4D35', '#0796F7'];

const ReportsFilter = () => {
  const [dropdownActive, setDropdownActive] = useState(false);
  const [filters, setFilters] = useState([]);
  
  useEffect(() => {
    const filterDropdown = window.document.querySelector('.filter-dropdown');
    const handleDocClick = (e) => {
      if (filterDropdown) {
        if (!filterDropdown.contains(e.target)) {
          dropdownActive && setDropdownActive(false);
        }
      }
    }; 

    window.document.addEventListener('click', handleDocClick, true);

    return () => window.document.removeEventListener('click', handleDocClick, true);
  }, [dropdownActive]);

  return (
    <div className="reports-filter-wrapper">
      <h2>Filter Options</h2>
      <p>Select the Add Filter button to filter and generate your reports</p>
      <div>
        <button onClick={() => !dropdownActive && setDropdownActive(true)}>Add Filter</button>
        <span style={{ color: `#0796F7`, background: `#0796F710`}}>14 February - 28 February ×</span>
        <span style={{ color: `#FF4D35`, background: `#FF4D3510` }}>Adekunle Adewale ×</span>
      </div>

      <FilterDropdown active={dropdownActive} setFilters={setFilters} />

      <div className="reports-filter-body">

      </div>
    </div>
  )
}

export default ReportsFilter;