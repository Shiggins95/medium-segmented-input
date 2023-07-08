import React, { useState } from 'react';
import { Alert, Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import Headline, { HeadlineType } from './src/components/library/headline';
import {
  accent100,
  horizontalPadding,
  primary10,
  primary100,
  white100,
} from './src/styles/vars';
import Body, { BodyType } from './src/components/library/body';
import SegmentedInput from './src/components/library/segmented-input';

function App() {
  const [code, setCode] = useState('');
  const handlePress = () => {
    if (!code) {
      return;
    }
    Alert.alert('Verification Code', code);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Headline type={HeadlineType.Page} text="Verification code" />
        <Body
          text="Please enter the verification code sent."
          type={BodyType.Normal}
        />
        <SegmentedInput length={6} onChange={setCode} />
        <Pressable
          onPress={handlePress}
          style={styles.button}
          disabled={code.length === 0}>
          <Body text="Submit" type={BodyType.Bold} colour={white100} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: horizontalPadding,
  },
  input: {
    marginVertical: horizontalPadding,
    width: '100%',
    height: 50,
    backgroundColor: primary10,
    paddingHorizontal: horizontalPadding,
    borderWidth: 1,
    borderColor: primary100,
    borderRadius: 4,
  },
  button: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: accent100,
    borderRadius: 4,
  },
});

export default App;
