import { Pos } from '~/model/common';

export class Vect2 {
  static add(a: Pos, b: Pos): Pos {
    return { x: a.x + b.x, y: a.y + b.y };
  }
}
