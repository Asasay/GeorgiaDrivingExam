import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './components/HomeScreen';
import {ExamScreen} from './components/ExamScreen';
import {ResultsScreen} from './components/ResultsScreen';
import {StatusBar, Pressable} from 'react-native';
import React from 'react';
import IconClose from './assets/icon_close';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Главное меню"
        screenOptions={{headerShadowVisible: false}}>
        <Stack.Screen
          name="Главное меню"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Экзамен"
          component={ExamScreen}
          options={headerStyle}
        />
        <Stack.Screen
          name="Результаты"
          component={ResultsScreen}
          options={({navigation}) => ({
            headerLeft: () => <CloseButtonTitle navigation={navigation} />,
            headerStyle,
          })}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

function CloseButtonTitle({navigation}) {
  return (
    <Pressable onPress={() => navigation.popToTop()}>
      <IconClose />
    </Pressable>
  );
}

const headerStyle = {
  headerTitleStyle: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '100',
    fontSize: 18,
  },
};
