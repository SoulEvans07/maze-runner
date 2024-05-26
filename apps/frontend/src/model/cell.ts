import type { Cell, CellType } from '~/components/tiles/types';

export const cellSize = '2rem';
export const solids: CellType[] = ['wall', 'spike'];
export const hazzards: CellType[] = ['spike'];

export function isSolid(cell: Cell) {
  return solids.includes(cell.type);
}

export function isDamaging(cell: Cell) {
  return hazzards.includes(cell.type);
}
