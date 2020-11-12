/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Image,
    View,
    Text
} from 'react-native';

const PredictionList = (props) => {
    return (
        props.predicts.map((item, idx) => (
            <View style={{
                alignItems:'flex-start',
                flexDirection:'row'
            }} key={idx}>
                <Text style={{padding:20}}>
                    {item.name}
                </Text>
                <Text style={{padding:20}}>{item.probability}</Text>
                <TouchableOpacity
                    style={styles.btn}
                >
                    <Text>등록</Text>
                </TouchableOpacity>
            </View>
        ))
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#ffffff",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        padding:20
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