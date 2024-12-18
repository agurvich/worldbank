import createResource from "./resource";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function fetchContent(){
    await sleep(5000);
    return {
        data: "This is dummy content fetched from a simulated API",
      };
}

// Wrap serverStatus in a resource for React Suspense
const listenersResource = createResource(fetchContent);

export default listenersResource;
