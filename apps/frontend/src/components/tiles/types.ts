import { z } from 'zod';
import type { CSS } from '@stitches/react';

import { EmptyTile } from './empty';
import { WallTile } from './wall';
import { GoalTile } from './goal';
import { SpikeTile } from './spike';

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

export const cells = [EmptyCell, WallCell, GoalCell, SpikeCell] as const;
export const Cell = z.discriminatedUnion('type', [...cells]);
export type Cell = z.infer<typeof Cell>;
export type CellType = Cell['type'];
export type CellFor<T extends CellType> = Extract<Cell, { type: T }>;

export type TileProps<T extends CellType> = React.PropsWithChildren<{
  css?: CSS;
  x: number;
  y: number;
  data: CellFor<T>;
  edit?: boolean;
}>;

export type CellComp<T extends CellType> = React.FC<TileProps<T>>;

type TileMap = {
  [T in CellType]: CellComp<T>;
};

export const Tiles: TileMap = {
  empty: EmptyTile,
  wall: WallTile,
  spike: SpikeTile,
  goal: GoalTile,
};

// NOTE: typescript is not clever enough for this, so here is a function...
export function getCellComp<T extends CellType>(type: T): CellComp<T> {
  return Tiles[type];
}
