import type { ActionType } from 'typesafe-actions';

import * as actions from './actions';
export type Action = ActionType<typeof actions>;
export type StoreDispatch = React.Dispatch<Action>;

import { Pos } from '~/model/common';
import { Map } from '~/model/map';

export type GameState = {
  game: { over: boolean; win: boolean };
  player: {
    pos: Pos;
    vel: Pos;
    dist: number;
  };
  map: Map;
};
