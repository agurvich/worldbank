import './App.css'
import SPA from './components/spa';
import { AllChartDataProvider } from './contexts/chart-data-context';
import { DuckDBProvider } from './contexts/data-context';
import { AllMapDataProvider } from './contexts/map-data-context';

function App() {

    return (
        <DuckDBProvider>
        <AllMapDataProvider>
        <AllChartDataProvider>
            <div className='w-screen'>
                <div className='m-0'>
                    <SPA />
                </div>
            </div>
        </AllChartDataProvider>
        </AllMapDataProvider>
        </DuckDBProvider>
    )
}

export default App;
