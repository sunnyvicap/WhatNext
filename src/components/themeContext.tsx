import React, { createContext, ReactNode, useContext, useState } from "react";
import { AppDarkTheme, AppLightTheme } from './themeColor';
import { useColorScheme } from "react-native";

type ThemeContextType = {
    theme: typeof AppLightTheme;
    switchColorTheme: (name: string) => void;
};

const ThemeContext = createContext<ThemeContextType>({
    theme: AppLightTheme,
    switchColorTheme: () => { } // Default empty function
});

type ThemeProviderProps = {
    children: ReactNode;
}

export const useTheme = () => useContext(ThemeContext);


export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {

    const [theme, setTheme] = useState(AppLightTheme);
    const colorScheme = useColorScheme();

    const switchColorTheme = (name: any) => {

        switch (name) {
            case 'Dark':
                setTheme(AppDarkTheme);
                break;
            default:
                setTheme(AppLightTheme);
                break;
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, switchColorTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};