import React, { FC, Dispatch, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  NativeSyntheticEvent,
} from 'react-native';
import { horizontalPadding, primary10, primary100 } from '../../styles/vars';
import Clipboard from '@react-native-clipboard/clipboard';
import { TextInputKeyPressEventData } from 'react-native/Libraries/Components/TextInput/TextInput';

interface SegmentedInputProps {
  length: number;
  onChange: Dispatch<string>;
}

interface RefMapping {
  [key: number]: TextInput | null;
}

const SegmentedInput: FC<SegmentedInputProps> = ({ length, onChange }) => {
  const refs = useRef<RefMapping>({});
  const [code, setCode] = useState(Array.from({ length }, () => ''));
  const [focusedIndex, setFocusedIndex] = useState(0);
  const { width } = Dimensions.get('window');

  const handlePaste = async () => {
    // retrieve the value stored in the clipboard
    const clipboard = await Clipboard.getString();
    // if there is no value, then just return. This will prevent extra inputs being entered on the last input box
    if (!clipboard) {
      return;
    }
    // instead of using the current code state variable, we want to replace it entirely using the clipboard value.
    // we want to clip the string so that it is no longer than our maximum length and then convert it to an array
    const currentCode = clipboard.substring(0, length).split('');
    // get the length of the string as an index so that we can use this to move the cursor to the next box (if available)
    const endIndex = currentCode.length - 1;
    // if the length of the clipboard value is less than our input, then pad the end of the array with empty strings
    if (currentCode.length < length) {
      do {
        currentCode.push('');
      } while (currentCode.length < length);
    }
    // then move the cursor to the next relevant input box
    refs.current[endIndex < length - 1 ? endIndex + 1 : endIndex]?.focus();
    // set the local state code
    setCode(currentCode);
    // set the parent components code
    onChange(currentCode.join(''));
  };

  const handleType = (value: string, index: number) => {
    // check if there is no value but there previously was a value
    const hasDeleted = !value && code[index] !== '';
    // map through the current code and alter the current value that's been edited
    const currentCode = code.map((curr, i) => {
      if (i === index) {
        return value;
      }
      return curr;
    });

    // if we haven't deleted, and we aren't on the last input, then move onto the next ref
    if (!hasDeleted && index < length - 1) {
      refs.current[index + 1]?.focus();
    }
    // set local state (array) code
    setCode(currentCode);

    // set the parent components state. As this expects a string, we can just use .join('')
    onChange(currentCode.join(''));
  };

  const handleChange = async (value: string, index: number) => {
    if (value.length > 1) {
      await handlePaste();
      return;
    }
    handleType(value, index);
  };

  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    // listen for the backspace key being pressed and if we aren't on the first input then move the focused input back
    if (event.nativeEvent.key === 'Backspace' && index !== 0 && !code[index]) {
      refs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.inputsContainer}>
      {Array.from({ length }, (_, i) => i).map((_, i) => {
        const isFocused = i === focusedIndex;
        return (
          <TextInput
            onFocus={() => setFocusedIndex(i)}
            onKeyPress={(e) => handleKeyPress(e, i)}
            ref={(el) => (refs.current[i] = el)}
            key={_}
            value={code[i]}
            onChangeText={(value) => handleChange(value, i)}
            style={[
              styles.input,
              isFocused ? styles.focused : null,
              {
                width:
                  (width -
                    horizontalPadding * 2 -
                    (horizontalPadding / 2) * length) /
                  length,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

export const styles = StyleSheet.create({
  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 50,
    position: 'relative',
  },
  input: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 8,
    zIndex: -1,
    textAlign: 'center',
    backgroundColor: primary10,
  },
  focused: {
    borderColor: primary100,
    borderWidth: 1,
  },
});

export default SegmentedInput;
