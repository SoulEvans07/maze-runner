import { useEffect } from 'react';

import { useDispatch, useStore } from '~/store';
import { gameTick } from '~/store/actions';

export const tickSpeed = 50;

export function GameEngine() {
  const dispatch = useDispatch();
  const gameOver = useStore(s => s.game.over);

  useEffect(() => {
    if (gameOver) return;
    const handler = setInterval(() => dispatch(gameTick()), tickSpeed);
    return () => clearInterval(handler);
  }, [gameOver]);

  return null;
}
