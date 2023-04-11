import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {Button, useTheme, Menu} from 'react-native-paper';
import {
  getAllTickets,
  getAmountTickets,
  getFavoriteTickets,
} from './getTickets';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function HomeScreen({navigation}) {
  const isFocused = useIsFocused();
  const [favorites, setFavorites] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState('B, B1');
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const theme = useTheme();

  React.useEffect(() => {
    // Call only when screen open or when back on screen
    if (isFocused) {
      AsyncStorage.getItem('favorites')
        .then(value => {
          if (value === null) {
            return [];
          }
          return JSON.parse(value);
        })
        .then(setFavorites);
    }
  }, [isFocused]);

  const pickCatergory = cat => {
    setSelectedCategory(cat);
    closeMenu();
  };

  return (
    <View
      style={[
        styles.centeredContainer,
        {backgroundColor: theme.colors.background},
      ]}>
      <View
        style={{
          flexDirection: 'column',
        }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button
              icon="arrow-down-drop-circle-outline"
              onPress={openMenu}
              style={{marginBottom: 10, width: 180}}>
              Категория: {selectedCategory}
            </Button>
          }>
          <Menu.Item onPress={() => pickCatergory('A, A1')} title="A, A1" />
          <Menu.Item onPress={() => pickCatergory('B, B1')} title="B, B1" />
          <Menu.Item onPress={() => pickCatergory('AM')} title="AM" />
          <Menu.Item onPress={() => pickCatergory('C')} title="C" />
          <Menu.Item onPress={() => pickCatergory('C1')} title="C1" />
          <Menu.Item onPress={() => pickCatergory('D')} title="D" />
          <Menu.Item onPress={() => pickCatergory('D1')} title="D1" />
          <Menu.Item onPress={() => pickCatergory('TS')} title="TS" />
          <Menu.Item onPress={() => pickCatergory('Трамвай')} title="Трамвай" />
          <Menu.Item onPress={() => pickCatergory('Военная')} title="Военная" />
        </Menu>
        <Button
          style={{marginBottom: 10}}
          mode="contained"
          onPress={() => {
            navigation.navigate('Экзамен', {
              tickets: getAmountTickets(selectedCategory, 30),
            });
          }}>
          Начать экзамен
        </Button>
        <Button
          style={{marginBottom: 10}}
          mode="contained-tonal"
          onPress={() => {
            navigation.navigate('Все билеты', {
              tickets: getAllTickets(selectedCategory),
            });
          }}>
          Все билеты
        </Button>
        <Button
          mode="contained-tonal"
          disabled={favorites.length === 0}
          onPress={() => {
            navigation.navigate('Избранные', {
              tickets: getFavoriteTickets(favorites),
            });
          }}>
          Избранные
        </Button>
      </View>
    </View>
  );
}
