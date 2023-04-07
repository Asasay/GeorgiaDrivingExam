import {useEffect, useState, React} from 'react';
import {View, ScrollView} from 'react-native';
import {Button, IconButton, Text, useTheme} from 'react-native-paper';
import {Answers} from './Answers';
import Description from './Description';
import DynamicImage from './DynamicImage';
import {styles} from './styles';

export function ExamScreen({route, navigation}) {
  const [currentTicket, setCurrentTicket] = useState(0);
  const [ansPicked, setAnsPicked] = useState(null);
  const [rights, setRights] = useState(0);
  const [wrongs, setWrongs] = useState(0);
  const theme = useTheme();

  const tickets = route.params.tickets;
  let ticket = tickets[currentTicket];
  if (ticket.img !== null) {
    ticket.imgsrc = {uri: `data:image/jpeg;base64,${ticket.img}`};
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '№' + tickets[currentTicket].id,
      right: (
        <>
          <IconButton icon="star" />
          <Description description={ticket.description} />
        </>
      ),
    });
  }, [currentTicket, navigation, ticket.description, tickets]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 10,
        backgroundColor: theme.colors.background,
      }}>
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        {ticket.imgsrc && (
          //Question image
          <DynamicImage
            source={ticket.imgsrc}
            padding={10}
            style={styles.image}
          />
        )}
        <Text style={styles.question}>{ticket.question}</Text>
        <Answers
          answers={ticket.answers}
          rightAnswer={ticket.rightAnswer}
          ansPicked={ansPicked}
          setAnsPicked={setAnsPicked}
          setRights={setRights}
          setWrongs={setWrongs}
        />
      </ScrollView>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Button onPress={() => navigation.navigate('Главное меню')}>
          В главное меню
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            if (ansPicked === null) {
              return;
            }
            setAnsPicked(null);
            if (currentTicket === tickets.length - 1) {
              navigation.navigate('Результаты', {
                rights,
                wrongs,
              });
            } else {
              setCurrentTicket(i => i + 1);
            }
          }}>
          Следующий билет
        </Button>
      </View>
    </View>
  );
}
