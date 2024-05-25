import type { CSS } from '@stitches/react';

import type { TileProps } from './types';
import { TileBase } from './base';

export function GoalTile(props: TileProps<'goal'>) {
  return <TileBase {...props} css={{ ...props.css, ...goal }} />;
}

const goal: CSS = {
  backgroundColor: 'gold',
};
