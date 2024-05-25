import { useMemo } from 'react';
import { styled } from '~/styles';

const size = 16;
const mapData = new Array(size)
  .fill(null)
  .map(() => new Array(size).fill(null).map(() => ({ type: 'empty' as const })));

export function Map() {
  return (
    <Grid>
      {mapData.map((row, r) => (
        <Row key={r} id={`row-${r}`}>
          {row.map((cell, c) => (
            <Cell key={`${r}-${c}`} data={cell} x={c} y={r} />
          ))}
        </Row>
      ))}
    </Grid>
  );
}

const Grid = styled('div', {
  display: 'grid',
  gridAutoRows: '2rem',
  gridTemplateColumns: '2rem',
  gridAutoFlow: 'row',
});

const Row = styled('div', {
  display: 'grid',
  gridTemplateRows: '2rem',
  gridAutoColumns: '2rem',
  gridAutoFlow: 'column',
});

function CellBase(props: CellProps) {
  const { data, children, x, y, className } = props;
  return (
    <div className={className} data-cell={data.type}>
      <span>
        [{x + 1}, {y + 1}]
      </span>
      {children}
    </div>
  );
}

const EmptyCell = styled(CellBase, {
  size: '2rem',
  backgroundColor: '#eee',
  color: 'black',
  fontSize: '0.4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const WallCell = styled(EmptyCell, {
  backgroundColor: '#eee',
  border: '1px solid #e5e5e5',
});

type CellMap = {
  empty: {};
  wall: {};
};

type CellType = keyof CellMap;
type CellPropMap = {
  [T in CellType]: React.PropsWithChildren<{
    data: CellMap[T] & { type: T };
    x: number;
    y: number;
    className?: string;
  }>;
};
export type CellProps = CellPropMap[CellType];
export type CellComp<T extends CellType> = React.FC<CellPropMap[T]>;

type CellTypesMap = {
  [T in CellType]: CellComp<T>;
};

const CellTypes: CellTypesMap = {
  empty: props => <EmptyCell {...props} />,
  wall: props => <WallCell {...props} />,
};

// NOTE: typescript is not clever enough for this, so here is a function...
function getCellComp<T extends CellType>(type: T): CellComp<T> {
  return CellTypes[type];
}

function Cell<T extends CellType>(props: CellPropMap[T]) {
  const { data } = props;
  const Comp = useMemo(() => getCellComp(data.type), [data.type]);
  return <Comp {...props} />;
}
