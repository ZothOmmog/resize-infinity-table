import { useEffect, useRef } from "react";

export const usePrevious = (value, valueDefault = null) => {
  const ref = useRef(valueDefault);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
