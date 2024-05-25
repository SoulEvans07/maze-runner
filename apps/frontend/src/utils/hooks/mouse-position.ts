import { useState, useRef, useLayoutEffect } from 'react';

type MouseState = {
  x: number;
  y: number;
  elementX: number;
  elementY: number;
  elementPositionX: number;
  elementPositionY: number;
};

const initialState: MouseState = {
  x: 0,
  y: 0,
  elementX: 0,
  elementY: 0,
  elementPositionX: 0,
  elementPositionY: 0,
};

export function useMousePos() {
  const [state, setState] = useState<MouseState>(initialState);

  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const newState = { ...initialState, x: event.pageX, y: event.pageY };

      if (ref.current?.nodeType === Node.ELEMENT_NODE) {
        const { left, top } = ref.current.getBoundingClientRect();
        const elementPositionX = left + window.scrollX;
        const elementPositionY = top + window.scrollY;
        const elementX = event.pageX - elementPositionX;
        const elementY = event.pageY - elementPositionY;

        newState.elementX = elementX;
        newState.elementY = elementY;
        newState.elementPositionX = elementPositionX;
        newState.elementPositionY = elementPositionY;
      }

      setState(prev => {
        return {
          ...prev,
          ...newState,
        };
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => void document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return [state, ref];
}
