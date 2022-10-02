import React from 'react';
import Unorderedlist from 'react-native-unordered-list';
import CustomText from './customText';

const UnOderList = ({list}) => {
  return (
    <>
      {list.map(listItem => (
        <Unorderedlist
          bulletUnicode={0x2022}
          color={'black'}
          style={{fontSize: 20,marginBottom:25}}>
          <CustomText>{listItem}</CustomText>
        </Unorderedlist>
      ))}
    </>
  );
};
export default UnOderList;
