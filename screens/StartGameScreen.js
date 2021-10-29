import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import test from '../constants/test';



const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setbuttonWidth] = useState(Dimensions.get('window').width / 3.5);

  useEffect(() => {
    const updateLayout = () => {
      setbuttonWidth(Dimensions.get('window').width / 3.5);
    }
  
    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  const numberInputHanler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  };

  const calendarDateString = 'jan' + selectedNumber + '2022';
  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Невалидно число!',
        'избраното число трябва да е между 1 и 99.',
        [{ text: 'Добре', style: 'destructive', onPress: resetInputHandler }]
      );
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text> Вие Избрахте Числото: </Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <View>
          <MainButton
            title="Старт"
            onPress={() => props.onStartGame(selectedNumber)}
          />
        </View>
      </Card>
    );
  }
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.screen}>
          <TitleText style={styles.title}>Започни Нова Игра!</TitleText>
          <Card style={styles.inputContainer}>
            <BodyText style={styles.text}>Избери Число</BodyText>
            <Input
              style={styles.input}
              blurOnSubmit
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="number-pad"
              maxLength={2}
              onChangeText={numberInputHanler}
              value={enteredValue}
            />
            <View style={styles.buttonContainer}>
              <View style={{width: buttonWidth}}>
                <Button
                  title="Изчисти"
                  onPress={resetInputHandler}
                  color={Colors.accent}
                />
              </View>
              <View style={{width: buttonWidth}}>
                <Button
                  title="Потвърди"
                  onPress={confirmInputHandler}
                  color={Colors.primary}
                />
              </View>
            </View>
          </Card>
          {confirmedOutput}
          <Text>{test.jan032022}</Text>
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: '80%',
    maxWidth: '95%',
    minWidth: 300,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  // button: {
  //   // width: '49%',
  //   width: Dimensions.get('window').width / 3.5,
  // },
  input: {
    width: 50,
    textAlign: 'center',
  },
  summaryContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  text: {
    fontSize: 35,
  },
});

export default StartGameScreen;
