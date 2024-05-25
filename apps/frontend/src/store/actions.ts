import { action } from 'typesafe-actions';
import { MapData } from '~/components/tiles/types';

import { Dir } from '~/model/common';

export const loadMap = (map: MapData) => action('maze.runner/map/load', { map });

export const playerDash = (dir: Dir) => action('maze.runner/player/dash', { dir });
export const playerStop = (dir: Dir) => action('maze.runner/player/dash', { dir });

export const gameOver = (win: boolean) => action('maze.runner/game/over', { win });
