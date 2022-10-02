import {Image, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import CustomText from '../shared/components/customText';
import GlobalStyles from '../shared/styles/globalStyles';

const BankCard = ({bankItem, handleSelectBankMethod,index}) => {
  const handleClick = () => {
    handleSelectBankMethod(bankItem.id,index);
  };

  return (
    <Pressable onPress={handleClick}>
      <View style={[styles.container]}>
        <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
          <View style={[styles.nameContainer]}>
          <Image
              source={bankItem.icon}
              style={[{height:25,width:25, borderRadius:2, marignRight: 10}]}
            />
            <CustomText style={[styles.name]}>
              {bankItem.name}
            </CustomText>
          </View>
        </View>
        <View style={[GlobalStyles.flexDirectionRow]}>
          {bankItem.isSelected && (
            <Image
              source={require('../assets/images/tick.png')}
              style={[styles.iconStyle, {marignRight: 10}]}
            />
          )}
        </View>
      </View>
    </Pressable>
  );
};
export default BankCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#DADDDD',
  },
  iconStyle: {
    height: 15,
    width: 15,
  },
  nameContainer: {
    marginLeft: 15,
    flexDirection:'row',
    alignItems:'center'
  },
  name: {
    fontWeight: '800',
    marginLeft:10
  },
});
