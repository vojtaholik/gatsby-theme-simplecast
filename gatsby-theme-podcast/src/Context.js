import React, { useState } from 'react';

const Context = React.createContext();

export const ContextProvider = props => {
  const { children, defaultEpId } = props;

  const [currEpId, setCurrEpId] = useState(defaultEpId);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Context.Provider
      value={{ currEpId, setCurrEpId, isPlaying, setIsPlaying }}
    >
      {children}
    </Context.Provider>
  );
};

export const ContextConsumer = Context.Consumer;
