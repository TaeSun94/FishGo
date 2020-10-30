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
  TouchableOpacity,
  Button
} from 'react-native';

class HomeScreen extends Component {
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
        <View style={{
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <TouchableOpacity style={{
            width: 120,
            height: 120,
            borderColor: 'white',
            borderWidth:2,
            marginRight: 50,
            alignItems:'center',
            justifyContent: 'center',
          }}>
            <Text style={styles.btn}>내 도감 보러가기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            width: 120,
            height: 120,
            borderColor: 'white',
            borderWidth:2,
            alignItems:'center',
            justifyContent: 'center',
          }}>
            <Text style={styles.btn}>물고기 판별</Text>
          </TouchableOpacity>
        </View>
        <View style={{
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <TouchableOpacity style={{
            width: 120,
            height: 120,
            borderColor: 'white',
            borderWidth:2,
            marginRight: 50,
            alignItems:'center',
            justifyContent: 'center',
          }}>
            <Text style={styles.btn}>지도 검색</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            width: 120,
            height: 120,
            borderColor: 'white',
            borderWidth:2,
            alignItems:'center',
            justifyContent: 'center',
          }}>
            <Text style={styles.btn}>물고기 정보 검색</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign:'center'
  }
});

export default HomeScreen;
