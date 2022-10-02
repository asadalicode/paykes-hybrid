import {StyleSheet} from 'react-native';
import GlobalStyles from '../../shared/styles/globalStyles';

const Styles = StyleSheet.create({
  imageCard:{
    backgroundColor:'red',
    flex:1
  },
  imageCardImage:{
    width:'100%',
    height:'100%'
  },
  page: {
    display: 'flex',
    flex: 1,
    backgroundColor:'white'
  },
  container: {
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 10,
    paddingBottom:0,
    position:'relative',
    top:-24,
    height: '63%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  signupContainer: {
    width: '90%',
    marginBottom:20
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
  logo:{
    width:'100%',
    height:'100%',
    borderRadius:5
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

export default Styles;
