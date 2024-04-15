import React, { createContext, useContext, useRef } from 'react';

// Create a context with an undefined initial value.
export const PlayerContext = createContext(undefined);

// Custom hook for easy context consumption
export const usePlayer = () => useContext(PlayerContext);
