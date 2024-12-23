import { useMap } from 'react-leaflet';

function MapEvents({ dimensions, previousDimensions }) {

    const map = useMap();

    if (dimensions.width !== previousDimensions.current.width ||
        dimensions.height !== previousDimensions.current.height) {
        map.invalidateSize();
        previousDimensions.current = dimensions;
    }

    // explicitly denote that component does not render anything
    return null;
}

export default MapEvents;