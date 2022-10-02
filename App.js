import React, { useEffect } from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/shared/navigation/stackNavigation';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';


import CustomButton from './src/shared/components/customButton';
const App = () => {  

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </SafeAreaView>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
