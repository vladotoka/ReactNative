import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);

const GameScreen = (props) => {
  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const { userChoice, onGameOver } = props;
  const [avialbleDeviceWidth, setAvialbleDeviceWidth] = useState(Dimensions.get('window').width);
  const [avialbleDeviceHeight, setAvialbleDeviceHeight] = useState(Dimensions.get('window').height);

  useEffect(() => {
    const updateLayout = () => {
      setAvialbleDeviceWidth(Dimensions.get('window').width);
      setAvialbleDeviceHeight(Dimensions.get('window').height);
    };

    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };

  });

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuesshandler = (direction) => {
    if (
      (direction === 'надолу' && currentGuess < props.userChoice) ||
      (direction === 'нагоре' && currentGuess > props.userChoice)
    ) {
      Alert.alert(
        'Упс :)',
        'Възможно е да ме объркаш ако ми даваш грешна насока',
        [{ text: 'извинявай', style: 'cancel' }]
      );
      return;
    }

    if (direction === 'надолу') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    // setRounds((curRounds) => curRounds + 1);
    setPastGuesses((curPastGuesses) => [
      nextNumber.toString(),
      ...curPastGuesses,
    ]);
  };

  let listContainerStyle = styles.listContainer;

  if (avialbleDeviceWidth < 350) {
    listContainerStyle = styles.listContainerBig;
  }

  if (avialbleDeviceHeight < 500) {
    return (
    <View style={styles.screen}>
    <Text style={DefaultStyles.bodyText}>Дълбока мисъл предполага:</Text>
    <View style={styles.controls}>
      <MainButton onPress={nextGuesshandler.bind(this, 'надолу')}>
        <Ionicons name="chevron-down-circle" size={24} color="white" />
      </MainButton>
      <NumberContainer>{currentGuess}</NumberContainer>
      <MainButton onPress={nextGuesshandler.bind(this, 'нагоре')}>
        <Ionicons name="chevron-up-circle" size={24} color="white" />
      </MainButton>
    </View>
    <View style={listContainerStyle}>
      {/* <ScrollView contentContainerStyle={styles.list}>
        {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
      </ScrollView> */}
      <FlatList
        keyExtractor={(item) => item}
        data={pastGuesses}
        renderItem={renderListItem.bind(this, pastGuesses.length)}
        contentContainerStyle={styles.list}
      />
    </View>
  </View>

    );
  }

  return (
    <View style={styles.screen}>
    <Text style={DefaultStyles.bodyText}>Дълбока мисъл предполага:</Text>
    <NumberContainer>{currentGuess}</NumberContainer>
    <Card style={styles.buttonContainer}>
      <MainButton onPress={nextGuesshandler.bind(this, 'надолу')}>
        <Ionicons name="chevron-down-circle" size={24} color="white" />
      </MainButton>
      <MainButton onPress={nextGuesshandler.bind(this, 'нагоре')}>
        <Ionicons name="chevron-up-circle" size={24} color="white" />
      </MainButton>
    </Card>
    <View style={listContainerStyle}>
      {/* <ScrollView contentContainerStyle={styles.list}>
      {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
    </ScrollView> */}
      <FlatList
        keyExtractor={(item) => item}
        data={pastGuesses}
        renderItem={renderListItem.bind(this, pastGuesses.length)}
        contentContainerStyle={styles.list}
      />
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 30 : 5,
    width: 400,
    maxWidth: '90%',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%'
  },
  listContainer: {
    flex: 1,
    width: '60%',
  },
  listContainerBig: {
    flex: 1,
    width: '80%',
  },
  list: {
    flexGrow: 1,
    // alignItems: 'center',
    justifyContent: 'flex-end',
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default GameScreen;
