import React from "react";
import { ErrorBoundaryProps } from "./types";
import ErrorBoundary from "./core";

/**
 * 高阶函数
 * @param Component 业务组件
 * @param errorBoundaryProps props
 */
export default function withErrorBoundary<P>(
  Component: React.ComponentType<P>,
  errorBoundaryProps: ErrorBoundaryProps
): React.ComponentType<P> {
  const Wrapped: React.ComponentType<P> = (props) => {
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };

  return Wrapped;
}
