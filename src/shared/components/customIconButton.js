import React from 'react';
import {IconButton} from 'react-native-paper';

const CustomIconButton = ({Icon, Size, onPress, style}) => {

  return (
    <IconButton
      icon={Icon}
      size={Size}
      style={[style]}
      onPress={onPress}
    />
  );
};

export default CustomIconButton;
