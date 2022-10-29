import React, { useState } from 'react';
import CustomButton from '../../shared/components/customButton';
import TextInputField from '../../shared/components/textInputField';
import firestore from '@react-native-firebase/firestore';
import GlobalStyles from '../../shared/styles/globalStyles';
import { showToastMessage } from '../../shared/js/showToastMessage';
import { Base64 } from 'js-base64';
import { updatePasswordAPICall } from '../../shared/services/auth';

const ResetPassword = ({ phoneNumber, handleSuccess }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isButtonLoading, setIsButtonLoading] = useState(false);


  const encryptPassword = (password) => {
    return Base64.encode(password);
  }

  const updatePassword = async (phoneNumber, password) => {
    let _data = {
      phoneWithCountryCode: phoneNumber,
      password: encryptPassword(password)
    }
    setIsButtonLoading(true);
    let _response = await updatePasswordAPICall(_data);
    setIsButtonLoading(false);
    console.log("_response",_response);
    if (_response.isSuccess) {
      showToastMessage(
        'success',
        'top',
        'Password update successfully',
        3000,
        60,
      );
      handleSuccess();
    }
  }

  const handleResetPassword = () => {
    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        showToastMessage(
          'error',
          'top',
          `Password and confirm is not match`,
          3000,
          60,
        );
        return;
      }

      updatePassword(phoneNumber, password);
      // console.log("phon",phoneNumber)
      // let _docRef = firestore().collection('Users');
      // setIsButtonLoading(true);
      // _docRef
      //   .where('phoneWithCountryCode', '==', phoneNumber)
      //   .limit(1)
      //   .get()
      //   .then(response => {
      //     setIsButtonLoading(false);
      //     let _docId = response._docs[0]._ref._documentPath._parts[1];
      //     _docRef
      //       .doc(_docId)
      //       .update({password: encryptPassword(password)})
      //       .then(() => {
      //         showToastMessage(
      //           'success',
      //           'top',
      //           'Password update successfully',
      //           3000,
      //           60,
      //         );
      //         handleSuccess();
      //       })
      //       .catch((error) => {
      //         showToastMessage(
      //           'error',
      //           'top',
      //           'Error while reseting a password!',
      //           3000,
      //           60,
      //         );
      //       });
      //   })
      //   .catch(error => {
      //     setIsButtonLoading(false);
      //     showToastMessage(
      //       'error',
      //       'top',
      //       'Error while reseting a password!',
      //       3000,
      //       60,
      //     );
      //   });
    }
  };
  return (
    <>
      <TextInputField
        SecureTextEntry={true}
        Label={'Password'}
        placeholder="Password"
        style={[GlobalStyles.mt2]}
        OnChangeText={value => setPassword(value)}
      />
      <TextInputField
        SecureTextEntry={true}
        Label={'Confirm Password'}
        placeholder="Confirm Password"
        style={[GlobalStyles.mt2]}
        OnChangeText={value => setConfirmPassword(value)}
      />
      <CustomButton
        IsLoading={isButtonLoading}
        Title={'Reset Password'}
        style={GlobalStyles.mt3}
        onPress={handleResetPassword}
      />
    </>
  );
};

export default ResetPassword;
