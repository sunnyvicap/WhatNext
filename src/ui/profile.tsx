import {Image, View} from 'react-native';
import {Button, Divider, Text} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useTheme} from '../components/themeContext';
import useStyles from '../components/themeStyle';
import React, {useState} from 'react';
import TextInputOutlineStyle from '../components/textInputOutline';
import {useNavigation} from '@react-navigation/native';
import {setIsProfileCompleted} from '../util/preferances';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScreenNames} from '../App';

const Profile = (): React.JSX.Element => {
  let fireUser = auth().currentUser;
  const theme = useTheme().theme;
  const style = useStyles();
  const navigate = useNavigation<NativeStackNavigationProp<ScreenNames>>();

  const [address, setAddress] = useState(
    '409, Bld no. 409, MMRDA colony, Chembur (e), Mumbai - 400072',
  );
  const [linkedinId, setLinkedInId] = useState(
    'https://www.linkedin.com/in/sunny-vishwakarma-1b102212a/',
  );

  const ProfileIcon = (): React.JSX.Element => {
    if (fireUser && fireUser.photoURL) {
      return (
        <Image
          source={{
            uri: fireUser?.photoURL,
          }}
          resizeMode={'cover'}
          style={{width: 80, height: 80, borderRadius: 80 / 2}}
        />
      );
    }

    return (
      <View
        style={{
          backgroundColor: theme.colors.primary,
          width: 100,
          height: 100,
          borderRadius: 100 / 2,
          alignItems: 'center',
        }}>
        <FontAwesome5 name="user" color={theme.colors.white} size={70} />
      </View>
    );
  };

  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'column',
        marginHorizontal: 16,
        marginVertical: 8,
        flex: 1,
      }}>
      <ProfileIcon />
      <Divider
        style={{
          height: 18,
        }}
      />
      <Text style={style.titleMedium}>{fireUser?.displayName}</Text>
      <Text style={style.titleSmall}>{fireUser?.email}</Text>
      <Divider
        style={{
          height: 40,
        }}
      />
      <View style={{alignSelf: 'stretch'}}>
        <TextInputOutlineStyle
          placeholder="Ex. mumbai"
          textContentType="addressCity"
          value={address}
          rightIcon="map-marker-outline"
          inputMode="text"
          onChangeText={text => setAddress(text)}
        />

        <Divider
          style={{
            height: 8,
            backgroundColor: '#00000000',
          }}
        />

        <TextInputOutlineStyle
          placeholder="Ex. mumbai"
          textContentType="URL"
          value={linkedinId}
          rightIcon="linkedin"
          inputMode="url"
          inputColor="#0D47A1"
          onChangeText={text => setLinkedInId(text)}
        />
      </View>

      <Button
        mode="elevated"
        rippleColor={theme.colors.accent}
        labelStyle={style.buttonLabel}
        onPress={() => {
          setIsProfileCompleted('true');
          navigate.replace('Dashboard');
        }}
        style={{
          position: 'absolute',
          bottom: 10,
          right: 0,
          left: 0,
          backgroundColor: '#006064',
        }}
        contentStyle={{
          alignSelf: 'stretch',
          padding: 8,
        }}>
        Update Profile
      </Button>
    </View>
  );
};

export default Profile;
