import { styled } from '~/styles';
import { GameEngine } from '~/components/engine';
import { GameMap } from '~/components/map';
import { EditorPalette } from '~/components/editor/palette';
import { EditorStatus } from '~/components/editor/status';

export function MapEditorScreen() {
  return (
    <>
      <GameEngine />
      <Centered>
        <EditorStatus />
        <GameMap edit />
        <EditorPalette />
      </Centered>
    </>
  );
}

const Centered = styled('div', {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});
