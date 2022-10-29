import React, { useEffect, useRef, useState } from 'react';
import CustomText from '../shared/components/customText';
import Header from '../shared/components/header';
import TextInputField from '../shared/components/textInputField';
import CustomButton from '../shared/components/customButton';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    View,
} from 'react-native';
import GlobalStyles from '../shared/styles/globalStyles';
import { ScrollView } from 'react-native-gesture-handler';
import PhoneInput from 'react-native-phone-number-input';
import CustomCheckBox from '../shared/components/checkBox';
import DropDownPicker from 'react-native-dropdown-picker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { showToastMessage } from '../shared/js/showToastMessage';
import CustomPhoneInput from '../shared/components/customPhoneInput';
import { Button } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomCountry from '../shared/components/customCountry';
import { TouchableRipple } from 'react-native-paper';
import Popup from '../shared/components/popup';
import OTP from '../components/otp/otp';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    createCustomerAPICall,
    getCustomerProfileAPICall,
    paymentAPICall,
    updatePersonalInformationAPICall,
} from '../shared/services/payment';
import PaymentDetails from './paymentDetails';
import OverlayLoader from '../components/overlayLoader';

const PersonalInformation = ({ navigation, route }) => {
    const [value, setValue] = useState('');
    const { isEdit } = route.params || {};

    const [isNameInvalid, setIsNameInvalid] = useState(false);
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);
    const [formatedPhoneNumber, setFormatedPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
    const [phoneNumberValid, setPhoneNumberValid] = useState(true);
    const [moreInformation, setMoreInformation] = useState(false);
    const [termsServices, setTermsServices] = useState(false);
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef(null);
    const [open, setOpen] = useState(false);
    const [dropdownValue, setDropdownValue] = useState('Kenya');
    const [dropdwonFlag, setDropdownFlag] = useState(
        require('../assets/images/keyniya.png'),
    );
    const [userData, setUserData] = useState({});
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmation, setConfimation] = useState(null);
    const [iShowOtpModal, setIsShowOtpModal] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState(null);
    const [preference, setPreference] = useState('');
    const [headerTitle, setHeaderTitle] = useState("'Let's get started");
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [countryCode1, setCountryCode1] = useState('');
    const [isFirstNameInvalid, setIsFirstNameInvalid] = useState(false);
    const [isLastNameInvalid, setIsLastNameInvalid] = useState(false);
    const [isGivenNameInvalid, setIsGivenNameInvalid] = useState(false);
    const [isProfileLoader, setIsProfileLoader] = useState(false);
    const [givenName, setGivenName] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const refRBSheet = useRef();

    const [items, setItems] = useState([
        {
            label: 'Kenya',
            value: 'Kenya',
            icon: require('../assets/images/keyniya.png'),
        },
        {
            label: 'Other',
            value: 'Other',
        },
    ]);

    const [isButtonLoading, setIsButtonLoading] = useState(false);

    useEffect(() => {
        if (isEdit) {
            setHeaderTitle('Personal info');
            handleEditUserData();
            getCustomer();
        }
    }, [isEdit]);

    const getCustomer = async () => {
        setIsProfileLoader(true);
        let _userData = await AsyncStorage.getItem('userData');
        _userData = JSON.parse(_userData);
        let _response = await getCustomerProfileAPICall(_userData.email)
        setIsProfileLoader(false);
        if (_response.isSuccess) {
            let { addressLine1, addressLine2, postalCode, administrativeDistrictLevel1, locality } = _response.data.address;
            setAddress1(addressLine1 || '');
            setAddress2(addressLine2 || '');
            setPostalCode(postalCode || '');
            setState(administrativeDistrictLevel1 || '');
            setCity(locality || '');
        }

    }

    const handleEditUserData = async () => {

        let _userData = await AsyncStorage.getItem('userData');
        _userData = JSON.parse(_userData);
        setFullName(_userData.fullName);
        setEmail(_userData.email);
        setGivenName(_userData?.givenName);
        setFirstName(_userData?.givenName);
        setLastName(_userData?.familyName);
        setPassword(_userData.password);
        setUserId(_userData.id);
        setPhoneNumber(_userData.phoneNumber);
        setMoreInformation(_userData.isGetMoreInformation);
        setDropdownValue(_userData.moneyTransferPreference);
        let _image = '';
        if (_userData.moneyTransferPreference === 'Kenya') {
            _image = require('../assets/images/keyniya.png');
        }
        setDropdownFlag(_image);
        setFormatedPhoneNumber(_userData.phoneWithCountryCode);
        let _countryCode = _userData.phoneWithCountryCode.slice(
            0,
            _userData.phoneWithCountryCode.length - 10,
        );
        console.log(_countryCode);
        setCountryCode(_countryCode);

    };

    const checkEmailValid = () => {
        let _error = String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            );
        setIsEmailInvalid(!_error);
        return _error;
    };
    const checkNameValid = () => {
        let _error = false;
        if (!(fullName.trim().length > 0)) {
            _error = true;
        }
        setIsNameInvalid(_error);
        return !_error;
    };
    const checkPaswordValid = () => {
        let _error = false;
        if (!(password.trim().length > 0)) {
            _error = true;
        } else if (password.trim().length < 6) {
            _error = true;
            showToastMessage(
                'error',
                'top',
                `Please type a strong password`,
                3000,
                60,
            );
        }
        setIsPasswordInvalid(_error);
        return !_error;
    };
    const checkTermsAndservices = () => {
        if (!termsServices) {
            showToastMessage(
                'error',
                'top',
                `Please check the terms and services`,
                3000,
                60,
            );
        }
        return termsServices;
    };
    const checkPhoneNumberValid = () => {
        let regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
        return regex.test(formatedPhoneNumber) && phoneNumber.length === 10
            ? true
            : false;
    };
    const checkGivenNameValid = () => {
        let _error = false;
        if (!(givenName?.trim().length > 0)) {
            _error = true;
        }
        setIsGivenNameInvalid(_error);
        return !_error;
    };

    const checkFirstNameValid = () => {
        let _error = false;
        if (!(firstName?.trim().length > 0)) {
            _error = true;
        }
        setIsFirstNameInvalid(_error);
        return !_error;
    };
    const checkLastNameValid = () => {
        let _error = false;
        if (!(lastName?.trim().length > 0)) {
            _error = true;
        }
        setIsLastNameInvalid(_error);
        return !_error;
    };

    const addUser = async () => {
        const checkValid = checkPhoneNumberValid();
        setPhoneNumberValid(checkValid);
        let _email = checkEmailValid();
        let _checkTerms = !isEdit ? checkTermsAndservices() : true;
        let _firstName = checkFirstNameValid();
        let _lastName = checkLastNameValid();
        if (!(_email && checkValid && _checkTerms && _firstName && _lastName)) {
            return;
        }
        let _userData = await AsyncStorage.getItem('userData');
        _userData = JSON.parse(_userData);

        let _user = {
            id: isEdit ? userId : uuid.v4(),
            givenName: firstName,
            familyName: lastName,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            moneyTransferPreference: dropdownValue,
            isGetMoreInformation: moreInformation,
            phoneWithCountryCode: formatedPhoneNumber,
        };

        _user.customerId = _userData.customerId;
        _user.address = {
            address_line_1: address1,
            address_line_2: address2,
            postal_code: postalCode,
            administrative_district_level_1: state,
            locality: city
        };



        let _user1 = { ..._user };
        _user1.state = state;
        _user1.city = city;
        _user1.postalCode = postalCode;
        _user1.address1 = address1;
        _user1.address2 = address2;

        updatePersonalInformation(_user1, _userData.customerId, _user)

        // if (isEdit) {
        //     handleEditUserToFirebase(_user, _userData.customerId);
        // } else {
        //     handleAddUserToDatabase(_user);
        // }
    };
    const updatePersonalInformation = async (user, customerId, storageData) => {

        let _data = {
            userId: user.id,
            firstName: user.givenName || "",
            lastName: user.familyName || "",
            emailAddress: user.email,
            address: {
                addressLine1: user.address1,
                addressLine2: user.address2,
                city: user.city,
                state: user.state,
                postalCode: user.postalCode
            }
        };
        setIsButtonLoading(true);
        let _response = await updatePersonalInformationAPICall(_data, customerId);
        setIsButtonLoading(false);
        if (_response.isSuccess) {
            showToastMessage(
                'success',
                'top',
                'User updated successfully',
                3000,
            )
            await AsyncStorage.setItem('userData', JSON.stringify(storageData));
            navigation.navigate('profile');
        }
    }
    const handleEditUserToFirebase = (user, customerId) => {
        let _user = user;
        _user.customerId = customerId;
        _user.address = {
            address_line_1: address1,
            address_line_2: address2,
            postal_code: postalCode,
            administrative_district_level_1: state,
            locality: city
        };

        let _docRef = firestore().collection('Users');
        _docRef
            .where('id', '==', user.id)
            .limit(1)
            .get()
            .then(response => {
                let _docId = response._docs[0]._ref._documentPath._parts[1];
                _docRef
                    .doc(_docId)
                    .update(user)
                    .then(async () => {
                        setIsButtonLoading(false);
                        showToastMessage(
                            'success',
                            'top',
                            'User updated successfully',
                            3000,
                            60,
                        );
                        await AsyncStorage.setItem('userData', JSON.stringify(_user));
                        navigation.navigate('profile');
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

    const handleAddUserToDatabase = _user => {
        firestore()
            .collection('Users')
            .where('email', '==', _user.email)
            .get()
            .then(response => {
                if (response._docs.length === 0) {
                    addUserInFireStore(_user);
                    // handleAddUser(user);
                    return;
                } else {
                    setIsButtonLoading(false);
                    showToastMessage(
                        'error',
                        'top',
                        `That email is already in use!`,
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

    const createCustomerProfile = async (user) => {
        let _data = {
            userId: user.id,
            givenName: user.fullName,

            emailAddress: user.email,
            phoneNumber: user.phoneWithCountryCode,
            note: 'PayKES customer',
        };
        await createCustomerAPICall(_data);
    }
    const addUserInFireStore = user => {
        firestore()
            .collection('Users')
            .where('phoneWithCountryCode', '==', user.phoneWithCountryCode)
            .get()
            .then(response => {
                if (response._docs.length === 0) {
                    sendOtp(user.phoneWithCountryCode);
                    setUserData({ ...user });

                    // handleAddUser(user);
                    return;
                } else {
                    setIsButtonLoading(false);
                    showToastMessage(
                        'error',
                        'top',
                        `That Phone number is already in use!`,
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
    const handleAddUser = user => {
        firestore()
            .collection('Users')
            .doc(user.id).set(user)
            .then(async response => {
                createUserInFirebaseAuthentication(user);

            })
            .catch(error => {
                // showToastMessage('error', 'top', 'Server error!', 3000, 60);
                setIsButtonLoading(false);
            });
    };
    const createUserInFirebaseAuthentication = async (user) => {
        auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(async (userCredential) => {
                debugger;
                await createCustomerProfile(user);
                showToastMessage(
                    'success',
                    'top',
                    'Register user successfully.',
                    3000,
                    60,
                );
                setIsButtonLoading(false);
                handleLogin();
                // resetState();
            })
            .catch(error => {
                debugger;
                showToastMessage('error', 'top', error, 3000, 60);
                // ..
            });
    }

    const resetState = () => {
        setFullName('');
        setEmail('');
        setPassword('');
    };
    const handleLogin = () => {
        navigation.push('login');
    };

    const handleBackNavigation = () => {
        navigation.goBack();
    };
    const handleSelectCountry = (value, icon) => {
        setDropdownValue(value);
        setDropdownFlag(icon);
        closeBottomSheet();
    };
    const closeBottomSheet = () => {
        refRBSheet.current.close();
    };
    useEffect(() => {
        if (confirmation) {
            setIsShowOtpModal(true);
        }
    }, [confirmation]);

    const sendOtp = async phoneNumber => {
        auth()
            .signInWithPhoneNumber(phoneNumber)
            .then(confirmation => {
                setConfimation(confirmation);
                setIsButtonLoading(false);
            })
            .catch(error => {
                setIsButtonLoading(false);
                showToastMessage('error', 'top', `${error}`, 3000, 60);
            });
    };
    const closePopup = () => {
        setIsButtonLoading(true);
        handleAddUser(userData);
        setIsShowOtpModal(false);
    };
    return (
        <>
            <Header
                title={headerTitle}
                hasBack={true}
                onPress={handleBackNavigation}
            />
            <View style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'position' : ''}
                    keyboardVerticalOffset={Platform.OS === 'ios' && 90}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <View style={[styles.container]}>
                            <View>
                                <TextInputField
                                    IsError={isFirstNameInvalid}
                                    Label={'First name'}
                                    placeholder="First name"
                                    DefaultValue={fullName}
                                    Value={firstName}
                                    OnChangeText={value => setFirstName(value)}
                                />
                                <TextInputField
                                    IsError={isLastNameInvalid}
                                    Label={'Last name'}
                                    placeholder="Last name"
                                    DefaultValue={fullName}
                                    Value={lastName}
                                    style={[GlobalStyles.mt2]}
                                    OnChangeText={value => setLastName(value)}
                                />

                                <TextInputField
                                    IsError={isEmailInvalid}
                                    Label={'Email address'}
                                    DefaultValue={email}
                                    Editable={false}
                                    Value={email}
                                    placeholder="Email address"
                                    style={[GlobalStyles.mt2]}
                                    OnChangeText={value => setEmail(value)}
                                />
                                {/* <TextInputField
                                    SecureTextEntry={true}
                                    Label={'Password'}
                                    placeholder="Password"
                                    DefaultValue={password}
                                    Value={password}
                                    style={[GlobalStyles.mt2]}
                                    IsError={isPasswordInvalid}
                                    OnChangeText={value => setPassword(value)}
                                /> */}
                                {/* <DropDownPicker
                  containerStyle={[{zIndex: 999}]}
                  style={[GlobalStyles.mt3, styles.dropdown]}
                  open={open}
                  value={dropdownValue}
                  items={items}
                  setOpen={setOpen}
                  setValue={setDropdownValue}
                  setItems={setItems}
                /> */}
                                <TouchableRipple
                                    onPress={() => refRBSheet.current.open()}
                                    rippleColor="transparent">
                                    <View style={[styles.selectedCountry, GlobalStyles.mt3]}>
                                        <Image
                                            source={dropdwonFlag}
                                            style={{ width: 25, height: 25 }}
                                        />
                                        <CustomText style={[{ marginLeft: 10 }]}>
                                            Sending to
                                            {dropdownValue === ' Kenya' || dropdownValue === 'Kenya'
                                                ? ` ${dropdownValue} First`
                                                : ` ${dropdownValue}`}
                                            { }
                                        </CustomText>
                                    </View>
                                </TouchableRipple>

                                <CustomPhoneInput
                                    handlePhoneNumber={value => {
                                        setPhoneNumber(value);
                                    }}
                                    isEdit={isEdit}
                                    countryCode={countryCode}
                                    disabled={isEdit ? false : true}
                                    value={phoneNumber}
                                    checkValid={phoneNumberValid}
                                    handlePhonerWithCountryCode={value => {
                                        setFormatedPhoneNumber(value);
                                    }}
                                />
                                {!isEdit && (
                                    <>
                                        <View style={[styles.privacyContainer, GlobalStyles.mt3]}>
                                            <CustomCheckBox
                                                handleChange={value => {
                                                    setTermsServices(value);
                                                }}
                                            />

                                            <View>
                                                <CustomText
                                                    style={[styles.privacyPolicy, styles.textInput]}>
                                                    <CustomText>I accept the </CustomText>
                                                    <Pressable>
                                                        <CustomText style={[styles.privacy]}>
                                                            Terms of Service
                                                        </CustomText>
                                                    </Pressable>
                                                    <CustomText> and </CustomText>
                                                    <Pressable>
                                                        <CustomText style={[styles.privacy]}>
                                                            Privacy Policy
                                                        </CustomText>
                                                    </Pressable>
                                                </CustomText>
                                            </View>
                                        </View>
                                        <View style={[styles.privacyContainer, GlobalStyles.mt3]}>
                                            <CustomCheckBox
                                                handleChange={value => {
                                                    setMoreInformation(value);
                                                }}
                                            />
                                            <CustomText style={[styles.textInput]}>
                                                Yes, I'd like to recieve the latest information and
                                                offers from PayKes via email, SMS or other electronic
                                                means. I can opt-out at any time.
                                            </CustomText>
                                        </View>
                                    </>
                                )}
                            </View>
                            <PaymentDetails
                                city={city}
                                setCity={setCity}
                                state={state}
                                setState={setState}
                                address1={address1}
                                setAddress1={setAddress1}
                                address2={address2}
                                setAddress2={setAddress2}
                                postalCode={postalCode}
                                setPostalCode={setPostalCode}
                                countryCode1={countryCode1}
                                setCountryCode1={setCountryCode1}
                            />
                            <View>
                                <CustomButton
                                    IsLoading={isButtonLoading}
                                    Title={isEdit ? 'Save' : 'Sign up'}
                                    style={[{ marginTop: isEdit ? 50 : 24 }]}
                                    onPress={addUser}
                                />

                            </View>
                        </View>
                    </ScrollView>

                    <RBSheet
                        ref={refRBSheet}
                        closeOnDragDown={true}
                        closeOnPressMask={false}
                        height={450}
                        customStyles={{
                            container: {
                                borderTopLeftRadius: 25,
                                borderTopRightRadius: 25,
                            },
                            wrapper: {
                                backgroundColor: 'rgba(89, 85, 87, 0.62)',
                            },
                            draggableIcon: {
                                // backgroundColor: '#000',
                            },
                        }}>
                        <ScrollView>
                            <View style={[styles.bottomSheetHeader]}>
                                <CustomText
                                    style={[
                                        {
                                            marginLeft: 15,
                                            fontWeight: '500',
                                            color: 'black',
                                            fontSize: 20,
                                        },
                                    ]}>
                                    I am sending to
                                </CustomText>
                                <Pressable onPress={closeBottomSheet}>
                                    <Image
                                        source={require('../assets/images/cross.png')}
                                        style={{ width: 15, height: 15, marginRight: 10 }}
                                    />
                                </Pressable>
                            </View>
                            {items.map(item => {
                                return (
                                    <CustomCountry
                                        icon={item.icon}
                                        value={item.value}
                                        label={item.label}
                                        handleSelectCountry={handleSelectCountry}
                                    />
                                );
                            })}
                        </ScrollView>
                    </RBSheet>
                </KeyboardAvoidingView>
            </View>
            {iShowOtpModal && (
                <Popup>
                    <View
                        style={[{ flexDirection: 'row', justifyContent: 'space-between' }]}>
                        <CustomText style={[{ fontWeight: '600' }]}>Confirm OTP</CustomText>
                        <Pressable
                            onPress={() => {
                                setIsShowOtpModal(false);
                                setIsButtonLoading(false);
                            }}>
                            <Image
                                source={require('../assets/images/cross.png')}
                                style={{ height: 20, width: 20 }}
                            />
                        </Pressable>
                    </View>
                    <OTP confirm={confirmation} handleSuccess={closePopup} />
                </Popup>
            )}
            {
                isProfileLoader &&
                <OverlayLoader />
            }

        </>
    );
};
export default PersonalInformation;

const styles = StyleSheet.create({
    privacyContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    bottomSheetHeader: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    selectedCountry: {
        borderWidth: 1,
        borderColor: GlobalStyles.inputBorder,
        borderRadius: 5,
        alignItems: 'center',
        paddingLeft: 15,
        height: 55,
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    dropdown: {
        height: 60,
        borderColor: GlobalStyles.inputBorder,
    },
    privacy: {
        color: GlobalStyles.priColor,
        ...Platform.select({
            android: {
                position: 'relative',
                top: 5,
            },
        }),
    },
    container: {
        padding: 15,
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
    },
    signup: {
        color: GlobalStyles.priColor,
    },
    sigunpText: {
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
    },
    iconStyle: {
        height: 30,
        width: 30,
    },
    signupContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    privacyPolicy: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        marginLeft: 10,
        width: '85%',
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
        display: 'none',
    },
});
