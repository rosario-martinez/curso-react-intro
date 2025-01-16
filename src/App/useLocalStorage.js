import React from 'react';

function useLocalStorage(itemName, initialValue) {
  const [item, setItem] = React.useState(() => {
    try {
      const localStorageItem = localStorage.getItem(itemName);
      // Si el valor es null o no es un JSON válido, usa el valor inicial
      return localStorageItem ? JSON.parse(localStorageItem) : initialValue;
    } catch (error) {
      console.error(`Error accessing localStorage for key "${itemName}":`, error);
      return initialValue;
    }
  });

  const saveItem = (newItem) => {
    try {
      const valueToStore = newItem instanceof Function ? newItem(item) : newItem;
      localStorage.setItem(itemName, JSON.stringify(valueToStore));
      setItem(valueToStore);
    } catch (error) {
      console.error(`Error saving to localStorage for key "${itemName}":`, error);
    }
  };

  return [item, saveItem];
}

export { useLocalStorage };