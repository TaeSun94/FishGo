/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
    ScrollView
} from 'react-native';
import moment from "moment";

const checkType = (data) => {
    if (data == 1) {
        return "해수어"
    }
    else {
        return "민어"
    }
}
const eating = (data) => {
    if (data)
        return "식용 가능 합니다."
    else
        return "식용 불가능 합니다."
}

const checkLen = (data) => {
    if (data === null) {
        return "등록된 정보가 없습니다."
    }
    else {
        return data
    }
}

const CollectionDetailList = (props) => {
    console.log(props.fishes)
    return (
        props.fishes.map((item, idx) => (
            <View style={styles.mainView} key={idx}>
                <View style={styles.subcontentView}>
                    <View style={{
                        flexDirection: 'column',
                        // justifyContent:'space-around'
                    }}>
                        <Text style={{ fontSize: 50, fontFamily: 'Bazzi' }}>{item.fish.name}</Text>
                        <Text style={{ fontSize: 20, fontFamily: 'Bazzi' }}>{moment(item.date).format('llll')}</Text>
                    </View>
                </View>
                <Image
                    style={{ width: 340, height: 200, resizeMode: 'contain' }}
                    source={{ uri: item.img }}
                />
                <ScrollView>
                    <View style={{
                        marginLeft: -4,
                        paddingBottom: 5
                    }}>
                        <Text style={{ fontFamily: 'Bazzi', fontSize: 30, }}> 기본 정보</Text>
                    </View>
                    <View style={styles.subcontentView}>
                        <View style={{
                            flexDirection: "column",
                            alignItems: 'center',
                        }}>
                            <Text style={{ fontFamily: 'Bazzi', fontSize: 22 }}> 종 류 : {checkType(item.fish.fish_type)} </Text>
                        </View>
                        <View style={{
                            flexDirection: "column",
                            alignItems: 'center',
                            paddingLeft: 20,
                            paddingRight: 20
                        }}>
                            <Text style={{ fontFamily: 'Bazzi', fontSize: 22 }}>서 식 지 : {item.fish.habitat}</Text>
                        </View>
                    </View>
                    <View style={styles.sub2ContentView}>
                        <View style={{
                            paddingTop: 5
                        }}>
                            <Text style={{ fontFamily: 'Bazzi', fontSize: 22 }}>먹이 : {item.fish.feed}</Text>
                        </View>
                        <View style={{
                            paddingTop: 15
                        }}>
                            <Text style={{ fontFamily: 'Bazzi', fontSize: 22 }}>포획 금지 조건 : {item.fish.prohibition}</Text>
                        </View>
                        <View style={{
                            paddingTop: 15
                        }}>
                            <Text style={{ fontFamily: 'Bazzi', fontSize: 22 }}>식용 가능 : {eating(item.fish.recipe)}</Text>
                        </View>
                    </View>
                    <View style={{
                        marginLeft: -4,
                        paddingTop: 5
                    }}>
                        <Text style={{ fontFamily: 'Bazzi', fontSize: 30, }}> 추가 정보</Text>
                    </View>
                    <View style={styles.sub2ContentView}>
                        <View style={{
                            paddingTop: 5
                        }}>
                            <Text style={{ fontFamily: 'Bazzi', fontSize: 22 }}>길 이 : {checkLen(item.length)}</Text>
                        </View>
                        <View style={{
                            paddingTop: 15
                        }}>
                            <Text style={{ fontFamily: 'Bazzi', fontSize: 22 }}>위 도 : {item.lat}</Text>
                        </View>
                        <View style={{
                            paddingTop: 15
                        }}>
                            <Text style={{ fontFamily: 'Bazzi', fontSize: 22 }}>경 도 : {item.lng}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        ))
    )
}

const styles = StyleSheet.create({
    mainView: {
        width: 420,
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    mainContentView: {
        elevation: 8,
        backgroundColor: '#fff',
        flex: 1,
        // margin: 20,
        // padding: 10,
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
    }
});

export default CollectionDetailList;