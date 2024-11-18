import React from "react";

/* 出错后显示的元素类型*/
type FallbackElement = React.ReactElement<
  unknown,
  string | React.FC | typeof React.Component
> | null;

/* 出错显示组件的 props*/
export interface FallbackProps {
  error: Error;
  resetErrorBoundary: () => void; // fallback 组件里将该函数绑定到“重置”按钮
}

/* 本组件 ErrorBoundary 的 props*/
export interface ErrorBoundaryState {
  error: Error | null; // 将 hasError 的 boolean 改为 Error 类型，提供更丰富的报错信息
}

interface ErrorBoundaryProps {
  fallback?: FallbackElement;
  FallbackComponent?: React.ComponentType<FallbackProps>; // Fallback 组件
  fallbackRender?: typeof FallbackRender; // 渲染 fallback 元素的函数
  onError?: (error: Error, info: string) => void;
  resetKeys?: Array<unknown>;
  onResetKeysChange?: (
    prevResetKey: Array<unknown> | undefined,
    resetKeys: Array<unknown> | undefined
  ) => void;
  onReset?: () => void; // 开发者自定义重置逻辑，如自定义错误上报、toast提示等
}

export declare function FallbackRender(props: FallbackProps): FallbackElement;
