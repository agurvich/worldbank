export function makeURL(...paths){
    const baseURL = import.meta.env.BASE_URL === '/' ? window.location.origin : import.meta.env.BASE_URL;
    // Stop at the first non-truthy value and discard anything after
    const validPaths = [];
    for (let path of paths) {
        if (!path) break; // Stop at first non-truthy value
        validPaths.push(path);
    }
    
    // Join valid paths with '/'
    const fullPath = validPaths.join('/');
    
    console.log(baseURL, fullPath)
    return `${baseURL}/${fullPath}`;
}