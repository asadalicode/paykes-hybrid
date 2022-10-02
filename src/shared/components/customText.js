import React from 'react';
import ReactNative, {StyleSheet} from 'react-native';
import GlobalStyles from '../styles/globalStyles';

export default function CustomText({numberOfLines ,style,children}) {
  return (
    <>
      <ReactNative.Text
        numberOfLines={numberOfLines}
        ellipsizeMode="tail"
        style={[styles.primaryText, GlobalStyles.baseFontFamily, style]}>
        {children}
      </ReactNative.Text>
    </>
  );
}
const styles = StyleSheet.create({
  primaryText: {
    color: GlobalStyles.textColor.color,
    fontSize: 16,
  },
});
