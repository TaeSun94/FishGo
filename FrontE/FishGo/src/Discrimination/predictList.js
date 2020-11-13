/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import Geolocation from "react-native-geolocation-service";
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

const state = {
    lat: '',
    lng: '',
}

const PredictionList = (props) => {
    useEffect(() => {
        requestLocationPermission();
    }, []);
    return (
        props.predicts.map((item, idx) => (
            <View style={{
                alignItems: 'flex-start',
                flexDirection: 'row'
            }} key={idx}>
                <Text style={{ fontFamily: 'Bazzi', padding: 20, flex: 2, fontSize:20 }}>
                    {idx+1}
                </Text>
                <Text style={{ padding: 20, flex: 3, fontFamily: 'Bazzi', fontSize:20 }}>{item.name}</Text>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        const URL = `/api/fishes?keyword=${item.name}`;
                        http.get(`${URL}`).then((res)=>{
                            console.log(res)
                            props.reg({fish: res.data.data.fishes[0], site: state, img:props.img});
                        }).catch(res=>console.log(res));
                    }}
                >
                    <Text style={{fontFamily: 'Bazzi', fontSize:18}}>등록</Text>
                </TouchableOpacity>
            </View>
        ))
    )
}

async function requestLocationPermission() {
    if (Platform.OS !== 'android') return;
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Location Permission',
                message: 'show my location need Location permission',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the location');
            Geolocation.getCurrentPosition(
                (position) => {
                    state.lat = position.coords.latitude;
                    state.lng = position.coords.longitude;
                },
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        } else {
            console.log('Location permission denied');
        }
    } catch (err) {
        console.warn(err);
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
        padding: 20,
        flex: 1
        // width: 180,
        // height: 180,
        // margin: 5,
        // borderColor: 'white',
        // borderWidth: 2,
        // marginRight: 10,
        // alignItems: 'center',
        // justifyContent: 'center',
    }
});

export default PredictionList;