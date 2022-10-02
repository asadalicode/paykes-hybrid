import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import CustomText from './customText';

const CustomCountry = ({icon, label, value, handleSelectCountry}) => {
  return (
    <Pressable onPress={() => handleSelectCountry(value, icon)}>
      <View style={[styles.container]}>
        <View style={[styles.subContainer]}>
          {icon && <Image source={icon} style={[styles.iconStyle]} />}
          <CustomText style={[styles.label, {marginLeft: !icon ? 35 : 10}]}>
            {label}
          </CustomText>
          <CustomText style={[styles.label, {marginLeft: !icon ? 35 : 10}]}>
            {value === 'ca' ? '+1': value}
          </CustomText>
        </View>
      </View>
    </Pressable>
  );
};
export default CustomCountry;
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginTop: 10,
    marginLeft: 10,
    marginLeft: 10,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: 'grey',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  iconStyle: {
    width: 25,
    height: 25,
  },
  label: {
    marginLeft: 13,
    color: 'black',
    fontWeight: '400',
  },
});
