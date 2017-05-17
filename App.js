import React from 'react';
import { StyleSheet, Navigator, View } from 'react-native';

import Login from './src/components/login';
import MainPage from './src/components/mainPage';

import { StackNavigator } from 'react-navigation';

const App = StackNavigator({
  Login: { screen: Login },
  MainPage: { screen: MainPage },
});


export default App;
