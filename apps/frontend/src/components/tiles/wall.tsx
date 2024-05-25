import { css } from '~/styles';
import { cn } from '~/utils/classnames';

import type { TileProps } from './types';
import { TileBase } from './base';

export function WallTile(props: TileProps<'wall'>) {
  return <TileBase {...props} className={cn(wall(), props.className)} />;
}

const wall = css({
  backgroundColor: '#555',
  border: '1px solid #505050',
});
