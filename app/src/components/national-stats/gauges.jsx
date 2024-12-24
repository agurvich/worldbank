
import useLifecycleLogger from '@src/hooks/lifecycle-logger';

function Gauges({moon, className='', ...props}) {

    useLifecycleLogger('Gauges');
    return (
        <div key='Gauges' className={`flex flex-row justify-around${className}`} {...props}>
            <Gauge />
            <Gauge />
            <Gauge />
            <Gauge />
        </div>
    );
}

export default Gauges;

function Gauge({}){

    return (
        <div className='bg-green-500 w-8 h-16'></div>
    );
}