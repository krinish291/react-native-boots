import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useNavigation, CommonActions} from '@react-navigation/native';
import UserService from '../../Services/UserService';

const Initial = () => {
  const navigation = useNavigation();

  useEffect(() => {
    isUserLogin();
  }, []);

  const isUserLogin = async () => {
    const isLoggedIn = await UserService.isLoggedIn();
    if (!isLoggedIn) {
      goToNextScreen('Login');
      return;
    }
    goToNextScreen('Home');
  };

  const goToNextScreen = async (nextScreen) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: nextScreen}],
      }),
    );
  };
  return <View />;
};

export default Initial;
