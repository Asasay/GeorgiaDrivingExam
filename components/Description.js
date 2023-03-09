import {Modal, Text, Pressable, View, ScrollView} from 'react-native';
import {styles} from './styles';
import React from 'react';

const Description = ({modalVisible, setModalVisible, description}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 10, 13, 0.4)',
        }}>
        <View style={styles.modalView}>
          <Text style={[styles.answerText, {color: 'rgba(64, 72, 76, 1)'}]}>
            {description}
          </Text>
          <Pressable
            style={[styles.button, {marginTop: 20, marginBottom: 0}]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.buttonText}>Закрыть</Text>
          </Pressable>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default Description;
