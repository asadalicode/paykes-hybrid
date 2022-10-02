import CustomText from '../shared/components/customText';
import React, { useEffect, useRef, useState } from 'react';
import CustomButton from '../shared/components/customButton';
import GlobalStyles from '../shared/styles/globalStyles';
import { StyleSheet, View, ViewBase, Image, ScrollView } from 'react-native';
import TextInputField from '../shared/components/textInputField';
import TransectionCard from '../components/transectionCard';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecipientCard from '../components/recipientCard';
import CustomIconButton from '../shared/components/customIconButton';
import { SQIPCore, SQIPCardEntry } from 'react-native-square-in-app-payments';
import uuid from 'react-native-uuid';
import {
  createCustomerAPICall,
  currencyConverterAPICall,
  mPaisaAPICall,
  paymentAPICall,
  getTansectionAPICall,
  registerCardAPICall,
  getCardDetailsAPICall,
} from '../shared/services/payment';
import { showToastMessage } from '../shared/js/showToastMessage';
import BottomSheet from '../shared/components/bottomSheet';
import PaymentDetails from '../components/paymentDetails';
import PaymentConfirmModal from '../components/paymentConfirmModal';
import OverlayLoader from '../components/overlayLoader';

const Dashboard = ({ navigation, route }) => {
  const [transecionHistory, setTransectionHistory] = useState([
  ]);
  const [transectionListLoading, setTrasectionListLoading] = useState(false);
  const [isShowTransectionListFull, setIsShowTransectionListFull] = useState(false);
  const [recipientId, setRecipientId] = useState(null);
  const [recipientName, setRecipientName] = useState(null);
  const [recipients, setRecipients] = useState([]);
  const { recipient } = route.params || {};
  const [filterRecipients, setFilterRecipients] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [amount, setAmount] = useState(0);
  const [KESAmount, setKESAmount] = useState(0);
  const [recipientNumber, setRecipientNumber] = useState('');
  const [kesInputAmount, setkesInputAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isCredetCard, setIsCredetCard] = useState(false);
  const [sourceId, setSourceId] = useState(null);
  const [sendError, setSendError] = useState(false);
  const [recieveError, setRecieveError] = useState(false);
  const [registerCardLoader, setRegisterCardLoader] = useState(true);
  const [amountLoader, setAmountLoader] = useState(true);
  const [isShowKExceededError, setIsShowKShExceededError] = useState(false);
  const [cardDetails, setCardDetails] = useState({});
  const [totalTodayTransaction, setTotalTodayTransaction] = useState(0);
  const [isShowExceededPerTransaction, setIsShowExceededPerTransaction] = useState(false);
  const [isShowPaymentConfirmModal, setIsShowPaymentConfirmModal] = useState(false)
  const refRBSheet = useRef();

  useEffect(() => {
    getRecipients();
    currencyConverter(1);
    getRegisterCard();
    getTransection();
    getCardDetails();
  }, []);
  useEffect(() => {
    if (recipient) {
      handleRecipient(recipient);
    }
  }, [recipient]);

  const getCardDetails = async () => {
    let _userData = await AsyncStorage.getItem('userData');
    _userData = JSON.parse(_userData);
    let _response = await getCardDetailsAPICall(_userData.id);
    if (_response.isSuccess) {

      setSourceId(_response.data.card.id)
    }
  }


  const getTransection = async () => {
    setTrasectionListLoading(true);
    let _userData = await AsyncStorage.getItem('userData');
    _userData = JSON.parse(_userData);
    let _response = await getTansectionAPICall(_userData.id);
    console.log("transaction here", _response);
    setTrasectionListLoading(false);
    if (_response.isSuccess) {
      let _data = _response.result;
      _data = _data.map((item) => {
        return {
          name: item.receiver?.split('-')[1],
          ksh: item.amount,
          date: new Date(item.created_timestamp._seconds * 1000).toLocaleDateString(),
          time: new Date(item.created_timestamp._seconds * 1000)
        }
      })
      _data.sort(function (a, b) {
        return new Date(b.time) - new Date(a.time);
      });
      if (_data.length <= 10) {
        setIsShowTransectionListFull(true);
      }
      let _todayTransaction = _data.filter((item) => item.date === new Date().toLocaleDateString());
      let _values = _todayTransaction.map((item) => {
        return item.ksh
      })
      let _totalValues = _values.reduce(getSum, 0);
      setTotalTodayTransaction(_totalValues);
      setTransectionHistory(_data);
    }
  }
  function getSum(total, num) {
    return total + Math.round(num);
  }

  const getRegisterCard = async () => {
    setRegisterCardLoader(true);
    let _userData = await AsyncStorage.getItem('userData');
    _userData = JSON.parse(_userData);
    let _response = await registerCardAPICall(_userData.id);
    setRegisterCardLoader(false);
    if (_response.isSuccess) {
      if (_response.result.card) {
        if (_response.result.card.enabled) {
          setIsCredetCard(true);
          setCardDetails(_response.result.card);
        } else {
          setIsCredetCard(false);
          setCardDetails({});

        }
      }
    }
  };

  const sendPayment = () => {
    if (!isCredetCard) {
      showToastMessage(
        'error',
        'top',
        `Please add payment card first`,
        3000,
        60,
      );
      return;
    }
    if (amount <= 0) {
      showToastMessage('error', 'top', `Please enter a valid amount`, 3000, 60);
      return;
    }
    if (!recipientNumber) {
      showToastMessage('error', 'top', `Please select a recipient`, 3000, 60);
      return;
    }
    // handlePaymentSend();
    refRBSheet.current.open();
  };

  const sendPaymentToMPaisa = async () => {
    let _userData = await AsyncStorage.getItem('userData');
    _userData = JSON.parse(_userData);
    let _phoneNumber = recipient.phoneNumberCountryCode + recipient.phoneNumber;
    _phoneNumber = _phoneNumber.substring(1);
    let _data = {
      amount: kesInputAmount,
      userId: _userData.id,
      phoneNumber: _phoneNumber
    };
    let _response = await mPaisaAPICall(_data);
    setIsLoading(false);
    if (_response.isSuccess) {
      setIsShowPaymentConfirmModal(false);
      closeBottomSheet();
      showToastMessage('success', 'top', `Payment send successfully`, 3000, 60);
      setAmount(0);
      setkesInputAmount(0);
      getTransection();
    }
  };
  const handlePaymentSend = async () => {
    setIsLoading(true);
    let _userData = await AsyncStorage.getItem('userData');
    _userData = JSON.parse(_userData);
    let _data = {
      idempotencyKey: uuid.v4(),
      locationId: 'L82WYGMV2BF2W',
      sourceId: sourceId,
      amount: amount * 100,
      referenceId: uuid.v4(),
      customerId: _userData.customerId,
      userId: _userData.id,
      note: 'Test Payment',
    };
    let _response = await paymentAPICall(_data);
    if (_response.isSuccess) {

      sendPaymentToMPaisa();
      // showToastMessage(
      //   'success',
      //   'top',
      //   `Payment send successfully`,
      //   3000,
      //   60,
      // );
    }
    else {
      setIsLoading(false);
    }
  };

  const getRecipients = async () => {
    let _userData = await AsyncStorage.getItem('userData');
    _userData = JSON.parse(_userData);
    firestore()
      .collection('Recipients')
      .where('userId', '==', _userData.id)
      .get()
      .then(response => {
        let _recipientsData = response._docs;
        if (_recipientsData.length > 0) {
          let _recipients = _recipientsData.map(({ _data }) => {
            return _data;
          });
          setRecipients([..._recipients]);
          setFilterRecipients([..._recipients]);
        }
      })
      .catch(error => {
        showToastMessage('error', 'top', `${error}`, 3000, 60);
      });
  };
  const handleSearch = value => {
    let _newRecipeints = [...recipients];
    if (value) {
      _newRecipeints = recipients.filter(item => {
        if (item.fullName.toLocaleLowerCase().includes(value.toLowerCase()))
          return item;
      });
    }
    setRecipientName(value);
    if (!value) {
      setRecipientId(null);
    }
    setFilterRecipients([..._newRecipeints]);
  };

  const handleRecipientList = () => {
    navigation.navigate('recipientList');
  };
  const handleRecipient = recipient => {
    setRecipientName(recipient.fullName);
    setRecipientId(recipient.id);
    let _number = recipient.phoneNumberCountryCode + recipient.phoneNumber;
    setRecipientNumber(_number);
  };

  const handleRemoveRecipient = recipient => {
    setRecipientName(null);
    setRecipientId(null);
  };

  const handleProfileRoute = () => {
    navigation.navigate('profile');
  };
  const handleSupportRoute = () => {
    navigation.navigate('support');
  };
  const currencyConverter = async usd => {
    setAmountLoader(true);
    let _result = await currencyConverterAPICall(usd);
    console.log("result11",_result);
    setAmountLoader(false);
    if (_result.isSuccess) {
      setKESAmount(_result.resultAmount - 0.99);
    }
  };


  const closeBottomSheet = () => {
    refRBSheet.current.close();
  };

  const handleMoreTransection = () => {
    navigation.push("transections", {
      transections: transecionHistory,
      KESAmount
    })
  }
  const handleSendValue = (value) => {
    value = value.replace(/[^0-9.]/g, "");
    let _flag = value ? (value.match(/\./g) === null|| value.match(/\./g)?.length <=1) : false;
    if (_flag) {
      setAmount(value);
      setkesInputAmount((value * parseFloat(KESAmount)).toFixed(2));
      if ((value * parseFloat(KESAmount)).toFixed(2) > 150000) {
        setIsShowKShExceededError(true);
      }
      else {
        setIsShowKShExceededError(false);
      }
      let _values = (value * parseFloat(KESAmount)).toFixed(2) + totalTodayTransaction;
      if (_values > 300000) {
        setIsShowExceededPerTransaction(true);
      }
      else {
        setIsShowExceededPerTransaction(false);

      }
    }

  }
  const handleRecieveAmount = (value) => {
    value = value.replace(/[^0-9.]/g, "");
    let _flag = value ? (value.match(/\./g) === null|| value.match(/\./g)?.length <=1) : false;
    if(_flag){
      setkesInputAmount(value);
      if (parseFloat(value).toFixed(2) + totalTodayTransaction > 300000) {
        setIsShowExceededPerTransaction(true);
      }
      else {
        setIsShowExceededPerTransaction(false);
  
      }
      if (value > 150000) {
        setIsShowKShExceededError(true);
      }
      else {
        setIsShowKShExceededError(false);
      }
      setAmount((value / parseFloat(KESAmount)).toFixed(2));
    }
  }

  return (
    <>

      <View>

        <View style={[GlobalStyles.bgPrimary, styles.header]}>
          <CustomIconButton
            Icon={() => (
              <Image
                style={{ height: 25, width: 25 }}
                source={require('../assets/images/questionMark.png')}
              />
            )}
            onPress={handleSupportRoute}
          />

          <CustomText style={styles.headerTitle}>PayKES</CustomText>
          <CustomIconButton
            Icon={() => (
              <Image
                style={{ height: 25, width: 25 }}
                source={require('../assets/images/avatar.png')}
              />
            )}
            onPress={handleProfileRoute}
          />
        </View>
        <View style={{ padding: 15 }}>
          <View style={[styles.container, GlobalStyles.mb2]}>
            <CustomText style={[styles.containerTitle]}>
              Sending Money to{' '}
            </CustomText>
            <View style={styles.country}>
              <Image
                source={require('../assets/images/keyniya.png')}
                style={styles.flag}
              />
              <CustomText style={{ fontWeight: '700', marginLeft: 5 }}>
                Kenya
              </CustomText>
              <Image
                source={require('../assets/images/downArrow.png')}
                style={{ height: 20, width: 20, marginTop: 5 }}
              />
            </View>
          </View>
          <View>
            <Pressable onPress={handleRecipientList}>
              <View style={[styles.recipientContainer, GlobalStyles.mb1]}>
                <CustomText>
                  {recipientName ? recipientName : 'Recipient Name'}
                </CustomText>
                {!recipientName ? (
                  <Image
                    source={require('../assets/images/profile.png')}
                    style={{ height: 25, width: 25 }}
                  />
                ) : (
                  <Pressable onPress={handleRemoveRecipient}>
                    <Image
                      source={require('../assets/images/cross.png')}
                      style={{ height: 15, width: 15 }}
                    />
                  </Pressable>
                )}
              </View>
            </Pressable>
            <View style={styles.transferContainer}>
              <View style={[GlobalStyles.flex1]}>

                <TextInputField
                  style={[{ marginRight: 4, color: GlobalStyles.textColor.color }]}
                  Label={'You send'}
                  placeholder="$0.00"
                  Value={amount}
                  textColor={GlobalStyles.inputBorder}
                  KeyboardType={'numeric'}
                  OnChangeText={handleSendValue}
                />
                {sendError &&

                  <CustomText style={{ fontSize: 12, color: 'red' }}>
                    Negative number not allowed
                  </CustomText>
                }
              </View>
              <View style={[GlobalStyles.flex1]}>

                <TextInputField
                  style={[{ marginLeft: 4 }]}
                  Label={'They receive'}
                  KeyboardType={'numeric'}
                  textColor={GlobalStyles.inputBorder}
                  Value={kesInputAmount}
                  // Value=}
                  // Editable={true}
                  OnChangeText={
                    handleRecieveAmount
                  }
                  placeholder="0Ksh"
                />
                {
                  recieveError &&
                  <CustomText style={{ fontSize: 12, color: 'red' }}>
                    Negative number not allowed
                  </CustomText>
                }
              </View>
            </View>
            {
              isShowKExceededError ?
                <CustomText style={[styles.exchangeRate, { color: 'red' }]}>
                  Can't send more then  150,000Ksh in one transaction
                </CustomText>
                : isShowExceededPerTransaction ?
                  <CustomText style={[styles.exchangeRate, { color: 'red' }]}>
                    Can't send more then  300,000Ksh in one day
                  </CustomText>
                  :
                  <CustomText style={[styles.exchangeRate]}>
                    Exchange Rate 1 USD = {parseFloat(KESAmount).toFixed(2)} Ksh with no
                    fees
                  </CustomText>
            }

            <CustomButton
              Title={'Continue to Send'}
              disabled={!recipientId ? true : false || sendError || recieveError}
              style={[GlobalStyles.mt3]}
              onPress={sendPayment}
            />
          </View>

        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 500 }}>
          <View>
            <View style={[styles.transectionContainer, GlobalStyles.mt3]}>
              <View style={[styles.mContainer]}>
                <CustomText style={styles.rapidText}>
                  Instant, No Transaction Fees
                  {/* <CustomText
                  style={[styles.rapidText, { textDecorationLine: 'underline' }]}>
                  no fee
                </CustomText>{' '}
                transfer */}
                </CustomText>
                <View style={[GlobalStyles.flexDirectionRow]}>
                  <View
                    style={[
                      styles.subContainer,
                      GlobalStyles.flexDirectionRow,
                      { marginTop: 10 },
                    ]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                      <View>

                        <CustomText style={{ fontSize: 12 }}>
                          Send to M-PESA mobille wallets and select bank
                        </CustomText>
                        <View
                          style={[
                            GlobalStyles.flexDirectionRow,
                            { justifyContent: 'center' },
                            GlobalStyles.mt1,
                          ]}>
                          <Image
                            source={require('../assets/images/m-pesa.png')}
                            style={styles.mPesa}
                          />
                          <Image
                            source={require('../assets/images/bank.png')}
                            style={styles.bank}
                          />
                        </View>
                      </View>
                    </View>
                    {/* <Image
                    source={require('../assets/images/1.png')}
                    style={[styles.rapidImage]}
                  /> */}
                  </View>
                </View>
              </View>
              <CustomText style={[styles.transectionTitle, GlobalStyles.mt2]}>
                Transaction List{' '}
              </CustomText>
              <View style={[GlobalStyles.mt2, GlobalStyles.mb5]}>

                {transecionHistory?.filter((item, index) => {
                  if (index < 10) {
                    return item;
                  }
                }

                ).map(transection => (
                  <TransectionCard transection={transection} kesAmount={KESAmount} />
                ))}
                {!isShowTransectionListFull && !transectionListLoading &&
                  <View style={{ padding: 20 }}>
                    <CustomButton
                      onPress={handleMoreTransection}
                      Title={"View more transactions"}
                    />
                  </View>
                }
                {transecionHistory?.length === 0 && !transectionListLoading && (
                  <View style={{ alignItems: 'center', marginTop: 5 }}>
                    <CustomText>You have no transactions</CustomText>
                    <CustomText>Add recipient to get started.</CustomText>
                    <CustomButton
                      Title="Add recipient"
                      style={[GlobalStyles.mt2, { width: '70%' }]}
                      contentStyle={[]}
                      labelStyle={[GlobalStyles.priColor]}
                      onPress={() => navigation.push('addEditRecipients')}
                    />
                  </View>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
        <BottomSheet refRBSheet={refRBSheet} height={600}>
          <PaymentDetails
            recipient={recipient}
            totalSent={amount}
            kshValue={KESAmount.toFixed(2)}
            kesAmount={kesInputAmount}
            cardDetails={cardDetails}
            handleConfirmPayment={setIsShowPaymentConfirmModal}
          />
        </BottomSheet>
        <PaymentConfirmModal
          navigation={navigation}
          isShowPaymentConfirmModal={isShowPaymentConfirmModal}
          hideModal={setIsShowPaymentConfirmModal}
          handleConfirm={handlePaymentSend}
          isLoading={isLoading}
        />
      </View>
      {
        (registerCardLoader || amountLoader) &&
        <OverlayLoader />
      }
    </>
  );
};

export default Dashboard;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  login: {
    borderWidth: 1,
    color: GlobalStyles.priColor,
    borderColor: GlobalStyles.priColor,
  },
  recipientContainer: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 3,
    height: 60,
    borderColor: GlobalStyles.inputBorder,
    borderWidth: 1,
    justifyContent: 'space-between',
  },
  recipientList: {
    height: 200,
    backgroundColor: 'white',
  },
  containerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: GlobalStyles.priColor,
  },
  country: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    height: 80,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  transferContainer: {
    flexDirection: 'row',
  },
  flag: {
    height: 25,
    width: 25,
  },

  exchangeRate: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 13
  },
  informationContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#E6F8FA',
  },
  infoContainerImage: {
    width: 80,
    height: 140,
    position: 'relative',
    top: 10,
    marginRight: 10,
  },
  rapidText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mContainer: {
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 15,
    backgroundColor: '#E6F8FA',
  },
  subContainer: {
    marginTOp: 20,
    backgroundColor: 'white',
    padding: 10,
    flex: 1,
  },
  rapidImage: {
    width: 60,
    height: 100,
    position: 'absolute',
    right: 10,
    bottom: -10,
  },
  mPesa: {
    height: 50,
    width: 100,
  },
  bank: {
    height: 30,
    width: 30,
    marginLeft: 10,
  },
  actionRequired: {
    fontWeight: '700',
    fontSize: 17,
  },

  transectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    paddingLeft: 15,
  },
});
