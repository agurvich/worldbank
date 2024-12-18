import useLifecycleLogger from '@src/hooks/lifecycle-logger';
import { makeURL } from '@src/utils/make-url';

function Header({className='', ...props}) {

    useLifecycleLogger('Header');
    return (
        <div key='Header' className={`flex flex-row justify-between items-end ${className}`} {...props}>
            <img src={makeURL("NASA_logo.svg")} />
            <h1 className='text-6xl py-2'>Lunar Lookup</h1>
        </div>
    );
}

export default Header;