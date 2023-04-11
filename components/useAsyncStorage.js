import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useAsyncStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(initialValue);
  useEffect(() => {
    AsyncStorage.getItem(key)
      .then(value => {
        if (value === null) {
          return JSON.parse(initialValue);
        }
        return JSON.parse(value);
      })
      .then(setStoredValue);
  }, [key, initialValue]);

  const setValue = value => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    AsyncStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue];
}
