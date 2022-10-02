import React, { useEffect } from 'react';
import {View,PermissionsAndroid} from 'react-native';
import CustomText from '../../shared/components/customText';
import CustomButton from '../../shared/components/customButton';
import GlobalStyles from '../../shared/styles/globalStyles';
import Styles from './styles';
import FastImage from 'react-native-fast-image';
import { showToastMessage } from '../../shared/js/showToastMessage';
 

const Index = ({navigation}) => {
  const handleNavigation = route => {
    navigation.push(route);
  };


  return (
    <View style={[Styles.page]}>
      <View style={[Styles.imageCard]}>
        <FastImage
          source={require('../../assets/images/backgroundImage.jpeg')}
          style={[Styles.imageCardImage]}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
      <View style={[GlobalStyles.bgWhite, Styles.container]}>
        <View style={[Styles.logoContainer]}>
          <FastImage
            source={require('../../assets/images/logo.jpeg')}
            style={[Styles.logo]}
            resizeMode={FastImage.resizeMode.sss}
          />
        </View>
        <View style={[Styles.contentContainer]}>
          <CustomText style={[Styles.title]}> PayKES</CustomText>
          <CustomText numberOfLines={2} style={[Styles.subTitle]}>
            Send money with love!
          </CustomText>
          <View style={[Styles.signupContainer]}>
            <CustomButton
              Title="Sign up"
              onPress={() => handleNavigation('signup')}
            />
            <CustomButton
              Title="Login"
              style={[GlobalStyles.mt2]}
              contentStyle={[GlobalStyles.bgWhite, Styles.login]}
              OverlayColor={`#ffffff`}
              labelStyle={[GlobalStyles.secondaryColor]}
              onPress={() => handleNavigation('login')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
export default Index;
