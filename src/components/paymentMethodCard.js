import {Image, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import CustomText from '../shared/components/customText';
import GlobalStyles from '../shared/styles/globalStyles';

const PaymentMethodCard = ({payoutMethod, handleSelectPaymentMethod,index}) => {
  const handleClick = () => {
    handleSelectPaymentMethod(payoutMethod.id,index);
  };

  return (
    <Pressable onPress={handleClick}>
      <View style={[styles.container]}>
        <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
          <Image
            source={payoutMethod.image}
            style={[{height: payoutMethod.height , width: payoutMethod.width}]}
          />
          <View style={[styles.nameContainer]}>
            <CustomText style={[styles.name]}>
              {payoutMethod.name}
            </CustomText>
          </View>
        </View>
        <View style={[GlobalStyles.flexDirectionRow]}>
          {payoutMethod.isSelected && (
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
export default PaymentMethodCard;

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
  },
  name: {
    fontWeight: '800',
  },
});
