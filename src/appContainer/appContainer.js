import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from './authStack'
import Tabs from './tabNavigation/tabs'
import useSession from '../appContext/useSession';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toaster from '../component/toaster/toaster';
import SplashScreen from '../screens/splashScreen/splashScreen';
import NetInfo from "@react-native-community/netinfo";
import Api from '../utils/Api';
import VersionInfo from 'react-native-version-info';
import { Linking } from 'react-native';
import SubscribeUser from '../component/subscriptionUI/subscriptionUI';


const Stack = createNativeStackNavigator();

const AppContainer = ({ userInfo }) => {
  const [isLodding, setIsLodding] = useState(true);

  const { session, setSession } = useSession();

  useEffect(() => {
    setTimeout(() => {
      // setIsLodding(true)
      setIsLodding(false)
    }, 5000);
    getDataFromAsync()
  }, []);



  const getDataFromAsync = async () => {
    let user = await AsyncStorage.getItem('UserInfo');
    let a = JSON.parse(user);
    let userInfo = a.userInfo;
    console.log(userInfo, 'userInfo');
    console.log(user, 'user');
    debugger
    if (userInfo && userInfo !== '') {
      setSession({
        ...session,
        token: userInfo.userID,
        userInfo: userInfo,
        id: userInfo.userID,
      });
      setIsLodding(false)
    } else {
      setIsLodding(false)

    }
  }

  return (
    <NavigationContainer>
      {
        isLodding
          ?
          <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="slpash" component={SplashScreen} />
          </Stack.Navigator> :
          1 === 1 ?
            < Tabs /> : <AuthStack />
      }
    </NavigationContainer>
  );
};
export default AppContainer;