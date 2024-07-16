import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { useTheme } from "../components/themeContext";

interface Styles {
  container: ViewStyle;
  titleXLarge: TextStyle;
  titleXXLarge: TextStyle;
  titleLarge: TextStyle;
  titleSmall : TextStyle;
  titleXSmall : TextStyle;
  titleMedium : TextStyle;
  buttonLabel: TextStyle;
}

const useStyles = () => {
  const theme = useTheme().theme;
 
  return StyleSheet.create<Styles>({
    container: {
      flexDirection: 'column',
      marginHorizontal: 16,
      marginVertical: 8,
      flex: 1
    },
    titleLarge: {
      color: theme.colors.primary,
      fontSize: 20,
      fontWeight: '700',
      fontFamily: 'OpenSans-Regular',
    },
    titleXLarge: {
      color: theme.colors.primary,
      fontSize: 24,
      fontWeight: '700',
      fontFamily: 'OpenSans-Regular',
    },
    titleXXLarge: {
      color: theme.colors.primary,
      fontSize: 28,
      fontWeight: '700',
      fontFamily: 'OpenSans-Regular',
    },
    titleMedium: {
      color: theme.colors.black,
      fontSize: 18,
      fontWeight: '700',
      fontFamily: 'OpenSans-Regular',
    },
    titleSmall: {
      color: theme.colors.black,
      fontSize: 14,
      fontWeight: '300',
      fontFamily: 'OpenSans-Regular',
    },
    titleXSmall: {
      color: theme.colors.black,
      fontSize: 10,
      fontWeight: '300',
      fontFamily: 'OpenSans-Regular',
    },
    buttonLabel: {
      fontFamily: 'OpenSans-Regular',
      fontWeight: '600',
      fontSize: 16,
      color : "#ffffff"
    }
  });
};

export default useStyles;
