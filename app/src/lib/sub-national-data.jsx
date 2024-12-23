import { makeURL } from '@src/utils/make-url';

// Fetch fooData for the active country
export async function fetchFooData(countryCode) {
    const response = await fetch(makeURL('data/foo', `${countryCode}_foo.json`));
    if (!response.ok) {
        throw new Error(`Failed to fetch fooData for ${countryCode}`);
    }
    return response.json();
}

// Fetch barData for the active country
export async function fetchGSAPGeometryData(countryCode) {
    const response = await fetch(makeURL('data','sub-national-geometry',`${countryCode}_gsap_geometry.geojson`));
    if (!response.ok) {
        throw new Error(`Failed to fetch gsapGeometryData for ${countryCode}`);
    }
    return response.json();
}

// Fetch barData for the active country
export async function fetchSPIDGeometryData(countryCode) {
    const response = await fetch(makeURL('data','sub-national-geometry',`${countryCode}_spid_geometry.geojson`));
    if (!response.ok) {
        throw new Error(`Failed to fetch spidGeometryData for ${countryCode}`);
    }
    return response.json();
}

// Fetch indicator data for the active country
export async function fetchIndicatorData(countryCode) {
    const response = await fetch(makeURL('data/indicators', `${countryCode}_indicators.json`));
    if (!response.ok) {
        throw new Error(`Failed to fetch indicators for ${countryCode}`);
    }
    return response.json();
}
