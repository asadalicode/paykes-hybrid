import SwitchToggle from 'react-native-switch-toggle';
import React, {useState} from 'react';
import GlobalStyles from '../styles/globalStyles';

const ToggleButton = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <SwitchToggle
      switchOn={toggle}
      onPress={() => {
        setToggle(!toggle);
      }}
      containerStyle={{
        height: 30,
        width: 70,
        borderRadius: 18,
        padding: 4,
      }}
      circleStyle={{
        height: 25,
        width: 25,
        borderRadius: 12,
      }}
      circleColorOff="white"
      circleColorOn={GlobalStyles.priColor}
      backgroundColorOn="#6D6D6D"
      backgroundColorOff="#EDEBEB"
    />
  );
};

export default ToggleButton;
