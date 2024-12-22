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
export async function fetchBarData(countryCode) {
    const response = await fetch(makeURL('data/bar', `${countryCode}_bar.json`));
    if (!response.ok) {
        throw new Error(`Failed to fetch barData for ${countryCode}`);
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
