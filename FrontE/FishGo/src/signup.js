/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';

class SignUpScreen extends Component {
  render() {
    return (
      <View style={{
        backgroundColor: '#2fa9ff',
        width:'100%',
        height:'100%',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <View style={{
          padding:30,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={{
            fontWeight: 'bold',
            fontSize:80,
          }}>Fish~ Go!</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main:{
      backgroundColor: "#ffffff",
      flex:1,
          alignItems: 'center',
          justifyContent: 'center',
  }
});

export default SignUpScreen;
