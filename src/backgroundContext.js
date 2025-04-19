import { createContext } from 'react';

export const BackgroundContext = createContext({
  handleFileUpload: () => {},
  resetBackground: () => {},
  error: '',
  backgrounds: [],
  currentBg: '',
  setCurrentBg: () => {},
  deleteBackground: () => {},
  ImageMimeTypes: [],
});