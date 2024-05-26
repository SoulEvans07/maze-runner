import { create } from 'zustand';

import { mapData } from '~/data/map';
import { findGoal, getSize } from '~/model/map';
import type { Action, GameState, StoreDispatch } from './types';
import { rootReducer } from './reducer';

type Store = GameState & { dispatch: StoreDispatch };
export const useStore = create<Store>((set, get, _api) => ({
  // state
  game: { over: false, win: false },
  score: {
    coins: 0,
    steps: 0,
  },
  player: {
    pos: { x: 1, y: 0 },
    vel: { x: 0, y: 0 },
    dist: 0,
    hp: 1,
  },
  map: {
    data: mapData,
    size: getSize(mapData),
    goal: findGoal(mapData),
  },

  // dispatch
  dispatch(action: Action) {
    set(state => rootReducer(state, action, { dispatch: get().dispatch }));
  },
}));

export const useDispatch = () => useStore(s => s.dispatch);
