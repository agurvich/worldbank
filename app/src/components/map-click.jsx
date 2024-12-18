import { useEffect, useRef } from 'react';
import { withFallbackAndBoundary } from '@src/utils/suspense-error-hoc';

import { MapContainer, TileLayer, useMapEvent, Marker, AttributionControl, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


import useDimensions from '@src/hooks/dimensions';

import useLifecycleLogger from '@src/hooks/lifecycle-logger';
import { useActiveCountry, useLocationData } from '@src/contexts/map-data-context';
import countriesResource from '@src/resources/countries-resource';

function MapClick({className='', ...props}) {

    // React Suspense will handle switching between skeleton and loaded grid
    const EnhancedContent = withFallbackAndBoundary({
        Component:MapClickContent
    });

    useLifecycleLogger('MapClick');
    return <EnhancedContent {...{className, ...props}}/>
}

function MapClickContent({ className, ...params }) {
    const { locationData, setLocationData } = useLocationData();
    const { setActiveCountry } = useActiveCountry();

    const countriesGeoJSON = countriesResource.read();

    // Define style for GeoJSON features
    const geoJSONStyle = {
        color: 'blue',
        weight: 1,
        fillColor: 'lightblue',
        fillOpacity: 0.5,
    };

    // Function to bind popups or events to each GeoJSON feature
    const onEachFeature = (feature, layer) => {
        if (feature.properties && feature.properties.shapeGroup) {
            layer.bindPopup(`<b>${feature.properties.shapeGroup}</b>`);
    
            layer.on({
                click: () => {
                    setActiveCountry({
                        name:feature.properties.shapeGroup
                    });
                },
                mouseover: (e) => {
                    const layer = e.target;
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

    const wrapperRef = useRef();
    const dimensions = useDimensions(wrapperRef);
    const previousDimensions = useRef({ width: 0, height: 0 });

    const mapRef = useRef();

    const MapEvents = () => {
        const map = useMapEvent('click', (e) => {
            const { lat, lng } = e.latlng;
            // update the currently focused locationData
            setLocationData({ lat: lat, lng: lng });
        });

        if (dimensions.width !== previousDimensions.current.width ||
            dimensions.height !== previousDimensions.current.height) {
            map.invalidateSize();
            previousDimensions.current = dimensions;
        }

        // explicitly denote that component does not render anything
        return null;
    };

    //const baseURL = `${import.meta.env.VITE_LFS_ENDPT}tiles/${tileVariable}/{z}/{x}/{y}.png`;
    const baseURL = `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`;
    
    // magic numbers i can't remember the origin of and now it's too late.
    useLifecycleLogger("MapClick");
    return (
            <div className='w-full h-full z-10'> 
                <div
                    ref={wrapperRef}
                    className={`
                        w-full
                        h-full
                        ${className}
                    `}
                    style={{ position: 'relative' }}
                >
                    <div style={{ height: '100%', width: '100%' }}>
                        <MapContainer
                            center={ locationData }
                            maxZoom={12}
                            minZoom={2}
                            zoom={2}
                            style={{
                                height: `100%`,
                                width: `100%`,
                                backgroundColor: 'black', // black b.c. tiles are black
                                position:'relative',
                            }}
                            ref={mapRef}
                            attributionControl={false} // Disable default attribution
                        >
                            <TileLayer
                                url={baseURL}
                                attribution='&copy; OpenStreetMap contributors'
                            />
                            {/*
                            <Marker position={locationData}>
                                <Popup>
                                    A pretty CSS3 popup. <br /> Easily customizable.
                                </Popup>
                            </Marker>
                            */}
                            <AttributionControl prefix='Leaflet' position='bottomright'/>
                            <MapEvents />
                            <GeoJSON />
                            <GeoJSON 
                            data={countriesGeoJSON} 
                            style={geoJSONStyle} 
                            onEachFeature={onEachFeature} 
                        />
                        </MapContainer>
                    </div>
                </div>
            </div>
    );
}

export default MapClick;
