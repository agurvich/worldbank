import { Component, useState } from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state to trigger fallback UI on next render
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Capture error and component stack info
        this.setState({ errorInfo });

        // Optionally log error to an external service
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    resetErrorBoundary = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
        if (this.props.resetErrorBoundary) {
            this.props.resetErrorBoundary(); // Call the custom reset logic
        }
    };

    render() {
        const { hasError, error, errorInfo } = this.state;
        const { fallback } = this.props;

        if (hasError) {
            // If fallback is a function/component, invoke it with error details
            if (typeof fallback === "function") {
                return fallback({
                    error,
                    errorInfo,
                    resetErrorBoundary: this.resetErrorBoundary,
                });
            }

            // Otherwise, render the fallback as-is or show the default fallback
            return (
                fallback || (
                    <DefaultErrorFallback
                        {...{error, errorInfo}}
                        resetErrorBoundary={this.resetErrorBoundary}
                    />
                )
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

function DefaultErrorFallback({ error, errorInfo, resetErrorBoundary }){
    // Show additional debugging info if errorInfo is provided
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="text-red-500 p-4 border border-red-500 rounded-md">
            <h2 className="font-bold">Something went wrong</h2>
            <p>{error?.message || "Unknown error"}</p>
            <button
                className="mt-4 bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
                onClick={resetErrorBoundary}
            >
                Retry
            </button>
            {errorInfo && (
                <div className="mt-4">
                    <button
                        className="text-sm text-gray-500 underline"
                        onClick={() => setShowDetails(!showDetails)}
                    >
                        {showDetails ? "Hide Details" : "Show Details"}
                    </button>
                    {showDetails && (
                        <pre className="text-xs text-gray-700 bg-gray-100 p-2 mt-2 rounded">
                            {errorInfo.componentStack}
                        </pre>
                    )}
                </div>
            )}
        </div>
    );
};