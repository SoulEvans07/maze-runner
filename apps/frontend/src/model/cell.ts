import type { Cell, CellType } from '~/components/tiles/types';

const solids: CellType[] = ['wall'];

export function isSolid(cell: Cell) {
  return solids.includes(cell.type);
}
