import { makeURL } from '@src/utils/make-url';

// Fetch fooData for the active country
export async function fetchFoodSecurityData() {
    const response = await fetch(makeURL('data','foodsecurity.json'));
    if (!response.ok) {
        throw new Error(`Failed to fetch foodSecurityData for ${countryCode}`);
    }
    return response.json();
}

// Fetch barData for the active country
export async function fetchMultiDimPovertyData() {
    const response = await fetch(makeURL('data','mdp.json'));
    if (!response.ok) {
        throw new Error(`Failed to fetch multiDimPovertyData.`);
    }
    return response.json();
}

export async function fetchGSAPData() {
    const response = await fetch(makeURL('data','gsap.json'));
    if (!response.ok) {
        throw new Error(`Failed to fetch gsapData.`);
    }
    return response.json();
}

export async function fetchSPIDMDPData() {
    const response = await fetch(makeURL('data','spid-mdp.json'));
    if (!response.ok) {
        throw new Error(`Failed to fetch spidMDPData.`);
    }
    return response.json();
}