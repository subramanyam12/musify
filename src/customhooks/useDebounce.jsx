import React, { useEffect, useState } from 'react';

const useDebounce = (value, delay = 500) => {
  const [debouncevalue, setdebouncevalue] = useState('');

  useEffect(() => {
    let timeout = setTimeout(() => {
      setdebouncevalue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value]);

  return debouncevalue;
};

export default useDebounce;
