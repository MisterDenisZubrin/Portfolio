/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/function-component-definition */
import { createContext, useState } from 'react';

interface ILanguageProviderProps {
  children: JSX.Element;
}

interface ILanguageProviderValue {
  language: string;
  setLanguage?: React.Dispatch<React.SetStateAction<string>>;
}

export const LanguageContext = createContext<ILanguageProviderValue>({
  language: 'RUS',
});

export const LanguageProvider = ({ children }: ILanguageProviderProps) => {
  const [language, setLanguage] = useState('RUS');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
