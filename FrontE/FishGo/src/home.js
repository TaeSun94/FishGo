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
import fishing from './assets/collection.png';
import discriminating from './assets/discriminate.png';
import searchingMap from './assets/mapcon.png';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

@inject('userStore', 'fishStore')
@observer
class HomeScreen extends Component {
  addImage = () => {
    const { fishStore } = this.props;
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
        fishStore.sendDiscrimination(response).then((data)=>{
          // console.log(data);
          fishStore.setDiscriminateFish(data.data.data.predictions);
          this.props.navigation.navigate('Descrimination', { source: response })
        }).catch((res)=>{
          console.log(res)
        })
      }
    })
  }

  render() {
    const { userStore, fishStore } = this.props;
    console.log()
    return (
      <SafeAreaView>
        <View style={styles.mainView}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingTop: 5
          }}>
            <View style={styles.logoView}>
              <Text style={{ fontFamily: 'Bazzi', fontSize: 45, paddingLeft: 40 }}>Welcome to FishGo</Text>
              <Text style={{ fontFamily: 'Bazzi', fontSize: 20, marginLeft: 18, paddingTop:10 }}>FishGo에 오신걸 환영합니다.</Text>
            </View>
            <View style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Image source={fishGoIcon}
                style={{
                  width: 190,
                  height: 160,
                  resizeMode: 'contain',
                  marginLeft: -36
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
                    fishStore.setUserFishes(res.data.data.fishes);
                    this.props.navigation.navigate('Collection')
                  }).catch(res=>console.log(res));
                }}
              >
                <Image source={fishing}
                style={{
                  width: 120,
                  height: 120,
                  resizeMode: 'contain',
                }}/>
                <Text style={styles.btnText}>내 도감 보러가기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => this.addImage()}
              >
                <Image source={discriminating}
                style={{
                  width: 120,
                  height: 120,
                  resizeMode: 'contain',
                }}/>
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
                <Image source={searchingMap}
                style={{
                  width: 120,
                  height: 120,
                  resizeMode: 'contain',
                }}/>
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
                  width: 120,
                  height: 120,
                  resizeMode: 'contain',
                }}/>
                <Text style={styles.btnText}>물고기 정보 검색</Text>
              </TouchableOpacity>
            </View >
          </View>
          <View style={{paddingLeft: 40, paddingTop: 20}}>
              <Text style={{ fontFamily: 'Bazzi', fontSize: 25,  }}>Contact Us</Text>
              <Text style={{ fontFamily: 'Bazzi', fontSize: 15, paddingTop:10 }}>Email : tyzlddy@naver.com, Phone: 010-5289-5619</Text>
            </View>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    height: '100%',
    // padding: 5,
    backgroundColor: 'rgba(172,209,233,0.4)',
  },
  logoView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
  },
  text: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    fontFamily: "Bazzi",
    fontSize: 20
  },
  subView: {
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 5,
  },
  btnView: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    width: 175,
    height: 175,
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
    color: 'rgba(0,0,0,0.6)',
    fontFamily: "Bazzi",
  }
});



export default HomeScreen;