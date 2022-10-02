import Header from '../shared/components/header';
import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { StyleSheet, Image, Pressable } from 'react-native';
import TextInputField from '../shared/components/textInputField';
import GlobalStyles from '../shared/styles/globalStyles';
import CustomButton from '../shared/components/customButton';
import BottomSheet from '../shared/components/bottomSheet';
import { Divider, TouchableRipple } from 'react-native-paper';
import CustomText from '../shared/components/customText';

const countries = [
  { image: require('../assets/images/australia.png'), value: 'AU', name: 'Australia' },
  { image: require('../assets/images/ca.png'), value: 'CA', name: 'Canada' },
  { image: require('../assets/images/usa.png'), value: 'US', name: 'United States' },
]

const PaymentDetails = ({ handleAddress, isLoading }) => {
  const [isCityInvalid, setIsCityInvalid] = useState(false);
  const [isStateInValid, setIsStateInvalid] = useState(false);
  const [isAddress1InValid, setIsAddress1Invalid] = useState(false);
  const [isPostalCodeInValid, setIsPostalCodeInvalid] = useState(false);
  const refCountryCodeSheet = useRef(null);
  const [isCountryCodeInValid, setIsCountryCodeInvalid] = useState(false);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [countryFlag, setCountryFlag] = useState(null);


  const handleSubmitButton = () => {
    let _isCityInvalid = !(city.length > 0);
    let _isStateInvalid = !(state.length > 0);
    let _address1Invalid = !(address1.length > 0);
    let _postalCode = !(postalCode.length > 0);
    let _countryCode = !(countryCode.length > 0);

    setIsCityInvalid(_isCityInvalid);
    setIsStateInvalid(_isStateInvalid);
    setIsAddress1Invalid(_address1Invalid);
    setIsPostalCodeInvalid(_postalCode);
    setIsCountryCodeInvalid(_countryCode);

    if (
      !_isCityInvalid &&
      !_isStateInvalid &&
      !_address1Invalid &&
      !_postalCode &&
      !_countryCode
    ) {
      let address = {
        addressLine1: address1,
        city: city,
        state: state,
        postalCode: postalCode,
        countryCode: countryCode
      };
      if (address2) {
        address.addressLine2 = address2;
      }
      handleAddress(address);
    }
  };

  const handleCountryClick = (item) => {
    setCountryCode(item.value);
    setCountryFlag(item.image);
    refCountryCodeSheet.current.close();
  }

  return (
    <>
      <View style={{ padding: 10 }}>

        <TextInputField
          Label={'Address line 1'}
          placeholder="Address line 1"
          style={[GlobalStyles.mt2]}
          IsError={isAddress1InValid}
          OnChangeText={value => setAddress1(value)}
        />
        <TextInputField
          Label={'Address line 2'}
          placeholder="Address line 2"
          style={[GlobalStyles.mt2]}
          OnChangeText={value => setAddress2(value)}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextInputField
            Label={'City'}
            placeholder="City"
            style={[GlobalStyles.mt2, { width: '49%' }]}
            IsError={isCityInvalid}
            OnChangeText={value => setCity(value)}
          />

          <TextInputField
            Label={'State'}
            placeholder="State"
            style={[GlobalStyles.mt2, { width: '49%' }]}
            IsError={isStateInValid}
            OnChangeText={value => setState(value)}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

          <TextInputField
            Label={'Postal code'}
            placeholder="Postal code"
            style={[GlobalStyles.mt2, { width: '49%' }]}
            IsError={isPostalCodeInValid}
            OnChangeText={value => setPostalCode(value)}
          />
          <View style={{ width: '49%' }}>
            <TouchableRipple
              onPress={() => refCountryCodeSheet.current.open()}
              rippleColor="transparent">
              <View style={[styles.selectedCountry, GlobalStyles.mt3, { borderColor: isCountryCodeInValid ? "red" : "" }]}>

                {
                  countryFlag ?
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image source={countryFlag} style={{ height: 25, width: 25 }} />
                    <CustomText style={{marginLeft:10}}>{countryCode}</CustomText>
                    </View>
                    :
                    <CustomText >
                      Country code
                    </CustomText>
                }
              </View>
            </TouchableRipple>
          </View>
        </View>

        <CustomButton
          Title={'Continue'}
          onPress={handleSubmitButton}
          IsLoading={isLoading}
          style={{ marginTop: 50 }}
        />
      </View>
      <BottomSheet refRBSheet={refCountryCodeSheet} title={'Select country'}>
        <View >

          {
            countries.map((item) => {
              return (
                <>
                  <Pressable onPress={() => handleCountryClick(item)}>
                    <View style={styles.container}>
                      <Image source={item.image} style={styles.image} />
                      <CustomText style={{marginLeft:10}}>{item.name}</CustomText>
                    </View>
                  </Pressable>
                </>
              )
            })
          }
        </View>
      </BottomSheet>
    </>
  );
};
export default PaymentDetails;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEDED',
    marginBottom:5,
    flexDirection:'row',
    alignItems:'center'
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
  image: {
    height: 35,
    width: 35
  }
})