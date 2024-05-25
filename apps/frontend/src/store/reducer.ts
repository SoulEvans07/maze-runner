import { produce } from 'immer';

import type { Action, GameState } from './types';
import { dash } from '~/model/player';

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
        draft.player.moving = true;
        break;
      }
      case 'maze.runner/player/stop': {
        draft.player.moving = false;
        break;
      }
      default: {
        return draft;
      }
    }
  });
}
