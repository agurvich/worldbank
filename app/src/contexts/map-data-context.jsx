import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import createResource from '@src/resources/resource';
import { fetchIndicatorData } from '@src/lib/country-data';

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
    setActiveCountry: () => {},
    indicatorResource: null
});

export const useMapData = () => useContext(MapDataContext);
export const useLocationData = () => useContext(LocationDataContext);
export const useActiveCountry = () => useContext(ActiveCountryContext);

export const AllMapDataContext = createContext();

export const AllMapDataProvider = ({ children }) => {
    const position = [0, 0];

    const [mapData, setMapData] = useState(null);
    const [activeCountry, setActiveCountry] = useState({
        name: null,
        code: null,
        geometry: null
    });
    const [locationData, setLocationData] = useState({ lat: position[0], lng: position[1] });
    const [indicatorResource, setIndicatorResource] = useState(null);

    // Dynamically update indicator resource when activeCountry changes
    useEffect(() => {
        if (activeCountry?.code) {
            const newResource = createResource(() => fetchIndicatorData(activeCountry.code));
            setIndicatorResource(newResource);
        }
    }, [activeCountry]);

    const activeCountryValue = useMemo(
        () => ({
            activeCountry,
            setActiveCountry,
            indicatorResource,
        }),
        [activeCountry, indicatorResource]
    );

    return (
        <AllMapDataContext.Provider value={null}>
            <MapDataContext.Provider value={{ mapData, setMapData }}>
            <LocationDataContext.Provider value={{ locationData, setLocationData }}>
            <ActiveCountryContext.Provider value={activeCountryValue}>
                    {children}
            </ActiveCountryContext.Provider>
            </LocationDataContext.Provider>
            </MapDataContext.Provider>
        </AllMapDataContext.Provider>
    );
};