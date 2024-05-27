import type { ActionType } from 'typesafe-actions';

import * as actions from './actions';
export type Action = ActionType<typeof actions>;
export type StoreDispatch = React.Dispatch<Action>;

import { Pos } from '~/model/common';
import { MapData } from '~/model/map';
import { Cell } from '~/components/tiles/types';

export type GameState = {
  game: { over: boolean; win: boolean };
  score: {
    coins: number;
    steps: number;
  };
  player: {
    pos: Pos;
    vel: Pos;
    dist: number;
    hp: number;
  };
  map: MapData;
  editor: {
    palette: {
      cell: Cell;
    };
  };
};
