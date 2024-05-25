import { useMemo, CSSProperties } from 'react';

import { useStore, useDispatch } from '~/store';
import { playerTurn } from '~/store/actions';
import { useGlobalListener } from '~/utils/hooks/event-listener';
import { cellSize } from '~/model/cell';
import { styled } from '~/styles';
import { Vect2 } from '~/utils/vector';
import { tickSpeed } from './engine';

export function Player() {
  const gameOver = useStore(s => s.game.over);
  const player = useStore(s => s.player);
  const dispatch = useDispatch();

  useGlobalListener('keydown', ev => {
    if (gameOver) return;
    if (!Vect2.eq(player.vel, Vect2.zero)) return;
    if (ev.repeat) return;

    switch (ev.key.toLowerCase()) {
      case controls.alt.up:
      case controls.up:
        return void dispatch(playerTurn('up'));
      case controls.alt.right:
      case controls.right:
        return void dispatch(playerTurn('right'));
      case controls.alt.down:
      case controls.down:
        return void dispatch(playerTurn('down'));
      case controls.alt.left:
      case controls.left:
        return void dispatch(playerTurn('left'));
    }
  });

  const style = useMemo(() => {
    return {
      '--px': player.pos.x,
      '--py': player.pos.y,
      '--dist': player.dist,
    } as CSSProperties;
  }, [player]);

  return <PlayerCircle data-type="player" style={style} />;
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
  transitionDuration: `calc(var(--dist) * ${tickSpeed}ms)`,
  transitionTimingFunction: 'linear',
  transform: `translate(calc(var(--px) * ${cellSize}), calc(var(--py) * ${cellSize}))`,
});
