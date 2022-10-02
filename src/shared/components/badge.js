import React from 'react';
import {StyleSheet,View} from 'react-native';
import GlobalStyles from '../styles/globalStyles';
import CustomText from './customText';

const Badge = ({}) => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.text}>Delivered</CustomText>
    </View>
  );
};
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#D3F5D0',
        borderRadius:5,
        padding:2,
        marginLeft:5
    },
    text:{
        fontSize:12,
        color:'#53A74C',
        marginRight:3,
        marginLeft:3,
    }
});
export default Badge;
