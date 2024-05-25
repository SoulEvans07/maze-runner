import { useEffect } from 'react';
import type { CSS } from '@stitches/react';

import type { TileProps } from './types';
import { TileBase } from './base';
import { styled } from '~/styles';
import { useStore, useDispatch } from '~/store';
import { pickupCoin } from '~/store/actions';

export function EmptyTile(props: TileProps<'empty'>) {
  const {
    data: { coin },
    x,
    y,
  } = props;

  const playerPos = useStore(s => s.player.pos);
  const dispatch = useDispatch();

  useEffect(() => {
    if (playerPos.x === x && playerPos.y === y) dispatch(pickupCoin({ x, y }));
  }, [playerPos, x, y]);

  return (
    <TileBase {...props} css={{ ...props.css, ...empty }}>
      {coin > 0 && <Coin />}
    </TileBase>
  );
}

const empty: CSS = {};

const Coin = styled('div', {
  size: '0.5rem',
  backgroundColor: 'orange',
  borderRadius: '50%',
});
