import { useEffect } from 'react';
import { keyframes } from '@stitches/react';

import type { TileProps } from './types';
import { TileBase } from './base';
import { useStore, useDispatch } from '~/store';
import { gameOver } from '~/store/actions';
import { styled } from '~/styles';

export function GoalTile(props: TileProps<'goal'>) {
  const { x, y } = props;
  const playerPos = useStore(s => s.player.pos);
  const dispatch = useDispatch();

  useEffect(() => {
    if (playerPos.x === x && playerPos.y === y) dispatch(gameOver(true));
  }, [playerPos, x, y]);

  return (
    <TileBase {...props} css={props.css}>
      <Base>
        <Inner>
          <Center>
            <Inner />
          </Center>
        </Inner>
      </Base>
    </TileBase>
  );
}

const swapBlack = keyframes({
  '0%': { backgroundColor: 'var(--base-color)' },
  '50%': { backgroundColor: 'gold' },
  '100%': { backgroundColor: 'var(--base-color)' },
});

const swapGold = keyframes({
  '0%': { backgroundColor: 'gold' },
  '50%': { backgroundColor: 'var(--base-color)' },
  '100%': { backgroundColor: 'gold' },
});

const Base = styled('div', {
  position: 'absolute',
  inset: '0px',
  backgroundColor: 'gold',
  animationName: swapGold.toString(),
  animationTimingFunction: 'step-end',
  animationDuration: '500ms',
  animationIterationCount: 'infinite',
});

const Inner = styled('div', {
  position: 'absolute',
  inset: '4px',
  backgroundColor: 'var(--base-color)',
  animationName: swapBlack.toString(),
  animationTimingFunction: 'step-end',
  animationDuration: '500ms',
  animationIterationCount: 'infinite',
});

const Center = styled('div', {
  position: 'absolute',
  inset: '4px',
  backgroundColor: 'gold',
  animationName: swapGold.toString(),
  animationTimingFunction: 'step-end',
  animationDuration: '500ms',
  animationIterationCount: 'infinite',
});
