import type { CellType, MapData } from '~/components/tiles/types';

const raw: CellType[][] = [
  ['wall', 'empty', 'wall', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['wall', 'empty', 'wall', 'empty', 'empty', 'empty', 'wall', 'empty'],
  ['wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['wall', 'empty', 'empty', 'empty', 'empty', 'wall', 'empty', 'empty'],
  ['wall', 'wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'wall'],
  ['wall', 'empty', 'empty', 'empty', 'wall', 'empty', 'empty', 'goal'],
  ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
] as const;

export const mapData: MapData = raw.map(r =>
  r.map(c => {
    if (c === 'wall') return { type: c };
    return { type: c, coin: 1 };
  })
);
