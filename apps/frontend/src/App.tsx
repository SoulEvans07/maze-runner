import { GameMap } from '~/components/map';
import { GameScore } from './components/score';
import { GameEngine } from './components/engine';

function App() {
  return (
    <div>
      <GameEngine />
      <GameScore />
      <GameMap />
    </div>
  );
}

export default App;
