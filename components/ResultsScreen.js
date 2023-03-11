import {useEffect} from 'react';
import {BackHandler, StyleSheet, Text, View} from 'react-native';
import {styles} from './styles';
import React from 'react';

export function ResultsScreen({route, navigation}) {
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
    <View style={[styles.centeredContainer]}>
      <Text style={{color: '#006684', fontFamily: 'Roboto'}}>
        Правильных ответов: {route.params.rights}
      </Text>
      <Text style={{color: '#BA1A1A', fontFamily: 'Roboto'}}>
        Неправильных ответов: {route.params.wrongs}
      </Text>
      <View
        style={{
          width: '60%',
          marginVertical: 10,
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <Text
        style={{
          width: '60%',
          textAlign: 'center',
          fontFamily: 'Roboto-Regular',
          color: 'black',
        }}>
        {route.params.wrongs > 3
          ? 'Вы не сдали экзамен. Попробуйте попрактиковаться еще.'
          : 'Экзамен сдан!'}
      </Text>
    </View>
  );
}
