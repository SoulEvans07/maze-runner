import { Vect2 } from '~/utils/vector';
import { direction, type Dir, type Pos } from './common';
import { isOutOfBounds, type Map } from './map';
import { isDamaging, isSolid } from './cell';

export function dash(map: Map, prev: Pos, dir: Dir, dist = 0): { pos: Pos; dist: number } {
  const next = Vect2.add(prev, direction[dir]);

  if (isOutOfBounds(map, next)) return { pos: prev, dist };
  if (isSolid(map.data[next.y][next.x])) return { pos: prev, dist: dist + 1 };
  return dash(map, next, dir, dist + 1);
}

export function dashNext(map: Map, prev: Pos, vel: Pos): { pos: Pos; vel: Pos; dmg: number } {
  const next = Vect2.add(prev, vel);

  if (isOutOfBounds(map, next)) return { pos: prev, vel: Vect2.zero, dmg: 0 };

  const nextCell = map.data[next.y][next.x];
  if (isDamaging(nextCell)) return { pos: prev, vel: Vect2.zero, dmg: 1 };
  if (isSolid(nextCell)) return { pos: prev, vel: Vect2.zero, dmg: 0 };

  return { pos: next, vel, dmg: 0 };
}
