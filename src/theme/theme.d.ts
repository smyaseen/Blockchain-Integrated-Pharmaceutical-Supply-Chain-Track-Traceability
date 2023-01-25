/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-empty-interface */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Palette, PaletteOptions } from '@mui/material/styles';

interface ExtraPalette {
  neutral?: {
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
  };
}

/**
 * Adding on extra palette properties
 */
declare module '@mui/material/styles/createPalette' {
  // This controls what appears when you use the theme variable inside sx, styled, etc.
  export interface Palette extends ExtraPalette {}
  // This controls what you are allowed to specify in `createTheme`.
  export interface PaletteOptions extends ExtraPalette {}
  // You need both to get the behavior you want.
}
