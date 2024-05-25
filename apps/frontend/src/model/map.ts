import { Cell } from '~/components/tiles/types';
import { Pos } from './common';

export type MapData = Cell[][];
export type Map = {
  data: MapData;
  size: { w: number; h: number };
  goal: Pos;
};

export function isOutOfBounds(map: Map, pos: Pos) {
  if (pos.x < 0 || pos.x >= map.size.w) return true;
  if (pos.y < 0 || pos.y >= map.size.h) return true;
  return false;
}

export function getSize(map: MapData) {
  return {
    w: map[0].length,
    h: map.length,
  };
}

export function findGoal(map: MapData): Pos {
  for (let y = 0; y < map.length; y++) {
    const row = map[y];

    for (let x = 0; x < row.length; x++) {
      const cell = row[x];

      if (cell.type === 'goal') return { x, y };
    }
  }
  throw new Error('No Goal found in Map');
}
