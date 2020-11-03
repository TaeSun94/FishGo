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
  SafeAreaView,
  ScrollView
} from 'react-native';

class CollectionModify extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.mainView}>
          <Text style={styles.mainText}>Fish~ Go!</Text>
        </View>
        <ScrollView>
        

        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: "#ffffff",
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainView: {
    padding:20,
    alignItems: 'center',
  },
  mainText: {
    fontWeight: 'bold',
    fontSize:40,
  }
});

export default CollectionModify;
