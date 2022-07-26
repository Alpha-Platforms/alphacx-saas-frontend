/* eslint-disable no-console */
// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
import { httpGetMain } from '../../../helpers/httpMethods';
import searchIcon from '../../../assets/imgF/Search.png';
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
    const [dropdownActive, setDropdownActive] = useState(true);
    const [searchResult, setSearchResult] = useState({});
    const [loading, setLoading] = useState(false);

    const searchRef = useRef(null);

    // const clearInput = () => {
    //     if (searchRef?.current?.value) {
    //         searchRef.current.value = '';
    //         console.log('input cleared');
    //     }
    // };

    const handleGlobalSearch = async (e) => {
        !dropdownActive && setDropdownActive(true);
        !loading && setLoading(true);
        const userInput = e.target.value;
        console.log('userInput => ', userInput);
        const result = await getGlobalSearchResult(userInput);
        loading && setLoading(false);
        setSearchResult(result);
        console.log('searchVal => ', result);
    };

    useEffect(() => {
        const globalSearch = window.document.querySelector('#global-search');
        const handleDocClick = (e) => {
            if (globalSearch) {
                if (!globalSearch.contains(e.target)) {
                    dropdownActive && setDropdownActive(false);
                }
            }
        };

        window.document.addEventListener('click', handleDocClick, true);

        return () => window.document.removeEventListener('click', handleDocClick, true);
    }, [dropdownActive]);

    console.log('search result => ', searchResult);

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
                    {searchResult?.users && (
                        <div className="searched searched-users">
                            <h4>Users</h4>
                            <ul>
                                {searchResult?.users?.map((user) => (
                                    <li>{user?.firstname}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {searchResult?.tickets && (
                        <div className="searched searched-tickets">
                            <h4>Tickets</h4>
                            <ul>
                                {searchResult?.tickets?.map((item) => (
                                    <li>{item?.subject}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </form>
    );
}

export default GlobalSearch;
