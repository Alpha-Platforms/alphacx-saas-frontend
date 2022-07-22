/* eslint-disable */
import React, { useState, useEffect } from 'react';
import NoChatSvg from '../../../assets/imgF/noChat.png';

function noChatFound({ ticketsExist }) {

    const [loading, setLoading] = useState(true)

    useEffect(() => {      
      setLoading(false);
    }, [ticketsExist]);
    
    
    return (
        <div className="no-chant-found-container">
            <img src={NoChatSvg} alt="" />
            { loading && !ticketsExist? '' :
            ticketsExist ? 
                <div>
                    <p className="fw-bold">Get Started</p>
                    <p className="">Click on a ticket to get started</p>
                </div>
                :
                <div>
                    <p className="fw-bold">No Messages Yet</p>
                    <p className="">Click <a href="/settings/integrations">here</a> to connect your channels</p>
                </div>
            }
        </div>
    );
}

export default noChatFound;