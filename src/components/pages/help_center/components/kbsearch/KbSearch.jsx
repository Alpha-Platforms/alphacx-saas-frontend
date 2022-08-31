/* eslint-disable react/prop-types */
import React, { useRef, useState, useEffect } from 'react';
import { css } from '@emotion/css';
import MoonLoader from 'react-spinners/MoonLoader';
import { Link } from 'react-router-dom';
import { isObjectEmpty, uuid, slugify, kbBrandKit } from '../../../../../helper';
import { httpGetMain } from '../../../../../helpers/httpMethods';
import searchIcon from '../../../../../assets/imgF/Search.png';
import './KbSearch.scss';

let KbSearchTimer;

const getKbSearchResult = async (userInput) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
        if (userInput.length < 1) resolve({});
        clearTimeout(KbSearchTimer);
        KbSearchTimer = setTimeout(async () => {
            try {
                const res = await httpGetMain(`search/articles?query=${userInput}`);
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

function KbSearch({ isHome }) {
    const [dropdownActive, setDropdownActive] = useState(false);
    const [searchResult, setSearchResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const searchRef = useRef(null);

    const clearInput = () => {
        if (searchRef?.current?.value) {
            searchRef.current.value = '';
        }
    };

    const handleKbSearch = async (e) => {
        !dropdownActive && setDropdownActive(true);
        !loading && setLoading(true);
        const userInput = e.target.value;
        const result = await getKbSearchResult(userInput);
        setLoading(false);
        setSearchResult(result);
    };

    useEffect(() => {
        const kbSearch = window.document.querySelector('#kb-search');
        const handleDocClick = (e) => {
            if (kbSearch) {
                if (!kbSearch.contains(e.target)) {
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
        <form className="kb-search" id="kb-search">
            <div className="kb-search-input-wrapper">
                <input
                    ref={searchRef}
                    className={`kb-search-input ${css({
                        '&.active, &:focus': {
                            outlineColor: kbBrandKit({ bgCol: 0 })?.backgroundColor,
                        },
                    })} ${isHome ? 'is-home' : ''} ${dropdownActive ? 'active' : ''}`}
                    placeholder="Search knowledge base"
                    type="text"
                    onChange={handleKbSearch}
                    style={{
                        borderRadius: isHome ? '10rem' : 10,
                        border: 'solid 0.5px #ddd',
                        padding: isHome ? '1rem 3rem' : '0.6rem 2rem',
                        backgroundImage: `url(${searchIcon})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '14px',
                        backgroundPosition: isHome ? '20px 50%' : '10px 50%',
                    }}
                />
            </div>
            <div className="kb-search-dropdown-wrapper">
                <div
                    className={`kb-search-dropdown ${dropdownActive ? 'active' : ''} ${
                        isObjectEmpty(searchResult?.users) && isObjectEmpty(searchResult?.tickets) && loading
                            ? 'loading'
                            : ''
                    }`}
                >
                    {loading && (
                        <div className="kb-search-loader">
                            <MoonLoader size={15} color={kbBrandKit({ bgCol: 0 })?.backgroundColor} />
                        </div>
                    )}
                    {!isObjectEmpty(searchResult) && (
                        <div
                            className={`search-result-title-box ${
                                isObjectEmpty(searchResult) && loading ? 'loading' : ''
                            }`}
                        >
                            <h5>Search Results</h5>
                        </div>
                    )}
                    {!isObjectEmpty(searchResult) && (
                        <div className="searched searched-tickets">
                            {/* <h6>Articles</h6> */}
                            <ul>
                                {searchResult?.map((item) => (
                                    <li>
                                        <Link
                                            key={uuid()}
                                            onClick={closeDropdown}
                                            to={`/knowledge-base/${slugify(item?.category || 'general')}/${slugify(
                                                item?.title,
                                            )}`}
                                        >
                                            {item?.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {isObjectEmpty(searchResult) && !loading && <div className="no-result-found">No result found</div>}
                </div>
            </div>
        </form>
    );
}

export default KbSearch;
