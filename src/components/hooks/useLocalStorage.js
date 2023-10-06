import { useState, useEffect } from "react";

export function useLocalStorage(initState, key) {
  const [value, setValue] = useState(function () {
    const storedValue = JSON.parse(localStorage.getItem(key));

    return storedValue ? storedValue : initState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value]
  );
  return [value, setValue];
}
