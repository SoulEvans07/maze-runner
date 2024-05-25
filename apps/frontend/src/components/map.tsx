import { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';

import { styled } from '~/styles';
import { useGlobalListener } from '~/utils/hooks/event-listener';
import { mapData } from '~/data/map';
import { Tile } from './tiles';
import { Cell, CellType } from './tiles/types';

const moveSpeed = 50; // per tile
const crudeCoyoteTime = moveSpeed * 0.5;

type MapData = Cell[][];

function getSize(map: MapData) {
  return {
    w: map[0].length,
    h: map.length,
  };
}
const cellSize = '2rem';
const size = getSize(mapData);

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

type Pos = { x: number; y: number };

const directions = {
  up: { x: 0, y: -1 },
  right: { x: 1, y: 0 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
} as const satisfies Record<string, { x: 1 | 0 | -1; y: 1 | 0 | -1 }>;
type DirName = keyof typeof directions;

const solids: CellType[] = ['wall'];
function isSolid(cell: Cell) {
  return solids.includes(cell.type);
}

function isOutOfBounds(pos: Pos) {
  if (pos.x < 0 || pos.x >= size.w) return true;
  if (pos.y < 0 || pos.y >= size.h) return true;
  return false;
}

function dash(map: MapData, prev: Pos, dir: DirName, dist = 0): { pos: Pos; dist: number } {
  const next = {
    x: prev.x + directions[dir].x,
    y: prev.y + directions[dir].y,
  };

  if (isOutOfBounds(next)) return { pos: prev, dist };
  if (isSolid(map[next.y][next.x])) return { pos: prev, dist: dist + 1 };
  return dash(map, next, dir, dist + 1);
}

export function Map() {
  const [player, updatePlayer] = useState<PlayerProps>({ pos: { x: 1, y: 1 }, dist: 0, moving: false });
  const stop = () => updatePlayer(prev => ({ ...prev, moving: false }));

  useEffect(() => {
    const handler = setTimeout(() => void stop(), player.dist * moveSpeed - crudeCoyoteTime);
    return () => void clearTimeout(handler);
  }, [player.dist, player.moving]);

  useGlobalListener('keydown', ev => {
    if (ev.repeat) return;
    if (player.moving) return;

    switch (ev.key.toLowerCase()) {
      case controls.alt.up:
      case controls.up:
        return void updatePlayer(prev => ({ ...prev, moving: true, ...dash(mapData, prev.pos, 'up') }));
      case controls.alt.right:
      case controls.right:
        return void updatePlayer(prev => ({ ...prev, moving: true, ...dash(mapData, prev.pos, 'right') }));
      case controls.alt.down:
      case controls.down:
        return void updatePlayer(prev => ({ ...prev, moving: true, ...dash(mapData, prev.pos, 'down') }));
      case controls.alt.left:
      case controls.left:
        return void updatePlayer(prev => ({ ...prev, moving: true, ...dash(mapData, prev.pos, 'left') }));
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

type PlayerProps = { pos: Pos; dist: number; moving: boolean };
function Player(props: PlayerProps) {
  const {
    pos: { x, y },
    dist,
  } = props;

  const style = useMemo(() => ({ '--px': x, '--py': y, '--dist': dist }), [x, y]);

  return <PlayerCircle data-type="player" css={style} />;
}

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
