import { makeURL } from "@src/utils/make-url";
import createResource from "./resource";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchCountryData(){
    return Promise.all([
        fetch(makeURL('data','mdp.json')).then(res => res.json()),
        fetch(makeURL('data','foodsecurity.json')).then(res => res.json())
    ]);
}

// Wrap serverStatus in a resource for React Suspense
const countryDataResource = createResource(fetchCountryData);

export default countryDataResource;
