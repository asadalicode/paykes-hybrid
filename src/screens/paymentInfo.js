import Header from '../shared/components/header';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import CustomText from '../shared/components/customText';
import GlobalStyles from '../shared/styles/globalStyles';
import CustomButton from '../shared/components/customButton';
import { SQIPCore, SQIPCardEntry } from 'react-native-square-in-app-payments';
import {
  registerCardAPICall,
  createCardAPICall,
  deleteCardAPICall,
} from '../shared/services/payment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import FastImage from 'react-native-fast-image';
import { ActivityIndicator } from 'react-native-paper';
import { showToastMessage } from '../shared/js/showToastMessage';
import PaymentDetails from './paymentDetails';

const PaymentInfo = ({ navigation }) => {
  const [cardInformation, setCardInformation] = useState(null);
  const [isShowCardInfo, setIsShowCardInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [isShowAddress, setIsShowAddress] = useState(false);
  const [cardDetail, setCardDetail] = useState({});

  useEffect(() => {
    setPayment();
    getRegisterCard();
  }, []);

  const getRegisterCard = async () => {
    let _userData = await AsyncStorage.getItem('userData');
    _userData = JSON.parse(_userData);
    let _response = await registerCardAPICall(_userData.id);
    if (_response.isSuccess) {
      if (_response.result.card) {
        if (_response.result.card.enabled) {
          setCardInformation(_response.result.card);
          setIsShowCardInfo(true);
        } else {
          setCardInformation(null);
          setIsShowCardInfo(false);
        }
      }
    }
  };
  const handleDeleteCard = async () => {
    setIsLoading(true);
    let _userData = await AsyncStorage.getItem('userData');
    _userData = JSON.parse(_userData);
    let _data = {
      userId: _userData.id,
    };
    let _response = await deleteCardAPICall(
      _data,
      _userData.customerId,
      cardInformation.id,
    );
    setIsLoading(false);
    if (_response.isSuccess) {
      showToastMessage('success', 'top', `Card deleted successfully`, 3000, 60);
      setCardInformation(null);
      setIsShowCardInfo(false);
      //   getRegisterCard();
    }
  };

  const setPayment = async () => {
    await SQIPCore.setSquareApplicationId('sq0idp-qubIHrG3CiRNgQgH5CjMOg');
  };
  const onStartCardEntry = async () => {
    const cardEntryConfig = {
      collectPostalCode: false,
    };
    await SQIPCardEntry.startCardEntryFlow(
      cardEntryConfig,
      onCardNonceRequestSuccess,
      onCardEntryCancel,
    );
  };
  const onCardNonceRequestSuccess = async cardDetails => {
    try {
      // take payment with the card details
      // await chargeCard(cardDetails);

      // payment finished successfully
      // you must call this method to close card entry
      await SQIPCardEntry.completeCardEntry();
      onCardEntryComplete(cardDetails);
    } catch (ex) {
      // payment failed to complete due to error
      // notify card entry to show processing error
      await SQIPCardEntry.showCardNonceProcessingError(ex.message);
    }
  };
  const onCardEntryComplete = cardDetails => {
    // handleCreateCard(cardDetails);
    setCardDetail({ ...cardDetails });
    setIsShowAddress(true);
  };
  const handleCreateCard = async (paymentAddress) => {
    let _userData = await AsyncStorage.getItem('userData');
    setIsAddLoading(true);
    _userData = JSON.parse(_userData);
    let _data = {
      idempotencyKey: uuid.v4(),
      sourceId: cardDetail.nonce,
      referenceId: uuid.v4(),
      userId: _userData.id,
      cardHolderName: _userData.fullName,
      address: paymentAddress,
    };
    let _response = await createCardAPICall(_data, _userData.customerId);
    setIsAddLoading(false);
    if (_response.isSuccess) {
      showToastMessage('success', 'top', `Card added successfully`, 3000, 60);
      getRegisterCard();
    }
  };

  const onCardEntryCancel = () => {
    // Handle the cancel callback
  };
  const handleOpenPaymentDetail = () => {
    setIsShowAddress(true);
  }

  const handleAddress = (address) => {
    // setPaymentAddress({...address});
    handleCreateCard(address);
    setIsShowAddress(false);
    // onStartCardEntry();
  }

  return (
    <>
      <Header
        title={'Payment Info'}
        hasBack
        onPress={() => navigation.navigate('profile')}
      />
      {
        !isShowAddress &&
        <View style={[styles.container]}>
          <View style={[GlobalStyles.flex1]}>
            <View style={cardInformation ? styles.cardContainer : {}}>
              {isShowCardInfo && (
                <>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <FastImage
                      source={require('../assets/images/credit-card.png')}
                      style={[styles.imageCardImage]}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                    <View>
                      <CustomText style={{ marginLeft: 10, fontWeight: '600' }}>
                        {cardInformation?.cardholderName}
                      </CustomText>
                      <CustomText style={{ marginLeft: 10 }}>
                        {cardInformation?.last4 ? `xxxx-${cardInformation.last4 }`:''}
                      </CustomText>
                    </View>
                  </View>
                  <Pressable onPress={handleDeleteCard}>
                    <CustomText
                      style={[
                        {
                          color: GlobalStyles.priColor,
                          borderColor: GlobalStyles.priColor,
                          borderWidth: 1,
                          paddingVertical: 5,
                          paddingHorizontal: 15,
                          borderRadius: 5,
                        },
                      ]}>
                      {isLoading ? (
                        <ActivityIndicator color={GlobalStyles.priColor} />
                      ) : (
                        'Delete'
                      )}
                    </CustomText>
                  </Pressable>
                  {/* <CustomButton Title={'Delete'} /> */}
                </>
              )}
            </View>
            {/* <CustomText>sdf</CustomText> */}
          </View>
          {!isShowCardInfo && (
            <CustomButton Title="Add Card"
              IsLoading={isAddLoading}
              onPress={onStartCardEntry} />
          )}
        </View>
      }
      {
        isShowAddress &&
        <PaymentDetails handleAddress={handleAddress} isLoading={isAddLoading} />
      }
    </>
  );
};
export default PaymentInfo;
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '90%',
    padding: 10,
    marginTop:14
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    padding: 10,
  },
  imageCardImage: {
    height: 30,
    width: 30,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
});
