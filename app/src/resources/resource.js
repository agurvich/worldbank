export default function createResource(fetcher) {
    let status = "pending"; // "pending", "success", or "error"
    let result = null;
    let promise = null;

    const load = () => {
        promise = fetcher()
            .then((data) => {
                status = "success";
                result = data;
            })
            .catch((error) => {
                status = "error";
                result = error; // Store the error so it can be thrown later
            });
        return promise;
    };

    // Initially load the resource
    load();

    return {
        read() {
            if (status === "pending") {
                throw promise; // Suspense handles the pending state
            } else if (status === "error") {
                throw result; // ErrorBoundary catches the error here
            } else if (status === "success") {
                return result; // Return the data when successful
            }
        },
        refresh() {
            status = "pending"; // Reset status
            load(); // Trigger a new fetch
        },
    };
}
