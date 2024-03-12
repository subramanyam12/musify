import React, { useState, createContext, useContext } from 'react';

const musicontext = createContext();
const setartistsongs = createContext();

export const contextvalue = () => {
  return useContext(musicontext);
};

export const setartistvalue = () => {
  return useContext(setartistsongs);
};

export const Context = ({ children }) => {
  const [song, setsong] = useState({ index: 0, nestsearchdata: [] });

  return (
    <musicontext.Provider value={{ song }}>
      <setartistsongs.Provider value={setsong}>
        {children}
      </setartistsongs.Provider>
    </musicontext.Provider>
  );
};
