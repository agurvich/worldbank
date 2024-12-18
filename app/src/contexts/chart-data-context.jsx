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

    const minX = 0;
    const maxX = 1;
    const minY = 0;
    const maxY = 1;

    return (
        <AllChartDataContext.Provider value={null}>
            <ChartDataContext.Provider value={{
                chartData, setChartData,
                minX, maxX,
                minY, maxY
            }}>
                {children}
            </ChartDataContext.Provider>
        </AllChartDataContext.Provider>
    );
};