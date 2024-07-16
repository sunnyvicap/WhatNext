import { MD3LightTheme as DefaultTheme } from "react-native-paper";
import { MD3DarkTheme as DefaultDarkTheme } from "react-native-paper";



export const AppDarkTheme = {
    ...DefaultDarkTheme,
    colors: {
        ...DefaultDarkTheme.colors,
        card: '#607D8B',
        text: '#ffffff',
        accent: '#E0F7FA',
        border: '#546E7A',
        notification: '#3E2723',
        background: "#E0F7FA",
        link : '#1565C0',
        appBar: '#263238',
        white: '#ffffff',
        black: '#000000',
        topTab: {
            backgroundColor: '#263238',
            activeColor: "#006064",
            inactiveColor: "#424242"
        },
        bottomTab: {
            backgroundColor: '#263238',
            activeColor: "#ffffff",
            inactiveColor: "#9E9E9E"
        }
    },
};


export const AppLightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#006064',
        accent: '#E0F7FA',
        card: '#FAFAFA',
        text: '#212121',
        border: '#546E7A',
        notification: '#3E2723',
        background: "#FAFAFA",
        appBar: '#FAFAFA',
        white: '#ffffff',
        black: '#000000',
        link : '#1565C0',
        topTab: {
            backgroundColor: '#FAFAFA',
             activeColor: "#006064",
            inactiveColor: "#424242"
        },
        bottomTab: {
            backgroundColor: '#FAFAFA',
            activeColor: "#006064",
            inactiveColor: "#424242"
        }
    },
};
