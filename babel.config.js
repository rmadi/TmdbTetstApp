module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module-resolver', {
      root: ['./'],
      alias: {
        '@api': './src/api',
        '@components': './src/components',
        '@navigation': './src/navigation',
        '@screens': './src/screens',
        '@store': './src/store',
        '@i18n': './src/i18n',
        '@theme': './src/theme',
        '@types': './src/types',
        '@utils': './src/utils'
      }
    }],
    'react-native-reanimated/plugin'
  ]
};
