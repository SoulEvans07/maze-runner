import { useStore } from '~/store';
import { styled } from '~/styles';
import { PaletteTile, type PaletteItem } from './palette-tile';

const palette: PaletteItem[] = [
  { name: 'empty', cell: { type: 'empty', coin: 0 } },
  { name: 'coin', cell: { type: 'empty', coin: 1 } },
  { name: 'wall', cell: { type: 'wall' } },
  { name: 'spike', cell: { type: 'spike' } },
  { name: 'goal', cell: { type: 'goal' } },
];

export function EditorPalette() {
  const map = useStore(s => s.map);

  const handleExport = () => {
    console.log(map.data);
    navigator.clipboard.writeText(JSON.stringify(map.data));
  };

  return (
    <Palette style={{ width: `calc(${map.size.w} * 2rem)` }}>
      <PaletteRow></PaletteRow>
      <PaletteRow>
        <TileRow>
          {palette.map(item => (
            <PaletteTile {...item} key={item.name} />
          ))}
        </TileRow>
        <button onClick={handleExport}>export</button>
      </PaletteRow>
    </Palette>
  );
}

const before = '&::before';

const Palette = styled('div', {
  height: '2rem',
  display: 'flex',
  flexDirection: 'column',
});

const PaletteRow = styled('div', {
  height: '2rem',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const ToolRow = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0.5rem',
});

const TileRow = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0rem',
});

const Separator = styled('div', {
  position: 'relative',
  width: '1rem',
  height: '2rem',

  [before]: {
    content: '',
    position: 'absolute',
    top: '20%',
    bottom: '20%',
    left: '50%',
    border: '1px solid #ffffff18',
  },
});
