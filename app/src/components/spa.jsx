import useLifecycleLogger from '@src/hooks/lifecycle-logger';
import MoonGrid from './moon-grid';
import Header from './header';
import MapClick from './map-click';
import Chart from './chart';
import InfoPane from './suspense-component';

function SPA({className='', ...props}) {

    useLifecycleLogger('SPA');
    return (
        <div key='SPA' className={`${className}`} {...props}>
            <div className='relative w-full h-full flex flex-row'>
                <div className='h-screen w-1/2'>
                    <MapClick />
                </div>
                <div className='h-screen w-1/2 overflow-y-scroll'>
                    <InfoPane />
                </div>
                {/*
                <Header />
                <div className='h-96 w-96'>
                    <Chart />
                </div>
                <div className='h-96 w-96'>
                    <Chart />
                </div>
                */}
            </div>
        </div>
    );
}

export default SPA;