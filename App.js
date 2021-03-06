import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
// import  AppLoading from 'expo-app-loading';
import AppLoading from 'expo-app-loading';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
//VIDEO  5.15

// const fetchFonts = () => {
//   Font.loadAsync({
//     moonlight: require('./assets/fonts/Moonlight.ttf'),
//     kuritza: require('./assets/fonts/kuritza.ttf'),
//     sd: require('./assets/fonts/SevillaDecor.ttf'),
//   });
// };
const fetchFonts = async () => {
  await Font.loadAsync({
    moonlight: require('./assets/fonts/Moonlight.ttf'),
    kuritza: require('./assets/fonts/kuritza.ttf'),
    sevilladecor: require('./assets/fonts/SevillaDecor.ttf'),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  const configureNewGamehandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onRestart={configureNewGamehandler}
      />
    );
  }

  return (
    
    <SafeAreaView style={styles.screen}>
        <Header title="?????????????? ?????????? :)" />
        {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
//??? ??????????????? ?????? ???????????? ????????????????????? ???????? ??? ???????????? ????????? ?????? ???????????????????? ?? ?????????? ???? ???????? ??????????????. ?? ???????? ?????? ???? ????????????.
