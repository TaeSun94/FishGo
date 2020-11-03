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
  Button,
  Image,
  SafeAreaView,
  ScrollView
} from 'react-native';

class CollectionDetailScreen extends Component {
    render() {
        const {params} = this.props.route;
        
        if(params.check){
            return (
                <SafeAreaView>
                    <ScrollView>
                        <View style={styles.mainView}>
                            <View>
                            <Text style={styles.headerText}>Fish~ Go!</Text>
                            </View>
                            <Image 
                                style={{margin:10, width: 180, height: 180, resizeMode:'contain'}}
                                source={{uri: params.fish_image}}
                            />
                            <View style={styles.mainContentView}>
                                <View style={styles.subcontentView}>
                                    <View>
                                    <Text style={{fontSize:30}}>{params.fish_name}</Text>
                                    </View>
                                    <View style={{paddingTop:20, paddingLeft:40}}>
                                    <Text>{params.uf_date}</Text>
                                    </View>
                                </View>
                                <View style={styles.subcontentView}>
                                    <View style={{
                                        flexDirection:"column",
                                        alignItems: 'center',
                                    }}>
                                        <Text>어종 타입</Text>
                                        <Text>{params.fish_type}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection:"column",
                                        alignItems: 'center',
                                        paddingLeft: 20,
                                        paddingRight: 20
                                    }}>
                                        <Text>서식지</Text>
                                    <Text>{params.fish_home}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection:"column",
                                        alignItems: 'center'
                                    }}>
                                        <Text>길이</Text>
                                    <Text>{params.uf_length}</Text>
                                    </View>
                                </View>
                                <View style={styles.sub2ContentView}>
                                    <View style={{
                                        flexDirection:'row',
                                        justifyContent:'flex-start'
                                    }}>
                                        <Text>먹이 : </Text>
                                        <Text>{params.fish_feed}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection:'row',
                                        justifyContent:'flex-start'
                                    }}>
                                        <Text>포획 금지 조건 : </Text>
                                        <Text>{params.fish_prohibition}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection:'row',
                                        justifyContent:'flex-start'
                                    }}>
                                        <Text>조리법 : </Text>
                                        <Text>{params.fish_receipe}</Text>
                                    </View>
                                </View>
                            </View>
                            <Button
                                title="목록으로"
                                onPress={()=>{
                                    this.props.navigation.navigate('Collection')
                                }}
                            />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            )
        }
        else{
            return(
                <SafeAreaView>
                    <View>
                        <Text>아직 잡지 못하였어요!</Text>
                    </View>
                </SafeAreaView>
            )
        }
    }
}

const styles = StyleSheet.create({
  mainView:{
      // backgroundColor: '#2fa9ff',
      width:'100%',
      height:'100%',
      alignItems: 'center',
      padding:20,
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
  headerText:{
    fontWeight: 'bold',
    fontSize:40,
  },
  sub2ContentView: {
    padding: 10,
    justifyContent:'flex-start'
    // justifyContent: 'space-between'
  }
});

export default CollectionDetailScreen;
