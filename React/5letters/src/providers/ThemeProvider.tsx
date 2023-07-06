/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/function-component-definition */
import { createContext, useState } from 'react';

interface IThemeProviderProps {
  children: JSX.Element;
}

interface IThemeProviderValue {
  theme: string;
  setTheme?: React.Dispatch<React.SetStateAction<string>>;
}

export const ThemeContext = createContext<IThemeProviderValue>({
  theme: 'light',
});

export const ThemeProvider = ({ children }: IThemeProviderProps) => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
