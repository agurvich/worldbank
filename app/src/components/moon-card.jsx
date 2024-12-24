
import useLifecycleLogger from '@src/hooks/lifecycle-logger';

function MoonCard({moon, className='', ...props}) {


    useLifecycleLogger('MoonCard');
    return (
        <div key='MoonCard' className={`w-max ${className}`} {...props}>
        </div>
    );
}

export default MoonCard;