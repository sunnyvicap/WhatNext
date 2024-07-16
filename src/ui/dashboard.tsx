import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '../components/themeContext';
import HomeScreen from './home';
import MagsineScreen from './magsine';
import EventScreen from './event';
import {Image} from 'react-native';
import useStyles from '../components/themeStyle';
import PlaylistScreen from './video/playlist';

const Tab = createBottomTabNavigator();

const DashboardScreen = () => {
  const {theme} = useTheme();
  const style = useStyles();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.bottomTab.activeColor,
        tabBarInactiveTintColor: theme.colors.bottomTab.inactiveColor,
        tabBarLabelStyle: {
          fontFamily: 'OpenSans-Regular',
          fontSize: 10,
          fontWeight: '600',
        },
        tabBarStyle: {
          backgroundColor: theme.colors.bottomTab.backgroundColor,
          paddingBottom: 5,
          paddingTop: 5,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused, color}) => {
            const icon = focused
              ? require('../../assets/icons/home_filled.png')
              : require('../../assets/icons/home.png');
            return (
              <Image
                style={{width: 22, height: 22, tintColor: color}}
                source={icon}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Playlist"
        component={PlaylistScreen}
        options={{
          tabBarLabel: 'Playlist',
          tabBarIcon: ({focused, color}) => {
            const icon = focused
              ? require('../../assets/icons/playlist_filled.png')
              : require('../../assets/icons/playlist.png');
            return (
              <Image
                style={{width: 22, height: 22, tintColor: color}}
                source={icon}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Magsine"
        component={MagsineScreen}
        options={{
          tabBarLabel: 'Magsine',
          tabBarIcon: ({focused, color}) => {
            const icon = focused
              ? require('../../assets/icons/news_filled.png')
              : require('../../assets/icons/news.png');
            return (
              <Image
                style={{width: 22, height: 22, tintColor: color}}
                source={icon}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Event"
        component={EventScreen}
        options={{
          tabBarLabel: 'Event',
          tabBarIcon: ({color, focused}) => {
            const icon = focused
              ? require('../../assets/icons/event_filled.png')
              : require('../../assets/icons/event.png');
            return (
              <Image
                style={{width: 22, height: 22, tintColor: color}}
                source={icon}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default DashboardScreen;
