import React from 'react'
// import { SearchIconNavbr, SendIcon } from "../../assets/images/svgs";
// import "../pages/help_center//helpCenter.scss";

function SearchBox() {
    return (
        <>
        {/* <div className="search-container">
            <h3>How can we help?</h3>
            <div className="searchbar">
                <div className="icon">
                    <SearchIconNavbr>
                    </SearchIconNavbr>
                </div>
                <form>
                    <input type="text" placeholder="Search help center" />
                    <button>
                        <SendIcon size={30}></SendIcon>
                    </button>
                </form>
            </div>
        </div> */}

        
        <div className="searchbar" style={{marginTop: 30, width: '40%', backgroundColor: 'white', padding: '10px 25px', borderRadius: 50, display: 'flex'}}><div className="icon" style={{display: 'flex', alignItems: 'center'}}>
                  <svg width={23} height={24} viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.9375 9.75C17.9375 14.751 14.0602 18.75 9.34375 18.75C4.62732 18.75 0.75 14.751 0.75 9.75C0.75 4.74903 4.62732 0.75 9.34375 0.75C14.0602 0.75 17.9375 4.74903 17.9375 9.75Z" stroke="#C5C7CD" strokeWidth="1.5" /><path d="M15.8125 16.5L21.5625 22.5" stroke="#C5C7CD" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </div><form style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                  <input type="text" placeholder="Search help center" style={{marginLeft: 20, width: '100%', border: 'none', outline: 'none', fontSize: 16}} />
                  <button style={{height: 35, border: 'none', minWidth: 35, backgroundColor: '#0074b3', borderRadius: '50%'}}><svg width={30} height={30} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25.001 4.165c11.49 0 20.834 9.346 20.834 20.834 0 11.487-9.344 20.833-20.834 20.833-11.487 0-20.833-9.346-20.833-20.833 0-11.488 9.346-20.834 20.833-20.834z" fill="#0074B3" /><path d="M21.995 16.204c.398 0 .798.152 1.102.456l7.264 7.23a1.566 1.566 0 010 2.214l-7.264 7.233a1.56 1.56 0 01-2.209-.004 1.565 1.565 0 01.005-2.21l6.152-6.125-6.152-6.125a1.562 1.562 0 011.102-2.67z" fill="#fff" /></svg></button>
                </form>
            </div>
            

        </>
            
    )
}

export default SearchBox