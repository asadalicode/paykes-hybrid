import React from 'react';
import {StyleSheet, View} from 'react-native';
import Badge from '../shared/components/badge';
import CustomText from '../shared/components/customText';
import GlobalStyles from '../shared/styles/globalStyles';

const TransectionCard = ({transection,kesAmount}) => {
  return (
    <View style={[styles.container]}>
      <View>
        <CustomText style={[styles.title]}>{transection?.name || '-'}</CustomText>
        <View style={[GlobalStyles.flexDirectionRow,{alignItems:'center'}, GlobalStyles.mt1]}>
          <CustomText style={styles.subTitle}>{transection.date} </CustomText>
          <Badge />
        </View>
      </View>
      <View>
        <CustomText style={[styles.title, styles.rightTitle]}>
          {(transection.ksh/kesAmount).toFixed(2)} Usd
        </CustomText>
        <CustomText style={[GlobalStyles.mt1, styles.subTitle]}>
          {transection.ksh} Ksh
        </CustomText>
      </View>
    </View>
  );
};
export default TransectionCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DADDDD',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  rightTitle: {
    textAlign: 'right',
  },
  subTitle: {
    fontSize: 14,
  },
});
