import {IconButton, useTheme} from 'react-native-paper';
import React from 'react';
import useAsyncStorage from './useAsyncStorage';

const Favorites = ({examTicketId}) => {
  const [favorites, setFavorites] = useAsyncStorage('favorites', '[]');
  const theme = useTheme();

  const handlePress = () => {
    if (favorites.includes(examTicketId)) {
      setFavorites(favorites.filter(idInFav => idInFav !== examTicketId));
    } else {
      setFavorites([...favorites, examTicketId]);
    }
  };

  return (
    <IconButton
      icon="star"
      onPress={handlePress}
      iconColor={
        favorites.includes(examTicketId) ? theme.colors.primary : undefined
      }
    />
  );
};

export default Favorites;
