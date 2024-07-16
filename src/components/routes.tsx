import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {Item} from '../model/youtubeVideo';

export type RootStackParamList = {
  Login: any;
  Profile: any;
  Dashboard: any;
  VideoDetail: {
    item: Item;
  };
};

export type BottomStackParamList = {
    Login: any;
    Profile: any;
    Dashboard: any;
    VideoDetail: {
      item: Item;
    };
  };

export type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList, 'Login'
>;


export type ProfileScreenProps = NativeStackScreenProps<
  RootStackParamList, 'Profile'
>;

export type DashboardScreenProps = NativeStackScreenProps<
  RootStackParamList, 'Dashboard'
>;

export type VideoDetailScreenProps = NativeStackScreenProps<
  RootStackParamList, 'Dashboard'
>;