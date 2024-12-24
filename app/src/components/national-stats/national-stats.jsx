
import useLifecycleLogger from '@src/hooks/lifecycle-logger';
import Gauges from './gauges';
import ScrollRankings from './scroll-rankings';

function NationalStats({moon, className='', ...props}) {


    useLifecycleLogger('NationalStats');
    return (
        <div key='NationalStats' className={`flex flex-col h-full ${className}`} {...props}>
            <div>
                <Gauges />
            </div>
            <div className='grid grid-cols-2 gap-4 flex-1'>
                <ScrollRankings />
                <ScrollRankings />
                <ScrollRankings />
                <ScrollRankings />
            </div>
        </div>
    );
}

export default NationalStats;