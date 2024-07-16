import AsyncStorage from '@react-native-async-storage/async-storage';

const isProfileCompletedKey = 'isProfileCompleted';
const googleAuthToken = 'googleAuthToken';

export const isProfileCompleted = async () => {
  try {
    return await AsyncStorage.getItem(isProfileCompletedKey);
  } catch (error) {
    console.log(error);
  }
};

export const setIsProfileCompleted = async (value: string) => {
  try {
    await AsyncStorage.setItem(isProfileCompletedKey, value);
  } catch (e) {
    console.log(e);
  }
};

export const setGoogleAuthToken = async (value: string) => {
  try {
    await AsyncStorage.setItem(googleAuthToken, value);
  } catch (e) {
    console.log(e);
  }
}

export const getGoogleAuthToken = async () => {
  try {
    return await AsyncStorage.getItem(googleAuthToken);
  } catch (e) {
    console.log(e);
  }
}