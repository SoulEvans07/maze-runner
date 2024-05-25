import { useState, useEffect, useRef } from 'react';

type Timeout = ReturnType<typeof setTimeout>;
type CB<Args extends unknown[]> = (...args: Args) => void;

export function useDebounce<Args extends unknown[]>(cb: CB<Args>, delay: number): CB<Args> {
  const handler = useRef<Timeout | null>(null);

  const clearHandler = () => {
    if (handler.current) clearTimeout(handler.current);
  };

  useEffect(() => {
    return () => clearHandler();
  }, [cb, delay]);

  return (...args: Args) => {
    clearHandler();
    handler.current = setTimeout(() => cb(...args), delay);
  };
}

export function useDebounceValue(value: number, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => void clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
