import React, { useEffect, useRef, useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import GlobalStyles from '../styles/globalStyles';
import TextInputField from './textInputField';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomCountry from './customCountry';
import CustomText from './customText';
const CustomPhoneInput = ({
  handlePhoneNumber,
  handlePhonerWithCountryCode,
  checkValid,
  value,
  disabled,
  isEdit,
  countryCode,
  style,
}) => {
  const [open, setOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('+1');
  const [dropdownFlag, setDropdownFlag] = useState(
    require('../../assets/images/usa.png'),
  );
  const refRBSheet = useRef();
  //   Belgium +32
  // Canada +1
  // France +33
  // Ireland +353
  // Italy +39
  // Spain +34
  // United Kingdom +44
  // United States +1
  const [items, setItems] = useState([
    {
      label: 'Australia',
      value: '+61',
      icon: require('../../assets/images/australia.png'),
    },
    {
      label: 'Belgium',
      value: '+32',
      icon: require('../../assets/images/be.png'),
    },
    {
      label: 'Canada',
      value: 'ca',
      icon: require('../../assets/images/ca.png'),
    },
    {
      label: 'France',
      value: '+33',
      icon: require('../../assets/images/fr.png'),
    },
    {
      label: 'Ireland',
      value: '+353',
      icon: require('../../assets/images/ie.png'),
    },
    {
      label: 'Italy',
      value: '+39',
      icon: require('../../assets/images/it.png'),
    },
    {
      label: 'Spain',
      value: '+34',
      icon: require('../../assets/images/es.png'),
    },

    {
      label: 'United Kingdom',
      value: '+44',
      icon: require('../../assets/images/uk.png'),
    },
    {
      label: 'United States',
      value: '+1',
      icon: require('../../assets/images/usa.png'),
    },




  ]);

  useEffect(() => {

    if (isEdit && countryCode) {
      let _countryItem = items.find(item => item.value === countryCode);
      console.log(_countryItem);
      setDropdownValue(_countryItem?.value);
      setDropdownFlag(_countryItem?.icon);
    }
  }, [isEdit, countryCode]);

  const handlePhoneInput = value => {
    handlePhoneNumber(value);
    handlePhonerWithCountryCode(dropdownValue + value);
  };
  const handleSelectCountry = (value, icon) => {
    let _value = value == 'ca' ? '+1' : value;
    setDropdownValue(_value);
    setDropdownFlag(icon);
    closeBottomSheet();
  };
  const closeBottomSheet = () => {
    refRBSheet.current.close();
  };

  return (
    <>
      <View style={[GlobalStyles.mt3, styles.container]}>
        <Pressable onPress={() => !isEdit && refRBSheet.current.open()}>
         
            <View style={[styles.flagLeftPortion]}>
              <Image source={dropdownFlag} style={{ height: 25, width: 25 }} />
              <CustomText style={[{ marginLeft: 15, marginRight: 15 }]}>
                {dropdownValue}
              </CustomText>
            </View>
          
        </Pressable>
        <View
          style={[
            styles.inputContainer,
            { borderColor: !checkValid ? 'red' : GlobalStyles.inputBorder },
          ]}>
          <TextInputField
            style={[styles.input]}
            IsError={!checkValid}
            Editable={disabled}
            KeyboardType="numeric"
            DefaultValue={value}
            Value={value}
            OnChangeText={handlePhoneInput}></TextInputField>
        </View>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={600}
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
            Select Country
          </CustomText>
          <Pressable onPress={closeBottomSheet}>
            <Image
              source={require('../../assets/images/cross.png')}
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
      </RBSheet>
    </>
  );
};
export default CustomPhoneInput;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    // height: 60,
    marginRight: 20,
    flexDirection: 'row',
    width: '100%',
  },
  dropdown: {
    width: '35%',
    zIndex: 1000,
    borderRightWidth: 0,
  },
  flagLeftPortion: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    borderWidth: 1,
    marginRight: 15,
    height: 58,
    paddingLeft: 15,
    borderRadius: 5,
    borderColor: GlobalStyles.inputBorder,
  },

  iconStyle: {
    height: 30,
    width: 30,
  },
  input: {
    position: 'relative',
    marginTop: -6,
  },
  inputContainer: {
    flex: 1,
    borderWidth: 0.1,
    borderColor: GlobalStyles.inputBorder,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 5,
  },
  bottomSheetHeader: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
