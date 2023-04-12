/* eslint-disable eqeqeq */
import {Pressable, View} from 'react-native';
import {styles} from './styles/styles';
import React from 'react';
import {useTheme, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function Answers({
  answers,
  rightAnswer,
  ansPicked,
  setAnsPicked,
  setRights,
  setWrongs,
}) {
  const theme = useTheme();

  const containerStyle = i => {
    const style = [
      styles.answer,
      {backgroundColor: theme.colors.secondaryContainer},
    ];

    if (ansPicked !== null) {
      const isRightAnswer = rightAnswer === i;
      const isWrongAnswer = ansPicked === i && i !== rightAnswer;

      if (isRightAnswer) {
        style[1].backgroundColor = theme.colors.primary;
      }
      if (isWrongAnswer) {
        style[1].backgroundColor = theme.colors.error;
      }
    }

    return style;
  };

  const textStyle = i => {
    const style = {
      marginLeft: 10,
      paddingRight: 10,
      color: theme.colors.onSecondaryContainer,
    };

    if (ansPicked !== null) {
      const isRightAnswer = rightAnswer === i;
      const isWrongAnswer = ansPicked === i && i !== rightAnswer;

      if (isRightAnswer) {
        style.color = theme.colors.onPrimary;
      }
      if (isWrongAnswer) {
        style.color = theme.colors.onError;
      }
    }

    return style;
  };

  return (
    <View style={styles.answersContainer}>
      {answers.map((a, i) => (
        <Pressable
          style={containerStyle(i)}
          key={i}
          onPress={() => {
            if (ansPicked === null) {
              setAnsPicked(i);
              i == rightAnswer
                ? setRights?.(s => s + 1)
                : setWrongs?.(s => s + 1);
            }
          }}>
          <Icon name="square" color={textStyle(i).color} />
          <Text variant="bodyMedium" style={textStyle(i)}>
            {a}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
