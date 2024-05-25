import { css } from '~/styles';
import { cn } from '~/utils/classnames';
import { TileProps } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function TileBase(props: TileProps<any>) {
  const { children, x, y, className, data } = props;
  return (
    <div className={cn(tile(), className)} data-cell={data.type}>
      <span>
        [{x + 1}, {y + 1}]
      </span>
      {children}
    </div>
  );
}

const tile = css({
  size: '2rem',
  color: 'black',
  fontSize: '0.4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
