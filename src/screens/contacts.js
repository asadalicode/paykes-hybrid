import Contacts from 'react-native-contacts';
import React, { useEffect, useState } from 'react';
import {
  View,
  PermissionsAndroid,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import Header from '../shared/components/header';
import TextInputField from '../shared/components/textInputField';
import CustomText from '../shared/components/customText';
import { ActivityIndicator, Divider } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { showToastMessage } from '../shared/js/showToastMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';
let recipients = [];

const MyContacts = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);
  const [filtercontacts, setFiltercontacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recipientLoad, setRecientLoad] = useState(false);

  useEffect(() => {
    getRecipients();
  }, []);
  const getRecipients = async () => {
    setRecientLoad(false);
    let _userData = await AsyncStorage.getItem('userData');
    _userData = JSON.parse(_userData);
    firestore()
      .collection('Recipients')
      .where('userId', '==', _userData.id)
      .get()
      .then(response => {
        debugger;
        setRecientLoad(true);

        let _recipientsData = response._docs;
        if (_recipientsData.length > 0) {
          let _recipients = _recipientsData.map(({ _data }) => {
            return _data;
          });

          recipients = [..._recipients];
        }
      })
      .catch(error => {
        setRecientLoad(true);
        showToastMessage('error', 'top', `${error}`, 3000, 60);
      });
  };

  useEffect(() => {
    if (recipientLoad) {
      debugger;
      if (Platform.OS === 'android') {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts',
            message: 'This app would like to view your contacts.',
          },
        ).then(() => {
          loadContacts();
        });
      } else {
        loadContacts();
      }
    }
  }, [recipientLoad]);

  const loadContacts = () => {
    setIsLoading(true);
    Contacts.getAll()
      .then(contacts => {
        setIsLoading(false);
        console.log("conttacts",contacts);
        let _contacts = contacts.map(contact => {
          return {
            fullName: contact.displayName,
            phoneNumber:
              contact.phoneNumbers.length > 0
                ? contact.phoneNumbers[0].number.replace(/\s+/g, '')
                : '',
          };
        });
        let _newContacts = _contacts.filter(
          contact =>
            !recipients.some(
              reci =>
                (reci.phoneNumberCountryCode + reci.phoneNumber ||
                  reci.phoneNumber) == contact.phoneNumber,
            ),
        );
        setContacts([..._newContacts]);
        setFiltercontacts([..._newContacts]);
      })
      .catch(e => {
        setIsLoading(false);
        Alert('Permission to access contacts was denied');
      });
  };

  const handleSearch = value => {
    let _newContacts = [...contacts];
    if (value) {
      _newContacts = contacts.filter(item => {
        if (item.fullName.toLocaleLowerCase().includes(value.toLowerCase()))
          return item;
      });
    }
    _newContacts.sort(function (a, b) {
      if (a.fullName < b.fullName) {
        return -1;
      }
      if (a.fullName > b.fullName) {
        return 1;
      }
      return 0;
    });
    setFiltercontacts([..._newContacts]);
  };
  return (
    <>
      <View>
        <Header
          title={'Contacts'}
          hasBack
          onPress={() => navigation.push('recipientList')}
        />
        <View style={[styles.searchContainer]}>
          <Image
            source={require('../assets/images/search.png')}
            style={[styles.iconStyle, { position: 'relative', top: 5 }]}
          />
          <TextInputField
            placeholder={'Enter name to search'}
            style={[styles.searchInput]}
            outlineColor={'transparent'}
            OnChangeText={handleSearch}
            activeOutlineColor="transparent"
          />
        </View>
        {isLoading && <ActivityIndicator color="black" />}
        <ScrollView>
          <View style={[styles.container]}>
            {filtercontacts.map((contact, index) => {
              return <ContactCard contact={contact} navigation={navigation} key={index} />;
            })}
          </View>
        </ScrollView>
      </View>
    </>
  );
};
export default MyContacts;

const ContactCard = ({ contact, navigation }) => {
  const handleContact = () => {
    navigation.push('addEditRecipients', {
      isDefaultValue: true,
      defaultContactData: contact,
    });
  };

  return (
    <>
      <Pressable onPress={handleContact}>
        <>
          <View style={styles.contactCard}>
            <CustomText style={{ fontWeight: '700', fontSize: 18 }}>
              {contact.fullName}
            </CustomText>
            <CustomText>{contact.phoneNumber}</CustomText>
          </View>
          <Divider />
        </>
      </Pressable>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
  },
  contactCard: {
    backgroundColor: 'white',
    padding: 10,
    paddingLeft: 20,
  },
  iconStyle: {
    height: 20,
    width: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
  },
});
