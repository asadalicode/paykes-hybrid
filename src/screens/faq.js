import {ScrollView, StyleSheet, View} from 'react-native';
import Header from '../shared/components/header';
import React from 'react';
import CustomText from '../shared/components/customText';

const Faq = ({navigation, route}) => {
  const {question, answer} = route.params || {};
  return (
    <View>
      <Header
        title={'FAQs'}
        hasBack
        onPress={() => navigation.navigate('support')}
      />
      <ScrollView>
        <View style={{padding: 15}}>
          <CustomText style={styles.question}>{question}</CustomText>
          <CustomText style={styles.answer}>{answer}</CustomText>
        </View>
      </ScrollView>
    </View>
  );
};
export default Faq;
const styles = StyleSheet.create({
  question: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
  },
});
