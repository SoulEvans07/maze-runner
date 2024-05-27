import { create } from 'zustand';

import { map2 } from '~/data/map';
import { findGoal, getSize } from '~/model/map';
import type { Action, GameState, StoreDispatch } from './types';
import { rootReducer } from './reducer';
import { Cell } from '~/components/tiles/types';

const map = map2;

type Store = GameState & { dispatch: StoreDispatch };
export const useStore = create<Store>((set, _get, _api) => ({
  // state
  game: { over: false, win: false },
  score: {
    coins: 0,
    steps: 0,
  },
  player: {
    pos: map.playerPos,
    vel: { x: 0, y: 0 },
    dist: 0,
    hp: 1,
  },
  map: {
    data: map.data,
    size: getSize(map.data),
    goal: findGoal(map.data),
  },
  editor: {
    palette: {
      cell: { type: 'empty', coin: 0 },
    },
  },

  // dispatch
  dispatch(action: Action) {
    set(state => rootReducer(state, action));
  },

  // actions
  update() {},
}));

export const useDispatch = () => useStore(s => s.dispatch);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).$store = () => useStore.getState();
