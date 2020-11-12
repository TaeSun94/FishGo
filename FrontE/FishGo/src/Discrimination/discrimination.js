/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import { inject, observer } from 'mobx-react';
import React, { Component, useEffect } from 'react';
import Geolocation from 'react-native-geolocation-service';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Predictions from './predictList';

@inject('fishStore')
@observer
class discrimination extends Component {

  state = {
    avatar: null,
    check: false,
    lat: '',
    lng: '',
    image: null,
  }

  addImage = () => {
    ImagePicker.showImagePicker({
      title: '',
      takePhotoButtonTitle: '사진 찍기',
      chooseFromLibraryButtonTitle: '사진첩에서 불러오기',
      cancelButtonTitle: '돌아가기'
    }, response => {
      this.setState({
        avatar: response.uri,
        check: true
      })
    })
  }
  getCoord() {
    useEffect = () => {
      Geolocation.getCurrentPosition(
        position => {
          const { lat, lng } = position.coords;
          this.setState({ lat: lat, lng: lng });
        },
        error => {
          console.log(error);
        }
      )
    };
  }

  render() {
    // const setHook = this.useEffect = () => {
      //   Geolocation.getCurrentPosition(
        //     position => {
          //       const { lat, lng } = position.coords;
          //       this.setState({ lat: lat, lng: lng });
          //     },
          //     error => {
            //       console.log(error);
            //     }
            //   )
            // };
            const { fishStore } = this.props;
            const { params } = this.props.route;
    if (!this.state.check) {
      return (
        <View style={styles.container}>
          <Image
            source={{ uri: params.source.uri }}
            style={styles.avatar}
          />
          <ScrollView>
            <View
              style={{
                // flexDirection:'row',
                justifyContent: 'flex-start',
                elevation: 10,
                padding: 10,
                margin: 10,
                backgroundColor: '#fff',
                borderRadius: 10
              }}
            >
              <Text style={{ fontSize: 20 }}>예측 정보 List</Text>
              <Predictions predicts={fishStore.predictFish}/>
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: "space-around" }}
            >
              <Button
                title="다시 찍기"
                onPress={() => this.addImage()}
              />
              <Button
                title="등록 하기"
                onPress={() => {
                  // convertURI(params.pic);
                  fishStore.sendDiscrimination(params.source).then((data)=>{
                    console.log(data);
                  }).catch(res=>console.log(res))
                  // this.props.navigation.navigate('Collection_insert')
                  console.log(this.state)
                }}
              />
            </View>
          </ScrollView>
        </View>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <Image
            source={{ uri: this.state.avatar }}
            style={styles.avatar}
          />
          <ScrollView>
            <View
              style={{
                // flexDirection:'row',
                justifyContent: 'flex-start',
                elevation: 10,
                padding: 10,
                margin: 10,
                backgroundColor: '#fff',
                borderRadius: 10
              }}
            >
              <Text style={{ fontSize: 20 }}>물고기 정보</Text>
              <Text>이름 : 물고기이름</Text>
              <Text>어종 타입 : 무슨타입일까</Text>
              {/* <Text>{params.fish_type}</Text> */}
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: "space-around" }}
            >
              <Button
                title="다시 찍기"
                onPress={() => this.addImage()}
              />
              <Button
                title="등록 하기"
                onPress={() => {
                  // this.props.navigation.navigate('Collection_insert')
                }}
              />
            </View>
          </ScrollView>
        </View>
      )
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:'center',
    // alignItems: 'center',
    // backgroundColor: '#e4ab26'
  },
  avatar: {
    width: "95%",
    height: "50%",
    margin: 10,
    resizeMode: 'stretch',
    borderRadius: 10
  }
});

export default discrimination;
