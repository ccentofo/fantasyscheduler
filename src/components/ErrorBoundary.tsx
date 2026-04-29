import { Component, type ReactNode, type ErrorInfo } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = (): void => {
    window.location.reload();
  };

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-obsidian flex items-center justify-center p-6">
          <div className="brutal-panel p-8 max-w-lg w-full text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-danger/20 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-danger" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="font-display text-3xl uppercase tracking-wide">
                Something Went Wrong
              </h1>
              <p className="text-muted-foreground mono text-sm">
                An unexpected error occurred. This has been logged for review.
              </p>
            </div>

            {this.state.error && (
              <div className="text-left p-4 bg-obsidian border border-[#333] overflow-auto max-h-32">
                <code className="text-xs mono text-danger break-all">
                  {this.state.error.message}
                </code>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={this.handleReset}
                variant="outline"
                className="rounded-none border-[#333] hover:border-giants hover:text-giants bg-obsidian uppercase tracking-wider text-xs mono font-bold h-11 px-6"
              >
                Try Again
              </Button>
              <Button
                onClick={this.handleReload}
                className="rounded-none bg-giants text-white hover:bg-giantsDim uppercase tracking-wider text-xs mono font-bold h-11 px-6"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reload Page
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
