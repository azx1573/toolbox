import React from "react";
import {
  ErrorBoundaryState,
  ErrorBoundaryProps,
  FallbackRender,
  FallbackProps,
} from "../types";
import ErrorComponent from "../static";
import { initialState, arrayDiffFunc } from "./config";

export default class ErrorBoundary extends React.Component<
  React.PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  state = initialState;

  // 是否已经由于 error 而引发的 render/update
  updatedWithError = false;

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo.componentStack);
    }
  }

  componentDidUpdate(
    prevProps: Readonly<React.PropsWithChildren<ErrorBoundaryProps>>
  ) {
    const { error } = this.state;
    const { resetKeys, onResetKeysChange } = this.props;

    // 已经存在错误，并且是第一次由于 error 而引发的 render/update，那么设置 flag=true，不会重置
    if (error !== null && !this.updatedWithError) {
      this.updatedWithError = true;
      return;
    }

    // 已经存在错误，并且是普通的组件render，则检查 resetKeys 是否有改动，改了就重置
    if (error !== null && arrayDiffFunc(prevProps.resetKeys, resetKeys)) {
      if (onResetKeysChange) {
        onResetKeysChange(prevProps.resetKeys, resetKeys);
      }

      this.reset();
    }
  }

  reset = () => {
    this.updatedWithError = false;
    this.setState(initialState);
  };

  resetErrorBoundary = () => {
    if (this.props.onReset) {
      this.props.onReset();
    }
    this.reset();
  };

  render() {
    const { fallback, FallbackComponent, fallbackRender } = this.props;
    const { error } = this.state;

    if (error !== null) {
      const fallbackProps: FallbackProps = {
        error,
        resetErrorBoundary: this.resetErrorBoundary, // 将 resetErrorBoundary 传入 fallback
      };

      if (React.isValidElement(fallback)) {
        return fallback;
      }

      if (typeof fallbackRender === "function") {
        return (fallbackRender as typeof FallbackRender)(fallbackProps);
      }

      if (FallbackComponent) {
        return <FallbackComponent {...fallbackProps} />;
      }

      /* 默认占位UI组件*/
      return <ErrorComponent onReset={this.resetErrorBoundary} />;
    }

    return this.props.children;
  }
}
