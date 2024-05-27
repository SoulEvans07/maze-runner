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

export function inBetweenCells(pos: Pos) {
  return !Number.isInteger(pos.x) || !Number.isInteger(pos.y);
}

export function getNextCell(map: MapData, pos: Pos, vel: Pos) {
  const intPos = {
    x: vel.x >= 0 ? Math.floor(pos.x) : Math.ceil(pos.x),
    y: vel.y >= 0 ? Math.floor(pos.y) : Math.ceil(pos.y),
  };
  const intVel = {
    x: vel.x >= 0 ? Math.ceil(vel.x) : Math.floor(vel.x),
    y: vel.y >= 0 ? Math.ceil(vel.y) : Math.floor(vel.y),
  };

  const nextPos = Vect2.add(intPos, intVel);
  return { cell: map.data[nextPos.y][nextPos.x], pos: nextPos };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).getNextCell = getNextCell;
