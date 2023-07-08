import React, { FC } from 'react';
import { StyleProp, StyleSheet, Text } from 'react-native';
import { black60 } from '../../styles/vars';

export enum BodyType {
  Normal = 'normal',
  Bold = 'bold',
  SmallBold = 'smallBold',
  Small = 'small',
}

interface BodyProps {
  text: string;
  style?: StyleProp<any>;
  type: BodyType;
  colour?: string;
}

const Body: FC<BodyProps> = ({ text, type, style, colour }) => {
  return (
    <Text style={[styles[type], { color: colour || black60 }, style]}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  bold: {
    fontSize: 18,
    fontWeight: '800',
  },
  small: {
    fontSize: 12,
    fontWeight: '400',
  },
  smallBold: {
    fontSize: 12,
    fontWeight: '800',
  },
  normal: {
    fontSize: 18,
    fontWeight: '400',
  },
});

export default Body;
