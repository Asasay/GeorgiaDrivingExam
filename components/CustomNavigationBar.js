import React from 'react';
import {Appbar} from 'react-native-paper';

export default function CustomNavigationBar({
  navigation,
  options,
  back,
  right,
}) {
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.popToTop} /> : null}
      <Appbar.Content title={options.headerTitle} />
      {options.right ? options.right : null}
    </Appbar.Header>
  );
}
