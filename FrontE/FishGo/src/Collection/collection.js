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
} from 'react-native';
import CollectionList from './collection_list';

@inject('userStore', 'fishStore')
@observer
class Collection extends Component {
  select = (data) => {
    const { userStore, fishStore } = this.props;
    fishStore.getSelectedFishes({ id: data, info: userStore.userInfo })
      .then(res => {
        fishStore.setSelectedFish(res.data.data);
        this.props.navigation.navigate('Collection_detail', res.data.data)
      }).catch(res => console.log(res));
  }

  render() {
    const { userStore, fishStore } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View style={{padding: 6,alignItems:'center'}}>
        <Text style={styles.containerText}>Collection</Text>
        </View>
        <ScrollView>
          <View style={styles.main}>
            <CollectionList fishes={fishStore.userFishes} sel={this.select} />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  container: {
    backgroundColor: 'rgba(172,209,233,0.4)',
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  containerText:{
    fontFamily:'Bazzi',
    fontSize: 30,
  }
});

export default Collection;
