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
  Text
} from 'react-native';

class ScreenTemplate extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello world</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: "#ffffff",
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default ScreenTemplate;
