import { ErrorBoundaryState } from "../types";

export const initialState: ErrorBoundaryState = {
  error: null,
};

/* 检查 resetKeys 是否有变化*/
export const arrayDiffFunc = (
  a: Array<unknown> = [],
  b: Array<unknown> = []
) => {
  return (
    a.length !== b.length || a.some((item, index) => !Object.is(item, b[index]))
  );
};
