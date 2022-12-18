import React from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import GlobalStyles from '../styles/globalStyles';
import CustomText from './customText';
import CustomIconButton from './customIconButton';
import FastImage from 'react-native-fast-image';

const Header = ({headerStyle, title, hasBack, onPress}) => {
  return (
    <View style={[styles.header, GlobalStyles.bgPrimary, headerStyle]}>
      <View style={styles.leftIcon}>
        {hasBack && (
          <CustomIconButton
            Icon={() => (
              <FastImage
                source={require('../../assets/images/backArrow.jpg')}
                style={[styles.iconSize]}
                resizeMode={FastImage.resizeMode.cover}
              />
            )}
            style={{marginTop: -7}}
            Size={30}
            onPress={onPress}
          />
        )}
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.titleContainer}>
          <View style={[styles.headerTextWrapper]}>
            <CustomText
              numberOfLines={1}
              style={[
                GlobalStyles.baseFontFamily,
                styles.headerTextFont,
                {padding: 0, margin: 0},
              ]}>
              {title}
            </CustomText>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Header;

const styles = StyleSheet.create({
  header: {
    paddingVertical: 10,
    paddingHorizontal: 2,
    flexDirection: 'row',
    height: 60,
    zIndex:999,
    alignItems: 'center',
  },
  leftIcon: {
    ...Platform.select({
      android: {
        position: 'absolute',
      },
      ios: {
        position: 'absolute',
        zIndex: 5,
      },
    }),
    top: 13,
  },
  headerTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '80%',
  },
  iconStyle: {
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  underlay: {
    borderRadius: 50,
  },
  headerTextFont: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'white'
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dateTextFont: {
    fontSize: 18,
  },

  iconSize: {
    height: 30,
    width: 30,
  },
});
