import React from "react";


function useSnyc(itemName, initialValue) {
  const [item, setItem] = React.useState(initialValue);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem = localStorageItem;
        if (!localStorageItem) {
          parsedItem = JSON.stringify({});
          localStorage.setItem(itemName, parsedItem);
        }
        parsedItem = JSON.parse(parsedItem);
        setItem(parsedItem);
        setLoading(false);
        
      } catch (error) {
        setError(error);
      }
    }, 1000);
  });
  const saveItem = (newItem) => {
    try {
      localStorage.setItem(itemName, JSON.stringify(newItem));
      setItem(newItem);
    } catch (err) {
      setError(err);
    }
  };
  return { item, saveItem, loading, error };
}

export { useSnyc };
