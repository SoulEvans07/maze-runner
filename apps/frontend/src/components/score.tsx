import { useStore } from '~/store';

export function GameScore() {
  const score = useStore(s => s.score);
  return <div>score: {score.coins}</div>;
}
