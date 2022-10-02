import React, {useRef, useState, useEffect} from 'react';
import CustomText from '../shared/components/customText';
import Header from '../shared/components/header';
import TextInputField from '../shared/components/textInputField';
import CustomButton from '../shared/components/customButton';
import firestore from '@react-native-firebase/firestore';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import GlobalStyles from '../shared/styles/globalStyles';
import auth from '@react-native-firebase/auth';
import {showToastMessage} from '../shared/js/showToastMessage';
import PhoneInput from 'react-native-phone-number-input';
import OTP from '../components/otp/otp';
import ResetPassword from '../components/otp/resetPassword';
import CustomPhoneInput from '../shared/components/customPhoneInput';

const ForgotPassword = ({navigation}) => {
  const [formatedPhoneNumber, setFormatedPhoneNumber] = useState('');
  const [phoneNumberValid, setPhoneNumberValid] = useState(true);
  const [confirm, setConfirm] = useState(null);
  const phoneInput = useRef(null);
  const [pageStatusTitle, setPageStatusTitle] = useState('Forgot Password');
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [pageStatus, setPageStatus] = useState(0); // 0 for forgot ,1 for otp , 2 for password reset
  const [initializing, setInitializing] = useState(true);
  const [user1, setUser1] = useState();


  useEffect(() => {
    if (confirm) {
      setPageStatus(1);
      setPageStatusTitle('Confirm OTP');
    }
  }, [confirm]);
  const handleSignup = () => {
    navigation.navigate('login');
  };

  const handleBackNavigation = () => {
    navigation.goBack();
  };

  const handleResetPassword = () => {
    setPageStatus(2);
    setPageStatusTitle('Reset Password');
  };
  const handleOtp = async () => {
    if (phoneNumber.length >= 10) {
      setIsLoading(true);
      auth().signInWithPhoneNumber(formatedPhoneNumber)
        .then(confirmation => {
          setIsLoading(false);
          setConfirm(confirmation);
        })
        .catch(error => {
          setIsLoading(false);

          showToastMessage('error', 'top', `${error}`, 3000, 60);
        });
    } else {
      setIsLoading(false);
      showToastMessage('error', 'top', 'Enter a valid Phone number', 3000, 60);
    }
  };

  return (
    <>
      <Header
        title={'Welcome back'}
        hasBack={true}
        onPress={handleBackNavigation}
      />
      <View style={[{height: '70%'}]}>
        <View style={[styles.page]}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : ''}
            keyboardVerticalOffset={Platform.OS === 'ios' && 90}>
            <ScrollView keyboardShouldPersistTaps="handled">
              <View style={[styles.mainContainer]}>
                <CustomText style={[styles.title]}>
                  {pageStatusTitle}
                </CustomText>
                <View style={[styles.container]}>
                  {pageStatus === 0 && (
                    <>
                      {/* <View style={{borderWidth:7}}> */}
                      <CustomPhoneInput
                        style={[{zIndex: 2000}]}
                        handlePhoneNumber={value => {
                          setPhoneNumber(value);
                        }}
                        checkValid={phoneNumberValid}
                        handlePhonerWithCountryCode={value => {
                          setFormatedPhoneNumber(value);
                        }}
                      />

                      {/* </View> */}
                      <View style={{zIndex: 999}}>
                        <CustomButton
                          Title={'Send OTP'}
                          style={[GlobalStyles.mt3]}
                          IsLoading={isLoading}
                          onPress={handleOtp}
                        />
                      </View>
                    </>
                  )}

                  {pageStatus === 1 && (
                    <OTP
                      confirm={confirm}
                      handleSuccess={handleResetPassword}
                    />
                  )}
                  {pageStatus === 2 && (
                    <ResetPassword
                      phoneNumber={formatedPhoneNumber}
                      handleSuccess={() => navigation.navigate('login')}
                    />
                  )}
                  <View style={[styles.signupContainer]}>
                    <CustomText style={[styles.sigunpText]}>
                      Already have an account?{' '}
                    </CustomText>
                    <Pressable onPress={handleSignup}>
                      <CustomText style={[styles.signup]}>Sign in</CustomText>
                    </Pressable>
                  </View>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </View>
    </>
  );
};
export default ForgotPassword;
const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: GlobalStyles.priColor,
    fontSize: 25,
    fontWeight: 'bold',
    paddingLeft: 15,
  },
  mainContainer: {
    height: '90%',
  },
  container: {
    height: '100%',

    padding: 15,
  },
  signup: {
    color: GlobalStyles.priColor,
  },
  sigunpText: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  signupContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phonInput: {
    height: 60,
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    padding: 0,
    borderColor: GlobalStyles.inputBorder,
  },
  textInputStyle: {
    padding: 0,
    margin: 0,
  },
  textContainerStyle: {
    borderRadius: 5,
  },
});
