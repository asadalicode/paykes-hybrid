import * as React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import GlobalStyles from '../styles/globalStyles';

const TextInputField = ({
  IsError,
  Mode = 'outlined',
  Label,
  placeholder,
  Editable,
  style,
  OnChangeText,
  DefaultValue,
  KeyboardType,
  Multiline,
  MaxLength,
  MinLength,
  SecureTextEntry,
  outlineColor = GlobalStyles.inputBorder,
  activeOutlineColor = GlobalStyles.inputBorder,
  Value,
  onFocus,
  onBlur,
  numberOfLines,
  textColor = "black",
  leftAffix

}) => {
  return (
    <>
      <TextInput
        left={leftAffix}
        onFocus={onFocus}
        onBlur={onBlur}
        label={Label}
        defaultValue={DefaultValue}
        error={IsError}
        value={Value}
        style={[{ backgroundColor: 'white' }, style]}
        editable={Editable}
        keyboardType={KeyboardType}
        mode={Mode}
        placeholder={placeholder}
        secureTextEntry={SecureTextEntry}
        multiline={Multiline}
        numberOfLines={numberOfLines}
        maxLength={MaxLength}
        minLength={MinLength}
        outlineColor={outlineColor}
        activeOutlineColor={activeOutlineColor}
        onChangeText={OnChangeText}
        theme={{ colors: { text: textColor } }}
      />
    </>
  );
};

export default TextInputField;
