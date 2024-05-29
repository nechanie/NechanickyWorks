import React, { createContext, useContext, useState } from 'react';

// Create the context
const SelectedItemContext = createContext();

// Create a provider component
 const AboutThisSiteAnimationItemProvider = ({ children }) => {
    const [selectedItem, setSelectedItem] = useState(null);

    return (
        <SelectedItemContext.Provider value={{ selectedItem, setSelectedItem }}>
            {children}
        </SelectedItemContext.Provider>
    );
};

// Create a custom hook to use the SelectedIdContext
export const useSelectedItem = () => {
    return useContext(SelectedItemContext);
};

export default AboutThisSiteAnimationItemProvider;