import Button from "@/components/Button";

const ErrorDisplay = ({ errorInfo, onRetry }) => {
    return (
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 text-gray-800">
            <h1 className="text-2xl font-bold text-gray-700 mb-4">
                Something went wrong.
            </h1>
            <p className="mt-4 text-gray-500 text-sm">
                Please try refreshing the page or contact support if the problem
                persists.
            </p>
            <details className="text-sm text-gray-600 bg-gray-100 p-4 rounded-md overflow-auto whitespace-pre-wrap">
                {errorInfo && errorInfo.componentStack}
            </details>
            <Button onClick={onRetry} text="Go to Home" variant="primary" />
        </div>
    );
};

export default ErrorDisplay;
