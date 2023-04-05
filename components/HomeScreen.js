import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {Button, useTheme, Menu} from 'react-native-paper';
import {getTickets} from './getTickets';

export function HomeScreen({navigation}) {
  const [visible, setVisible] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState('B, B1');
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const theme = useTheme();

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
              style={{marginBottom: 5}}>
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
              tickets: getTickets(selectedCategory, 30),
            });
          }}>
          Начать экзамен
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate('Все билеты', {
              tickets: getTickets(selectedCategory, 'all'),
            });
          }}>
          Все билеты
        </Button>
      </View>
    </View>
  );
}
