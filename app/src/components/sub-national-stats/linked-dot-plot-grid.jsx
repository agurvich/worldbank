import useLifecycleLogger from '@src/hooks/lifecycle-logger';

function LinkedDotPlotGrid({data, className='', ...props}) {

    console.log(data)


    useLifecycleLogger('LinkedDotPlotGrid');
    return (
        <div key='LinkedDotPlotGrid' className={`${className}`} {...props}>
        </div>
    );
}

export default LinkedDotPlotGrid;