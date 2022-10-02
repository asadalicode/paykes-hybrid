import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Index from '../../screens/index/index';
import Login from '../../screens/login';
import Signup from '../../screens/signup';
import Dashboard from '../../screens/dashboard';
import ForgotPassword from '../../screens/forgotPassword';
import RecipientList from '../../screens/recipientList';
import AddEditRecipients from '../../screens/addEditRecipients';
import Profile from '../../screens/profile';
import InviteFriend from '../../screens/inviteFriends';
import Suppport from '../../screens/support';
import Faq from '../../screens/faq';
import MyContacts from '../../screens/contacts';
import PaymentInfo from '../../screens/paymentInfo';
import TransectionList from '../../screens/transectionList';

const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteFName="index"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="index" component={Index} />
        <Stack.Screen name="recipientList" component={RecipientList} />
        <Stack.Screen name="dashboard" component={Dashboard} />
        <Stack.Screen name="support" component={Suppport} />
        <Stack.Screen name="faq" component={Faq} />
        <Stack.Screen name="inviteFriend" component={InviteFriend} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="addEditRecipients" component={AddEditRecipients} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="paymentInfo" component={PaymentInfo} />
        <Stack.Screen name="contacts" component={MyContacts} />
        <Stack.Screen name="forgotPassword" component={ForgotPassword} />
        <Stack.Screen name="transections" component={TransectionList} />
      </Stack.Navigator>
    </>
  );
};
const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {/* <Image
        source={require('../assets/splashScreen.png')}
        style={{
          width: 300,
          height: 250,
          resizeMode: 'contain',
        }}
      /> */}
      {/* <ActivityIndicator size="small" color={GlobalStyles.primaryColor.color} /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  notify: {
    backgroundColor: 'red',
    height: 10,
    width: 10,
    position: 'absolute',
    right: -10,
    top: -3,
  },
  iconStyle: {
    height: 20,
    width: 20,
  },
  bottomNavigatorLabel: {
    color: 'black',
    fontSize: 10,

    marginTop: -8,
  },
});
export default StackNavigator;
