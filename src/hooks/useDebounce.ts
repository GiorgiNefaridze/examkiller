import { useState, useEffect } from "react";

type DebounceType<T> = (value: T, ms: number) => T;

const useDebounce: DebounceType<unknown> = (value, ms) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, ms);

    return () => clearTimeout(timerId);
  }, [value]);

  return debouncedValue;
};

export { useDebounce };
