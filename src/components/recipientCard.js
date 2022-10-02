import {Image, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import CustomText from '../shared/components/customText';
import GlobalStyles from '../shared/styles/globalStyles';
import CustomIconButton from '../shared/components/customIconButton';
import FastImage from 'react-native-fast-image';
import {PaymentMethodEnum} from '../shared/js/paymentMethodEnum';
import {TouchableRipple} from 'react-native-paper';

const RecipientCard = ({
  recipient,
  handleEditRecipient,
  isShowEdit = true,
  handleContainerClick,
}) => {
  const handleEditClick = () => {
    handleEditRecipient?.(recipient);
  };
  const handleClick = () => {
    handleContainerClick?.(recipient);
  };
  return (
    <TouchableRipple onPress={handleClick}>
      <View style={[styles.container]}>
        <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
          {PaymentMethodEnum.mPaisa === recipient.paymentMethod ? (
            <Image
              source={require('../assets/images/keyniya.png')}
              style={styles.iconStyle}
            />
          ) : (
            <Image
              source={require('../assets/images/bank.png')}
              style={styles.iconStyle}
            />
          )}
          <View style={[styles.nameContainer]}>
            {recipient.fullName && (
              <CustomText style={[styles.name, GlobalStyles.mb1]}>
                {recipient.fullName}
              </CustomText>
            )}
            <CustomText style={[{marginTop: recipient.fullName ? -7 : 3}]}>
              {PaymentMethodEnum.mPaisa === recipient.paymentMethod
                ? `${
                    recipient?.phoneNumberCountryCode
                      ? recipient?.phoneNumberCountryCode
                      : ''
                  }${recipient.phoneNumber} M-Pesa`
                : `${recipient.bankAccountNumber} Bank`}
            </CustomText>
          </View>
        </View>
        {isShowEdit && (
          <View style={[GlobalStyles.flexDirectionRow]}>
            <CustomIconButton
              Icon={() => (
                <FastImage
                  source={require('../assets/images/edit.png')}
                  style={[{height: 15, width: 15}]}
                  resizeMode={FastImage.resizeMode.cover}
                />
              )}
              Size={20}
              onPress={handleEditClick}
            />
          </View>
        )}
      </View>
    </TouchableRipple>
  );
};
export default RecipientCard;

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
    height: 25,
    width: 25,
  },
  nameContainer: {
    marginLeft: 15,
  },
  name: {
    fontWeight: '800',
  },
});
