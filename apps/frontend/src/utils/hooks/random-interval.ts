import { useRef, useCallback, useEffect } from 'react';

type Timeout = ReturnType<typeof setTimeout>;
type Options = { minDelay: number; maxDelay: number };

export function useRandomInterval(cb: VoidFunction, options: Options) {
  const { minDelay, maxDelay } = options;

  const handler = useRef<Timeout | null>(null);
  const clearHandler = useCallback(() => {
    if (handler.current) clearTimeout(handler.current);
  }, []);

  useEffect(() => {
    const tick = () => {
      const interval = getRandomNumber(minDelay, maxDelay);

      handler.current = setTimeout(() => {
        cb();
        tick();
      }, interval);
    };

    tick();

    return clearHandler;
  }, [minDelay, maxDelay, clearHandler]);

  return clearHandler;
}

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
