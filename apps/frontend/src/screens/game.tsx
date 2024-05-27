import { styled } from '~/styles';
import { GameEngine } from '~/components/engine';
import { GameMap } from '~/components/map';
import { GameScore } from '~/components/score';
import { GameStatus } from '~/components/status';

export function GameScreen() {
  return (
    <Centered>
      <GameEngine />
      <GameScore />
      <GameMap />
      <GameStatus />
    </Centered>
  );
}

const Centered = styled('div', {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});
