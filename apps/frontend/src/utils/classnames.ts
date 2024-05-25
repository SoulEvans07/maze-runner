import { ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs.map(cv => fixStitchesCss(cv)));
}

type StitchesCSS = {
  className: string;
  toString: () => string;
  selector: string;
  props: { className: string };
};

function isStitchesCss(cv: ClassValue): cv is StitchesCSS {
  return cv != null && typeof cv === 'object' && !Array.isArray(cv) && 'className' in cv;
}

function fixStitchesCss(cv: ClassValue) {
  if (isStitchesCss(cv)) return cv.className;
  return cv;
}
