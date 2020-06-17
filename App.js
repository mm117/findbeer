import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/Home/HomeScreen';
import SearchTabNavigator from './components/Search/SearchTabNavigator';
import { NavigationContainer } from '@react-navigation/native';
import * as firebase from 'firebase';
var firebaseConfig = {
  apiKey: "AIzaSyAB7eEWqR1uQ2OVtzYIqGt1nxLSBo9khGQ",
  authDomain: "findbeer-84344.firebaseapp.com",
  databaseURL: "https://findbeer-84344.firebaseio.com",
  projectId: "findbeer-84344",
  storageBucket: "findbeer-84344.appspot.com",
  messagingSenderId: "1035471426164",
  appId: "1:1035471426164:web:4d1e50f6acaf756056f721",
  measurementId: "G-2PC5EJX59G"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const Stack = createStackNavigator();
const App = () =>{
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
        <Stack.Screen  name="Home" component={HomeScreen} />
        <Stack.Screen name="SearchTabNavigator" component={SearchTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;





