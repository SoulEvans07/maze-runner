import { styled } from '~/styles';
import { TileProps } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function TileBase(props: TileProps<any>) {
  const { children, css, data } = props;
  return (
    <Tile css={css} data-cell={data.type}>
      {children}
    </Tile>
  );
}

const Tile = styled('div', {
  position: 'relative',
  size: '2rem',
  color: 'black',
  backgroundColor: 'var(--base-color)',
  fontSize: '0.4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
