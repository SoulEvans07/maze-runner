import { Pos } from '~/model/common';

export class Vect2 {
  static add(a: Pos, b: Pos): Pos {
    return { x: a.x + b.x, y: a.y + b.y };
  }

  static scale(a: Pos, s: number): Pos {
    return { x: a.x * s, y: a.y * s };
  }

  static eq(a: Pos, b: Pos) {
    return a.x === b.x && a.y === b.y;
  }

  static zero: Pos = { x: 0, y: 0 };
}
