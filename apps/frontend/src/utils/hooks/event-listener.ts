import { useEffect } from 'react';

export function useGlobalListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (this: Document, ev: DocumentEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
) {
  useEffect(() => {
    document.addEventListener(eventName, handler, options);
    return () => void document.removeEventListener(eventName, handler, options);
  }, [eventName, handler, options]);
}
