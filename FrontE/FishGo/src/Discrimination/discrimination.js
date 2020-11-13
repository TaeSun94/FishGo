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
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Predictions from './predictList';

@inject('userStore', 'fishStore')
@observer
class discrimination extends Component {

  state = {
    avatar: null,
    image: null,
  }

  register = (params) => {
    this.props.navigation.navigate('Collection_insert', { data: params });
  }

  render() {
    const { fishStore } = this.props;
    const { params } = this.props.route;
    console.log(params.source)
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{
          fontFamily: 'Bazzi',
          fontSize: 30,
          alignItems:'center',
          marginTop: 10
        }}> 내가 찍은 사진</Text>
        <Image
          source={{ uri: params.source.uri }}
          style={styles.avatar}
        />
        <ScrollView>
          <View
            style={{
              // flexDirection:'row',
              justifyContent: 'flex-start',
              elevation: 7,
              padding: 10,
              margin: 10,
              backgroundColor: '#fff',
              borderRadius: 10
            }}
          >
            <Text style={{ fontSize: 25, fontFamily: 'Bazzi' }}>예측 정보 List</Text>
            <Predictions
              predicts={fishStore.predictFishs}
              img={params.source}
              reg={this.register}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(172,209,233,0.4)',
    justifyContent:'center',
    // alignItems: 'center',
    // backgroundColor: '#e4ab26'
  },
  avatar: {
    width: "95%",
    height: "50%",
    margin: 10,
    resizeMode: 'stretch',
    borderRadius: 10,
    flex: 4,
  }
});

export default discrimination;
