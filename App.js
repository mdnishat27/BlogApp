import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {AuthContext, AuthProvider} from './src/providers/AuthProvider';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './src/screens/HomeScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';
import PostScreen from './src/screens/PostScreen';

const AuthStack = createStackNavigator();
const HomeTab = createMaterialBottomTabNavigator();
const AppDrawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const NotificationStack = createStackNavigator();

const AppDrawerScreen = () => {
  return (
    <AppDrawer.Navigator>
      <AppDrawer.Screen
        name="Home"
        component={HomeTabScreen}
        options={{headerShown: false}}
      />
      <AppDrawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
    </AppDrawer.Navigator>
  );
};

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name={'Post'}
        component={PostScreen}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
};

const NotificationStackScreen = () => {
  return (
    <NotificationStack.Navigator initialRouteName="Notification">
      <NotificationStack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{headerShown: false}}
      />
      <NotificationStack.Screen
        name={'Post'}
        component={PostScreen}
        options={{headerShown: false}}
      />
    </NotificationStack.Navigator>
  );
};

const HomeTabScreen = (props) => {
  return (
    <HomeTab.Navigator initialRouteName="Home">
      <HomeTab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) =>
            focused ? (
              <Entypo name="home" color="white" size={26} />
            ) : (
              <SimpleLineIcons name="home" color="white" size={22} />
            ),
        }}
      />

      <HomeTab.Screen
        name="Notification"
        component={NotificationStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Notifications',
          tabBarIcon: ({focused}) =>
            focused ? (
              <Ionicons name="ios-notifications" size={26} color="white" />
            ) : (
              <Ionicons
                name="ios-notifications-outline"
                size={22}
                color="white"
              />
            ),
        }}
      />
    </HomeTab.Navigator>
  );
};

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator initialRouteName="SignIn">
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
};

function App() {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {(auth) => (
          <NavigationContainer>
            {auth.IsLoggedIn ? <AppDrawerScreen /> : <AuthStackScreen />}
          </NavigationContainer>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}

export default App;
