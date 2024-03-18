'use client';
import { Component, ReactNode } from 'react';

import { Button } from '@/components/ui/button';

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    console.error(error);
    return { hasError: true };
  }

  override componentDidCatch(error: Error, errorInfo: unknown) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  override render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="space-y-2 rounded-md bg-white p-2 text-black">
          <p>Something went wrong.</p>
          <Button
            variant="outline"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
