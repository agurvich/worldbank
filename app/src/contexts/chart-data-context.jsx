import { makeURL } from '@src/utils/make-url';
import { createContext, useContext, useEffect, useState } from 'react';

export const ChartDataContext = createContext({
    chartData: null,
    setChartData: () => {}
});

export const useChartData = () => useContext(ChartDataContext);

export const AllChartDataContext = createContext();

export const AllChartDataProvider = ({ children }) => {

    const [chartData, setChartData] = useState(null);

    useEffect(()=>{
        fetch(makeURL('data','line-data.json'))
        .then(res => res.json())
        .then(setChartData);

    },[]);

    return (
        <AllChartDataContext.Provider value={null}>
            <ChartDataContext.Provider value={{ chartData, setChartData, }}>
                {children}
            </ChartDataContext.Provider>
        </AllChartDataContext.Provider>
    );
};