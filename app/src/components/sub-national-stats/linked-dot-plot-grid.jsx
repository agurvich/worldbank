import useLifecycleLogger from '@src/hooks/lifecycle-logger';
import { SelectScrollable } from '@src/components/select-menu';

function LinkedDotPlotGrid({data, className='', ...props}) {

    console.log(data)


    useLifecycleLogger('LinkedDotPlotGrid');
    return (
        <div key='LinkedDotPlotGrid' className={`${className}`} {...props}>
            <SelectScrollable />
            hello
        </div>
    );
}

export default LinkedDotPlotGrid;