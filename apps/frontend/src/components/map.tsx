import _ from 'lodash';

import { useStore } from '~/store';
import { styled } from '~/styles';
import { cellSize } from '~/model/cell';
import { Tile } from './tiles';
import { Player } from './player';

export function GameMap() {
  const { game, map } = useStore();

  return (
    <Grid>
      {game.over && game.win && <CongratulationsBanner>You Won!</CongratulationsBanner>}
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
