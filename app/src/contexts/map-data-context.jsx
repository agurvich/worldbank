import { createContext, useContext, useState } from 'react';

export const MapDataContext = createContext({
    mapData: null,
    setMapData: () => {}
});

export const LocationDataContext = createContext({
    locationData: null,
    setLocationData: () => {}
});

export const useMapData = () => useContext(MapDataContext);

export const useLocationData = () => useContext(LocationDataContext);

export const AllMapDataContext = createContext();

export const AllMapDataProvider = ({ children }) => {

    const position = [51.505, -0.09]

    const [mapData, setMapData] = useState(null);
    const [locationData, setLocationData] = useState({ lat: position[0], lng: position[1] });

    return (
        <AllMapDataContext.Provider value={null}>
            <MapDataContext.Provider value={{ mapData, setMapData}}>
            <LocationDataContext.Provider value={{ locationData, setLocationData}}>
                {children}
            </LocationDataContext.Provider>
            </MapDataContext.Provider>
        </AllMapDataContext.Provider>
    );
};