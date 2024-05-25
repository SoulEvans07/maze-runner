import { produce } from 'immer';

import type { Action, GameState } from './types';
import { dash, dashNext } from '~/model/player';
import { direction } from '~/model/common';
import { Vect2 } from '~/utils/vector';

export function rootReducer(state: GameState, action: Action): GameState {
  return produce(state, draft => {
    switch (action.type) {
      case 'maze.runner/map/load': {
        draft.map.data = action.payload.map;
        break;
      }
      case 'maze.runner/game/over': {
        draft.game.over = true;
        draft.game.win = action.payload.win;
        break;
      }
      case 'maze.runner/player/dash': {
        const { pos, dist } = dash(draft.map, draft.player.pos, action.payload.dir);
        draft.player.pos = pos;
        draft.player.dist = dist;
        draft.player.vel = Vect2.zero;
        break;
      }
      case 'maze.runner/player/turn': {
        draft.player.vel = direction[action.payload.dir];
        break;
      }
      case 'maze.runner/player/stop': {
        draft.player.vel = Vect2.zero;
        break;
      }
      case 'maze.runner/game/tick': {
        if (!Vect2.eq(draft.player.vel, Vect2.zero)) {
          const { pos, vel } = dashNext(draft.map, draft.player.pos, draft.player.vel);
          draft.player.pos = pos;
          draft.player.vel = vel;
          draft.player.dist = Vect2.eq(vel, Vect2.zero) ? 0 : 1;
        }
        break;
      }
      default: {
        return draft;
      }
    }
  });
}
