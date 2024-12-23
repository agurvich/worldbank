import { useActiveCountry } from '@src/contexts/map-data-context';
import useLifecycleLogger from '@src/hooks/lifecycle-logger';
import countriesResource from '@src/resources/countries-resource';
import { useRef } from 'react';
import { GeoJSON } from 'react-leaflet';

function NationalSelector({ className='', ...props}) {

    const countriesGeoJSON = countriesResource.read();

    const { activeCountry, setActiveCountry } = useActiveCountry();
    const activeCountryRef = useRef();
    activeCountryRef.__current__ = activeCountry.name;

    // Define style for GeoJSON features
    const geoJSONStyle = (feature) => ({
        color: feature.properties.shapeGroup === activeCountry?.name ? 'green' : 'blue',
        weight: 1,
        fillColor: 'lightblue',
        fillOpacity: 0.5,
    });


    // Function to bind popups or events to each GeoJSON feature
    const onEachFeature = (feature, layer) => {
        if (feature.properties && feature.properties.shapeGroup) {
            layer.bindPopup(`<b>${feature.properties.shapeGroup}</b>`);
    
            layer.on({
                click: (e) => {
                    const map = e.target._map;

                    // clear the active country to hide
                    //  the current sub-national-boundaries
                    setActiveCountry({});

                    // Fit the map view to the bounds of the polygon
                    const bounds = layer.getBounds();
                    map.flyToBounds(bounds, {
                        padding: [20, 20], // Add padding around the polygon
                        maxZoom: 8,      // Limit the maximum zoom level
                        duration: 1.5     // Duration in seconds for the animation
                    });

                    // set the active country *after* the animation finishes
                    setTimeout(()=>
                        setActiveCountry({
                            name:feature.properties.shapeGroup,
                            code:feature.properties.shapeGroup
                        }), 1500
                    ); 
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
                        color: feature.properties.shapeGroup === activeCountryRef.__current__ ? 'green' : 'blue',
                        weight: feature.properties.shapeGroup === activeCountryRef.__current__ ? 2 : 1,
                    });
                },
            });
        }
    };

    useLifecycleLogger('NationalSelector');
    return (
        <GeoJSON 
            key='NationalSelector' className={`${className}`} {...props}
            data={countriesGeoJSON} 
            style={geoJSONStyle} 
            onEachFeature={onEachFeature} 
        />
    );
}

export default NationalSelector;
