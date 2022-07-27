/* eslint-disable no-console */
// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
import { Link } from 'react-router-dom';
import { httpGetMain } from '../../../helpers/httpMethods';
import searchIcon from '../../../assets/imgF/Search.png';
import { isObjectEmpty, getUserInitials } from '../../../helper';
import './GlobalSearch.scss';

let globalSearchTimer;

const getGlobalSearchResult = async (userInput) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
        if (userInput.length < 1) resolve({});
        clearTimeout(globalSearchTimer);
        globalSearchTimer = setTimeout(async () => {
            try {
                const res = await httpGetMain(`search/global?query=${userInput}`);
                if (res.status?.toLowerCase() === 'success') {
                    resolve(res?.data);
                }
                resolve({});
            } catch (err) {
                resolve({});
            }
        }, 1500);
    });
};

function GlobalSearch() {
    const [dropdownActive, setDropdownActive] = useState(false);
    const [searchResult, setSearchResult] = useState({});
    const [loading, setLoading] = useState(false);

    const searchRef = useRef(null);

    const clearInput = () => {
        if (searchRef?.current?.value) {
            searchRef.current.value = '';
        }
    };

    const handleGlobalSearch = async (e) => {
        !dropdownActive && setDropdownActive(true);
        !loading && setLoading(true);
        const userInput = e.target.value;
        const result = await getGlobalSearchResult(userInput);
        setLoading(false);
        setSearchResult(result);
    };

    useEffect(() => {
        const globalSearch = window.document.querySelector('#global-search');
        const handleDocClick = (e) => {
            if (globalSearch) {
                if (!globalSearch.contains(e.target)) {
                    dropdownActive && setDropdownActive(false);
                    clearInput();
                }
            }
        };

        window.document.addEventListener('click', handleDocClick, true);

        return () => window.document.removeEventListener('click', handleDocClick, true);
    }, [dropdownActive]);

    const closeDropdown = () => {
        dropdownActive && setDropdownActive(false);
        clearInput();
    };

    return (
        <form className="global-search" id="global-search">
            <div className="global-search-input-wrapper">
                <input
                    ref={searchRef}
                    className={`global-search-input ${dropdownActive ? 'active' : ''}`}
                    placeholder="Search"
                    type="text"
                    onChange={handleGlobalSearch}
                    style={{
                        borderRadius: 3,
                        border: 'solid 0.5px #ddd',
                        padding: '0.35rem 2rem',
                        backgroundImage: `url(${searchIcon})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '14px',
                        backgroundPosition: '10px 50%',
                    }}
                />
            </div>
            <div className="global-search-dropdown-wrapper">
                <div className={`global-search-dropdown ${dropdownActive ? 'active' : ''}`}>
                    {loading && (
                        <div className="global-search-loader">
                            <MoonLoader size={15} color="#006298" />
                        </div>
                    )}
                    <div className="search-result-title-box">
                        <h5>Search Results</h5>
                    </div>
                    {!isObjectEmpty(searchResult?.users) && (
                        <div className="searched searched-users">
                            <h6>Users</h6>
                            <ul>
                                {searchResult?.users?.map((user) => (
                                    <li>
                                        <div className="d-flex user-initials-sm align-items-center">
                                            <div>
                                                <div className="user-initials blue">
                                                    {user.avatar ? (
                                                        <img src={user?.avatar} className="cust-avatar" alt="" />
                                                    ) : (
                                                        getUserInitials(`${user.firstname} ${user.lastname}`)
                                                    )}
                                                </div>
                                            </div>
                                            <div className="ms-2">
                                                <Link
                                                    to={`/customers/${user.id}`}
                                                    style={{ textTransform: 'capitalize' }}
                                                    onClick={closeDropdown}
                                                >{`${user.firstname} ${user.lastname}`}</Link>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {!isObjectEmpty(searchResult?.tickets) && (
                        <div className="searched searched-tickets">
                            <h6>Tickets</h6>
                            <ul>
                                {searchResult?.tickets?.map((item) => (
                                    <li>
                                        <Link onClick={closeDropdown} to={`/tickets/${item?.id}`}>
                                            {item?.subject}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {isObjectEmpty(searchResult?.users) && isObjectEmpty(searchResult?.tickets) && (
                        <div className="no-result-found">No result found</div>
                    )}
                </div>
            </div>
        </form>
    );
}

export default GlobalSearch;
