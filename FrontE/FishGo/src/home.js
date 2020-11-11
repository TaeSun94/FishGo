/**

 \* Sample React Native App

 \* https://github.com/facebook/react-native

 *

 \* @format

 \* @flow

 */
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import RNFS from 'react-native-fs';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import fishGoIcon from './assets/fishing.png';
import searching from './assets/search.png';
import fishing from './assets/fishgo.png';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

@inject('userStore', 'fishStore')
@observer
class HomeScreen extends Component {
  addImage = () => {
    ImagePicker.showImagePicker({
      title: '',
      takePhotoButtonTitle: '사진 찍기',
      chooseFromLibraryButtonTitle: '사진첩에서 불러오기',
      cancelButtonTitle: '돌아가기'
    }, response => {
      if (response.didCancel) {
        console.log("돌아가기")
      }
      else {
        // console.log
        console.log(RNFS.DocumentDirectoryPath);
        const imagePath = `${RNFS.DocumentDirectoryPath}/${new Date().toISOString()}.jpg`.replace(/:/g, '-');
        console.log(imagePath);
        console.log('---------------------------------------------------------')
        if(Platform.OS === 'ios') {
            RNFS.copyAssetsFileIOS(response.origURL, imagePath, 0, 0)
                .then(res => {})
                .catch(err => {
                    console.log('ERROR: image file write failed!!!');
                    console.log(err.message, err.code);
                });
        } else if(Platform.OS === 'android') {
            RNFS.copyFile(response.uri, imagePath)
                .then(res => {
                  console.log(res)
                })
                .catch(err => {
                  console.log('ERROR: image file write failed!!!');
                  console.log(err.message, err.code);
                });
              }
              // RNFS.appendFile()
        console.log(response)
        this.props.navigation.navigate('Descrimination', { source: response })
      }
    })
  }

  render() {
    const { userStore, fishStore } = this.props;
    console.log()
    return (
      <SafeAreaView>
        <LinearGradient colors={['#736efe', '#5efce8']}>
        <View style={styles.mainView}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
            <View style={styles.logoView}>
              <Text style={{ fontFamily: 'Bazzi', fontSize: 45, paddingLeft: 40 }}>Welcome to FishGo</Text>
              <Text>we do our best for service</Text>
              {/* <Text style={styles.logoText}>FishGo</Text> */}
            </View>
            <View style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Image source={fishGoIcon}
                style={{
                  width: 180,
                  height: 150,
                  resizeMode: 'contain',
                }}
              />
            </View>
          </View>
          <View style={styles.subView}>
            <View style={styles.btnView}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  fishStore.getUserFishes(userStore.userInfo.user.id).then((res)=>{
                    console.log(res);
                    this.props.navigation.navigate('Collection')
                  }).catch(res=>console.log(res));
                }}
              >
                <Image source={fishing}
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'contain',
                }}/>
                <Text style={styles.btnText}>내 도감 보러가기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => this.addImage()}
              >
                <Text style={styles.btnText}>물고기 판별</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btnView}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  this.props.navigation.navigate('Map')
                }}
              >
                <Text style={styles.btnText}>지도 검색</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  fishStore.getAllFishes().then((data) => {
                    fishStore.setAllFishesInfo(data.data.data);
                    this.props.navigation.navigate('Search')
                  });
                }}
              >
                <Image source={searching}
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'contain',
                }}/>
                <Text style={styles.btnText}>물고기 정보 검색</Text>
              </TouchableOpacity>
            </View >
          </View>
          <Text style={{ fontSize: 30 }}>
            CopyRight
        </Text>
          <Text>ddd</Text>
        </View >
        </LinearGradient>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    height: '100%',
    padding: 5,
    //a5dff9
    backgroundColor: 'rgba(165,223,249,0.3)',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    // flexWrap:'wrap'
    // backgroundColor: '(0,0,0,0.5)'
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  logoView: {
    // margin: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
  },
  logoText: {
    fontSize: 80,
    fontFamily: "Bazzi",
    color: 'white'
  },
  text: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    fontFamily: "Bazzi",
    fontSize: 20
  },
  subView: {
    // marginTop: 80,
    marginLeft: 10,
    marginRight: 10,
    padding: 20,
  },
  btnView: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    width: 150,
    height: 150,
    borderColor: 'rgba(165,223,249,0.3)',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowColor: 'black',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  btnText: {
    fontSize: 20,
    // fontWeight: 'bold',
    color: 'black',
    fontFamily: "Bazzi",
  }
});



export default HomeScreen;