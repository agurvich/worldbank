import useLifecycleLogger from '@src/hooks/lifecycle-logger';

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@src/components/ui/hover-card";
import MoonCard from './moon-card';

const colors = {
    " ": "gray",
    "s": "white",
    "e": "maroon",
    "b": "skyblue",
    "B": "darkblue"
};

function MoonGridElement({ thisMonthMoons, className = '', ...props }) {
    useLifecycleLogger('MoonGridElement');

    return (
        <div
            key='MoonGridElement'
            className={`${className} grid grid-cols-2 h-full`}
            {...props}
        >
            {thisMonthMoons.map((moon, index) => 
                <HoverCard key={index} className='flex flex-col h-full items-center' openDelay={300}>
                    <HoverCardTrigger>
                        <PieChartSVG keyProp={moon.Event} />
                    </HoverCardTrigger>
                    <HoverCardContent className="w-max">
                        <MoonCard {...{moon}} />
                    </HoverCardContent>
                </HoverCard>
            )}
        </div>
    );
}

const dummy = <svg width="100%" height="100%" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="16" fill={'gray'} fillOpacity={0.5}/>
</svg>

function PieChartSVG({ keyProp }) {
    if (!keyProp) return dummy;
    const activeColors = keyProp.replaceAll(' ','').split('').map(char => colors[char]);
    const numColors = activeColors.length;
    const anglePerSegment = 360 / numColors;

    return (
        <svg width="100%" height="100%" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            {activeColors.map((color, i) => {
                if (numColors === 1) {
                    // Draw a full circle if there's only one segment
                    return (
                        <circle key={i} cx="16" cy="16" r="16" fill={color} />
                    );
                } else {
                    const startAngle = i * anglePerSegment;
                    const endAngle = startAngle + anglePerSegment;
                    const largeArcFlag = anglePerSegment > 180 ? 1 : 0;

                    const x1 = 16 + 16 * Math.cos((Math.PI / 180) * startAngle);
                    const y1 = 16 + 16 * Math.sin((Math.PI / 180) * startAngle);
                    const x2 = 16 + 16 * Math.cos((Math.PI / 180) * endAngle);
                    const y2 = 16 + 16 * Math.sin((Math.PI / 180) * endAngle);

                    return (
                        <path
                            key={i}
                            d={`M16,16 L${x1},${y1} A16,16 0 ${largeArcFlag},1 ${x2},${y2} Z`}
                            fill={color}
                        />
                    );
                }
            })}
        </svg>
    );
}

export default MoonGridElement;