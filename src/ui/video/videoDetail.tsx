import React from 'react';
import {Card, Text} from 'react-native-paper';
import {Item} from '../../model/youtubeVideo';
import {View, TouchableOpacity} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import useStyles from '../../components/themeStyle';
import {useRoute} from '@react-navigation/native';

const VideoDetail = (): React.JSX.Element => {
  const style = useStyles();
  const route = useRoute();
  const { item  } = route.params && route.params;

  const VideoUI = () => {
    return (
      <View>
        <Card
          style={{
            marginBottom: 8,
            backgroundColor: '#E0F7FA',
          }}>
          <TouchableOpacity onPress={() => console.log('hello')}>
            <Card.Cover
              source={{uri: item.snippet.thumbnails.high.url, height: 200}}
            />
          </TouchableOpacity>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={{...style.titleMedium, padding: 6}}>
            {item.snippet.description}
          </Text>
          <Text
            numberOfLines={3}
            ellipsizeMode="tail"
            style={{...style.titleSmall, padding: 6}}>
            {item.snippet.description}
          </Text>
        </Card>
        <FontAwesome5Icon
          name="play"
          size={40}
          style={{
            position: 'absolute',
            right: '50%',
            top: 80,
          }}
        />
      </View>
    );
  };

  return <Text>Hell0</Text>;
};

export default VideoDetail;
