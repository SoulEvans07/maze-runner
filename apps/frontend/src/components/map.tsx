import { useMemo, useState } from 'react';
import { styled } from '~/styles';
import { useGlobalListener } from '~/utils/hooks/event-listener';

const size = 16;
const cellSize = '2rem';
const mapData = new Array(size)
  .fill(null)
  .map(() => new Array(size).fill(null).map(() => ({ type: 'empty' as const })));

const controls = {
  up: 'w',
  right: 'd',
  down: 's',
  left: 'a',

  alt: {
    up: 'ArrowUp'.toLowerCase(),
    right: 'ArrowRight'.toLowerCase(),
    down: 'ArrowDown'.toLowerCase(),
    left: 'ArrowLeft'.toLowerCase(),
  },
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function Map() {
  const [player, updatePlayer] = useState<PlayerProps>({ x: 0, y: 0 });

  useGlobalListener('keydown', ev => {
    if (ev.repeat) return;

    switch (ev.key.toLowerCase()) {
      case controls.alt.up:
      case controls.up: {
        updatePlayer(prev => ({ ...prev, y: clamp(prev.y - 1, 0, size - 1) }));
        break;
      }
      case controls.alt.right:
      case controls.right: {
        updatePlayer(prev => ({ ...prev, x: clamp(prev.x + 1, 0, size - 1) }));
        break;
      }
      case controls.alt.down:
      case controls.down: {
        updatePlayer(prev => ({ ...prev, y: clamp(prev.y + 1, 0, size - 1) }));
        break;
      }
      case controls.alt.left:
      case controls.left: {
        updatePlayer(prev => ({ ...prev, x: clamp(prev.x - 1, 0, size - 1) }));
        break;
      }
    }
  });

  return (
    <Grid>
      <Player {...player} />
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

type PlayerProps = { x: number; y: number };
function Player(props: PlayerProps) {
  const { x, y } = props;

  const style = useMemo(() => ({ '--px': x, '--py': y }), [x, y]);

  return <PlayerCircle data-type="player" css={style} />;
}

const PlayerCircle = styled('div', {
  size: cellSize,
  position: 'absolute',
  borderRadius: '50%',
  backgroundColor: 'red',
  transition: 'transform 200ms linear',
  transform: `translate(calc(var(--px) * ${cellSize}), calc(var(--py) * ${cellSize}))`,
});

const Grid = styled('div', {
  position: 'relative',
  display: 'grid',
  gridAutoRows: cellSize,
  gridTemplateColumns: cellSize,
  gridAutoFlow: 'row',
});

const Row = styled('div', {
  display: 'grid',
  gridTemplateRows: cellSize,
  gridAutoColumns: cellSize,
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
