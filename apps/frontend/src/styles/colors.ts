const colorPalette: ColorPalette = {
  grey: {
    '000': '',
    '100': '',
    '200': '',
    '300': '',
    '400': '',
    '500': '',
    '600': '',
    '700': '',
    '800': '',
    '900': '',
    'X00': '',
  },
  red: {
    '000': '',
    '100': '',
    '200': '',
    '300': '',
    '400': '',
    '500': '',
    '600': '',
    '700': '',
    '800': '',
    '900': '',
    'X00': '',
  },
};

type ColorRange = '000' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | 'X00';
type ColorShades = Record<ColorRange, string>;
type ColorPalette = {
  grey: ColorShades;
  red: ColorShades;
};

type ColorList = Record<`${keyof ColorPalette}${keyof ColorPalette[keyof ColorPalette]}`, string>;

// P4: add polyfills

function flattenColorPalette(): ColorList {
  return (Object.entries(colorPalette) as ObjEntities<typeof colorPalette>).reduce((acc, [color, value]) => {
    const colorShades = (Object.entries(value) as ObjEntities<typeof value>).reduce((sub, [shade, value]) => {
      const key = `${color}${shade}` as const;
      return { ...sub, [key]: value };
    }, {} as ColorList);

    return {
      ...acc,
      ...colorShades,
    };
  }, {} as ColorList);
}

export const colors = flattenColorPalette();
