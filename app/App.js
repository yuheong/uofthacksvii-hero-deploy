import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from './HomeScreen';
import AidScreen from './AidScreen';
import LearnScreen from './LearnScreen';
import { Ionicons } from '@expo/vector-icons';

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  'CPR/AED': AidScreen,
  Learn: LearnScreen,
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      if (routeName === 'Home') {
        iconName = 'ios-alert'
      } else if (routeName === 'CPR/AED') {
        iconName = 'ios-medical'
      } else if (routeName === 'Learn') {
        iconName = 'ios-book'
      }

      // You can return any component that you like here!
      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
})

const AppContainer = createAppContainer(TabNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}