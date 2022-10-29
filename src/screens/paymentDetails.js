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


const PaymentDetails = ({ city, setCity, state, setState, address1, setAddress1, address2, setAddress2, postalCode, setPostalCode, countryCode1, setCountryCode1 }) => {

  const [countryFlag, setCountryFlag] = useState(null);
  const refCountryCodeSheet = useRef(null);

  const handleCountryClick = (item) => {
    setCountryCode1(item.value);
    setCountryFlag(item.image);
    refCountryCodeSheet.current.close();
  }

  return (
    <>
      <View >

        <TextInputField
          Label={'Address line 1'}
          placeholder="Address line 1"
          DefaultValue={address1}
          Value={address1}
          style={[GlobalStyles.mt2]}
          OnChangeText={value => setAddress1(value)}
        />
        <TextInputField
          Label={'Address line 2'}
          placeholder="Address line 2"
          style={[GlobalStyles.mt2]}
          DefaultValue={address2}
          Value={address2}
          OnChangeText={value => setAddress2(value)}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextInputField
            Label={'City'}
            placeholder="City"
            DefaultValue={city}
            Value={city}
            style={[GlobalStyles.mt2, { width: '49%' }]}
            OnChangeText={value => setCity(value)}
          />

          <TextInputField
            Label={'State'}
            placeholder="State"
            DefaultValue={state}
            Value={state}
            style={[GlobalStyles.mt2, { width: '49%' }]}
            OnChangeText={value => setState(value)}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

          <TextInputField
            Label={'Postal code'}
            placeholder="Postal code"
            DefaultValue={postalCode}
            Value={postalCode}
            style={[GlobalStyles.mt2, { width: '49%' }]}
            OnChangeText={value => setPostalCode(value)}
          />
          {/* <View style={{ width: '49%' }}>
            <TouchableRipple
              onPress={() => refCountryCodeSheet.current.open()}
              rippleColor="transparent">
              <View style={[styles.selectedCountry, GlobalStyles.mt3]}>

                {
                  countryFlag ?
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image source={countryFlag} style={{ height: 25, width: 25 }} />
                      <CustomText style={{ marginLeft: 10 }}>{countryCode1}</CustomText>
                    </View>
                    :
                    <CustomText >
                      Country code
                    </CustomText>
                }
              </View>
            </TouchableRipple>
          </View> */}
        </View>
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
                      <CustomText style={{ marginLeft: 10 }}>{item.name}</CustomText>
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
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center'
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