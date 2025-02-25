import { useEffect } from 'react';

const HashHandler = () => {
    useEffect(() => {
        if (window.location.hash && window.location.hash === "#") {
            // Remove the hash from the URL without reloading the page
            window.history.replaceState(null, "", window.location.pathname + window.location.search);
        }
    }, []);
    return null;
};

export default HashHandler;