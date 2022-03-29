import { useEffect, useRef } from "react";

export const useDidUpdated = (fn, deps) => {
  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      fn();
    }
    // eslint-ignore-next-line
  }, deps);
};
