import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import Colors from '../constants/colors';

const MainButton = (props) => {

  return (
      <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>
            {props.title}
            {props.children}
          </Text>
        </View>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 42,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'moonlight',
    fontSize: 18,
  },
});

export default MainButton;
