import {Image, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import Header from '../shared/components/header';
import CustomButton from '../shared/components/customButton';
import CustomText from '../shared/components/customText';
import GlobalStyles from '../shared/styles/globalStyles';
import UnOderList from '../shared/components/unOrderList';

const unOderList = [
  'Share the love and earn PayKES credit by inviting your friends.',
  'Tap invite below to send them your unique code: XY2X4',
  'After they send their first transection you get $5.00 in credit',
];

const InviteFriend = ({navigation}) => {
  const handleClipBoardCopy = () => {};

  return (
    <>
      <Header
        title={'Invite Friends'}
        hasBack
        onPress={() => navigation.navigate('profile')}
      />
      <View style={styles.container}>
        <ScrollView>
          <View style={{display: 'flex', flex: 1}}>
            <View>
              <Image
                source={require('../assets/images/referFriend.png')}
                style={styles.imagestyle}
              />
              <View style={[styles.referFriendContainer]}>
                <View style={[styles.referContainer]}>
                  <CustomText>Your Code</CustomText>
                  <CustomText style={styles.promoCode}>XY2X4</CustomText>
                  <Pressable onPress={handleClipBoardCopy}>
                    <CustomText style={[styles.tapColor]}>
                      Tap to copy
                    </CustomText>
                  </Pressable>
                </View>
              </View>
            </View>
            <View style={styles.inviteContainer}>
              <View style={{width: '85%'}}>
                <CustomText style={styles.inviteText}>
                  Invite a friend and earn $5.00 in credit
                </CustomText>
                <UnOderList list={unOderList} />
              </View>
            </View>
          </View>
        </ScrollView>
        <View>
          <View style={[GlobalStyles.flexDirectionRow,styles.bottomText]}>
            <CustomText>Referral Program - </CustomText>
            <CustomText style={[{color: GlobalStyles.priColor}]}>
              Terms and Conditions{' '}
            </CustomText>
          </View>
          <CustomButton Title={'Invite'} />
        </View>
      </View>
    </>
  );
};
export default InviteFriend;

const styles = StyleSheet.create({
  iconSize: {
    height: 20,
    width: 20,
  },
  inviteContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  imagestyle: {
    width: '100%',
    height: 180,
  },
  inviteText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    marginBottom: 10,
  },
  bottomText:{
    justifyContent:'center',
    marginBottom:10
  },
  referFriendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  referContainer: {
    position: 'relative',
    backgroundColor: 'white',
    width: '50%',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    top: -50,
  },
  container: {
    display: 'flex',
    flex: 1,
    padding: 15,
  },
  tab: {
    backgroundColor: 'white',
    padding: 5,
    marginBottom: 10,
    borderRadius: 4,
  },
  tapColor: {
    color: GlobalStyles.priColor,
  },
  promoCode: {
    marginTop: 1,
    marginBottom: 2,
    fontSize: 15,
    fontWeight: '600',
    color: 'black',
  },
});
