import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import createResource from '@src/resources/resource';
import { fetchFooData, fetchGSAPGeometryData, fetchIndicatorData } from '@src/lib/country-data';

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
    const [fooResource, setFooResource] = useState(null);
    const [gsapGeometryResource, setGSAPGeometryResource] = useState(null);

    const resourceDefinitions = [
        [setIndicatorResource, fetchIndicatorData],
        [setFooResource, fetchFooData],
        [setGSAPGeometryResource, fetchGSAPGeometryData],
    ];

    // Dynamically update indicator resource when activeCountry changes
    useEffect(() => {
        if (activeCountry?.code) {
            resourceDefinitions.forEach( ([setResource, fetcher]) => 
                setResource(
                    createResource(() => fetcher(activeCountry.code))
                )
            );
        }
    }, [activeCountry]);

    // expose state variables to the activeCountry hook
    const activeCountryValue ={
        activeCountry,
        setActiveCountry,
        indicatorResource,
        fooResource, 
        gsapGeometryResource
    };

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