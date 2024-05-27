import { useMemo } from 'react';

import { getCellComp, type TileProps } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Tile(props: TileProps<any>) {
  const { data } = props;
  const Comp = useMemo(() => getCellComp(data.type), [data.type]);
  return <Comp {...props} />;
}
