import {useEffect} from 'react';
import {BackHandler, View} from 'react-native';
import {styles} from '../styles/styles';
import React from 'react';
import {useTheme, Text, Divider} from 'react-native-paper';

export function ResultsScreen({route, navigation}) {
  const theme = useTheme();

  useEffect(() => {
    const onBackPress = () => {
      navigation.popToTop();
      return true;
    };
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );
    return () => subscription.remove();
  });

  return (
    <View
      style={[
        styles.centeredContainer,
        {backgroundColor: theme.colors.background},
      ]}>
      <Text variant="bodyMedium" style={{color: theme.colors.primary}}>
        Правильных ответов: {route.params.rights}
      </Text>
      <Text variant="bodyMedium" style={{color: theme.colors.error}}>
        Неправильных ответов: {route.params.wrongs}
      </Text>
      <Divider style={{marginVertical: 10, width: '50%'}} />
      <Text variant="bodyMedium">
        {route.params.wrongs > 3
          ? 'Вы не сдали экзамен. Попробуйте попрактиковаться еще.'
          : 'Экзамен сдан!'}
      </Text>
    </View>
  );
}
