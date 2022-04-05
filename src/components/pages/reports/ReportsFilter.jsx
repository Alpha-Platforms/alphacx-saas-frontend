// @ts-nocheck
import React, { useState, useEffect } from 'react'
import FilterDropdown from './components/FilterDropdown';
import '../../../styles/ReportsFilter.scss';
import { PlusIcon } from '../../../assets/SvgIconsSet';

/* 
filters props => { id: '', label: '', value: '', color }
*/

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

  console.log('FILTERS => ', filters);

  const handleFilterApply = () => {
    
  }

  return (
    <div className="reports-filter-wrapper">
      <h2>Filter Options</h2>
      <p>Select the Add Filter button to filter and generate your reports</p>
      <div>
        <button onClick={() => !dropdownActive && setDropdownActive(true)}><PlusIcon /> Add Filter</button>
        {filters.map((item) => <span key={item?.id} onClick={() => (!dropdownActive && setDropdownActive(true)) || setFilters((prev) => prev.filter((x) => x?.id !== item?.id))} style={{ color: item?.color, background: `${item?.color}10` }}>{ item?.label } &nbsp;&nbsp;&nbsp;×</span>)}
        {filters.length > 0 && <button onClick={handleFilterApply}>Apply Filter</button>}
      </div>

      <FilterDropdown active={dropdownActive} setFilters={setFilters} />

      <div className="reports-filter-body">

      </div>
    </div>
  )
}

export default ReportsFilter;