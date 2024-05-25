import { create } from 'zustand';

import { mapData } from '~/data/map';
import { findGoal, getSize } from '~/model/map';
import type { Action, GameState, StoreDispatch } from './types';
import { rootReducer } from './reducer';

type Store = GameState & { dispatch: StoreDispatch };
export const useStore = create<Store>((set, _get) => ({
  // state
  game: { over: false, win: false },
  player: {
    pos: { x: 1, y: 0 },
    dist: 0,
    moving: false,
  },
  map: {
    data: mapData,
    size: getSize(mapData),
    goal: findGoal(mapData),
  },

  // dispatch
  dispatch(action: Action) {
    set(state => rootReducer(state, action));
  },
}));

export const useDispatch = () => useStore(s => s.dispatch);
