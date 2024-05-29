import { produce } from 'immer';

import type { Action, GameState } from './types';
import { dash, dashNext } from '~/model/player';
import { direction } from '~/model/common';
import { Vect2 } from '~/utils/vector';
import { playerSpeed } from '~/components/engine';
import { findGoal } from '~/model/map';

export function rootReducer(state: GameState, action: Action): GameState {
  return produce(state, draft => {
    switch (action.type) {
      case 'maze.runner/map/load': {
        draft.map.data = action.payload.map;
        break;
      }
      case 'maze.runner/edit/palette/change': {
        draft.editor.palette.cell = action.payload.cell;
        break;
      }
      case 'maze.runner/edit/map': {
        const { pos } = action.payload;
        if (draft.map.data[pos.y][pos.x].type === 'goal') return draft;

        draft.map.data[pos.y][pos.x] = draft.editor.palette.cell;

        if (draft.editor.palette.cell.type === 'goal') {
          const { goal } = draft.map;
          draft.map.data[goal.y][goal.x] = { type: 'empty', coin: 0 };
          draft.map.goal = findGoal(draft.map.data); // P3: turn into subscription
        }
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
        draft.player.vel = Vect2.scale(direction[action.payload.dir], playerSpeed);
        draft.score.steps++;
        break;
      }
      case 'maze.runner/score/coin': {
        const { x, y } = action.payload.pos;
        const cell = draft.map.data[y][x];

        if (cell.type === 'empty') {
          draft.score.coins += cell.coin;
          cell.coin = 0;
        }
        break;
      }
      case 'maze.runner/player/stop': {
        draft.player.vel = Vect2.zero;
        break;
      }
      case 'maze.runner/game/tick': {
        if (draft.game.over) return;

        if (!Vect2.eq(draft.player.vel, Vect2.zero)) {
          const { pos, vel, dmg } = dashNext(draft.map, draft.player.pos, draft.player.vel);
          draft.player.pos = pos;
          draft.player.vel = vel;
          draft.player.dist = Vect2.eq(vel, Vect2.zero) ? 0 : 1;

          draft.player.hp -= dmg;
          if (draft.player.hp <= 0) draft.game.over = true; // P3: turn into subscription or move it to Player
        }

        break;
      }
      default: {
        return draft;
      }
    }
  });
}
