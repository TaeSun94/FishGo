/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component, useEffect } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Image,
    View,
    Text,
    PermissionsAndroid
} from 'react-native';
import http from "../../utils/http-common";

const CollectionDetailComponent = (props) => {
    return (
        <Image
            style={{
                width: 180,
                height: 150,
                resizeMode: 'contain'
            }}
            source={{ uri: props.img }}
        />
    )

}

const CollectionDetailList = (props) => {
    console.log(props.fishes)
    return (
        // <View></View>
        props.fishes.map((item, idx) => (
            <View style={styles.mainView} key={idx}>
                <View>
                    <Text>Fish~ Go!</Text>
                </View>
                <CollectionDetailComponent img={item.img} />
                <View style={styles.mainContentView}>
                    <View style={styles.subcontentView}>
                        <View>
                            <Text style={{ fontSize: 30 }}>{item.fish.name}</Text>
                        </View>
                        {/* <View style={{ paddingTop: 20, paddingLeft: 40 }}>
                            <Text>{params.uf_date}</Text>
                        </View> */}
                    </View>
                    <View style={styles.subcontentView}>
                        <View style={{
                            flexDirection: "column",
                            alignItems: 'center',
                        }}>
                            <Text>어종 타입</Text>
                            <Text>{item.fish.fish_type}</Text>
                        </View>
                        <View style={{
                            flexDirection: "column",
                            alignItems: 'center',
                            paddingLeft: 20,
                            paddingRight: 20
                        }}>
                            <Text>서식지</Text>
                            <Text>{item.fish.habitat}</Text>
                        </View>
                        <View style={{
                            flexDirection: "column",
                            alignItems: 'center'
                        }}>
                            <Text>길이</Text>
                            <Text>{item.length}</Text>
                        </View>
                    </View>
                    <View style={styles.sub2ContentView}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start'
                        }}>
                            <Text>먹이 : </Text>
                            <Text>{item.fish.feed}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start'
                        }}>
                            <Text>포획 금지 조건 : </Text>
                            <Text>{item.fish.prohibition}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start'
                        }}>
                            <Text>조리법 : </Text>
                            <Text>{item.fish.recipe}</Text>
                        </View>
                    </View>
                </View>
            </View>
        ))
    )
}

const styles = StyleSheet.create({
    mainView: {
        // backgroundColor: '#2fa9ff',
        width: 350,
        height: 500,
        // alignItems: 'center',
        // padding: 20,
    },
    mainContentView: {
        elevation: 8,
        // backgroundColor: '#fff',
        // flex: 1,
        // margin: 20,
        // padding: 10,
        // width: '90%',
        // height: '100%',
        alignItems: 'center',
        borderRadius: 15,
    },
    subcontentView: {
        padding: 10,
        // width:'90%',
        // height: '100%',
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