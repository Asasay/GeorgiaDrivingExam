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
    if (ansPicked && rightAnswer != ansPicked) {
      if (rightAnswer == i) {
        return [styles.answer, styles.bgGreen];
      }
      if (ansPicked == i) {
        return [styles.answer, styles.bgRed];
      }
    } else if (ansPicked && rightAnswer == ansPicked) {
      if (rightAnswer == i) {
        return [styles.answer, styles.bgGreen];
      }
    }
    return styles.answer;
  };
  return (
    <View style={styles.answersContainer}>
      {answers.map((a, i) => (
        <Pressable
          style={() => getStyle(i)}
          key={i}
          onPress={() => {
            if (!ansPicked) {
              setAnsPicked(i.toString());
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
