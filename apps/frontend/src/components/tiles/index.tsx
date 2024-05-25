import { useMemo } from 'react';

import type { CellComp, CellType, TileProps } from './types';
import { EmptyTile } from './empty';
import { WallTile } from './wall';

type TileMap = {
  [T in CellType]: CellComp<T>;
};

const Tiles: TileMap = {
  empty: EmptyTile,
  wall: WallTile,
};

// NOTE: typescript is not clever enough for this, so here is a function...
function getCellComp<T extends CellType>(type: T): CellComp<T> {
  return Tiles[type];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Tile(props: TileProps<any>) {
  const { data } = props;
  const Comp = useMemo(() => getCellComp(data.type), [data.type]);
  return <Comp {...props} />;
}
