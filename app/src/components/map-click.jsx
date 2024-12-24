import { useRef } from 'react';
import { withFallbackAndBoundary } from '@src/utils/suspense-error-hoc';

import { MapContainer, TileLayer, AttributionControl, } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


import useDimensions from '@src/hooks/dimensions';

import useLifecycleLogger from '@src/hooks/lifecycle-logger';
import { useLocationData } from '@src/contexts/map-data-context';
import MapEvents from './map-components/map-events';
import NationalSelector from './map-components/national-selector';
import SubNationalSelector from './map-components/sub-national-selector';

function MapClick({className='', ...props}) {

    // React Suspense will handle switching between skeleton and loaded grid
    const EnhancedContent = withFallbackAndBoundary({
        Component:MapClickContent,
        className,
        ...props
    });

    useLifecycleLogger('MapClick');
    return <EnhancedContent />
}

function MapClickContent({ className, ...params }) {
    // setup watcher for map dimension changes
    const wrapperRef = useRef();
    const dimensions = useDimensions(wrapperRef);
    const previousDimensions = useRef({ width: 0, height: 0 });

    const mapRef = useRef();

    //const baseURL = `${import.meta.env.VITE_LFS_ENDPT}tiles/${tileVariable}/{z}/{x}/{y}.png`;
    const baseURL = `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`;
    
    useLifecycleLogger("MapClick",1);
    return (
            <div className='w-full h-full z-10'> 
                <div
                    ref={wrapperRef}
                    className={` w-full h-full ${className} `}
                    style={{ position: 'relative' }}
                >
                    <div style={{ height: '100%', width: '100%' }}>
                        <MapContainer
                            center={ [0, 0] }
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
                            <TileLayer url={baseURL} attribution='&copy; OpenStreetMap contributors' />
                            {/*
                            <Marker position={locationData}>
                                <Popup>
                                    A pretty CSS3 popup. <br /> Easily customizable.
                                </Popup>
                            </Marker>
                            */}
                            {/* customize the attribution control */}
                            <AttributionControl prefix='Leaflet' position='bottomright'/>
                            {/* handle any map events like dimensions changing or clicks */}
                            <MapEvents {...{dimensions, previousDimensions }} />
                            {/* add vector polygons for clicking on countries */}
                            <NationalSelector />
                            <SubNationalSelector />
                            
                        </MapContainer>
                    </div>
                </div>
            </div>
    );
}

export default MapClick;
