import {
  ActivityIndicator,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../shared/components/header';
import CustomText from '../shared/components/customText';
import SuppportCard from '../components/supportCard';
import firestore from '@react-native-firebase/firestore';
import GlobalStyles from '../shared/styles/globalStyles';

const Suppport = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [firstNoClick, setFirstNoClick] = useState(false);
  const [secondNoClick, setSecondNoClick] = useState(false);
  const [support, setSupport] = useState([
    // { id: 2, title: 'Text us', image: require('../assets/images/message.png') },
    { id: 3, title: 'Help', image: require('../assets/images/help.png') },
    { id: 4, title: 'View Privacy Policy', image: require('../assets/images/lock.png') },
    { id: 5, title: 'View Terms of Service', image: require('../assets/images/accept.png') },
  ]);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    getFaqs();
  }, []);

  const getFaqs = async () => {
    setIsLoading(true);
    firestore()
      .collection('Faqs')
      .get()
      .then(response => {
        setIsLoading(false);
        let _faqs = response._docs;
        if (_faqs.length > 0) {

          let _faqsData = _faqs.map(({ _data }) => {
            return _data;
          });

          setFaqs([..._faqsData]);
        }
      })
      .catch(error => {
        setIsLoading(false);
        showToastMessage('error', 'top', `${error}`, 3000, 60);
      });
  };
  const handleNavigation = () => {
    navigation.navigate('dashboard');
  };
  const handleClick = (id) => {
    switch (id) {
      case 3:
        navigation.navigate("help");
        break;
      case 4:
        Linking.openURL("https://www.paykes.org/privacy-policy");
        break;
      case 5:
        Linking.openURL("https://www.paykes.org/terms-of-service");
        break;
    }

  }
  return (
    <View>
      <Header title={'Support'} hasBack onPress={handleNavigation} />
      <ScrollView>
        <View style={{ padding: 15, marginTop: 10 }}>
          <View style={styles.card}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}>

              <Image
                source={require('../assets/images/phone-call.png')}
                style={{ width: 15, height: 15 }}
              />
              <CustomText style={styles.text}>Call us 24/7</CustomText>
            </View>
            <View style={{ marginTop: 5, marginLeft: 20 }}>
              <Pressable onPress={() => {
                setFirstNoClick(true)
                Linking.openURL(`tel: 9526870695`)
              }}>
                <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center', marginTop: 3 }}>
                  <CustomText>Jimmy - </CustomText>
                  <CustomText style={{ color: firstNoClick ? GlobalStyles.priColor : GlobalStyles.textColor.color }}>
                    9526870695
                  </CustomText>
                </View>
              </Pressable>
              <Pressable onPress={() => {
                setSecondNoClick(true)
                Linking.openURL(`tel: 2183988039`)
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <CustomText>Felix - </CustomText>
                  <CustomText style={{ color: secondNoClick ? GlobalStyles.priColor : GlobalStyles.textColor.color }}>2183988039</CustomText>
                </View>
              </Pressable>
            </View>
          </View>
          {support.map(item => {
            return <SuppportCard item={item} handleClick={handleClick} />;
          })}

          <View style={styles.faqContainer}>
            <CustomText style={styles.title}>FAQs</CustomText>
            <View style={styles.country}>
              <Image
                source={require('../assets/images/keyniya.png')}
                style={styles.flag}
              />
              <Image
                source={require('../assets/images/downArrow.png')}
                style={{ height: 20, width: 20, marginTop: 5 }}
              />
            </View>
          </View>
        </View>
        <View>
          {isLoading && <ActivityIndicator />}
          {!isLoading &&
            faqs.map(faq => {
              return <QuestionCard faq={faq} navigation={navigation} />;
            })}
        </View>
      </ScrollView>
    </View>
  );
};
export default Suppport;

const QuestionCard = ({ faq, navigation }) => {
  const handleCard = () => {
    navigation.navigate('faq', {
      question: faq.question,
      answer: faq.answer,
    });
  };

  return (
    <Pressable onPress={handleCard}>
      <View style={styles.questionCard}>
        <CustomText>{faq.question}</CustomText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
    marginBottom: 10,
  },
  flag: {
    height: 25,
    width: 25,
  },
  questionCard: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#D6D4D4',
    padding: 15,
  },
  country: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 5,
  },
  faqContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    padding: 10,
    paddingVertical: 14,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 5,

  },
  text: {
    fontSize: 15,
    marginLeft: 10,
    fontWeight: 'bold',
  },
});
