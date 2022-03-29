import { usePrevious } from "./usePrevious";

export const useIsChanged = (value, valueDefault) => {
  const valuePrev = usePrevious(value, valueDefault);

  return value !== valuePrev;
};
