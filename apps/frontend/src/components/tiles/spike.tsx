import type { CSS } from '@stitches/react';

import type { TileProps } from './types';
import { TileBase } from './base';

export function SpikeTile(props: TileProps<'spike'>) {
  return <TileBase {...props} css={{ ...props.css, ...spike }} />;
}

const spike: CSS = {
  backgroundColor: '#0071ff',
  borderWidth: '4px',
  borderStyle: 'dashed',
  borderColor: '#00eeff',
};
