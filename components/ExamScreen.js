import {useEffect, useState, React} from 'react';
import {
  Image,
  Text,
  Pressable,
  View,
  ScrollView,
  StatusBar,
} from 'react-native';
import IconQuestion from '../assets/icon_question';
import {Answers} from './Answers';
import Description from './Description';
import DynamicImage from './DynamicImage';
import {styles} from './styles';

export function ExamScreen({route, navigation}) {
  const [currentTicket, setCurrentTicket] = useState(0);
  const [ansPicked, setAnsPicked] = useState('');
  const [rights, setRights] = useState(0);
  const [wrongs, setWrongs] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const tickets = route.params.tickets;
  let ticket = tickets[currentTicket];

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '№' + tickets[currentTicket].num,
      headerRight: () => (
        <Pressable onPress={() => setModalVisible(true)}>
          <IconQuestion />
        </Pressable>
      ),
    });
  }, [navigation, currentTicket, tickets]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 10,
        backgroundColor: 'rgba(251, 252, 254, 1)',
      }}>
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        {ticket.imgsrc && (
          //Question image
          <DynamicImage
            source={{uri: ticket.imgsrc}}
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
        <Pressable
          style={[styles.button, {backgroundColor: 'rgba(251, 252, 254, 1)'}]}
          hitSlop={{bottom: 10, left: 10, top: 10}}
          onPress={() => navigation.navigate('Главное меню')}>
          <Text style={[styles.buttonText, {color: 'rgba(0, 102, 132, 1)'}]}>
            В главное меню
          </Text>
        </Pressable>
        <Pressable
          style={styles.button}
          hitSlop={{bottom: 10, left: 10, right: 10, top: 50}}
          onPress={() => {
            if (!ansPicked) {
              return;
            }
            setAnsPicked('');
            if (currentTicket === tickets.length - 1) {
              navigation.navigate('Результаты', {
                rights,
                wrongs,
              });
            } else {
              setCurrentTicket(i => i + 1);
            }
          }}>
          <Text style={styles.buttonText}>Следующий билет</Text>
        </Pressable>
      </View>
      <Description
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        description={ticket.description}
      />
      {modalVisible && <StatusBar backgroundColor={'rgba(0, 10, 13, 0.4)'} />}
    </View>
  );
}
