import { createContext, useContext, useState } from 'react';

export const MapDataContext = createContext({
    mapData: null,
    setMapData: () => {}
});

export const LocationDataContext = createContext({
    locationData: null,
    setLocationData: () => {}
});

export const ActiveCountryContext = createContext({
    activeCountry: null,
    setActiveCountry: () => {}
});

export const useMapData = () => useContext(MapDataContext);

export const useLocationData = () => useContext(LocationDataContext);
export const useActiveCountry = () => useContext(ActiveCountryContext);

export const AllMapDataContext = createContext();

export const AllMapDataProvider = ({ children }) => {

    const position = [0,0];

    const [mapData, setMapData] = useState(null);
    const [activeCountry, setActiveCountry] = useState({
        name: null, 
        geometry: null
    });
    const [locationData, setLocationData] = useState({ lat: position[0], lng: position[1] });

    return (
        <AllMapDataContext.Provider value={null}>
            <MapDataContext.Provider value={{ mapData, setMapData}}>
            <LocationDataContext.Provider value={{ locationData, setLocationData}}>
            <ActiveCountryContext.Provider value={{ activeCountry, setActiveCountry}}>
                {children}
            </ActiveCountryContext.Provider>
            </LocationDataContext.Provider>
            </MapDataContext.Provider>
        </AllMapDataContext.Provider>
    );
};