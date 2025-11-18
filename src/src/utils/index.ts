import { Dimensions, Platform } from 'react-native';
import { MD3LightTheme as PaperDefaultTheme } from 'react-native-paper';

export const size = {
  xxs: 8,
  xs: 10,
  s: 12,
  default: 14,
  md: 16,
  lg: 20,
  xlg: 24,
  xxlg: 30,
  xxxlg: 38,
};

export const colors = {
  primary: '#83B011',
  primaryDark: '#5A7C0B',

  secondry: '#0078C6',
  accent: '#2563EB',

  white: '#FFFFFF',
  black: '#050816',
  appBackground: '#020617',

  grey: '#9CA3AF',
  greyLight: '#D1D1D1',
  greyDark: '#2A2D3A',

  card: '#111827',
  label: '#9CA3AF',
  border: '#2A2D3A',

  error: '#ED4956',

  textPrimary: '#FFFFFF',
  textSecondary: '#CCCCCC',

  starGold: '#FFD700',
  tagBackground: 'rgba(0,0,0,0.6)',
  overlayDark: 'rgba(0,0,0,0.35)',
};

export const { width, height, scale, fontScale } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const horizontalScale = (value: number) =>
  (width / guidelineBaseWidth) * value;

export const verticalScale = (value: number) =>
  (height / guidelineBaseHeight) * value;

export const moderateScale = (value: number, factor = 0.5) =>
  value + (horizontalScale(value) - value) * factor;

export const isAndroid = Platform.OS === 'android';
export const isIos = Platform.OS === 'ios';
export const verticalOffset = isIos ? 40 : 0;

export const theme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: colors.primary,
    background: colors.appBackground,
    surface: colors.card,
    text: colors.textPrimary,
    error: colors.error,
  },
};
