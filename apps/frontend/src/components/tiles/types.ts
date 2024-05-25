import { z } from 'zod';

export const CellBase = z.object({ type: z.string() });
export type CellBase = z.infer<typeof CellBase>;

export const EmptyCell = CellBase.extend({ type: z.literal('empty') });
export type EmptyCell = z.infer<typeof EmptyCell>;
export const WallCell = CellBase.extend({ type: z.literal('wall') });
export type WallCell = z.infer<typeof WallCell>;

export const Cell = z.discriminatedUnion('type', [EmptyCell, WallCell]);
export type Cell = z.infer<typeof Cell>;
export type CellType = Cell['type'];
export type CellFor<T extends CellType> = Extract<Cell, { type: T }>;

export type TileProps<T extends CellType> = React.PropsWithChildren<{
  className?: string;
  x: number;
  y: number;
  data: CellFor<T>;
}>;

export type CellComp<T extends CellType> = React.FC<TileProps<T>>;
