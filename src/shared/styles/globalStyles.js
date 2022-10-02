import {Platform, StyleSheet} from 'react-native';

const GlobalStyles = StyleSheet.create({
  mb1: {
    marginBottom: 8,
  },
  mb2: {
    marginBottom: 16,
  },
  mb3: {
    marginBottom: 20,
  },
  mt1: {
    marginTop: 3,
  },
  mt2: {
    marginTop: 16,
  },
  mb5: {
    marginBottom: 40,
  },

  flexDirectionRow: {
    flexDirection: 'row',
  },
  mt3: {
    marginTop: 24,
  },
  aqua: '#04AEC4',
  inputBorder: '#949191',
  darkAqua: '#038C9E',
  baseFontFamily: {
    // fontFamily: 'Montserrat-SemiBoldItalic',
  },
  boldBaseFontFamily: {
    // fontFamily: 'Montserrat-Bold',
  },
  p1: {
    padding: 8,
  },
  primaryColor: {
    color: '#00D632',
  },
  priColor: '#00D632',
  textWhite: {
    color: 'white',
  },
  justifyContentCenter: {
    justifyContent: 'center',
  },
  empty: {
    flex: 1,
    paddingVertical: 16,
    textAlign: 'center',
    backgroundColor: 'white',
  },
  textBlack: {
    color: 'black',
  },
  bgWhite: {
    backgroundColor: 'white',
  },
  bgPrimary: {
    backgroundColor: '#00D632',
  },
  bgSecondary: {
    backgroundColor: '#B6D820',
  },
  textSecondaryLite: {
    color: '#EBF5C3',
  },
  bgSecondaryLite: {
    backgroundColor: '#EBF5C3',
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  secondaryColor: {
    color: '#3F925A',
  },
  dangerTxt: {
    color: 'red',
  },
  tertiaryColor: {
    color: '#f9f6f6',
  },
  quaternaryColor: {
    color: 'lightgray',
  },
  bgLightGray: {
    backgroundColor: '#F1F1F1',
  },
  quinaryColor: {
    color: '#969696',
  },
  senaryColor: {
    color: '#2699fb',
  },
  septenaryColor: {
    color: '#8200a1',
  },
  octonaryColor: {
    color: '#f4f5f7',
  },
  flex1: {
    flex: 1,
  },
  nonaryColor: {
    color: '#faf3c0',
  },
  denaryColor: {
    color: '#faf3a0',
  },
  boxSize: {
    height: 48,
    width: 150,
  },
  iosBoxSize: {
    height: 44,
    width: 150,
  },
  heading: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  headerStyle: {
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 2,
    elevation: 9,
    ...Platform.select({
      ios: {
        shadowOpacity: 0.2,
      },
      android: {
        shadowOpacity: 0.8,
      },
    }),
  },
  textFontSize: {
    fontSize: 14,
  },
  textColor: {
    color: '#817F7F',
  },
  underline: {textDecorationLine: 'underline'},
  ScoreWrapper: {
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    padding: 0,
    borderRadius: 10,
  },
  selectBtnStyle: {
    height: 40,
    borderRadius: 10,
    marginTop: 24,
    marginBottom: 16,
  },
  keyboardStyles: {
    ...Platform.select({
      ios: {
        height: '100%',
      },
    }),
  },
  keyboardStyleFlex: {
    ...Platform.select({
      ios: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
      },
    }),
  },
});

export default GlobalStyles;
