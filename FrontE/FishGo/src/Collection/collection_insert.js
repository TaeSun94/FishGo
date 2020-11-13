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
  TextInput
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
  render() {
    const { params } = this.props.route;
    const { userStore, fishStore } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.mainView}>
          <Text style={styles.mainText}>도감 등록</Text>
        </View>
        {/* <ScrollView
          style={styles.scrollView}
        > */}
          <View style={styles.mainContentView}>
            <Image
              source={{ uri: params.data.img.uri }}
              style={styles.avatar}
            />
            <View style={styles.subcontentView}>
              <View>
                <Text style={{ fontSize: 30 }}>{params.data.fish.name}</Text>
              </View>
            </View>
            <View style={styles.subcontentView}>
              <View style={{
                flexDirection: "column",
                alignItems: 'center',
              }}>
                <Text>어종 타입</Text>
                <Text>{params.data.fish.fish_type}</Text>
              </View>
              <View style={{
                flexDirection: "column",
                alignItems: 'center',
                paddingLeft: 20,
                paddingRight: 20
              }}>
                <Text>서식지</Text>
                <Text>{params.data.fish.habitat}</Text>
              </View>
            </View>
            <View style={styles.sub2ContentView}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-start'
              }}>
                <Text>먹이 : </Text>
                <Text>{params.data.fish.feed}</Text>
              </View>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-start'
              }}>
                <Text>포획 금지 조건 : </Text>
                <Text>{params.data.fish.prohibition}</Text>
              </View>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-start'
              }}>
                <Text>조리법 : </Text>
                <Text>{params.data.fish.recipe}</Text>
              </View>
            </View>
          </View>
          <View style={styles.subView}>
            <Text>추가 정보</Text>
            <View>
              <Text>포획 장소</Text>
              <Text>위도: {params.data.site.lat}</Text>
              <Text>경도: {params.data.site.lng}</Text>
            </View>
            <TextInput
              style={{
                borderColor: 'gray',
                borderRadius: 15,
                borderWidth: 1,
                backgroundColor: 'white',
                padding: 10,
                margin: 10,
                // width:"100%"
              }}
              placeholder="길이"
              onChangeText={this.setLen}
            />
          </View>
          <View style={styles.subView}>
            <Button
              title="도감 등록"
              onPress={() => {
                console.log(this.state)
                fishStore.registerUserFish({ data: params, length: this.state, info: userStore.userInfo }).then(res => {
                  console.log(res);
                  this.props.navigation.navigate('Home');
                }).catch(res => console.log(res));
                // this.props.navigation.navigate('Collection_detail')
              }}
            />
          </View>
        {/* </ScrollView> */}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(172,209,233,0.4)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainView: {
    alignItems: 'center',
    paddingTop: 25
  },
  mainText: {
    fontSize: 60,
    fontFamily: 'Bazzi'
  },
  scrollView: {
    width: "100%",
    margin: 10,
    padding: 10
  },
  subView: {
    margin: 10,
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
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatar: {
    width: "95%",
    height: "50%",
    margin: 10,
    resizeMode: 'stretch',
    borderRadius: 10
  }
});

export default CollectionInsertScreen;
