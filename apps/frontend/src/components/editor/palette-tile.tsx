import { useMemo } from 'react';
import _ from 'lodash';

import { useDispatch, useStore } from '~/store';
import { styled } from '~/styles';
import { getCellComp, type Cell } from '../tiles/types';
import { changePalette } from '~/store/actions';
import { cn } from '~/utils/classnames';

export type PaletteItem = { name: string; cell: Cell };
export function PaletteTile(props: PaletteItem) {
  const { name, cell } = props;

  const dispatch = useDispatch();
  const current = useStore(s => s.editor.palette.cell);

  const isSelected = useMemo(() => _.isEqual(cell, current), [current, cell]);

  const handleClick = () => dispatch(changePalette(cell));

  const Comp = useMemo(() => getCellComp(cell.type).pure, [cell.type]);

  return (
    <ButtonContainer className={cn({ selected: isSelected })} onClick={handleClick}>
      <TileBtnBase title={name}>
        <Comp data={cell} x={-1} y={-1} />
      </TileBtnBase>
    </ButtonContainer>
  );
}

const before = '&::before';
const after = '&::after';

const TileBtnBase = styled('div', {
  position: 'relative',
  size: '2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'var(--base-color)',
  transform: 'scale(0.6)',

  [before]: {
    content: '',
    position: 'absolute',
    inset: 0,
    borderWidth: '2px',
    borderColor: '#ffffff28',
    borderStyle: 'dashed',
  },
});

const ButtonContainer = styled('div', {
  position: 'relative',
  cursor: 'pointer',

  [after]: {
    content: '',
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '0rem',

    borderWidth: 0,
    borderBottomWidth: '2px',
    borderColor: '#5A6169',
    borderStyle: 'solid',

    transitionProperty: 'width color',
    transitionDuration: '150ms',
    transitionTimingFunction: 'ease-out',
  },

  [`&.selected::after`]: {
    borderColor: '#EDEEF0',
    width: '0.5rem',
  },

  [`&:not(.selected):hover::after`]: {
    width: '0.5rem',
  },
});
