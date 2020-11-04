/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

//상태관리
import { Provider }from 'mobx-react';
import stores from './store/index';


//네비게이션
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/home';
import SignUpScreen from './src/signup';
import LoginScreen from './src/login';
import CollectionDetailScreen from './src/Collection/collection_detail'
import CollectionScreen from './src/Collection/collection';
import CollectionInsertScreen from './src/Collection/collection_insert';
import DescriminationScreen from './src/Discrimination/discrimination';
const Stack = createStackNavigator();

class App extends Component{
  render (){
    return (
      <Provider {...stores}>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Login"
            screenOptions={{
              headerShown:false
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Signup" component={SignUpScreen}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Collection_detail" component={CollectionDetailScreen}/>
            <Stack.Screen name="Collection" component={CollectionScreen}/>
            <Stack.Screen name="Collection_insert" component={CollectionInsertScreen}/>
            <Stack.Screen name="Descrimination" component={DescriminationScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
};

const styles = StyleSheet.create({
  
});

export default App;
