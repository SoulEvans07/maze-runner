export type Pos = { x: number; y: number };

export const direction = {
  up: { x: 0, y: -1 },
  right: { x: 1, y: 0 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
} as const satisfies Record<string, { x: 1 | 0 | -1; y: 1 | 0 | -1 }>;
export type Dir = keyof typeof direction;
