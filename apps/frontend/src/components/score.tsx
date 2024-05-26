import { useStore } from '~/store';
import { styled } from '~/styles';

export function GameScore() {
  const width = useStore(s => s.map.size.w);
  const score = useStore(s => s.score);
  const hp = useStore(s => s.player.hp);

  return (
    <ScoreLine style={{ width: `calc(${width} * 2rem)` }}>
      <span>
        c: {score.coins} | s: {score.steps}
      </span>
      <span>{hp} :hp</span>
    </ScoreLine>
  );
}

const ScoreLine = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});
