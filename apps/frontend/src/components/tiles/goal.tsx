import { useEffect } from 'react';
import type { CSS } from '@stitches/react';

import type { TileProps } from './types';
import { TileBase } from './base';
import { useStore, useDispatch } from '~/store';
import { gameOver } from '~/store/actions';

export function GoalTile(props: TileProps<'goal'>) {
  const { x, y } = props;
  const playerPos = useStore(s => s.player.pos);
  const dispatch = useDispatch();

  useEffect(() => {
    if (playerPos.x === x && playerPos.y === y) dispatch(gameOver(true));
  }, [playerPos, x, y]);

  return <TileBase {...props} css={{ ...props.css, ...goal }} />;
}

const goal: CSS = {
  backgroundColor: 'gold',
};
