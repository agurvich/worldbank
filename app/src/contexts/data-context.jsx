import { createContext, useContext, useState } from 'react';

export const DataContext = createContext({
    data: false,
    setData: () => {}
});

export const useData = () => useContext(DataContext);

export const AllDataContext = createContext();

export const AllDataProvider = ({ children }) => {

    const [data, setData] = useState(null);

    return (
        <AllDataContext.Provider value={null}>
            <DataContext.Provider value={{ data, setData}}>
                {children}
            </DataContext.Provider>
        </AllDataContext.Provider>
    );
};