/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Button,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
/*
이름, 타입, 서식지, 먹이, 어획 금지 정보, 이미지, 먹을 수 있는지, 조리법
*/
@inject('userStore', 'fishStore')
@observer
class CollectionInsertScreen extends Component {
  state = {
    length: 0
  }

  setLen = (len) => {
    this.setState({ length: len })
  }

  eating = (data) => {
    if (data)
      return "식용 가능 합니다."
    else
      return "식용 불가능 합니다."
  }

  checkType = (data) => {
    if (data == 1) {
      return "해수어"
    }
    else {
      return "민어"
    }
  }

  render() {
    const { params } = this.props.route;
    const { userStore, fishStore } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.mainView}>
            <View style={styles.subcontentView}>
              <View>
                <Text style={{ fontSize: 50, fontFamily: 'Bazzi' }}>
                  도감 등록
              </Text>
              </View>
            </View>
            <Image
              style={{ width: 340, height: 200, resizeMode: 'contain' }}
              source={{ uri: params.data.img.uri }}
            />
            <View style={{
              marginLeft: -10,
              paddingBottom: 5
            }}>
              <Text style={{ fontFamily: 'Bazzi', fontSize: 30, }}> 기본 정보</Text>
            </View>
            <View style={styles.subcontentView}>
              <View style={{
                flexDirection: "column",
                alignItems: 'center',
              }}>
                <Text style={{ fontFamily: 'Bazzi', fontSize: 22 }}> 이 름 : {params.data.fish.name}</Text>
                
              </View>
              <Text style={{ fontFamily: 'Bazzi', fontSize: 22 }}> 종 류 : {this.checkType(params.data.fish.fish_type)} </Text>
              <View style={{
                flexDirection: "column",
                alignItems: 'center',
              }} />
            </View>
            <View style={styles.sub2ContentView}>
              <View style={{
                paddingTop: 5
              }}>
                <Text style={{ fontFamily: 'Bazzi', fontSize: 22 }}>서 식 지 : {params.data.fish.habitat}</Text>
              </View>
              <View style={{
                paddingTop: 15
              }}>
                <Text style={{ fontFamily: 'Bazzi', fontSize: 22 }}>먹이 : {params.data.fish.feed}</Text>
              </View>
              <View style={{
                paddingTop: 15
              }}>
                <Text style={{ fontFamily: 'Bazzi', fontSize: 22 }}>포획 금지 조건 : {params.data.fish.prohibition}</Text>
              </View>
              <View style={{
                paddingTop: 15
              }}>
                <Text style={{ fontFamily: 'Bazzi', fontSize: 22 }}>식용 가능 : {this.eating(params.data.fish.recipe)}</Text>
              </View>
            </View>
            <View style={{
              marginLeft: -10,
              paddingTop: 5
            }}>
              <Text style={{ fontFamily: 'Bazzi', fontSize: 30, }}> 추가 정보</Text>
            </View>
            <View style={styles.sub2ContentView}>
              <View style={{
                paddingTop: 5,
                paddingRight: 15
              }}>
                <TextInput
                  style={{
                    borderColor: 'gray',
                    borderRadius: 15,
                    borderWidth: 1,
                    backgroundColor: 'white',
                  }}
                  placeholder="길이"
                  onChangeText={this.setLen}
                />
              </View>
              <View style={{
                paddingTop: 15
              }}>
                <Text style={{ fontFamily: 'Bazzi', fontSize: 22 }}>위 도 : {params.data.site.lat}</Text>
              </View>
              <View style={{
                paddingTop: 15
              }}>
                <Text style={{ fontFamily: 'Bazzi', fontSize: 22 }}>경 도 : {params.data.site.lng}</Text>
              </View>
            </View>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  fishStore.registerUserFish({ data: params, length: this.state, info: userStore.userInfo }).then(res => {
                    this.props.navigation.navigate('Home');
                  }).catch(res => console.log(res));
                }}>
                <Text style={styles.btnText}>도감 등록</Text>
              </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(172,209,233,0.4)',
    width: '100%',
    height: '100%'
  },
  mainView: {
    paddingLeft: 30,
    paddingTop: 10
  },
  mainContentView: {
    elevation: 8,
    backgroundColor: '#fff',
    flex: 1,
    margin: 20,
    padding: 10,
    width: '90%',
    height: '100%',
    alignItems: 'center',
    borderRadius: 15,
  },
  subcontentView: {
    padding: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 40,
  },
  sub2ContentView: {
    padding: 10,
    justifyContent: 'flex-start'
    // justifyContent: 'space-between'
  },
  btn: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#4F8EF7',
    borderRadius: 20,
    marginRight: 30,
    marginBottom: 10
  },
  btnText: {
    fontSize: 20,
    // fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: "Bazzi",
  }
});

export default CollectionInsertScreen;
