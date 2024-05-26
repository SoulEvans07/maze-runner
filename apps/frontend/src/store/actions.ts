import { action } from 'typesafe-actions';

import { Dir, Pos } from '~/model/common';
import { MapGrid } from '~/model/map';

export const loadMap = (map: MapGrid) => action('maze.runner/map/load', { map });

export const playerDash = (dir: Dir) => action('maze.runner/player/dash', { dir });
export const playerTurn = (dir: Dir) => action('maze.runner/player/turn', { dir });
export const playerStop = () => action('maze.runner/player/stop');

export const gameOver = (win: boolean) => action('maze.runner/game/over', { win });
export const gameTick = () => action('maze.runner/game/tick');

export const pickupCoin = (pos: Pos) => action('maze.runner/score/coin', { pos });
