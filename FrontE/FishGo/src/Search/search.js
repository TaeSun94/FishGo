/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import { inject, observer } from 'mobx-react';
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  SafeAreaView,
  ScrollView,
  Image
} from 'react-native';
import {SearchBar} from 'react-native-elements';

@inject('fishStore')
@observer
class SearchScreen extends Component {
    state = {
        keyword: '',
        fish:{}
    }

    updateTxt = (data) => {
        this.setState({ keyword: data });
    }
    
    render() {
        const { fishStore } = this.props;
        return (
            <SafeAreaView>
                <View>
                    <SearchBar
                        placeholder="검색할 물고기 이름을 넣어주세요"
                        onChangeText={this.updateTxt}
                        value={this.state.keyword}
                        style={{ width: '80%' }}
                    />
                </View>
                <ScrollView>
                    <View style={styles.mainView}>
                        <View>
                            <Text style={styles.headerText}>Fish~ Go!</Text>
                        </View>
                        <Image
                            style={{ margin: 10, width: 180, height: 180, resizeMode: 'contain' }}
                            // source={{ uri: '' }}
                        />
                        <View style={styles.mainContentView}>
                            <View style={styles.subcontentView}>
                                <View>
                                    <Text style={{ fontSize: 30 }}>{}</Text>
                                </View>
                                <View style={{ paddingTop: 20, paddingLeft: 40 }}>
                                    <Text>{}</Text>
                                </View>
                            </View>
                            <View style={styles.subcontentView}>
                                <View style={{
                                    flexDirection: "column",
                                    alignItems: 'center',
                                }}>
                                    <Text>어종 타입</Text>
                                    <Text>{}</Text>
                                </View>
                                <View style={{
                                    flexDirection: "column",
                                    alignItems: 'center',
                                    paddingLeft: 20,
                                    paddingRight: 20
                                }}>
                                    <Text>서식지</Text>
                                    <Text>{}</Text>
                                </View>
                                <View style={{
                                    flexDirection: "column",
                                    alignItems: 'center'
                                }}>
                                    <Text>길이</Text>
                                    <Text>{}</Text>
                                </View>
                            </View>
                            <View style={styles.sub2ContentView}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start'
                                }}>
                                    <Text>먹이 : </Text>
                                    <Text>{}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start'
                                }}>
                                    <Text>포획 금지 조건 : </Text>
                                    <Text>{}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start'
                                }}>
                                    <Text>조리법 : </Text>
                                    <Text>{}</Text>
                                </View>
                            </View>
                        </View>
                        <Button
                            title="목록으로"
                            onPress={() => {
                                this.props.navigation.navigate('Collection')
                            }}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        // backgroundColor: '#2fa9ff',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        padding: 20,
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
    headerText: {
        fontWeight: 'bold',
        fontSize: 40,
    },
    sub2ContentView: {
        padding: 10,
        justifyContent: 'flex-start'
        // justifyContent: 'space-between'
    }
});

export default SearchScreen;
