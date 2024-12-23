import { useActiveCountryData } from '@src/contexts/map-data-context';
import useLifecycleLogger from '@src/hooks/lifecycle-logger';
import { withFallbackAndBoundary } from '@src/utils/suspense-error-hoc';
import { GeoJSON } from 'react-leaflet';

function SubNationalSelector({className='', ...props}) {

    // React Suspense will handle switching between skeleton and loaded grid
    const EnhancedContent = withFallbackAndBoundary({
        Component:SubNationalSelectorContent
    });

    useLifecycleLogger('SubNationalSelector');
    return <EnhancedContent {...{className, ...props}}/>
}

function SubNationalSelectorContent({ className='', ...props}) {

    const { gsapGeometryResource } = useActiveCountryData();

    const gsapGeometry = gsapGeometryResource?.read();

    // Define style for GeoJSON features
    const geoJSONStyle = (feature) => ({
        color: 'blue',
        weight: 1,
        fillColor: 'lightblue',
        fillOpacity: 0.5,
    });

    // Function to bind popups or events to each GeoJSON feature
    const onEachFeature = (feature, layer) => {
        if (feature.properties) {
            layer.bindPopup(`<b>${feature.properties.geo_name}</b>`);
    
            layer.on({
                click: (e) => {
                    foo({
                        name:feature.properties.shapeGroup,
                        code:feature.properties.shapeGroup
                    });
                    // Propagate the click event to the map
                    const map = e.target._map;
                    const latlng = e.latlng;
                    const bounds = layer.getBounds();
                    // Fit the map view to the bounds of the polygon
                    map.flyToBounds(bounds, {
                        padding: [20, 20], // Add padding around the polygon
                        maxZoom: 8,      // Limit the maximum zoom level
                        duration: 1.5     // Duration in seconds for the animation
                    });

                },
                mouseover: (e) => {
                    const layer = e.target;
                    // Bring the clicked feature to the front
                    layer.bringToFront();
                    layer.setStyle({
                        color: 'red',
                        weight: 2,
                    });
                },
                mouseout: (e) => {
                    const layer = e.target;
                    layer.setStyle({
                        color: 'blue',
                        weight: 1,
                    });
                },
            });
        }
    };

    useLifecycleLogger('SubNationalSelector');
    if (!gsapGeometry) return null;
    return (
        <GeoJSON 
            key='SubNationalSelector' className={`${className}`} {...props}
            data={gsapGeometry} 
        />
    );
}

export default SubNationalSelector;
