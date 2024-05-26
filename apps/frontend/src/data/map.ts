import type { Cell, CellType } from '~/components/tiles/types';
import { Pos } from '~/model/common';
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

// prettier-ignore
const raw01: (CellType | 'empt' | 'spik' | 'coin')[][] = [
  ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
  ['wall', 'coin', 'coin', 'coin', 'coin', 'wall', 'goal', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
  ['wall', 'coin', 'wall', 'wall', 'coin', 'wall', 'coin', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
  ['wall', 'coin', 'wall', 'wall', 'coin', 'coin', 'coin', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
  ['wall', 'coin', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'coin', 'coin', 'coin', 'wall'],
  ['wall', 'coin', 'wall', 'coin', 'coin', 'coin', 'wall', 'coin', 'coin', 'coin', 'coin', 'coin', 'wall', 'coin', 'wall'],
  ['wall', 'coin', 'coin', 'coin', 'wall', 'coin', 'coin', 'coin', 'wall', 'wall', 'empt', 'wall', 'wall', 'coin', 'wall'],
  ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'coin', 'coin', 'coin', 'wall', 'coin', 'wall'],
  ['wall', 'coin', 'coin', 'coin', 'coin', 'coin', 'coin', 'wall', 'wall', 'coin', 'wall', 'coin', 'empt', 'coin', 'wall'],
  ['wall', 'coin', 'wall', 'wall', 'wall', 'wall', 'coin', 'wall', 'wall', 'coin', 'empt', 'coin', 'wall', 'coin', 'wall'],
  ['wall', 'coin', 'wall', 'wall', 'wall', 'wall', 'coin', 'coin', 'coin', 'coin', 'wall', 'coin', 'coin', 'coin', 'wall'],
  ['wall', 'coin', 'coin', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
  ['wall', 'wall', 'coin', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
  ['wall', 'wall', 'coin', 'coin', 'coin', 'wall', 'wall', 'coin', 'coin', 'coin', 'coin', 'coin', 'wall', 'wall', 'wall'],
  ['wall', 'spik', 'coin', 'coin', 'coin', 'coin', 'wall', 'coin', 'empt', 'empt', 'empt', 'coin', 'wall', 'wall', 'wall'],
  ['wall', 'wall', 'wall', 'wall', 'coin', 'coin', 'coin', 'coin', 'wall', 'wall', 'wall', 'coin', 'coin', 'coin', 'wall'],
  ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'spik', 'spik', 'coin', 'wall'],
  ['wall', 'empt', 'empt', 'empt', 'empt', 'empt', 'coin', 'coin', 'coin', 'wall', 'wall', 'wall', 'spik', 'coin', 'wall'],
  ['wall', 'empt', 'empt', 'empt', 'empt', 'empt', 'wall', 'wall', 'coin', 'wall', 'wall', 'wall', 'wall', 'coin', 'wall'],
  ['wall', 'empt', 'empt', 'empt', 'empt', 'empt', 'wall', 'wall', 'coin', 'empt', 'empt', 'empt', 'empt', 'coin', 'wall'],
  ['wall', 'empt', 'empt', 'empt', 'empt', 'empt', 'wall', 'wall', 'coin', 'coin', 'coin', 'coin', 'coin', 'coin', 'wall'],
  ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
] as const;

export const map2: { data: MapGrid; playerPos: Pos } = {
  playerPos: { x: 3, y: 20 },
  data: raw01.map(r =>
    r.map((c): Cell => {
      if (c === 'coin') return { type: 'empty', coin: 1 };
      if (c === 'empt' || c === 'empty') return { type: 'empty', coin: 0 };
      if (c === 'spik' || c === 'spike') return { type: 'spike' };
      return { type: c };
    })
  ),
};
