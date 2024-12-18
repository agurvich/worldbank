import './App.css'
import SPA from './components/spa';
import { AllChartDataProvider } from './contexts/chart-data-context';
import { AllDataProvider } from './contexts/data-context';
import { AllMapDataProvider } from './contexts/map-data-context';

function App() {

    return (
        <AllDataProvider>
        <AllMapDataProvider>
        <AllChartDataProvider>
            <div className='w-screen'>
                <div className='m-0'>
                    <SPA />
                </div>
            </div>
        </AllChartDataProvider>
        </AllMapDataProvider>
        </AllDataProvider>
    )
}

export default App;
