import { z } from 'zod';
import type { CSS } from '@stitches/react';

export const CellBase = z.object({ type: z.string() });
export type CellBase = z.infer<typeof CellBase>;

export const EmptyCell = CellBase.extend({
  type: z.literal('empty'),
  coin: z.number().default(0),
});
export type EmptyCell = z.infer<typeof EmptyCell>;

export const WallCell = CellBase.extend({ type: z.literal('wall') });
export type WallCell = z.infer<typeof WallCell>;

export const SpikeCell = CellBase.extend({ type: z.literal('spike') });
export type SpikeCell = z.infer<typeof SpikeCell>;

export const GoalCell = CellBase.extend({ type: z.literal('goal') });
export type GoalCell = z.infer<typeof GoalCell>;

export const Cell = z.discriminatedUnion('type', [EmptyCell, WallCell, GoalCell, SpikeCell]);
export type Cell = z.infer<typeof Cell>;
export type CellType = Cell['type'];
export type CellFor<T extends CellType> = Extract<Cell, { type: T }>;

export type TileProps<T extends CellType> = React.PropsWithChildren<{
  css?: CSS;
  x: number;
  y: number;
  data: CellFor<T>;
}>;

export type CellComp<T extends CellType> = React.FC<TileProps<T>>;
