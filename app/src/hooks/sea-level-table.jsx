import { useContext } from 'react';
import { SeaLevelTableContext } from '@src/contexts/sea-level-table';

const useSeaLevelTable = () => {
    const seaLevelTable = useContext(SeaLevelTableContext);
    
    return seaLevelTable;
};

export default useSeaLevelTable;
