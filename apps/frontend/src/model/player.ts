import { Vect2 } from '~/utils/vector';
import { direction, type Dir, type Pos } from './common';
import { isOutOfBounds, type Map } from './map';
import { isSolid } from './cell';

export function dash(map: Map, prev: Pos, dir: Dir, dist = 0): { pos: Pos; dist: number } {
  const next = Vect2.add(prev, direction[dir]);

  if (isOutOfBounds(map, next)) return { pos: prev, dist };
  if (isSolid(map.data[next.y][next.x])) return { pos: prev, dist: dist + 1 };
  return dash(map, next, dir, dist + 1);
}