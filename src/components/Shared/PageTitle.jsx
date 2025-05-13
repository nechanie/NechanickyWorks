import React, { useEffect } from 'react';

function PageTitle({ pageTitle }) {
    useEffect(() => {
        document.title = pageTitle;
    }, [pageTitle]); // This effect depends on pageTitle prop

    return;
}

export default PageTitle;
