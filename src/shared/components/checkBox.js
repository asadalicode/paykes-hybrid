import {StyleSheet, View} from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import React, {useEffect, useState} from 'react';
import GlobalStyles from '../styles/globalStyles';

const CustomCheckBox = ({checkBoxStyle, handleChange, value}) => {
  const [isSelected, setSelection] = useState(false);
  useEffect(() => {
    if (value) {
      if (value === 'true') {
        setSelection(true);
      } else {
        setSelection(false);
      }
    }
  }, [value]);
  return (
    <View style={[styles.checkboxContainer]}>
      <CheckBox
        style={[styles.checkbox, checkBoxStyle]}
        value={isSelected}
        color={'black'}
        onValueChange={() => {
          handleChange(!isSelected);
          setSelection(!isSelected);
        }}
        tintColors={{ true: GlobalStyles.inputBorder, false: GlobalStyles.inputBorder }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  checkbox: {
    height: 30,

    ...Platform.select({
      android: {
        borderWidth: 1,
      },
      ios: {
        borderWidth: 0,
      },
    }),
  },
  label: {
    color: 'white',
    marginLeft: 10,
    fontSize: 25,
  },
});

export default CustomCheckBox;
