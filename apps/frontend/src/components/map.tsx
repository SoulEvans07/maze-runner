import { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';

import { styled } from '~/styles';
import { useGlobalListener } from '~/utils/hooks/event-listener';
import { mapData } from '~/data/map';
import { Pos } from '~/model/common';
import { Tile } from './tiles';
import type { MapData } from './tiles/types';
import { dash } from '~/model/player';
import { Map } from '~/model/map';

const moveSpeed = 25; // per tile
const crudeCoyoteTime = moveSpeed * 0.8;

function getSize(map: MapData) {
  return {
    w: map[0].length,
    h: map.length,
  };
}
const cellSize = '2rem';
const map: Map = { data: mapData, size: getSize(mapData) };

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

function findGoal(map: MapData): Pos {
  for (let y = 0; y < map.length; y++) {
    const row = map[y];

    for (let x = 0; x < row.length; x++) {
      const cell = row[x];

      if (cell.type === 'goal') return { x, y };
    }
  }
  throw new Error('No Goal found in Map');
}

const goalPos = findGoal(mapData);

export function GameMap() {
  const [player, updatePlayer] = useState<PlayerProps>({ pos: { x: 1, y: 1 }, dist: 0, moving: false });
  const stop = () => updatePlayer(prev => ({ ...prev, moving: false }));

  useEffect(() => {
    const handler = setTimeout(() => void stop(), player.dist * moveSpeed - crudeCoyoteTime);
    return () => void clearTimeout(handler);
  }, [player.dist, player.moving]);

  useGlobalListener('keydown', ev => {
    if (hasWon) return;
    if (player.moving) return;
    if (ev.repeat) return;

    switch (ev.key.toLowerCase()) {
      case controls.alt.up:
      case controls.up:
        return void updatePlayer(prev => ({ ...prev, moving: true, ...dash(map, prev.pos, 'up') }));
      case controls.alt.right:
      case controls.right:
        return void updatePlayer(prev => ({ ...prev, moving: true, ...dash(map, prev.pos, 'right') }));
      case controls.alt.down:
      case controls.down:
        return void updatePlayer(prev => ({ ...prev, moving: true, ...dash(map, prev.pos, 'down') }));
      case controls.alt.left:
      case controls.left:
        return void updatePlayer(prev => ({ ...prev, moving: true, ...dash(map, prev.pos, 'left') }));
    }
  });

  const hasWon = useMemo(() => player.pos.x === goalPos.x && player.pos.y === goalPos.y, [player.pos, goalPos]);

  return (
    <Grid>
      {hasWon && <CongratulationsBanner>You Won!</CongratulationsBanner>}
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

const CongratulationsBanner = styled('div', {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  left: 0,
  right: 0,
  height: '4rem',
  backgroundColor: 'black',
  color: 'white',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

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
  width: 'fit-content',
  gridTemplateColumns: `calc(${map.size.h} * ${cellSize})`,
  gridAutoRows: cellSize,
  gridAutoFlow: 'row',
});

const Row = styled('div', {
  display: 'grid',
  gridTemplateRows: cellSize,
  gridAutoColumns: cellSize,
  gridAutoFlow: 'column',
});
