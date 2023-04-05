import {IconButton, Modal, Portal, Text, useTheme} from 'react-native-paper';
import React from 'react';
import {ScrollView} from 'react-native';

const Description = ({description}) => {
  const [visible, setVisible] = React.useState(false);
  const theme = useTheme();
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          style={{marginHorizontal: 20}}
          contentContainerStyle={{
            backgroundColor: theme.colors.surface,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 10,
          }}>
          <ScrollView>
            <Text
              style={{
                fontSize: 16,
              }}>
              {description ? description : 'К этому билету нет описания'}
            </Text>
          </ScrollView>
        </Modal>
      </Portal>
      <IconButton onPress={showModal} icon="help-circle-outline" />
    </>
  );
};

export default Description;
