import React from 'react';
import {Text, View, Pressable} from 'react-native';
import {styles} from './styles';

//tickets = tickets.filter(t=>t.imgsrc);

const tickets = require('../assets/tickets.json');

function Random30() {
  const result = [];
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * tickets.length);
    result.push(tickets[randomIndex]);
  }
  return result;
}

export function HomeScreen({navigation}) {
  let Tickets = cat => Random30(tickets.filter(t => t.category.includes(cat)));
  return (
    <View style={styles.centeredContainer}>
      <Text
        style={{
          marginVertical: 10,
          fontFamily: 'Roboto-Medium',
          fontSize: 18,
          fontWeight: '600',
        }}>
        Выберите категорию:
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Pressable
          style={styles.button}
          onPress={() => {
            let generated = Tickets('[A, A1]');
            navigation.navigate('Экзамен', {
              tickets: generated,
            });
          }}>
          <Text style={styles.buttonText}>A, A1</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            let generated = Tickets('[AM]');
            navigation.navigate('Экзамен', {
              tickets: generated,
            });
          }}>
          <Text style={styles.buttonText}>AM</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            let generated = Tickets('[B, B1]');
            navigation.navigate('Экзамен', {
              tickets: generated,
            });
          }}>
          <Text style={styles.buttonText}>B, B1</Text>
        </Pressable>
      </View>
    </View>
  );
}
