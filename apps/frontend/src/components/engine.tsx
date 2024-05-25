import { useEffect } from 'react';

import { useDispatch } from '~/store';
import { gameTick } from '~/store/actions';

export const tickSpeed = 50;

export function GameEngine() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handler = setInterval(() => dispatch(gameTick()), tickSpeed);
    return () => clearInterval(handler);
  }, []);

  return null;
}
