import React, { createContext, useState } from 'react';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [tripData, setTripData] = useState(
        {
            origin: '',
            destination: '',
            distance: '',
            duration: ''
        }
    );

    return (
        <LocationContext.Provider value={{ tripData, setTripData }}>
            {children}
        </LocationContext.Provider>
    );
};
