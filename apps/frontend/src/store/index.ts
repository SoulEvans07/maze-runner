import { create } from 'zustand';

import { MapData } from '~/components/tiles/types';
import { mapData } from '~/data/map';
import type { Action, GameState, StoreDispatch } from './types';
import { rootReducer } from './reducer';

type Store = GameState & { dispatch: StoreDispatch };
export const useStore = create<Store>(set => ({
  // state
  game: { over: false, win: false },
  player: {
    pos: { x: 0, y: 0 },
    dist: 0,
    moving: false,
  },
  map: {
    data: mapData,
    size: getSize(mapData),
  },

  // dispatch
  dispatch(action: Action) {
    set(state => rootReducer(state, action));
  },
}));

function getSize(map: MapData) {
  return {
    w: map[0].length,
    h: map.length,
  };
}
