import type { CSS } from '@stitches/react';

import type { TileProps } from './types';
import { TileBase } from './base';

export function WallTile(props: TileProps<'wall'>) {
  return <TileBase {...props} css={{ ...props.css, ...wall }} />;
}

const wall: CSS = {
  backgroundColor: '#555',
  borderWidth: '4px',
  borderStyle: 'solid',
  borderColor: '#505050',
};
