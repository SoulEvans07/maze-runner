import type { CSS } from '@stitches/react';

import type { TileProps } from './types';
import { TileBase } from './base';

export function EmptyTile(props: TileProps<'empty'>) {
  return <TileBase {...props} css={{ ...props.css, ...empty }} />;
}

const empty: CSS = {};
