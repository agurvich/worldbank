import { useMapEvent } from 'react-leaflet';

function MapEvents({ dimensions, previousDimensions, setLocationData }) {

    const map = useMapEvent('click', (e) => {
        const { lat, lng } = e.latlng;
        // update the currently focused locationData
        setLocationData({ lat: lat, lng: lng });
        map.flyTo([lat, lng], map.getZoom() + 2, { duration: 1.5 }); // Fly to clicked location with animation
    });

    if (dimensions.width !== previousDimensions.current.width ||
        dimensions.height !== previousDimensions.current.height) {
        map.invalidateSize();
        previousDimensions.current = dimensions;
    }

    // explicitly denote that component does not render anything
    return null;
}

export default MapEvents;