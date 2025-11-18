import React, { useEffect, useState } from 'react';
import { StyleSheet, TextStyle } from 'react-native';
import { Text, TextProps } from 'react-native-paper';
import i18next from '../services/i18next';

type Props = TextProps & {
  translationKey: string;
  style?: TextStyle | TextStyle[];
  includeTranslatedText?: boolean;
};

const Translate: React.FC<Props> = ({
  translationKey,
  style,
  includeTranslatedText = true,
  children,
  ...restProps
}) => {
  const [, setTick] = useState(0);

  useEffect(() => {
    const handler = () => setTick(t => t + 1);
    i18next.on('languageChanged', handler);
    return () => {
      i18next.off('languageChanged', handler);
    };
  }, []);

  const translatedText = i18next.t(translationKey);

  const combinedStyle = Array.isArray(style)
    ? StyleSheet.flatten(style)
    : style;

  return (
    <Text style={combinedStyle} {...restProps}>
      {includeTranslatedText ? translatedText : null}
      {children}
    </Text>
  );
};

export default Translate;
