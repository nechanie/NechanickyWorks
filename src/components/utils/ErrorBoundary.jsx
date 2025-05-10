import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so that next render shows fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        const { logVariables, onError } = this.props;

        // If the parent provided a custom error handler, call it.
        if (onError) {
            onError(error, errorInfo, logVariables);
        }

        // Log the error with additional variables.
        console.error("Error rendering component:", error, errorInfo, "Extra log variables:", logVariables);
    }

    render() {
        if (this.state.hasError) {
            // You can render a fallback UI here or simply return null.
            return null;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;