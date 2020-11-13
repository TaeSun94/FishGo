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

@inject('userStore','fishStore')
@observer
class discrimination extends Component {

  state = {
    avatar: null,
    check: false,
    image: null,
  }

  addImage = () => {
    const { userStore, fishStore } = this.props;
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
        fishStore.sendDiscrimination(response).then((data) => {
          // console.log(data);
          fishStore.setDiscriminateFish(data.data.data.predictions);
          this.props.navigation.navigate('Descrimination', { source: response })
        }).catch((res) => {
          console.log(res)
        })
      }
      this.setState({avatar: response.uri, check: true})
    })
  }

  register = (params) => {
    this.props.navigation.navigate('Collection_insert',{data: params});
  }

  render() {
    const { fishStore } = this.props;
    const { params } = this.props.route;
    console.log(params.source)
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
              <Predictions 
                predicts={fishStore.predictFishs}
                img={params.source}
                reg={this.register}
              />
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: "space-around" }}
            >
              <Button
                title="다시 찍기"
                onPress={() => this.addImage()}
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
              <Text style={{ fontSize: 20 }}>예측 정보 List</Text>
              <Predictions predicts={fishStore.predictFish} />
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: "space-around" }}
            >
              <Button
                title="다시 찍기"
                onPress={() => this.addImage()}
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
