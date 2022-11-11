import React, { useEffect, useState } from 'react';
import CustomText from '../shared/components/customText';
import Header from '../shared/components/header';
import TextInputField from '../shared/components/textInputField';
import CustomButton from '../shared/components/customButton';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Keyboard,
  StyleSheet,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import auth from '@react-native-firebase/auth';
import { showToastMessage } from '../shared/js/showToastMessage';
import Popup from '../shared/components/popup';
import OTP from '../components/otp/otp';
import GlobalStyles from '../shared/styles/globalStyles';
import { Base64 } from 'js-base64';
import { useContext } from 'react';
import { Context } from '../../appContext';

const Login = ({ navigation }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileLogin, setIsMobileLogin] = useState(false);
  const [iShowOtpModal, setIsShowOtpModal] = useState(false);
  const [confirm, setConfimation] = useState(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const context = useContext(Context);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleSignup = () => {
    navigation.push('signup');
  };
  const handleFogotPassword = () => {
    navigation.push('forgotPassword');
  };

  const handleBackNavigation = () => {
    navigation.goBack();
  };

  const handleLogin = () => {

    if (!(emailOrPhone && password)) {
      showToastMessage(
        'error',
        'top',
        'Invalid email/phone number or password!',
        3000,
        60,
      );
      return;
    }
    setIsLoading(true);
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailOrPhone.match(regexEmail)) {
      loginThroughEmail();
    } else {
      loginThroughPhone();
    }
  };

  const sendOtp = async phoneNumber => {
    auth()
      .signInWithPhoneNumber(phoneNumber)
      .then(confirmation => {
        setIsLoading(false);
        setConfimation(confirmation);
        setIsShowOtpModal(true);
      })
      .catch(error => {
        setIsLoading(false);
        showToastMessage('error', 'top', `${error}`, 3000, 60);
      });
  };

  const loginThroughPhoneWithCountryCode = async () => {
    firestore()
      .collection('Users')
      .where('phoneWithCountryCode', '==', emailOrPhone)
      .where('password', '==', encryptPassword(password))
      .get()
      .then(async response => {
        if (response._docs.length > 0) {
          let _userData = response._docs[0]._data;
          await AsyncStorage.setItem('userData', JSON.stringify(_userData));
          context.setIsLogin(true);
          navigation.push('dashboard');
          // sendOtp(emailOrPhone);
        } else {
          setIsLoading(false);
          showToastMessage(
            'error',
            'top',
            'Invalid phone number or password!',
            3000,
            60,
          );
        }
      })
      .catch(error => {
        setIsLoading(false);
        showToastMessage(
          'error',
          'top',
          'Invalid phone number or password!',
          3000,
          60,
        );
      });
  };
  const loginThroughPhone = async () => {
    setIsMobileLogin(true);
    firestore()
      .collection('Users')
      .where('phoneNumber', '==', emailOrPhone)
      .where('password', '==', encryptPassword(password))
      .get()
      .then(async response => {
        if (response._docs.length > 0) {
          let _userData = response._docs[0]._data;
          await AsyncStorage.setItem('userData', JSON.stringify(_userData));
          await auth()
            .signInWithEmailAndPassword(_userData.email, _userData.password)
            .then(userCredential => {
              setIsLoading(false);
              context.setIsLogin(true);
              navigation.push('dashboard');
            })
            .catch(error => {
              setIsLoading(false);
              const errorCode = error.code;
              const errorMessage = error.message;
              showToastMessage('error', 'top', errorMessage, 3000, 60);
              // ..
            });
          return;
        } else {
          loginThroughPhoneWithCountryCode();
        }
      })
      .catch(error => {
        setIsLoading(false);
        showToastMessage(
          'error',
          'top',
          'Invalid phone number or password!',
          3000,
          60,
        );
      });
  };
  const firebaseSignin = async (email, password) => {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Signed in
        // const user = userCredential.user;
        // ...
        context.setIsLogin(true);
        navigation.push('dashboard');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        showToastMessage('error', 'top', errorMessage, 3000, 60);
        // ..
      });
  };
  const encryptPassword = (password) => {
    return Base64.encode(password);
  }
  const loginThroughEmail = async () => {
    setIsMobileLogin(false);
    firestore()
      .collection('Users')
      .where('email', '==', emailOrPhone)
      .where('password', '==', encryptPassword(password))
      .get()
      .then(async response => {
        if (response._docs.length > 0) {
          console.log("data", response._docs[0]);
          let _userData = response._docs[0]._data;
          await AsyncStorage.setItem('userData', JSON.stringify(_userData));
          // await firebaseSignin(_userData.email, _userData.password);ssss
          await auth()
            .signInWithEmailAndPassword(_userData.email, _userData.password)
            .then(userCredential => {
              setIsLoading(false);
              context.setIsLogin(true);
              navigation.push('dashboard');
            })
            .catch(error => {
              setIsLoading(false);
              const errorCode = error.code;
              const errorMessage = error.message;
              showToastMessage('error', 'top', errorMessage, 3000, 60);
              // ..
            });
        } else {
          setIsLoading(false);
          showToastMessage(
            'error',
            'top',
            'Invalid email or password!',
            3000,
            60,
          );
        }
      })
      .catch(error => {
        setIsLoading(false);
        showToastMessage(
          'error',
          'top',
          'Invalid email or password!',
          3000,
          60,
        );
      });
  };

  const closePopup = () => {
    setIsShowOtpModal(false);
    context.setIsLogin(true);
    navigation.push('dashboard');
  };
  return (
    <>
      <View style={[styles.page]}>
        <View style={[styles.imageCard, { display: isKeyboardVisible ? 'none' : 'flex' }]}>
          <FastImage
            source={require('../assets/images/backgroundImage.jpeg')}
            style={[styles.imageCardImage]}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <View style={[GlobalStyles.bgWhite, styles.container]}>
          <View style={[styles.logoContainer, { display: isKeyboardVisible ? 'none' : 'flex' }]}>
            <FastImage
              source={require('../assets/images/logo.jpeg')}
              style={[styles.logo]}
              resizeMode={FastImage.resizeMode.sss}
            />
          </View>
          <View style={[styles.contentContainer]}>
            <CustomText style={[styles.title, { width: '100%', marginTop: isKeyboardVisible ? 10 : 0, marginBottom: isKeyboardVisible ? 10 : 0 }]}>
              Sign in
            </CustomText>
            <View style={{ width: "100%" }}>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                <View>
                  <TextInputField
                    Label={'Email address or phone number'}
                    placeholder="Email address or phone number"
                    OnChangeText={value => setEmailOrPhone(value)}
                    style={{ width: '100%' }}
                  />
                  <TextInputField
                    SecureTextEntry={true}
                    Label={'Password'}
                    placeholder="Password"
                    style={[GlobalStyles.mt2]}
                    OnChangeText={value => setPassword(value)}
                  />
                  <Pressable onPress={handleFogotPassword}>
                    <CustomText style={[styles.signup, GlobalStyles.mt2]}>
                      Forgot password?
                    </CustomText>
                  </Pressable>
                  <View>
                    <CustomButton
                      Title={'Sign in'}
                      style={[GlobalStyles.mt3]}
                      IsLoading={isLoading}
                      onPress={handleLogin}
                    />
                    <View style={[styles.signupContainer]}>
                      <CustomText style={[styles.sigunpText]}>
                        Don't have an account?{' '}
                      </CustomText>
                      <Pressable onPress={handleSignup}>
                        <CustomText style={[styles.signup]}>Sign up</CustomText>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </View>
          </View>
        </View>
      </View>

      {iShowOtpModal && (
        <Popup>
          <CustomText style={[{ fontWeight: '600' }]}>Confirm OTP</CustomText>
          <OTP confirm={confirm} handleSuccess={closePopup} />
        </Popup>
      )}
    </>
  );
};
export default Login;
const styles = StyleSheet.create({

  title: {
    color: GlobalStyles.priColor,
    fontSize: 35,
    fontWeight: 'bold',
    paddingLeft: 15,
  },
  mainContainer: {
    // height: '100%',
  },
  container: {
    // padding: 15,
    // display: 'flex',
    // flex: 1,
    // justifyContent: 'space-between',
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
  imageCard: {
    flex: 1
  },
  imageCardImage: {
    width: '100%',
    height: '100%'
  },
  page: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white'
  },
  container: {
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 10,
    paddingBottom: 0,
    position: 'relative',
    top: -24,
    height: '63%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  login: {
    borderWidth: 1,
    color: GlobalStyles.priColor,
    borderColor: GlobalStyles.priColor,
  },
  logoContainer: {
    position: 'absolute',
    height: 100,
    width: 100,
    top: '-10%',
  },
  title: {
    fontWeight: '900',
    fontSize: 33,
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 5
  },
  contentContainer: {
    height: '90%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subTitle: {
    fontWeight: '700',
    fontSize: 30,
    color: GlobalStyles.priColor,
    width: '50%',
    textAlign: 'center',
  },
});
