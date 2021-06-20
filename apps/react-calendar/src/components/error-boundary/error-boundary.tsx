import React, { Component, ErrorInfo } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from './error-boundary.types';

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // add a callback to navigate to working page
      return <h1>Sorry.. there was an error</h1>;
    }
    return this.props.children;
  }
}
