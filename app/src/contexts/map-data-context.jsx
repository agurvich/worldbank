import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import createResource from '@src/resources/resource';
import { fetchGSAPGeometryData, fetchSPIDGeometryData, fetchSPIDInequalityData, fetchIndicatorData  } from '@src/lib/sub-national-data';
import { fetchFoodSecurityData, fetchMultiDimPovertyData, fetchGSAPData, fetchSPIDMDPData} from '@src/lib/national-data';

export const NationalDataContext = createContext({
    nationalDataResources: null,
    setNationalDataResources: () => {}
});

export const LocationDataContext = createContext({
    locationData: null,
    setLocationData: () => {}
});

export const ActiveCountryContext = createContext({
    activeCountry: null,
    setActiveCountry: () => {}
});

export const ActiveCountryDataContext = createContext({
    indicatorResource : null,
    gsapGeometryResource : null ,
    fooResource : null
});

export const useNationalData = () => useContext(NationalDataContext);
export const useLocationData = () => useContext(LocationDataContext);
export const useActiveCountry = () => useContext(ActiveCountryContext);
export const useActiveCountryData = () => useContext(ActiveCountryDataContext);

export const AllMapDataContext = createContext();

export const AllMapDataProvider = ({ children }) => {
    const position = [0, 0];

    const [locationData, setLocationData] = useState({ lat: position[0], lng: position[1] });
    /* national data resources, loaded dynamically*/ 
    const [nationalDataResources, setNationalDataResources] = useState(null);

    // create resources once at start-up
    useEffect(()=>{
        setNationalDataResources({
            'foodSecurityResource' : createResource(fetchFoodSecurityData),
            'multiDimPovertyResource' : createResource(fetchMultiDimPovertyData),
            // actually sub-national but is first indexed by country code
            'gsapResource' : createResource(fetchGSAPData),
            'spidMDPResource' : createResource(fetchSPIDMDPData),
        });
    },[]);

    /* sub-national data resources, loaded dynamically*/ 
    const [activeCountry, setActiveCountry] = useState({
        name: null,
        code: null,
        geometry: null
    });
    const [indicatorResource, setIndicatorResource] = useState(null);
    const [gsapGeometryResource, setGSAPGeometryResource] = useState(null);
    const [spidGeometryResource, setSPIDGeometryResource] = useState(null);
    const [spidInequalityDataResource, setSPIDInequalityDataResource] = useState(null);

    const resourceDefinitions = [
        [setIndicatorResource, fetchIndicatorData],
        [setGSAPGeometryResource, fetchGSAPGeometryData],
        [setSPIDGeometryResource, fetchSPIDGeometryData],
        [setSPIDInequalityDataResource, fetchSPIDInequalityData],
    ];

    // Dynamically update indicator resource when activeCountry changes
    useEffect(() => {
        if (activeCountry?.code) {
            resourceDefinitions.forEach( ([setResource, fetcher]) => 
                setResource(
                    createResource(() => fetcher(activeCountry?.code))
                )
            );
        }
        else resourceDefinitions.forEach( ([setResource]) => setResource(null));
    }, [activeCountry]);

    // expose state variables to the activeCountry hook
    const activeCountryData ={
        indicatorResource,
        gsapGeometryResource, 
        spidGeometryResource, 
        spidInequalityDataResource
    };

    return (
        <AllMapDataContext.Provider value={null}>
            <NationalDataContext.Provider value={{ nationalDataResources }}>
            <LocationDataContext.Provider value={{ locationData, setLocationData }}>
            <ActiveCountryContext.Provider value={{ activeCountry, setActiveCountry }}>
            <ActiveCountryDataContext.Provider value={activeCountryData}>
                    {children}
            </ActiveCountryDataContext.Provider>
            </ActiveCountryContext.Provider>
            </LocationDataContext.Provider>
            </NationalDataContext.Provider>
        </AllMapDataContext.Provider>
    );
};