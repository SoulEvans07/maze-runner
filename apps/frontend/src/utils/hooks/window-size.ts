import { useState, useLayoutEffect } from 'react';

type WindowSize = {
  width: number;
  height: number;
};

export function useWindowSize() {
  const [size, setSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useLayoutEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => void window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
