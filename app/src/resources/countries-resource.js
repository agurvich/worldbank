import { makeURL } from "@src/utils/make-url";
import createResource from "./resource";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchCountries(){
    return fetch(makeURL('data','countries.geojson')).then(res => res.json());
}

// Wrap serverStatus in a resource for React Suspense
const countriesResource = createResource(fetchCountries);

export default countriesResource;
