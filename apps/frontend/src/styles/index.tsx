import { createStitches, type PropertyValue } from '@stitches/react';

export const { styled, css, createTheme } = createStitches({
  theme: {
    colors: {
      hiContrast: 'black',
      loContrast: 'white',
    },
  },
  media: {
    bp1: '(min-width: 640px)',
    bp2: '(min-width: 768px)',
    bp3: '(min-width: 1024px)',
  },
  utils: {
    size(value: PropertyValue<'width'> | PropertyValue<'height'>) {
      return { width: value, height: value };
    },
    mx(value: PropertyValue<'margin'>) {
      return { marginLeft: value, marginRight: value };
    },
    my(value: PropertyValue<'margin'>) {
      return { marginTop: value, marginBottom: value };
    },
    px(value: PropertyValue<'padding'>) {
      return { paddingLeft: value, paddingRight: value };
    },
    py(value: PropertyValue<'padding'>) {
      return { paddingTop: value, paddingBottom: value };
    },
  },
});

createTheme({
  colors: {},
});
