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
  Image,
  SafeAreaView
} from 'react-native';

class SignUpScreen extends Component {
    render() {
        return (
            <View style={{
                // backgroundColor: '#2fa9ff',
                width:'100%',
                height:'100%',
                alignItems: 'center',
            }}>
                <View style={{
                padding:20,
                alignItems: 'center',
                }}>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize:40,
                }}>Fish~ Go!</Text>
                </View>
                <Image 
                    style={{width: 100, height: 100}}
                    source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
                />
                <View style={{
                    elevation: 8,
                    backgroundColor: '#fff',
                    flex: 1,
                    margin: 20,
                    padding:10,
                    width:'90%',
                    height: '100%',
                    // justifyContent:'center',
                    alignItems:'center',
                    borderRadius: 15,
                }}>
                    <View style={{
                        padding: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={{fontSize:30}}>물고기 이름</Text>
                        <Text>물고기 잡은 날짜</Text>
                    </View>
                    <View style={{
                        padding: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <Text>물고기 타입 / </Text>
                        <Text>물고기 서식지 / </Text>
                        <Text>길이</Text>
                    </View>
                    
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
