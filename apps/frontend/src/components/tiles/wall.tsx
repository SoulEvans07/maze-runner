import { useMemo } from 'react';
import type { CSS } from '@stitches/react';

import type { Cell, TileProps } from './types';
import { TileBase } from './base';
import { useStore } from '~/store';
import { getNeighbors } from '~/model/map';

export function WallTile(props: TileProps<'wall'>) {
  const { x, y } = props;
  const map = useStore(s => s.map);

  const connectedTexture = useMemo((): CSS => {
    const neighbors = getNeighbors(map, { x, y });

    return {
      ...(shouldConnect(neighbors.top) ? clearTop : {}),
      ...(shouldConnect(neighbors.right) ? clearRight : {}),
      ...(shouldConnect(neighbors.bottom) ? clearBottom : {}),
      ...(shouldConnect(neighbors.left) ? clearLeft : {}),
    };
  }, [map, x, y]);

  return <TileBase {...props} css={{ ...props.css, ...wall, ...connectedTexture }} />;
}

function shouldConnect(cell?: Cell) {
  return cell === undefined || cell.type === 'wall' || cell.type === 'spike';
}

const wall: CSS = {
  borderColor: '#104D87', // '#23AFD0',
  borderStyle: 'solid',
  borderTopWidth: '4px',
  borderRightWidth: '4px',
  borderBottomWidth: '4px',
  borderLeftWidth: '4px',
};

const clearTop: CSS = { borderTopWidth: '0px' };
const clearRight: CSS = { borderRightWidth: '0px' };
const clearBottom: CSS = { borderBottomWidth: '0px' };
const clearLeft: CSS = { borderLeftWidth: '0px' };
