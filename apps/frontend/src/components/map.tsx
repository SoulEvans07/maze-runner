import { useMemo, useState } from 'react';

import { styled } from '~/styles';
import { useGlobalListener } from '~/utils/hooks/event-listener';
import { mapData } from '~/data/map';
import { Tile } from './tiles';

const cellSize = '2rem';
const size = {
  w: mapData[0].length,
  h: mapData.length,
};

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

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function Map() {
  const [player, updatePlayer] = useState<PlayerProps>({ x: 1, y: 1 });

  useGlobalListener('keydown', ev => {
    if (ev.repeat) return;

    switch (ev.key.toLowerCase()) {
      case controls.alt.up:
      case controls.up:
        return void updatePlayer(prev => {
          const next = { ...prev, y: clamp(prev.y - 1, 0, size.h - 1) };
          if (mapData[next.y][next.x].type === 'empty') return next;
          return prev;
        });
      case controls.alt.right:
      case controls.right:
        return void updatePlayer(prev => {
          const next = { ...prev, x: clamp(prev.x + 1, 0, size.w - 1) };
          if (mapData[next.y][next.x].type === 'empty') return next;
          return prev;
        });
      case controls.alt.down:
      case controls.down:
        return void updatePlayer(prev => {
          const next = { ...prev, y: clamp(prev.y + 1, 0, size.h - 1) };
          if (mapData[next.y][next.x].type === 'empty') return next;
          return prev;
        });
      case controls.alt.left:
      case controls.left:
        return void updatePlayer(prev => {
          const next = { ...prev, x: clamp(prev.x - 1, 0, size.w - 1) };
          if (mapData[next.y][next.x].type === 'empty') return next;
          return prev;
        });
    }
  });

  return (
    <Grid>
      <Player {...player} />
      {mapData.map((row, r) => (
        <Row key={r} id={`row-${r}`}>
          {row.map((cell, c) => (
            <Tile key={`${r}-${c}`} data={cell} x={c} y={r} />
          ))}
        </Row>
      ))}
    </Grid>
  );
}

type PlayerProps = { x: number; y: number };
function Player(props: PlayerProps) {
  const { x, y } = props;

  const style = useMemo(() => ({ '--px': x, '--py': y }), [x, y]);

  return <PlayerCircle data-type="player" css={style} />;
}

const PlayerCircle = styled('div', {
  size: cellSize,
  position: 'absolute',
  borderRadius: '50%',
  backgroundColor: 'red',
  transition: 'transform 200ms linear',
  transform: `translate(calc(var(--px) * ${cellSize}), calc(var(--py) * ${cellSize}))`,
});

const Grid = styled('div', {
  position: 'relative',
  display: 'grid',
  gridAutoRows: cellSize,
  gridTemplateColumns: cellSize,
  gridAutoFlow: 'row',
});

const Row = styled('div', {
  display: 'grid',
  gridTemplateRows: cellSize,
  gridAutoColumns: cellSize,
  gridAutoFlow: 'column',
});
