import React from 'react';
import { StyleSheet, Navigator, View } from 'react-native';

import Login from './src/components/login';
import MainPage from './src/components/mainPage';
import Menu from './src/components/menu';

import { StackNavigator } from 'react-navigation';

const App = StackNavigator({
  Login: { screen: Login },
  MainPage: { screen: MainPage },
  Menu: { screen: Menu }
});


export default App;
