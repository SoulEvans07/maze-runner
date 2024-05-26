import { GameMap } from '~/components/map';
import { GameScore } from './components/score';
import { GameEngine } from './components/engine';
import { styled } from './styles';

export default function App() {
  return (
    <Centered>
      <GameEngine />
      <GameScore />
      <GameMap />
    </Centered>
  );
}

const Centered = styled('div', {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});
