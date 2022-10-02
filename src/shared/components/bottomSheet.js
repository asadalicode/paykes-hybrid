import React, {useEffect, useRef} from 'react';
import {Image, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomText from './customText';

const BottomSheet = ({ title, children,refRBSheet ,height=450}) => {

  const closeSheet = () => {
    refRBSheet.current.close();
  };
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={false}
      height={height}
      customStyles={{
        container: {
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        },
        wrapper: {
          backgroundColor: 'rgba(89, 85, 87, 0.62)',
        },
        draggableIcon: {
          // backgroundColor: '#000',
        },
      }}>
      <ScrollView>
        <View style={[styles.bottomSheetHeader]}>
          <CustomText
            style={[
              {
                marginLeft: 15,
                fontWeight: '500',
                color: 'black',
                fontSize: 20,
              },
            ]}>
            {title}
          </CustomText>
          <Pressable onPress={closeSheet}>
            <Image
              source={require('../../assets/images/cross.png')}
              style={{width: 15, height: 15, marginRight: 10}}
            />
          </Pressable>
        </View>
        {children}
      </ScrollView>
    </RBSheet>
  );
};
export default BottomSheet;
const styles = StyleSheet.create({
  bottomSheetHeader: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
