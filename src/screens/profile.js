import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import Header from '../shared/components/header';
import RedirectTab from '../shared/components/redirectTab';
import CustomText from '../shared/components/customText';
import CustomButton from '../shared/components/customButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';
import { Context } from '../../appContext';

const Profile = ({ navigation }) => {
  const context = useContext(Context);
  const handlePersonalInformation = () => {
    navigation.navigate('personalInformation', {
      isEdit: true,
    });
  };

  const handleLogout = async () => {
    context.setIsLogin(false);
    await AsyncStorage.clear();
    navigation.push('index');
  };

  return (
    <>
      <Header
        title={'Profile'}
        hasBack
        onPress={() => navigation.push('dashboard')}
      />
      <View style={styles.container}>
        <View style={{ display: 'flex', flex: 1 }}>
          <RedirectTab
            text={'Invite Friends'}
            onPress={() => navigation.navigate('inviteFriend')}
            LeftIcon={() => (
              <Image
                source={require('../assets/images/invite.png')}
                style={styles.iconSize}
              />
            )}
            RightIcon={() => (
              <Image
                source={require('../assets/images/rightAngle.png')}
                style={styles.iconSize}
              />
            )}
            style={[styles.tab]}
          />
          <RedirectTab
            text={'Recipients'}
            onPress={() => navigation.navigate('recipientList')}
            LeftIcon={() => (
              <Image
                source={require('../assets/images/recipients.png')}
                style={styles.iconSize}
              />
            )}
            RightIcon={() => (
              <Image
                source={require('../assets/images/rightAngle.png')}
                style={styles.iconSize}
              />
            )}
            style={[styles.tab]}
          />
          <CustomText style={styles.accountTitle}>Accounts</CustomText>
          <RedirectTab
            text={'Personal Info'}
            onPress={handlePersonalInformation}
            LeftIcon={() => (
              <Image
                source={require('../assets/images/user.png')}
                style={styles.iconSize}
              />
            )}
            RightIcon={() => (
              <Image
                source={require('../assets/images/rightAngle.png')}
                style={styles.iconSize}
              />
            )}
            style={[styles.tab]}
          />
          <RedirectTab
            text={'Payment Info'}
            onPress={() => navigation.navigate('paymentInfo')}
            LeftIcon={() => (
              <Image
                source={require('../assets/images/credit-card.png')}
                style={styles.iconSize}
              />
            )}
            RightIcon={() => (
              <Image
                source={require('../assets/images/rightAngle.png')}
                style={styles.iconSize}
              />
            )}
            style={[styles.tab]}
          />
          <RedirectTab
            rippleColor={'transparent'}
            text={'Enable SMS Login'}
            onPress={() => { }}
            LeftIcon={() => (
              <Image
                source={require('../assets/images/sms.png')}
                style={styles.iconSize}
              />
            )}
            isToggleRight={true}
            style={[styles.tab]}
          />
           {/* <RedirectTab
            text={'Help'}
            onPress={() => navigation.navigate('help')}
            LeftIcon={() => (
              <Image
                source={require('../assets/images/help.png')}
                style={styles.iconSize}
              />
            )}
            RightIcon={() => (
              <Image
                source={require('../assets/images/rightAngle.png')}
                style={styles.iconSize}
              />
            )}
            style={[styles.tab]}
          /> */}
        </View>
        <CustomButton Title={'Logout'} onPress={handleLogout} />
      </View>
    </>
  );
};
export default Profile;

const styles = StyleSheet.create({
  iconSize: {
    height: 20,
    width: 20,
  },
  container: {
    display: 'flex',
    flex: 1,
    padding: 10,
  },
  tab: {
    backgroundColor: 'white',
    padding: 5,
    marginBottom: 10,
    borderRadius: 4,
  },
  accountTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
});
