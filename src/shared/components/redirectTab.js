import React, {useState} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import GlobalStyles from '../styles/globalStyles';
import CustomText from './customText';
import ToggleButton from './toggleButton';

export default function RedirectTab({
  text,
  onPress,
  rippleColor = GlobalStyles.priColor,
  LeftIcon,
  RightIcon,
  isToggleRight,
  style,
}) {
  return (
    <>
      <TouchableRipple
        onPress={onPress}
        rippleColor={rippleColor}
        style={[styles.selectTrack, style]}>
        <>
          <View style={styles.selectedTrackBox}>
            <LeftIcon />
            <CustomText style={[styles.openCustomText]}>{text}</CustomText>
          </View>
          {isToggleRight ? <ToggleButton /> : <RightIcon />}
        </>
      </TouchableRipple>
    </>
  );
}
const styles = StyleSheet.create({
  selectTrack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedTrackBox: {
    flexDirection: 'row',
    // paddingLeft: 24,
    flex: 1,
    paddingTop: 13,
    paddingBottom: 13,
  },
  iconSize: {
    height: 22,
    width: 22,
  },
  arrowIcon: {
    marginRight: 20,
    height: 14,
    width: 14,
  },
  openCustomText: {
    fontSize: 15,
    marginLeft: 10,
    fontWeight: 'bold',
    marginTop: 1,
  },
});
