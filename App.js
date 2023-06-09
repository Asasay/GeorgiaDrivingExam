import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  MD3DarkTheme,
  MD3LightTheme,
  Provider as PaperProvider,
  configureFonts,
} from 'react-native-paper';
import {HomeScreen} from './components/screens/HomeScreen';
import {ExamScreen} from './components/screens/ExamScreen';
import {TicketsScreen} from './components/screens/TicketsScreen';
import {ResultsScreen} from './components/screens/ResultsScreen';
import {StatusBar, useColorScheme} from 'react-native';
import * as React from 'react';
import CustomNavigationBar from './components/CustomNavigationBar';
import colors from './components/styles/colors.json';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

export default function App() {
  const colorScheme = useColorScheme();
  const fontConfig = {
    fontFamily: 'Roboto-Regular',
  };
  const paperTheme =
    colorScheme === 'dark'
      ? {
          ...MD3DarkTheme,
          colors: colors.dark,
          fonts: configureFonts({config: fontConfig}),
        }
      : {
          ...MD3LightTheme,
          colors: colors.light,
          fonts: configureFonts({config: fontConfig}),
        };
  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Главное меню"
          screenOptions={{
            header: props => <CustomNavigationBar {...props} />,
          }}>
          <Stack.Screen
            name="Главное меню"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Экзамен"
            component={gestureHandlerRootHOC(ExamScreen)}
            options={{back: true}}
          />
          <Stack.Screen
            name="Все билеты"
            component={gestureHandlerRootHOC(TicketsScreen)}
            options={{back: true}}
          />
          <Stack.Screen
            name="Избранные"
            component={gestureHandlerRootHOC(TicketsScreen)}
            options={{back: true}}
          />
          <Stack.Screen
            name="Результаты"
            component={ResultsScreen}
            options={{back: true}}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </PaperProvider>
  );
}
