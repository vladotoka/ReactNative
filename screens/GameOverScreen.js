import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';

import Colors from '../constants/colors';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const GameOverScreen = (props) => {
  return (
      <ScrollView>
        <View style={styles.screen}>
          <TitleText>Край на Играта!</TitleText>
          <View style={styles.imageContainer}>
            <Image
              fadeDuration={1000}
              //   source={require('../assets/success.png')}
              source={{
                uri: 'https://www.obekti.bg/sites/default/files/styles/article_gallery/public/images/shutterstock_323530922_1.jpg?itok=LOj1xXzZ',
              }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <View style={styles.resultContainer}>
            <BodyText style={styles.resultText}>
              Успях да позная числото ти след
              <Text style={styles.highlight}>{props.roundsNumber}</Text> опита и
              то е <Text style={styles.highlight}>{props.userNumber}</Text> :)
            </BodyText>
          </View>
          <MainButton title="Нова играа" onPress={props.onRestart} />
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: (Dimensions.get('window').width * 0.7) / 2,
    borderWidth: 3,
    borderColor: Colors.accent,
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 30,
  },
  highlight: {
    color: Colors.primary,
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: Dimensions.get('window').height / 60,
  },
  resultText: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').height < 400 ? 26 : 33,
  },
});

export default GameOverScreen;
