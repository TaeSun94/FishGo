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
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image
} from 'react-native';
import fish from '../assets/밝음.png';
import fish_dark from '../assets/암흑.png'
class Collection extends Component {
  render() {
    return (
      <SafeAreaView style={{
        // backgroundColor: '#2fa9ff',
        width:'100%',
        height:'100%',
        display:'flex',
      }}>
        <ScrollView>
        <View 
          style={{
            // width:'100%',
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            flexWrap:'wrap'
          }}
        >
          <TouchableOpacity
          onPress={()=>{
            this.props.navigation.navigate('Collection_detail',{
                check: true,
                fish_name:"아무 물고기",
                uf_date: "2020-11-03",
                fish_type: "해수어",
                fish_home: "동해 어느 바닷가",
                uf_length: "13.6cm",
                fish_feed: "지렁이",
                fish_prohibition: "11cm이하 포획금지",
                fish_receipe: "회, 찜, 탕",
                fish_image: "https://reactnative.dev/img/tiny_logo.png"
              })
            }}
            style={styles.btn}
          >
            <Image source={fish}
              style={{
                width:180,
                height:150,
                resizeMode: 'contain'
              }}
            />
            <Text>물고기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={()=>{
              this.props.navigation.navigate('Collection_detail',{
                check:false
              })
            }}
          >
            <Image source={fish_dark}
              style={{
                width:180,
                height:150,
                resizeMode: 'contain'
              }}
            />
            <Text>물고기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={()=>{
              this.props.navigation.navigate('Collection_detail',{
                check:false
              })
            }}
          >
            <Image source={fish_dark}
              style={{
                width:180,
                height:150,
                resizeMode: 'contain'
              }}
            />
            <Text>물고기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={()=>{
              this.props.navigation.navigate('Collection_detail',{
                check:false
              })
            }}
          >
            <Image source={fish_dark}
              style={{
                width:180,
                height:150,
                resizeMode: 'contain'
              }}
            />
            <Text>물고기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={()=>{
              this.props.navigation.navigate('Collection_detail',{
                check:false
              })
            }}
          >
            <Image source={fish_dark}
              style={{
                width:180,
                height:150,
                resizeMode: 'contain'
              }}
            />
            <Text>물고기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={()=>{
              this.props.navigation.navigate('Collection_detail',{
                check:false
              })
            }}
          >
            <Image source={fish_dark}
              style={{
                width:180,
                height:150,
                resizeMode: 'contain'
              }}
            />
            <Text>물고기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={()=>{
              this.props.navigation.navigate('Collection_detail',{
                check:false
              })
            }}
          >
            <Image source={fish_dark}
              style={{
                width:180,
                height:150,
                resizeMode: 'contain'
              }}
            />
            <Text>물고기</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  main:{
      backgroundColor: "#ffffff",
      flex:1,
          alignItems: 'center',
          justifyContent: 'center',
  },
  btn:{
    width: 180,
    height: 180,
    margin: 5,
    borderColor: 'white',
    borderWidth:2,
    marginRight: 10,
    alignItems:'center',
    justifyContent: 'center',
  }
});

export default Collection;
