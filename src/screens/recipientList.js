import {Image, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../shared/components/header';
import RecipientCard from '../components/recipientCard';
import TextInputField from '../shared/components/textInputField';
import CustomText from '../shared/components/customText';
import GlobalStyles from '../shared/styles/globalStyles';
import {ActivityIndicator, Divider, TouchableRipple} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecipientList = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [recipients, setRecipients] = useState([]);
  const [filterRecipients, setFilterRecipients] = useState([]);
  useEffect(() => {
    getRecipients();
  }, []);

  const getRecipients = async () => {
    let _userData = await AsyncStorage.getItem('userData');
    _userData = JSON.parse(_userData);
    setIsLoading(true);
    firestore()
      .collection('Recipients')
      .where('userId', '==', _userData.id)
      .get()
      .then(response => {
        setIsLoading(false);
        let _recipientsData = response._docs;
        if (_recipientsData.length > 0) {
          let _recipients = _recipientsData.map(({_data}) => {
            return _data;
          });
          _recipients.sort(function (a, b) {
            if (a.fullName < b.fullName) {
              return -1;
            }
            if (a.fullName > b.fullName) {
              return 1;
            }
            return 0;
          });
          setRecipients([..._recipients]);
          setFilterRecipients([..._recipients]);
        }
      })
      .catch(error => {
        setIsLoading(false);
        showToastMessage('error', 'top', `${error}`, 3000, 60);
      });
  };

  const handleAddRecipient = () => {
    navigation.push('addEditRecipients');
  };
  const handleContacts = () => {
    navigation.push('contacts');
  };
  const handleEditRecipient = recipient => {
    navigation.push('addEditRecipients', {isEdit: true, recipient});
  };

  const handleSearch = value => {
    let _newRecipeints = [...recipients];
    if (value) {
      _newRecipeints = recipients.filter(item => {
        if (item.fullName.toLocaleLowerCase().includes(value.toLowerCase()))
          return item;
      });
    }
    _newRecipeints.sort(function (a, b) {
      if (a.fullName < b.fullName) {
        return -1;
      }
      if (a.fullName > b.fullName) {
        return 1;
      }
      return 0;
    });
    setFilterRecipients([..._newRecipeints]);
  };

  const handleRecipient = recipient => {
    navigation.navigate('dashboard', {recipient});
  };

  return (
    <>
      <Header
        title={'Recipients'}
        hasBack
        onPress={() => navigation.navigate('dashboard')}
      />
      <View>
        <View>
          <View style={[styles.container]}>
            <View style={[styles.searchContainer]}>
              <Image
                source={require('../assets/images/search.png')}
                style={[styles.iconStyle, {position: 'relative', top: 5}]}
              />
              <TextInputField
                placeholder={'Enter name to search'}
                style={[styles.searchInput]}
                outlineColor={'transparent'}
                OnChangeText={handleSearch}
                activeOutlineColor="transparent"
              />
            </View>
          </View>
          <TouchableRipple onPress={handleContacts}>
            <View style={[styles.newRecipientContainer]}>
              <View style={[GlobalStyles.flexDirectionRow]}>
                <Image
                  source={require('../assets/images/profile.png')}
                  style={styles.iconStyle}
                />
                <CustomText style={[{marginLeft: 15}]}>My Contacts</CustomText>
              </View>
              <Image
                source={require('../assets/images/rightAngle.png')}
                style={styles.iconStyle}
              />
            </View>
          </TouchableRipple>
          <Divider />
          <TouchableRipple onPress={handleAddRecipient}>
            <View style={[styles.newRecipientContainer]}>
              <View style={[GlobalStyles.flexDirectionRow]}>
                <Image
                  source={require('../assets/images/profile.png')}
                  style={styles.iconStyle}
                />
                <CustomText style={[{marginLeft: 15}]}>
                  Add a new recipient
                </CustomText>
              </View>
              <Image
                source={require('../assets/images/rightAngle.png')}
                style={styles.iconStyle}
              />
            </View>
          </TouchableRipple>
          <CustomText
            style={[styles.recipients, GlobalStyles.mt2, GlobalStyles.mb2]}>
            YOUR RECIPIENTS
          </CustomText>
        </View>
      </View>
      <ScrollView>
        <View>
          {isLoading && <ActivityIndicator color="black" />}
          <View style={{marginBottom: 100}}>
            {!isLoading &&
              filterRecipients.map(recipient => (
                <RecipientCard
                  recipient={recipient}
                  handleEditRecipient={handleEditRecipient}
                  handleContainerClick={handleRecipient}
                />
              ))}
          </View>
          {!isLoading && filterRecipients.length === 0 && (
            <CustomText style={{textAlign: 'center'}}>
              Recipient not found
            </CustomText>
          )}
        </View>
      </ScrollView>
    </>
  );
};
export default RecipientList;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingBottom: 0,
  },
  recipients: {
    fontSize: 13,
    marginLeft: 15,
    fontWeight: '800',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newRecipientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 15,
  },
  iconStyle: {
    height: 20,
    width: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
