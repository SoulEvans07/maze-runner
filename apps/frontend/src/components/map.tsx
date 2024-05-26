import _ from 'lodash';

import { useStore } from '~/store';
import { styled } from '~/styles';
import { cellSize } from '~/model/cell';
import { Tile } from './tiles';
import { Player } from './player';

export function GameMap() {
  const { game, map, score } = useStore();

  return (
    <Grid>
      {game.over && (
        <GameOverBanner win={game.win}>
          <div>{game.win ? 'You Won!' : 'Game Over!'}</div>
          <div>score: {score.coins}</div>
          <div>steps: {score.steps}</div>
        </GameOverBanner>
      )}
      <Player />
      {map.data.map((row, r) => (
        <Row key={r} id={`row-${r}`}>
          {row.map((cell, c) => (
            <Tile key={`${r}-${c}`} data={cell} x={c} y={r} />
          ))}
        </Row>
      ))}
    </Grid>
  );
}

const GameOverBanner = styled('div', {
  position: 'absolute',
  zIndex: 10,
  top: '50%',
  transform: 'translateY(-50%)',
  left: 0,
  right: 0,
  height: '6rem',
  color: 'var(--base-color)',
  fontWeight: 'bold',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  variants: {
    win: {
      true: { backgroundColor: '#0BD8B6' },
      false: { backgroundColor: '#E5484D' },
    },
  },
});

const Grid = styled('div', {
  position: 'relative',
  display: 'grid',
  width: 'fit-content',
  gridAutoRows: cellSize,
  gridAutoFlow: 'row',
});

const Row = styled('div', {
  display: 'grid',
  gridTemplateRows: cellSize,
  gridAutoColumns: cellSize,
  gridAutoFlow: 'column',
});
