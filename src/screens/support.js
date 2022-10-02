import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../shared/components/header';
import CustomText from '../shared/components/customText';
import SuppportCard from '../components/supportCard';
import firestore from '@react-native-firebase/firestore';

const Suppport = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [support, setSupport] = useState([
    {title: 'Call us 24/7', image: require('../assets/images/phone-call.png')},
    {title: 'Text us', image: require('../assets/images/message.png')},
    {title: 'View Privacy Policy', image: require('../assets/images/lock.png')},
    {title: 'View Terms of Service', image: require('../assets/images/accept.png')},
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

          let _faqsData = _faqs.map(({_data}) => {
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
  return (
    <View>
      <Header title={'Support'} hasBack onPress={handleNavigation} />
      <ScrollView>
        <View style={{padding: 15,marginTop:10}}>
          {support.map(item => {
            return <SuppportCard title={item.title} image={item.image} />;
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
                style={{height: 20, width: 20, marginTop: 5}}
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

const QuestionCard = ({faq, navigation}) => {
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
});
