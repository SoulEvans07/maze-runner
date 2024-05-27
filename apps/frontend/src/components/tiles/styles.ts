import { CSS } from '@stitches/react';

export const tileStyle = {
  empty: {},
  coin: {},
  wall: {
    borderColor: '#104D87',
    borderStyle: 'solid',
    borderTopWidth: '4px',
    borderRightWidth: '4px',
    borderBottomWidth: '4px',
    borderLeftWidth: '4px',
  },
  spike: {
    borderColor: '#E93D82',
    borderStyle: 'dashed',
    borderTopWidth: '4px',
    borderRightWidth: '4px',
    borderBottomWidth: '4px',
    borderLeftWidth: '4px',
  },
} satisfies Record<string, CSS>;
