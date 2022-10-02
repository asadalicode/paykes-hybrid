import Toast from 'react-native-toast-message';
import SweetAlert from 'react-native-sweet-alert';
import { Alert, Platform } from 'react-native';
import CustomText from '../components/customText';

export function showToastMessage(type, position, text2, visibilityTime, topOffset, bottomOffset, text1) {

  if (Platform === "android") {
    SweetAlert.showAlertWithOptions({
      title: text1,
      subTitle: text2,
      confirmButtonTitle: 'OK',
      confirmButtonColor: '#dedede',
      otherButtonTitle: 'Cancel',
      otherButtonColor: '#dedede',
      style: type,
      cancellable: true
    },
      callback => console.log('callback'));
  } else {
    Alert.alert(
      text2
    )
  }
  // Toast.show({
  //   type: type,
  //   position: position,
  //   text1: text1,
  //   text2: text2,
  //   visibilityTime: visibilityTime,
  //   autoHide: true,
  //   topOffset: topOffset || 50,
  //   bottomOffset: bottomOffset || 40,
  //   onShow: () => {},
  //   onHide: () => {},
  //   onPress: () => {}
  // });
}