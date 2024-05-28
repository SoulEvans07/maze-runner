import { styled } from '~/styles';
import { TileProps } from './types';
import { useDispatch } from '~/store';
import { changeCell } from '~/store/actions';
import { cn } from '~/utils/classnames';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function TileBase(props: TileProps<any>) {
  const { children, css, data, x, y, edit } = props;

  const dispatch = useDispatch();
  const handleClick = () => {
    if (!edit) return;
    dispatch(changeCell({ x, y }));
  };

  return (
    <Tile className={cn({ edit })} css={css} data-cell={data.type} data-x={x} data-y={y} onClick={handleClick}>
      {children}
    </Tile>
  );
}

const Tile = styled('div', {
  position: 'relative',
  size: '2rem',
  color: 'black',
  fontSize: '0.4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  [`&.edit::before`]: {
    content: '',
    position: 'absolute',
    inset: 0,
    borderWidth: '1px',
    borderColor: '#ffffff08',
    borderStyle: 'dashed',
  },
});
