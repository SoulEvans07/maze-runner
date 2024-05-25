import type { ActionType } from 'typesafe-actions';

import { Pos } from '~/model/common';
import { MapData } from '~/components/tiles/types';

import * as actions from './actions';
export type Action = ActionType<typeof actions>;
export type StoreDispatch = React.Dispatch<Action>;

export type GameState = {
  game: { over: boolean; win: boolean };
  player: {
    pos: Pos;
    dist: number;
    moving: boolean;
  };
  map: {
    data: MapData;
    size: { w: number; h: number };
  };
};
