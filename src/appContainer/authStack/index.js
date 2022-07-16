import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Login from '../../screens/auth/login';
// import SignUp from '../../screens/auth/signup/register';
import Forgotpassword from '../../screens/auth/forgotPassword';
import Login from '../../screens/auth/login/login';
import SignUp from '../../screens/auth/signup/register';

const Stack = createNativeStackNavigator();
const AuthStack = () =>
  <Stack.Navigator initialRouteName="Login">
    <Stack.Group
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Forgot" component={Forgotpassword} />
    </Stack.Group>
  </Stack.Navigator>


export default AuthStack;