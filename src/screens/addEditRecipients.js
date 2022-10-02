import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PaymentMethodCard from '../components/paymentMethodCard';
import BottomSheet from '../shared/components/bottomSheet';
import CustomButton from '../shared/components/customButton';
import firestore from '@react-native-firebase/firestore';
import CustomText from '../shared/components/customText';
import Header from '../shared/components/header';
import TextInputField from '../shared/components/textInputField';
import {PaymentMethodEnum} from '../shared/js/paymentMethodEnum';
import {showToastMessage} from '../shared/js/showToastMessage';
import GlobalStyles from '../shared/styles/globalStyles';
import uuid from 'react-native-uuid';
import BankCard from '../components/bankCard';
import {TextInput} from 'react-native-paper';
import PNF, {PhoneNumberUtil} from 'google-libphonenumber';

const AddEditRecipients = ({navigation, route}) => {
  const refRBSheet = useRef(null);
  const refRBBankSheet = useRef(null);
  const {isEdit} = route.params || {};
  const {recipient,defaultContactData,isDefaultValue} = route.params || {};
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [selectPaymentId, setselectPaymentId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('Kenya');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFullNameInValid, setIsFullNameInValid] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmPhoneNumber, setConfirmPhoneNumber] = useState('');
  const [isconfirmPhoneNumberInvalid, setIsConfirmPhoneNumberInvalid] =
    useState('');
  const [isPhoneNumberInvalid, setisPhoneNumberInvalid] = useState(false);
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [selectedBank, setSelectedBank] = useState('');
  const [isBankAccountNumberInvalid, setisBankAccountNumberInvalid] =
    useState(false);
  const [invalidPaymentId, setInvalidPaymentId] = useState(false);
  const [invalidBankName, setInvalidBankName] = useState(false);
  const [isShowMobilePrefix, setIsShowMobilePrefix] = useState(false);
  const [isShowConfirmMobilePrefix, setIsShowConfirmMobilePrefix] =
    useState(false);
  const [paymentMethods, setPaymentMethods] = useState([
    {
      name: 'MPESA',
      image: require('../assets/images/m-pesa.png'),
      isSelected: false,
      height: 35,
      width:35,
      id: PaymentMethodEnum.mPaisa,
    },
    {
      name: 'Bank transfer',
      image: require('../assets/images/bank.png'),
      isSelected: false,
      height:15,
      width:15,
      id: PaymentMethodEnum.bank,
    },
  ]);
  const phoneUtil = PhoneNumberUtil.getInstance();
  const [bankList, setBankList] = useState([
    {
      name: 'Co-op',
      icon : require('../assets/images/co-op.jpeg'),
      isSelected: false,
      id: 1,
    },
    {
      name: 'Equity',
      isSelected: false,
      icon : require('../assets/images/equity.jpeg'),
      id: 2,
    },
    {
      name: 'Family',
      isSelected: false,
      icon : require('../assets/images/familyBank.jpeg'),
      id: 3,
    },
    {
      name: 'KCB',
      isSelected: false,
      icon : require('../assets/images/kcb.jpeg'),
      id: 4,
    },
    {
      name: 'NCBA',
      isSelected: false,
      icon : require('../assets/images/ncb.jpeg'),
      id: 5,
    },
  ]);

  useEffect(()=>{
    if(isDefaultValue && !isEdit){
      setFullName(defaultContactData.fullName);
      setPhoneNumber(defaultContactData.phoneNumber);
      setConfirmPhoneNumber(defaultContactData.phoneNumber);
      setBankAccountNumber('');
      setselectPaymentId(PaymentMethodEnum.mPaisa);
      let _paymentMethods = [...paymentMethods];
      let _pMethod = paymentMethods.find(item => item.id === PaymentMethodEnum.mPaisa);
      let index = paymentMethods.findIndex(item => item.id === PaymentMethodEnum.mPaisa);
      setSelectedImage(_pMethod.image);
      setSelectedBank(selectedBank);
      setSelectedPaymentMethodIndex(index);
      setPaymentMethods([..._paymentMethods]);
      setSelectedPaymentMethod(_pMethod.name);
    }
  },[isDefaultValue])

  useEffect(() => {
    if (recipient && !isDefaultValue) {
      let {
        phoneNumber,
        bankAccountNumber,
        paymentMethod,
        fullName,
        selectedBank,
      } = recipient;
      setFullName(fullName);
      setPhoneNumber(phoneNumber);
      setConfirmPhoneNumber(phoneNumber);
      setBankAccountNumber(bankAccountNumber);
      setselectPaymentId(paymentMethod);
      let _paymentMethods = [...paymentMethods];
      let _pMethod = paymentMethods.find(item => item.id === paymentMethod);
      let index = paymentMethods.findIndex(item => item.id === paymentMethod);
      setSelectedImage(_pMethod.image);
      setSelectedBank(selectedBank);
      setSelectedPaymentMethodIndex(index);
      setPaymentMethods([..._paymentMethods]);
      setSelectedPaymentMethod(_pMethod.name);
    }
  }, [isEdit]);

  const [selectedPaymentMethodIndex, setSelectedPaymentMethodIndex] =
    useState(null);
  const openBottomSheet = () => {
    refRBSheet.current.open();
  };
  const openBankListBottomSheet = () => {
    refRBBankSheet.current.open();
  };
  const handleSelectPaymentMethod = (id, index) => {
    let _paymentMethods = [...paymentMethods];
    let _method = _paymentMethods.find(item => item.isSelected === true);
    if (_method) {
      _method.isSelected = false;
    }

    let _newMethod = _paymentMethods.find(item => item.id === id);
    if (_newMethod) {
      _newMethod.isSelected = true;
    }
    setselectPaymentId(_newMethod.id);
    setSelectedImage(_newMethod.image);
    setSelectedPaymentMethodIndex(index);
    setPaymentMethods([..._paymentMethods]);
    setSelectedPaymentMethod(_newMethod.name);
    setFullName('');
    setBankAccountNumber('');
    setPhoneNumber('');
    refRBSheet.current.close();
  };
  const handleSelectBank = (id, index) => {
    let _bankList = [...bankList];
    let _bank = _bankList.find(item => item.isSelected === true);
    if (_bank) {
      _bank.isSelected = false;
    }

    let _newBank = _bankList.find(item => item.id === id);
    if (_newBank) {
      _newBank.isSelected = true;
    }
    setBankList([..._bankList]);
    setSelectedBank(_newBank.name);
    refRBBankSheet.current.close();
  };

  const checkFullNameInvalid = () => {
    let _error = false;
    if (!(fullName.trim().length > 0)) {
      _error = true;
    }
    setIsFullNameInValid(_error);
    return !_error;
  };
  const checkBankAccountNumberInvalid = () => {
    let _error = false;
    if (!(bankAccountNumber.trim().length > 0)) {
      _error = true;
    }
    setisBankAccountNumberInvalid(_error);
    return !_error;
  };

  const checkMobileNumberInvalid = () => {
    let _error = false;
    _error = phoneUtil.isValidNumberForRegion(
      phoneUtil.parse(phoneNumber, 'KE'),
      'KE',
    );

    setisPhoneNumberInvalid(!_error);
    return _error;
  };
  const checkSelectBankInvalid = () => {
    let _error = false;
    if (!selectedBank) {
      _error = true;
    }
    setInvalidBankName(_error);
    return !_error;
  };

  const checkMobileAndConfirmMobile = () => {
    let _flag = false;
    if (
      confirmPhoneNumber !== phoneNumber ||
      (confirmPhoneNumber === '' && phoneNumber === '')
    ) {
      _flag = true;
      setisPhoneNumberInvalid(true);
    }
    setIsConfirmPhoneNumberInvalid(_flag);
    return !_flag;
  };
  const addRecipients = async () => {
    if (!selectPaymentId) {
      setInvalidPaymentId(true);
      return;
    } else {
      setInvalidPaymentId(false);
      if (selectPaymentId === PaymentMethodEnum.mPaisa) {
        let _fullNameInvalid = checkFullNameInvalid();
        let _mobildNumberValid = checkMobileNumberInvalid();
        let _phoneNumberAndConfirm = checkMobileAndConfirmMobile();

        if (
          !(_fullNameInvalid && _mobildNumberValid && _phoneNumberAndConfirm)
        ) {
          return;
        }
      } else if (selectPaymentId === PaymentMethodEnum.bank) {
        let _fullNameInvalid = checkFullNameInvalid();
        let _bankNumber = checkBankAccountNumberInvalid();
        let _selectBank = checkSelectBankInvalid();
        if (!(_bankNumber && _fullNameInvalid && _selectBank)) {
          return;
        }
      }
    }
    let _userData = await AsyncStorage.getItem('userData');
    _userData = JSON.parse(_userData);
    let _recipient = {
      id: isEdit ? recipient.id : uuid.v4(),
      paymentMethod: selectPaymentId,
      country: selectedCountry,
      phoneNumber: `${phoneNumber}`,
      phoneNumberCountryCode: '+254',
      bankAccountNumber: bankAccountNumber,
      fullName: fullName,
      selectedBank: selectedBank,
      userId: _userData.id,
    };

    storeRecipientInFirebase(_recipient);
  };
  const editRecipientFirebase = recipientData => {
    let _updateData = {
      paymentMethod: recipientData.paymentMethod,
      country: recipientData.country,
      phoneNumber: recipientData.phoneNumber,
      bankAccountNumber: recipientData.bankAccountNumber,
      fullName: recipientData.fullName,
    };
    setIsButtonLoading(true);
    let _docRef = firestore().collection('Recipients');
    _docRef
      .where('id', '==', recipient.id)
      .limit(1)
      .get()
      .then(response => {
        let _docId = response._docs[0]._ref._documentPath._parts[1];
        _docRef
          .doc(_docId)
          .update(_updateData)
          .then(() => {
            setIsButtonLoading(false);
            showToastMessage(
              'success',
              'top',
              'Recipient updated successfully',
              3000,
              60,
            );
            resetState();
            navigation.push('recipientList');
          })
          .catch(error => {
            setIsButtonLoading(false);
            showToastMessage('error', 'top', `${error}`, 3000, 60);
          });
      })
      .catch(error => {
        setIsButtonLoading(false);
        showToastMessage('error', 'top', `${error}`, 3000, 60);
      });
  };
  const handleDeleteRecipient = () => {
    let _docRef = firestore().collection('Recipients');
    setIsLoading(true);
    _docRef
      .where('id', '==', recipient.id)
      .limit(1)
      .get()
      .then(response => {
        let _docId = response._docs[0]._ref._documentPath._parts[1];
        _docRef
          .doc(_docId)
          .delete()
          .then(() => {
            setIsLoading(false);
            showToastMessage(
              'success',
              'top',
              'Recipient deleted successfully',
              3000,
              60,
            );
            resetState();
            navigation.push('recipientList');
          })
          .catch(error => {
            setIsLoading(false);
            showToastMessage('error', 'top', `${error}`, 3000, 60);
          });
      })
      .catch(error => {
        setIsLoading(false);
        showToastMessage('error', 'top', `${error}`, 3000, 60);
      });
  };

  const storeRecipientInFirebase = async recipients => {
    setIsButtonLoading(true);
    let _method = 'phoneNumber';
    let _methodValue = recipients.phoneNumber;
    if (recipients.paymentMethod === PaymentMethodEnum.bank) {
      _method = 'bankAccountNumber';
      _methodValue = recipients.bankAccountNumber;
    }
    let _userData = await AsyncStorage.getItem('userData');
    _userData = JSON.parse(_userData);
    firestore()
      .collection('Recipients')
      .where(_method, '==', _methodValue)
      .where('userId', '==',_userData.id)
      .get()
      .then(async response => {
        if (isEdit) {
          if (response._docs.length > 0) {
            if (response._docs[0]._data.id === recipients.id) {
              editRecipientFirebase(recipients);
              return;
            } else {
              setIsButtonLoading(false);
              showToastMessage(
                'error',
                'top',
                `That recipient is already in use!`,
                3000,
                60,
              );
            }
          } else {
            editRecipientFirebase(recipients);
            return;
          }
        } else if (response._docs.length === 0) {
          addRecipientsInFirestore(recipients);
          // handleAddUser(user);
          return;
        } else {
          let _user = await AsyncStorage.getItem('userData');
          _user = JSON.parse(_user);
          let _recipientUserId = response._docs[0]._data.userId;
          if (_recipientUserId !== _user.id) {
            addRecipientsInFirestore(recipients);
            return;
          }
          setIsButtonLoading(false);
          showToastMessage(
            'error',
            'top',
            `That recipient is already in use!`,
            3000,
            60,
          );
        }
      })
      .catch(error => {
        setIsButtonLoading(false);
        showToastMessage('error', 'top', 'Server error!', 3000, 60);
      });
  };
  const addRecipientsInFirestore = recipients => {
    firestore()
      .collection('Recipients')
      .add(recipients)
      .then(() => {
        showToastMessage(
          'success',
          'top',
          'Recipient added successfully.',
          3000,
          60,
        );
        resetState();
        setIsButtonLoading(false);
        navigation.push('recipientList');
      })
      .catch(error => {
        showToastMessage('error', 'top', `${error}`, 3000, 60);
        setIsButtonLoading(false);
      });
  };
  const resetState = () => {
    setselectPaymentId(null);
    setPhoneNumber('');
    setBankAccountNumber('');
    setFullName('');
  };

  const handleMobileOnFocus = () => {
    setIsShowMobilePrefix(true);
  };
  const handleConfirmMobileOnFocus = () => {
    setIsShowConfirmMobilePrefix(true);
  };
  const handleConfirmMobieOnBlur = () => {
    if (!confirmPhoneNumber) {
      setIsShowConfirmMobilePrefix(false);
    }
  };
  const handleMobieOnBlur = () => {
    if (!phoneNumber) {
      setIsShowMobilePrefix(false);
    }
  };

  return (
    <>
      <Header
        title={`${isEdit ? 'Edit' : 'Add'} Recipient`}
        hasBack
        onPress={() => navigation.navigate('recipientList')}
      />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{flex: 1, marginTop: 5}}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : ''}
            keyboardVerticalOffset={Platform.OS === 'ios' && 90}>
            <ScrollView keyboardShouldPersistTaps="handled">
              <View style={[styles.container]}>
                <View style={[styles.selectedCountry]}>
                  <View>
                    <CustomText style={[styles.selectedCountryText]}>
                      Country
                    </CustomText>
                    <View
                      style={[
                        GlobalStyles.flexDirectionRow,
                        {alignItems: 'center'},
                      ]}>
                      <Image
                        source={require('../assets/images/keyniya.png')}
                        style={styles.iconStyle}
                      />
                      <CustomText style={[{marginLeft: 5}]}>
                        {selectedCountry}
                      </CustomText>
                    </View>
                  </View>
                  <Image
                    source={require('../assets/images/downArrow.png')}
                    style={{height: 20, width: 20, marginRight: 15}}
                  />
                </View>
                <Pressable onPress={openBottomSheet}>
                  <View
                    style={[
                      styles.selectedCountry,
                      {marginTop: 10},
                      {
                        borderColor: invalidPaymentId
                          ? 'red'
                          : GlobalStyles.inputBorder,
                      },
                    ]}>
                    <View>
                      <CustomText style={[styles.selectedCountryText]}>
                        payout method
                      </CustomText>
                      <View
                        style={[
                          GlobalStyles.flexDirectionRow,
                          {alignItems: 'center', marginTop: 3},
                        ]}>
                        <Image
                          source={selectedImage}
                          style={{height: 25, width: 25}}
                        />
                        <CustomText style={[{marginLeft: 5}]}>
                          {selectedPaymentMethod
                            ? selectedPaymentMethod
                            : ' Select method'}
                        </CustomText>
                      </View>
                    </View>
                    <Image
                      source={require('../assets/images/downArrow.png')}
                      style={{height: 20, width: 20, marginRight: 15}}
                    />
                  </View>
                </Pressable>
                {selectedPaymentMethodIndex === 0 && (
                  <>
                    <TextInputField
                      IsError={isFullNameInValid}
                      style={[GlobalStyles.mt1]}
                      placeholder={'Full Name'}
                      Label={'Full Name'}
                      DefaultValue={fullName}
                      OnChangeText={value => setFullName(value)}
                    />

                    <TextInputField
                      leftAffix={
                        <TextInput.Affix
                          text="+254"
                          textStyle={{marginTop: 2}}
                        />
                      }
                      style={[GlobalStyles.mt1]}
                      onBlur={handleMobieOnBlur}
                      onFocus={handleMobileOnFocus}
                      KeyboardType={'numeric'}
                      IsError={isPhoneNumberInvalid}
                      DefaultValue={phoneNumber}
                      Label={'Mobile Number'}
                      OnChangeText={value => setPhoneNumber(value)}
                    />

                    <TextInputField
                      leftAffix={
                        <TextInput.Affix
                          text="+254"
                          textStyle={{marginTop: 2}}
                        />
                      }
                      KeyboardType={'numeric'}
                      style={[GlobalStyles.mt1]}
                      IsError={isconfirmPhoneNumberInvalid}
                      DefaultValue={confirmPhoneNumber}
                      Label={'Confirm Mobile Number'}
                      OnChangeText={value => setConfirmPhoneNumber(value)}
                    />

                    {isconfirmPhoneNumberInvalid && (
                      <CustomText style={{color: 'red', marginTop: 10}}>
                        Mobile number and confirm mobile number doesn't match
                      </CustomText>
                    )}
                    <View style={[styles.textContainer, GlobalStyles.mt2]}>
                      <CustomText style={[styles.infoText]}>
                        Ensure the recipient's number is their correct Safaricom
                        number. There is no guarantee of refund for transfers to
                        incorrect mobille numbers.
                      </CustomText>
                    </View>
                  </>
                )}
                {selectedPaymentMethodIndex === 1 && (
                  <>
                    <TextInputField
                      IsError={isFullNameInValid}
                      style={[GlobalStyles.mt1]}
                      placeholder={'Full Name'}
                      Label={'Full Name'}
                      DefaultValue={fullName}
                      OnChangeText={value => setFullName(value)}
                    />
                    <Pressable onPress={openBankListBottomSheet}>
                      <View
                        style={[
                          styles.selectedCountry,
                          {marginTop: 10},
                          {
                            borderColor: invalidBankName
                              ? 'red'
                              : GlobalStyles.inputBorder,
                          },
                        ]}>
                        <View>
                          <CustomText style={[styles.selectedCountryText]}>
                            Select bank
                          </CustomText>
                          <View
                            style={[
                              GlobalStyles.flexDirectionRow,
                              {alignItems: 'center', marginTop: 3},
                            ]}>
                            <CustomText style={[{marginLeft: 5}]}>
                              {selectedBank ? selectedBank : 'Select Bank'}
                            </CustomText>
                          </View>
                        </View>
                        <Image
                          source={require('../assets/images/downArrow.png')}
                          style={{height: 20, width: 20, marginRight: 15}}
                        />
                      </View>
                    </Pressable>
                    <TextInputField
                      IsError={isBankAccountNumberInvalid}
                      style={[GlobalStyles.mt1]}
                      DefaultValue={bankAccountNumber}
                      placeholder={'Account Number'}
                      Label={'Account Number'}
                      OnChangeText={value => setBankAccountNumber(value)}
                    />
                    <View style={[styles.textContainer, GlobalStyles.mt2]}>
                      <CustomText style={[styles.infoText]}>
                        Ensure the recipient's number is their correct Safaricom
                        number. There is no guarantee of refund for transfers to
                        incorrect account numbers.
                      </CustomText>
                    </View>
                  </>
                )}
                <View>
                  <CustomButton
                    IsLoading={isButtonLoading}
                    Title={'Save'}
                    style={{marginTop: 60}}
                    onPress={addRecipients}
                  />
                  {isEdit && (
                    <CustomButton
                      IsLoading={isLoading}
                      Title={'Delete'}
                      contentStyle={styles.deleteButton}
                      labelStyle={{color: 'red'}}
                      onPress={handleDeleteRecipient}
                    />
                  )}
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
      <BottomSheet refRBSheet={refRBSheet} title={'Select payout method'}>
        {paymentMethods.map((item, index) => (
          <PaymentMethodCard
            index={index}
            payoutMethod={item}
            handleSelectPaymentMethod={handleSelectPaymentMethod}
          />
        ))}
      </BottomSheet>
      <BottomSheet refRBSheet={refRBBankSheet} title={'Select bank'}>
        {bankList.map((item, index) => (
          <BankCard
            index={index}
            bankItem={item}
            handleSelectBankMethod={handleSelectBank}
          />
        ))}
      </BottomSheet>
    </>
  );
};
export default AddEditRecipients;

const styles = StyleSheet.create({
  privacyContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  deleteButton: {
    marginTop: 30,
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  selectedCountry: {
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    paddingLeft: 15,
    height: 55,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  selectedCountryText: {
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 14,
  },

  container: {
    padding: 15,
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
  },

  iconStyle: {
    height: 30,
    width: 30,
  },

  textContainer: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#E6F8FA',
  },
    infoText: {
      fontWeight: '500',
      fontSize:14
    },
});
