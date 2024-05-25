import { css } from '~/styles';
import { cn } from '~/utils/classnames';

import type { TileProps } from './types';
import { TileBase } from './base';

export function EmptyTile(props: TileProps<'empty'>) {
  return <TileBase {...props} className={cn(empty(), props.className)} />;
}

const empty = css({
  backgroundColor: '#eee',
});
