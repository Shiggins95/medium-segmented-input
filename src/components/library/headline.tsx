import React, { FC } from 'react';
import { StyleProp, StyleSheet, Text } from 'react-native';
import { black80 } from '../../styles/vars';

export enum HeadlineType {
  Page = 'page',
  SubHeading = 'subheading',
}
interface HeadlineProps {
  type: HeadlineType;
  style?: StyleProp<any>;
  text: string;
  colour?: string;
}

const Headline: FC<HeadlineProps> = ({ type, style, text, colour }) => {
  return (
    <Text style={[styles[type], style, { color: colour || black80 }]}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  page: {
    fontSize: 32,
    fontWeight: '800',
  },
  subheading: {
    fontSize: 24,
    fontWeight: '800',
  },
});

export default Headline;
