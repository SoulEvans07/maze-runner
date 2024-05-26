import { Cell } from '~/components/tiles/types';
import { Pos } from './common';
import { Vect2 } from '~/utils/vector';

export type MapGrid = Cell[][];
export type MapData = {
  data: MapGrid;
  size: { w: number; h: number };
  goal: Pos;
};

export function isOutOfBounds(map: MapData, pos: Pos) {
  if (pos.x < 0 || pos.x >= map.size.w) return true;
  if (pos.y < 0 || pos.y >= map.size.h) return true;
  return false;
}

export function getSize(map: MapGrid) {
  return {
    w: map[0].length,
    h: map.length,
  };
}

export function findGoal(map: MapGrid): Pos {
  for (let y = 0; y < map.length; y++) {
    const row = map[y];

    for (let x = 0; x < row.length; x++) {
      const cell = row[x];

      if (cell.type === 'goal') return { x, y };
    }
  }
  throw new Error('No Goal found in Map');
}

export function getNeighbors(map: MapData, pos: Pos) {
  const topV = Vect2.add(pos, Vect2.up);
  const top = isOutOfBounds(map, topV) ? undefined : map.data[topV.y][topV.x];

  const rightV = Vect2.add(pos, Vect2.right);
  const right = isOutOfBounds(map, rightV) ? undefined : map.data[rightV.y][rightV.x];

  const bottomV = Vect2.add(pos, Vect2.down);
  const bottom = isOutOfBounds(map, bottomV) ? undefined : map.data[bottomV.y][bottomV.x];

  const leftV = Vect2.add(pos, Vect2.left);
  const left = isOutOfBounds(map, leftV) ? undefined : map.data[leftV.y][leftV.x];

  return { top, right, bottom, left };
}
