import {firebase} from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import OTPTextInput from 'react-native-otp-textinput';
import CustomButton from '../../shared/components/customButton';
import {showToastMessage} from '../../shared/js/showToastMessage';
import GlobalStyles from '../../shared/styles/globalStyles';
import auth from '@react-native-firebase/auth';

const OTP = ({confirm, handleSuccess}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [otpValue, setOTPValue] = useState('');

  const handleConfirmOTP = async () => {
    if (otpValue.length < 6) {
      showToastMessage('error', 'top', `Please enter the OTP`, 3000, 60);
      return;
    } 
    setIsLoading(true);
    confirm
      .confirm(otpValue)
      .then(result => {
        handleSuccess();
      })
      .catch(error => {
        setIsLoading(false);
        showToastMessage('error', 'top', `${error}`, 3000, 60);
      });
  };

  return (
    <>
      <OTPTextInput
        textInputStyle={{width: '12%'}}
        handleTextChange={value => setOTPValue(value)}
        inputCount={6}></OTPTextInput>
      <CustomButton
        Title={'Confirm OTP'}
        style={[GlobalStyles.mt3]}
        IsLoading={isLoading}
        onPress={handleConfirmOTP}
      />
    </>
  );
};
export default OTP;
