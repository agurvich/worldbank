import { useData } from '@src/contexts/data-context';
import useLifecycleLogger from '@src/hooks/lifecycle-logger';
import MoonGridElement from './moon-grid-element';

function MoonGrid({className='', ...props}) {

    const { data } = useData();
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    useLifecycleLogger('MoonGrid');
    return (
        <div key='MoonGrid' className={`${className}`} {...props}>
            <div className='sticky top-0 bg-secondary z-10 flex flex-row flex-1'>
                <div className='w-6'><div className='-rotate-90 origin-bottom-right px-1'>year</div></div>
                <ul className="font-bold grid grid-cols-12 flex-1">
                    {months.map( (month,monthIndex) => (
                        <li
                            key={`month-label-${monthIndex}`}
                            className='
                                flex
                                py-4
                                flex-row
                                justify-center
                                border-[0.5px]
                                border-black
                                h-full
                            '
                        >
                            {month}
                        </li>
                    ))}
                </ul>
            </div>
            <ul>
                {data && data.map(
                    (yearMoons, yearIndex) => {
                        let monthIncrementor = 0;
                        return (
                            <li key={`year-row-${yearIndex}`} className='flex flex-row'>
                                <div className='w-6 flex flex-col justify-center'>
                                    <div className='origin-bottom-right -rotate-90 -translate-y-5'>
                                        {yearMoons[0].year}
                                    </div>
                                </div>
                                <div className='grid grid-cols-12'>
                                    {months.map(
                                        (_,monthIndex) => {
                                            const thisMonthMoons = [];
                                            while (
                                                (yearMoons[monthIncrementor] && yearMoons[monthIncrementor]['Full Moon'].getMonth()) === monthIndex
                                            ) {
                                                    thisMonthMoons.push(yearMoons[monthIncrementor]);
                                                    monthIncrementor++;
                                                }
                                            return (
                                                <div
                                                    key={`${yearIndex}-month-div-${monthIndex}`}
                                                    className='border-[0.5px] border-white'
                                                >
                                                    <MoonGridElement {...{thisMonthMoons}} />
                                                </div>
                                            )
                                        }
                                    )}
                                </div>
                            </li>
                        );
                    }
                )}
            </ul>
        </div>
    );
}

export default MoonGrid;