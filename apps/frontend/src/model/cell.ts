import type { Cell, CellType } from '~/components/tiles/types';

export const cellSize = '2rem';
export const solids: CellType[] = ['wall'];

export function isSolid(cell: Cell) {
  return solids.includes(cell.type);
}
