import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import CustomText from '../shared/components/customText';

const SuppportCard = ({title, image}) => {
  return (
    <View style={styles.card}>
      <Image
        source={image}
        style={{width: 15, height: 15}}
      />
      <CustomText style={styles.text}>{title}</CustomText>
    </View>
  );
};
export default SuppportCard;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    paddingVertical:14,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius:5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    marginLeft:10
  },
});
