type Timeout = ReturnType<typeof setTimeout>;
type CB<Args extends unknown[]> = (...args: Args) => void;

export function debounce<Args extends unknown[]>(cb: CB<Args>, delay: number): CB<Args> {
  let handler: Timeout = 0;
  return (...args: Args) => {
    clearTimeout(handler);
    handler = setTimeout(() => cb(...args), delay);
  };
}
