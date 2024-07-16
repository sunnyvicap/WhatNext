/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {Component, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  PaperProvider,
  Title,
} from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, NavigationProp} from '@react-navigation/native';
import Login from './ui/login';
import {ThemeProvider, useTheme} from './components/themeContext';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Profile from './ui/profile';
import Dashboard from './ui/dashboard';
import {isProfileCompleted} from './util/preferances';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {WEB_CLIENT_ID} from './util/keys';
import VideoDetail from './ui/video/videoDetail';
import { RootStackParamList } from './components/routes';

// type these manually
const Stack = createNativeStackNavigator<RootStackParamList>();

class App extends Component {
  componentDidMount() {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      offlineAccess: false,
      forceCodeForRefreshToken: true,
      scopes: ['https://www.googleapis.com/auth/youtube.readonly'], // what API you want to access on behalf of the user, default is email and profile
    });
    SplashScreen.hide();
  }

  render() {
    return (
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    );
  }
}

const AppContent = (): React.JSX.Element => {
  const {theme} = useTheme();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isProfile, setProfile] = useState('false');

  useEffect(() => {
    setIsProfileCompleted();
    const subscriber = auth().onAuthStateChanged(user => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    return subscriber; // unsubscribe on unmount
  }, [initializing]);

  const setIsProfileCompleted = async () => {
    const profileStatus = await isProfileCompleted();
    setProfile(profileStatus && profileStatus === 'true' ? 'true' : 'false');
  };

  const AuthStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          statusBarStyle: 'auto',
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Poppins-Regular.ttf',
            fontWeight: '800',
            color: theme.colors.primary,
            fontSize: 22,
          },
        }}>
        <Stack.Screen name="Login" component={Login} options={{title: ''}} />
      </Stack.Navigator>
    );
  };

  const AppStack = () => {
    return (
      <Stack.Navigator
        initialRouteName={isProfile ? 'Dashboard' : 'Profile'}
        screenOptions={{
          statusBarStyle: 'auto',
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Poppins-Regular.ttf',
            fontWeight: '800',
            color: theme.colors.primary,
            fontSize: 22,
          },
        }}>
        {isProfile && <Stack.Screen name="Profile" component={Profile} />}
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            title: 'What-Next',
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="VideoDetail"
          component={VideoDetail}
          options={{
            title: 'What-Next',
            animation: 'fade',
          }}
        />
      </Stack.Navigator>
    );
  };

  if (initializing) {
    return <ActivityIndicator size="large" color={theme.colors.primary} />;
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        {user ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
