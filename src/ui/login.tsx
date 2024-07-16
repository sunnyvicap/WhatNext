import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Button,
  Checkbox,
  Dialog,
  Divider,
  Portal,
  ProgressBar,
  Snackbar,
  Text,
} from 'react-native-paper';
import {useTheme} from '../components/themeContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import {WEB_CLIENT_ID} from '../util/keys';
import useStyles from '../components/themeStyle';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {setGoogleAuthToken} from '../util/preferances';

const LoginScreen = (): React.JSX.Element => {
  const style = useStyles();
  const {theme} = useTheme();
  const [progressText, setProgressText] = useState('Please wait...');
  const [conditionChecked, setConditionChecked] = useState(false);
  const [isSnackbarVisible, setSnackbarVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      if (!conditionChecked) {
        setSnackbarVisible(true);
        return;
      }
      setLoading(true);
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      const userInfo = await GoogleSignin.signIn();
      setProgressText('Verifying...');

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );
      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      setLoading(false);
      setErrorVisible(true);
    }
  };

  return (
    <View style={style.container}>
      <Portal>
        <Dialog visible={errorVisible} onDismiss={() => setErrorVisible(false)}>
          <Dialog.Content>
            <Text style={style.titleXSmall}>
              Failed to login, Please check your internet connection
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => console.log('Ok')}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View style={{flex: 1, alignItems: 'stretch'}}>
        <View style={{flex: 0.5, alignItems: 'center'}}>
          <Text style={style.titleXXLarge}>Get Started!</Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Poppins-Regular',
              textAlign: 'center',
              fontWeight: '500',
            }}>
            Welcome to tcf, The destination to enhance your career.
          </Text>
          <Image
            source={require('../../assets/images/login-illu.png')}
            style={{height: 300, width: 300}}
          />
        </View>

        <View style={{flex: 0.5, alignItems: 'stretch', marginTop: 50}}>
          <View style={{flexDirection: 'row'}}>
            <Checkbox
              status={conditionChecked ? 'checked' : 'unchecked'}
              onPress={() => {
                setConditionChecked(!conditionChecked);
              }}
            />
            <View style={{flexDirection: 'row', flex: 1, flexWrap: 'wrap'}}>
              <Text
                style={{...style.titleSmall, fontFamily: 'Poppins-Regular'}}>
                Please read{' '}
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    ...style.titleSmall,
                    fontFamily: 'Poppins-Regular',
                    color: theme.colors.link,
                  }}>
                  Terms & Conditions{' '}
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  ...style.titleSmall,
                  fontFamily: 'Poppins-Regular',
                }}>
                and{' '}
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    ...style.titleSmall,
                    fontFamily: 'Poppins-Regular',
                    color: theme.colors.link,
                  }}>
                  Privacy Policy
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {isLoading ? (
            <View style={{marginTop: 16, alignContent: 'stretch'}}>
              <ProgressBar
                color={theme.colors.primary}
                progress={0.5}
                indeterminate={true}
              />
              <Text
                style={{
                  ...style.titleMedium,
                  textAlign: 'center',
                  marginTop: 8,
                }}>
                {progressText}
              </Text>
            </View>
          ) : (
            <Button
              icon={({color, size}) => (
                <FontAwesome5 name="google" color={color} size={size} />
              )}
              mode="elevated"
              rippleColor={theme.colors.accent}
              labelStyle={style.buttonLabel}
              onPress={() => handleGoogleSignIn()}
              style={{
                backgroundColor: theme.colors.primary,
                marginTop: 8,
              }}
              contentStyle={{
                alignSelf: 'stretch',
                padding: 8,
              }}>
              Continue with google
            </Button>
          )}

          <Snackbar
            visible={isSnackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
            style={{
              borderRadius: 10,
              backgroundColor: theme.colors.error,
            }}
            duration={3000}
            action={{
              label: 'Okay',
              labelStyle: {...style.titleSmall, color: theme.colors.white},
              onPress: () => {
                // Do something
              },
            }}>
            Please accept terms & Conditions.
          </Snackbar>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
