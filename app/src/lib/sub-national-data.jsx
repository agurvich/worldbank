import { makeURL } from '@src/utils/make-url';

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
    const response = await fetch(makeURL('data','indicators',`${countryCode}_indicators.json`));
    if (!response.ok) {
        throw new Error(`Failed to fetch indicators for ${countryCode}`);
    }
    return response.json();
}

// Fetch fooData for the active country
// Fetch and load the DuckDB database for the active country
export async function fetchSPIDInequalityData(countryCode) {
    //const { dbResource, updateFilePath } = useDuckDBWithResource();

    // Update the file path to load the corresponding Parquet file
    updateFilePath(makeURL('data', 'spid-inequality', `${countryCode}_spid_inequality.parquet`));

    // Wait for the database resource to load
    return dbResource.read(); // Suspense-compatible; throws if not yet ready
}