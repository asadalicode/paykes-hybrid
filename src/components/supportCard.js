import { Image, Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import CustomText from '../shared/components/customText';

const SuppportCard = ({ item, handleClick }) => {
  return (
    <Pressable onPress={() => handleClick(item.id)}>
      <View style={styles.card}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}>

          <Image
            source={item.image}
            style={{ width: 15, height: 15 }}
          />
          <CustomText style={styles.text}>{item.title}</CustomText>
        </View>

      </View>
    </Pressable>
  );
};
export default SuppportCard;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    paddingVertical: 14,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 5,

  },
  text: {
    fontSize: 15,
    marginLeft: 10,
    fontWeight: 'bold',
  },
});
