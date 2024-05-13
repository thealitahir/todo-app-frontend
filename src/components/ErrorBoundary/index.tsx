import React, { ReactNode } from "react";
interface ErrorBoundaryProps {
    children: ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        this.setState({ hasError: true });
    }

    render() {
        const { hasError }: any = this.state;
        if (hasError) {
            // You can render any custom fallback UI
            return <h1 style={{ textAlign: 'center' }}>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
