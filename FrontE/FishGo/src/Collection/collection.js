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
  Button,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image
} from 'react-native';
import CollectionList from './collection_list';

@inject('userStore', 'fishStore')
@observer
class Collection extends Component {
  select = (data) => {
    const {userStore, fishStore} = this.props;
    console.log(data);
    fishStore.getSelectedFishes({id: data, info: userStore.userInfo})
    .then(res=>{
      console.log(res.data.data);
      fishStore.setSelectedFish(res.data.data);
      this.props.navigation.navigate('Collection_detail',res.data.data)
    }).catch(res=>console.log(res));
  }

  render() {
    const {userStore, fishStore} = this.props;
    return (
      <SafeAreaView style={{
        // backgroundColor: '#2fa9ff',
        width: '100%',
        height: '100%',
        display: 'flex',
      }}>
        <ScrollView>
          <View
            style={{
              // width:'100%',
              backgroundColor: 'rgba(172,209,233,0.4)',
              padding: 10,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              flexWrap: 'wrap'
            }}
          >
            <CollectionList fishes={fishStore.userFishes} sel={this.select}/>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#ffffff",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: 180,
    height: 180,
    margin: 5,
    borderColor: 'white',
    borderWidth: 2,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Collection;
