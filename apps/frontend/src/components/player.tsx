import { useEffect, useMemo } from 'react';

import { useStore, useDispatch } from '~/store';
import { playerDash, playerStop } from '~/store/actions';
import { useGlobalListener } from '~/utils/hooks/event-listener';
import { cellSize } from '~/model/cell';
import { styled } from '~/styles';

const moveSpeed = 25; // per tile
const crudeCoyoteTime = moveSpeed * 0.8;

export function Player() {
  const gameOver = useStore(s => s.game.over);
  const player = useStore(s => s.player);
  const dispatch = useDispatch();

  useEffect(() => {
    const handler = setTimeout(() => void dispatch(playerStop()), player.dist * moveSpeed - crudeCoyoteTime);
    return () => void clearTimeout(handler);
  }, [player.dist, player.moving]);

  useGlobalListener('keydown', ev => {
    if (gameOver) return;
    if (player.moving) return;
    if (ev.repeat) return;

    switch (ev.key.toLowerCase()) {
      case controls.alt.up:
      case controls.up:
        return void dispatch(playerDash('up'));
      case controls.alt.right:
      case controls.right:
        return void dispatch(playerDash('right'));
      case controls.alt.down:
      case controls.down:
        return void dispatch(playerDash('down'));
      case controls.alt.left:
      case controls.left:
        return void dispatch(playerDash('left'));
    }
  });

  const style = useMemo(
    () => ({
      '--px': player.pos.x,
      '--py': player.pos.y,
      '--dist': player.dist,
    }),
    [player]
  );

  return <PlayerCircle data-type="player" css={style} />;
}

const controls = {
  up: 'w',
  right: 'd',
  down: 's',
  left: 'a',

  alt: {
    up: 'ArrowUp'.toLowerCase(),
    right: 'ArrowRight'.toLowerCase(),
    down: 'ArrowDown'.toLowerCase(),
    left: 'ArrowLeft'.toLowerCase(),
  },
};

const PlayerCircle = styled('div', {
  size: cellSize,
  position: 'absolute',
  borderRadius: '50%',
  backgroundColor: 'red',
  transitionProperty: 'transform',
  transitionDuration: `calc(var(--dist) * ${moveSpeed}ms)`,
  transitionTimingFunction: 'linear',
  transform: `translate(calc(var(--px) * ${cellSize}), calc(var(--py) * ${cellSize}))`,
});
