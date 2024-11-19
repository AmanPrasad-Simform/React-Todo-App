import React from "react";
import ErrorDisplay from "@/components/ErrorDisplay";

class SuspenseErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
        this.setState({ errorInfo });
    }

    handleRedirect = () => {
        this.setState({ hasError: false, errorInfo: null });
        window.location.href = "/";
    };

    render() {
        if (this.state.hasError) {
            return (
                <ErrorDisplay
                    errorInfo={this.state.errorInfo}
                    onRetry={this.handleRedirect}
                />
            );
        }

        return <React.Suspense fallback={<>Loading</>} {...this.props} />;
    }
}

export default SuspenseErrorBoundary;
