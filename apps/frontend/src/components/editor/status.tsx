import { useStore } from '~/store';
import { styled } from '~/styles';

export function EditorStatus() {
  const width = useStore(s => s.map.size.w);

  return <StatusLine style={{ width: `calc(${width} * 2rem)` }}>Editor</StatusLine>;
}

const StatusLine = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});
