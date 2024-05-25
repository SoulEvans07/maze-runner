import { styled } from '~/styles';
import { TileProps } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function TileBase(props: TileProps<any>) {
  const { children, x, y, css, data } = props;
  return (
    <Tile css={css} data-cell={data.type}>
      <span>
        [{x + 1}, {y + 1}]
      </span>
      {children}
    </Tile>
  );
}

const Tile = styled('div', {
  size: '2rem',
  color: 'black',
  backgroundColor: '#eee',
  fontSize: '0.4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
