import type { CellType } from '~/components/tiles/types';
import { MapGrid } from '~/model/map';

const raw: CellType[][] = [
  ['wall', 'empty', 'wall', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['wall', 'empty', 'spike', 'spike', 'empty', 'wall', 'wall', 'empty'],
  ['wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['wall', 'empty', 'empty', 'empty', 'empty', 'wall', 'empty', 'empty'],
  ['wall', 'wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'wall'],
  ['wall', 'empty', 'empty', 'empty', 'wall', 'empty', 'empty', 'goal'],
  ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
] as const;

export const mapData: MapGrid = raw.map(r =>
  r.map(c => {
    if (c === 'empty') return { type: c, coin: 1 };
    return { type: c };
  })
);
