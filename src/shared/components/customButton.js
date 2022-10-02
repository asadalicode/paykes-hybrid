import React from 'react';
import {Button} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import GlobalStyles from '../styles/globalStyles';

const CustomButton = ({
  LeftIcon,
  Mode = 'contain',
  Title,
  onPress,
  style,
  labelStyle,
  contentStyle,
  disabled,
  IsLoading,
  OverlayColor="white",
}) => {
  return (
    <Button
      icon={LeftIcon}
      mode={Mode}
      style={[style]}
      loading={IsLoading}
      uppercase={false}
      color={OverlayColor}
      disabled={IsLoading || disabled}
      contentStyle={[
        GlobalStyles.baseFontFamily,
        styles.buttonContainer,
        {
          backgroundColor: disabled || IsLoading ? '#65fa87' : GlobalStyles.bgPrimary.backgroundColor
        },
        contentStyle
      ]}
      labelStyle={[styles.buttonText,  labelStyle]}
      onPress={onPress}>
      {Title}
    </Button>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    height: Platform.OS === 'ios' ? 40 : 45,
    borderRadius:25
  },
  buttonText: {
    color: 'white',
    fontSize:15
  },
});
export default CustomButton;
