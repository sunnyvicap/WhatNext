import VideoScreen from './video';
import DocumentScreen from './document';
import PodcastScreen from './posdcasts';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import TabBarView from '../../components/tabBarView';

const Tab = createMaterialTopTabNavigator();

const PlaylistScreen = (): React.JSX.Element => {
  return (
    <Tab.Navigator
      tabBar={props => <TabBarView {...props} />}>
      <Tab.Screen name="Video" component={VideoScreen} />
      <Tab.Screen name="Document" component={DocumentScreen} />
      <Tab.Screen name="Podcast" component={PodcastScreen} />
    </Tab.Navigator>
  );
};

export default PlaylistScreen;
