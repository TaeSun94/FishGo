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
  ScrollView,
  Button,
  Image,
  TextInput
} from 'react-native';
/*
이름, 타입, 서식지, 먹이, 어획 금지 정보, 이미지, 먹을 수 있는지, 조리법
*/
class CollectionInsertScreen extends Component {
  renderRow(num) {
    return (
      <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
        
        <View style={{ flex: 1, alignSelf: 'stretch' }}> { /* Edit these as they are your cells. You may even take parameters to display different data / react elements etc. */}
        <Text>{num}</Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch' }} />
        <View style={{ flex: 1, alignSelf: 'stretch' }} />
        <View style={{ flex: 1, alignSelf: 'stretch' }} />
        <View style={{ flex: 1, alignSelf: 'stretch' }} />
      </View>
    )
  }
  render() {
    const state =[1,2,3,4,5];
    const {params} = this.props.route;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.mainView}>
          <Text style={styles.mainText}>Fish~ Go!</Text>
        </View>
        <ScrollView
          style={styles.scrollView}
        >
          <View style={styles.mainContentView}>
            <View style={styles.subcontentView}>
              <View>
                <Text style={{ fontSize: 30 }}>{params.fish_name}</Text>
              </View>
              <View style={{ paddingTop: 20, paddingLeft: 40 }}>
                <Text>{params.uf_date}</Text>
              </View>
            </View>
            <View style={styles.subcontentView}>
              <View style={{
                flexDirection: "column",
                alignItems: 'center',
              }}>
                <Text>어종 타입</Text>
                <Text>{params.fish_type}</Text>
              </View>
              <View style={{
                flexDirection: "column",
                alignItems: 'center',
                paddingLeft: 20,
                paddingRight: 20
              }}>
                <Text>서식지</Text>
                <Text>{params.fish_home}</Text>
              </View>
              <View style={{
                flexDirection: "column",
                alignItems: 'center'
              }}>
                <Text>길이</Text>
                <Text>{params.uf_length}</Text>
              </View>
            </View>
            <View style={styles.sub2ContentView}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-start'
              }}>
                <Text>먹이 : </Text>
                <Text>{params.fish_feed}</Text>
              </View>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-start'
              }}>
                <Text>포획 금지 조건 : </Text>
                <Text>{params.fish_prohibition}</Text>
              </View>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-start'
              }}>
                <Text>조리법 : </Text>
                <Text>{params.fish_receipe}</Text>
              </View>
            </View>
          </View>
          <View style={styles.subView}>
            <Text>추가 정보</Text>
            <TextInput
              style={{
                borderColor: 'gray',
                borderRadius: 15,
                borderWidth: 1,
                backgroundColor:'white',
                padding: 10,
                margin: 10,
                // width:"100%"
              }}
              placeholder="길이"
              onChangeText={this.setText}
            />
          </View>
          <View style={styles.subView}>
            <Button
              title="도감 등록"
              onPress={()=>{
                this.props.navigation.navigate('Collection_detail')
              }}
            />  
          </View>
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
    alignItems: 'center',
  },
  mainText: {
    fontWeight: 'bold',
    fontSize:40,
  },
  scrollView: {
    width:"100%",
    margin: 10,
    padding:10
  },
  subView: {
    margin:10,
  },
  mainContentView:{
    elevation: 8,
    backgroundColor: '#fff',
    flex: 1,
    margin: 20,
    padding:10,
    width:'90%',
    height: '100%',
    alignItems:'center',
    borderRadius: 15,
  },
  subcontentView:{
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CollectionInsertScreen;
