import React, {useEffect, useState} from 'react';
import {Button, Card, Text} from 'react-native-paper';
import axios, {AxiosError} from 'axios';
import {FlatList, ScrollView, TouchableOpacity, View} from 'react-native';
import useStyles from '../../components/themeStyle';
import {Item, YouTubeVideoResponse} from '../../model/youtubeVideo';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {YOUTUBE_APIKEY} from '../../util/keys';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const VideoScreen = (): React.JSX.Element => {
  const style = useStyles();
  const navigation = useNavigation<NativeStackNavigationProp<ScreenNames>>();
  const [youtubeData, setYoutubeData] = useState<YouTubeVideoResponse | null>(
    null,
  );

  const fetchYoutube = async () => {
    try {
      //get access toke for youtube video
      const {accessToken} = await GoogleSignin.getTokens();
      const response = await axios.get<YouTubeVideoResponse>(
        'https://youtube.googleapis.com/youtube/v3/videos?',
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            part: 'snippet,contentDetails,statistics',
            id: '104mGZ8MWmA,a_hxQZTaXKI,sTIFDyDehug,3R9yTP3hqd8',
            key: [YOUTUBE_APIKEY],
          },
        },
      ); // Handle the response data
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchYoutube().then(data => {
      if (youtubeData == null) setYoutubeData(data ? data : null);
    });
  }, [youtubeData]);

  const SkeletonCardLoader = () => {
    return (
      <Card
        style={{
          padding: 10,
          borderRadius: 12,
          backgroundColor: '#ffffff',
        }}>
        <SkeletonPlaceholder borderRadius={4} highlightColor="#EEEEEE">
          <SkeletonPlaceholder.Item flexDirection="column" height={200}>
            <SkeletonPlaceholder.Item height={200} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
        <View style={{height: 10}}></View>
        <SkeletonPlaceholder borderRadius={4} highlightColor="#EEEEEE">
          <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
            <SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item width={120} height={20} />
              <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </Card>
    );
  };

  const VideoUI = (item: Item) => {
    return (
      <View>
        <Card
          style={{
            marginBottom: 8,
            backgroundColor: '#E0F7FA',
          }}>
          <TouchableOpacity
            onPress={() => navigation.push('VideoDetail', {item})}>
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

  const SkeletoneLoader = () => {
    return (
      <ScrollView>
        <SkeletonCardLoader />
        <View
          style={{
            height: 10,
          }}
        />
        <SkeletonCardLoader />
        <View
          style={{
            height: 10,
          }}
        />
        <SkeletonCardLoader />
      </ScrollView>
    );
  };

  return (
    <View style={style.container}>
      {youtubeData ? (
        <FlatList
          data={youtubeData.items}
          indicatorStyle="default"
          renderItem={({item}) => VideoUI(item)}
        />
      ) : (
        <SkeletoneLoader />
      )}
    </View>
  );
};

export default VideoScreen;
