import { duckDBManager } from '@src/hooks/duck-db';
import { createContext, useContext, useEffect, useState } from 'react';

export const DuckDBContext = createContext({
    manager: null,
    setManager: () => {}
});

export const useDuckDB = () => {
    const context = useContext(DuckDBContext);
    if (!context) {
        throw new Error('useDuckDB must be used within a DuckDBProvider');
    }
    return context;
};

export const DuckDBProvider = ({ children }) => {

    const [manager, setManager] = useState(null);

    useEffect(() => {
        const initializeManager = async () => {
            const instance = duckDBManager;
            await instance.initialize(); // Ensure DuckDB is initialized
            setManager(instance);
        };

        initializeManager();
    }, []); // Empty dependency array ensures this runs once

    return (
        <DuckDBContext.Provider value={{ manager }}>
            {children}
        </DuckDBContext.Provider>
    );
};