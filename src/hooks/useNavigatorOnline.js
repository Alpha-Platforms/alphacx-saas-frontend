import React from 'react';
import { getOnLineStatus } from '../helper';

const useNavigatorOnLine = () => {
    const [status, setStatus] = React.useState(getOnLineStatus());

    const setOnline = () => setStatus(true);
    const setOffline = () => setStatus(false);

    React.useEffect(() => {
        window.addEventListener('online', setOnline);
        window.addEventListener('offline', setOffline);

        return () => {
            window.removeEventListener('online', setOnline);
            window.removeEventListener('offline', setOffline);
        };
    }, []);

    return status;
};

export default useNavigatorOnLine;
