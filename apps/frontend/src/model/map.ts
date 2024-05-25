import { Cell } from '~/components/tiles/types';
import { Pos } from './common';

export type MapData = Cell[][];
export type Map = {
  data: MapData;
  size: { w: number; h: number };
};

export function isOutOfBounds(map: Map, pos: Pos) {
  if (pos.x < 0 || pos.x >= map.size.w) return true;
  if (pos.y < 0 || pos.y >= map.size.h) return true;
  return false;
}
