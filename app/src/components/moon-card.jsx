
import useLifecycleLogger from '@src/hooks/lifecycle-logger';

function MoonCard({moon, className='', ...props}) {

    let titleString = 'Moon';
    if (moon.Event){
        if (moon.Event.includes('e')) {
            titleString = 'Blood ' + titleString;
            if (moon.Eclipse === 'T') titleString = 'Total ' + titleString;
            else if (moon.Eclipse === 'P') titleString = 'Partial ' + titleString;
            else if (moon.Eclipse === 'N') titleString = 'Penumbral ' + titleString;
        }
        if (moon.Event.includes('b')) titleString = 'Blue ' + titleString;
        if (moon.Event.includes('B')) titleString = 'BLUE ' + titleString;
        if (moon.Event.includes('s')) titleString = 'Super ' + titleString;
    }
    else titleString = 'Full ' + titleString;

    useLifecycleLogger('MoonCard');
    return (
        <div key='MoonCard' className={`w-max ${className}`} {...props}>
            <span>
                <h1 className='inline font-bold text-lg'>{titleString}</h1>
                {' '}
                <span>on {formatDate(moon['Full Moon'])}</span>
            </span>
            {moon.Eclipse && (
                <p>
                    Eclipse Stats: {moon['Eclipse Stats']}
                </p>
            )}
            {titleString.includes('Super') &&(
                <p>
                    {daysBetween(moon['Full Moon'],moon['Perigee'])} ({moon.Dist}m)
                </p>
            ) }
            <p>
                Superness: {moon['Superness']}
            </p>
        </div>
    );
}

export default MoonCard;

// Function to format the date to YYYY-MM-DD
const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}/${day}/${year}`;
};

function daysBetween(date1, date2) {
    const msPerDay = 1000 * 60 * 60;
    const diffInMs = date2 - date1;  // Difference in milliseconds
    console.log(date1, date2)
    const hours = Math.floor(diffInMs / msPerDay);
    const perigeeString = `${Math.abs(hours)} hours ${hours > 0 ? "before":"after"} perigee`
    return perigeeString;    // Convert to days and round down
}