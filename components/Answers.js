/* eslint-disable eqeqeq */
import {Text, Pressable, View} from 'react-native';
import {styles} from './styles';
import React from 'react';
import IconSquare from '../assets/icon_square';

export function Answers({
  answers,
  rightAnswer,
  ansPicked,
  setAnsPicked,
  setRights,
  setWrongs,
}) {
  let getStyle = i => {
    if (ansPicked === null) {
      return [styles.answer];
    }

    const isRightAnswer = rightAnswer === i;
    const isWrongAnswer = ansPicked === i && i !== rightAnswer;

    return [
      styles.answer,
      isRightAnswer && styles.bgGreen,
      isWrongAnswer && styles.bgRed,
    ].filter(Boolean);
  };

  return (
    <View style={styles.answersContainer}>
      {answers.map((a, i) => (
        <Pressable
          style={() => getStyle(i)}
          key={i}
          onPress={() => {
            if (ansPicked === null) {
              setAnsPicked(i);
              i == rightAnswer ? setRights(s => s + 1) : setWrongs(s => s + 1);
            }
          }}>
          <IconSquare />
          <Text style={styles.answerText}>{a}</Text>
        </Pressable>
      ))}
    </View>
  );
}
