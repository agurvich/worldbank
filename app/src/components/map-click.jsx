import { useEffect, useRef } from 'react';

import { MapContainer, TileLayer, useMapEvent, Marker, AttributionControl, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


import useDimensions from '@src/hooks/dimensions';

import useLifecycleLogger from '@src/hooks/lifecycle-logger';
import { useLocationData } from '@src/contexts/map-data-context';

function MapClick({ className }) {
    const { locationData, setLocationData } = useLocationData();
    
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
                            minZoom={4}
                            zoom={13}
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
                            <Marker position={locationData}>
                                <Popup>
                                    A pretty CSS3 popup. <br /> Easily customizable.
                                </Popup>
                            </Marker>
                            <AttributionControl prefix='Leaflet' position='bottomright'/>
                            <MapEvents />
                        </MapContainer>
                    </div>
                </div>
            </div>
    );
}

export default MapClick;
