import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon, { Icons } from '../../component/Icons';
import Colors from '../../constant/Colors';
import * as Animatable from 'react-native-animatable';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators, HeaderStyleInterpolators } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import HomePage from '../../screens/tabsScreens/home/home';
import { NavigationUrl } from '../../strings/navigationUrl';
import IonicIcons from 'react-native-vector-icons/Ionicons';
import { AppStyles } from '../../AppStyles';
import CreateUser from '../../screens/tabsScreens/home/createUser/createuser';





const Stack = createStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const getTabBarVisibility = route => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
  if (routeName == NavigationUrl.createOrder || routeName == NavigationUrl.multipleOrder || routeName == NavigationUrl.orderDetails || routeName == 'CreditUsers' || routeName == 'CreditUsersDetails' || routeName == 'StocksList' || routeName == 'ViewStockHistory' || routeName == 'SubCategory') {
    return 'none'
  } else {
    return 'flex'
  }
}

const CustomOptionWithIcon = (route, item) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
  return {
    headerShown: item.headerShown,
    title: item.title,
    headerStyle: {
      backgroundColor: Colors.primary,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    tabBarStyle: {
      display: getTabBarVisibility(route)
    },
    tabBarShowLabel: false,
    tabBarButton: (props) => <TabButton {...props} item={item} />
  }

}



const HomeStack = () => <Stack.Navigator initialRouteName={NavigationUrl.home}
  screenOptions={{

    transitionSpec: {
      open: config,
      close: config,
    },
    ...TransitionPresets.SlideFromRightIOS

  }}

>
  <Stack.Group
    screenOptions={{
      headerStyle: {
        backgroundColor: AppStyles.color.tint,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen name={NavigationUrl.home} component={HomePage} options={{
      headerShown: false,
    }} />
    <Stack.Screen name={NavigationUrl.creatUser} options={{ title: "New User" }} component={CreateUser} />

  </Stack.Group>
</Stack.Navigator>


const TabArr = [
  { route: 'HomeStack', title: 'HomeStack', headerShown: false, type: Icons.Ionicons, activeIcon: 'home', inActiveIcon: 'home-outline', component: HomeStack },

  { route: 'UserList', title: 'HomeStack', headerShown: false, type: Icons.Ionicons, activeIcon: 'aperture', inActiveIcon: 'aperture-outline', component: HomeStack },

  { route: 'Profile', title: 'HomeStack', headerShown: false, type: Icons.Ionicons, activeIcon: 'grid', inActiveIcon: 'grid-outline', component: HomeStack },

  { route: 'Profile1', title: 'HomeStack', headerShown: false, type: Icons.Ionicons, activeIcon: 'people', inActiveIcon: 'people-outline', component: HomeStack },
];

const Tab = createBottomTabNavigator();

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({ 0: { scale: .5, rotate: '0deg' }, 1: { scale: 1.5, rotate: '360deg' } });
    } else {
      viewRef.current.animate({ 0: { scale: 1.5, rotate: '360deg' }, 1: { scale: 1, rotate: '0deg' } });
    }
  }, [focused])

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View
        ref={viewRef}
        duration={1000}
        style={styles.container}>
        <Icon type={item.type} size={20} name={focused ? item.activeIcon : item.inActiveIcon} color={focused ? AppStyles.color.tint : AppStyles.color.tint} />
      </Animatable.View>
    </TouchableOpacity>
  )
}

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          // height: 60,
          // position: 'absolute',
          // right: 16,
          // left: 16,
          borderRadius: 20
        }
      }} >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen key={index} name={item.route} component={item.component}

            options={({ route }) => CustomOptionWithIcon(route, item)}
          />
        )
      })}
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})