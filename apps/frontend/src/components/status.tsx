import { useStore } from '~/store';
import { styled } from '~/styles';

export function GameStatus() {
  const width = useStore(s => s.map.size.w);
  const player = useStore(s => s.player);

  return (
    <StatusLine style={{ width: `calc(${width} * 2rem)` }}>
      <span>
        pos: [{player.pos.x.toFixed(1)}, {player.pos.y.toFixed(1)}]
      </span>
      <span>
        vel: [{player.vel.x.toFixed(1)}, {player.vel.y.toFixed(1)}]
      </span>
    </StatusLine>
  );
}

const StatusLine = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});
