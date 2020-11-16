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
  ActivityIndicator,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import fishGoIcon from './assets/fishing.png';
import searching from './assets/search.png';
import fishing from './assets/collection.png';
import discriminating from './assets/discriminate.png';
import searchingMap from './assets/mapcon.png';

@inject('userStore', 'fishStore')
@observer
class HomeScreen extends Component {
  state = {
    getData: true
  }
  addImage = () => {
    const { fishStore } = this.props;
    ImagePicker.showImagePicker({
      title: '',
      takePhotoButtonTitle: '사진 찍기',
      chooseFromLibraryButtonTitle: '사진첩에서 불러오기',
      cancelButtonTitle: '돌아가기'
    }, response => {
      this.setState({ getData: false })
      if (response.didCancel) {
        this.setState({ getData: true })
        console.log("돌아가기")
      }
      else {
        fishStore.sendDiscrimination(response).then((data) => {
          // console.log(data);
          this.setState({ getData: true })
          fishStore.setDiscriminateFish(data.data.data.predictions);
          this.props.navigation.navigate('Descrimination', { source: response })
        }).catch((res) => {
          console.log(res)
        })
        return (
          <View>
            <ActivityIndicator size="large" />
          </View>
        )
      }
    })
  }
  render() {
    const { userStore, fishStore } = this.props;
    console.log()
    if (this.state.getData) {
      return (
        <SafeAreaView>
          {/* <LinearGradient colors={['#736efe', '#5efce8']}> */}
          <View style={styles.mainView}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingTop: 5,
              flex: 2,
            }}>
              <View style={styles.logoView}>
                <Text style={{ fontFamily: 'Bazzi', fontSize: 45, paddingLeft: 30 }}>Welcome to FishGo</Text>
                <Text style={{ fontFamily: 'Bazzi', fontSize: 20 }}>FishGo에 오신걸 환영합니다.</Text>
              </View>
              <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingRight:20
              }}>
                <Image source={fishGoIcon}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: 'contain'
                  }}
                />
              </View>
            </View>
            <View style={styles.subView}>
              <View style={styles.btnView}>
                <View style={styles.btnGrid}>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                      fishStore.getUserFishes(userStore.userInfo.user.id).then((res) => {
                        console.log(res.data.data)
                        fishStore.setUserFishes(res.data.data.fishes);
                        this.props.navigation.navigate('Collection')
                      }).catch(res => console.log(res));
                    }}
                  >
                    <Image source={fishing}
                      style={styles.iconImg} />
                    <Text style={styles.btnText}>내 도감 보러가기</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.btnGrid}>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => this.addImage()}
                  >
                    <Image source={discriminating}
                      style={styles.iconImg} />
                    <Text style={styles.btnText}>물고기 판별</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.btnView}>
                <View style={styles.btnGrid}>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                      this.props.navigation.navigate('Map')
                    }}
                  >
                    <Image source={searchingMap}
                      style={styles.iconImg} />
                    <Text style={styles.btnText}>지도 검색</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.btnGrid}>
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
                      style={styles.iconImg} />
                    <Text style={styles.btnText}>물고기 정보 검색</Text>
                  </TouchableOpacity>
                </View>
              </View >
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontFamily: 'Bazzi', fontSize: 25, }}>Contact Us</Text>
              <Text style={{ fontFamily: 'Bazzi', fontSize: 15, paddingTop: 10 }}>Email : tyzlddy@naver.com, Phone: 010-5289-5619</Text>
            </View>
          </View>
          {/* </LinearGradient> */}
        </SafeAreaView>
      )
    }
    else {
      return (
        <SafeAreaView>
          <View>
            <ActivityIndicator size='large' />
          </View>
        </SafeAreaView>
      )
    }
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
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex:1
  },
  btn: {
    width: "90%",
    height: "90%",
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
  },
  iconImg: {
    width: "90%",
    height: "80%",
    resizeMode: 'contain',
  },
  btnGrid: { alignItems: 'center', justifyContent: 'center', flex: 1 }
});



export default HomeScreen;