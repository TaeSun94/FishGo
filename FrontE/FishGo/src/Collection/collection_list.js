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
import cs from '../assets/commingSoon.jpg'
const CollectionComponent = (props) => {
    if (props.img !== "") {
        return (
            <Image
                style={{
                    width: 180,
                    height: 150,
                    resizeMode: 'contain',
                    borderRadius: 1
                }}
                source={{ uri: props.img }}
            />
        )
    }
    else {
        return (
            <Image
                style={{
                    width: 180,
                    height: 150,
                    resizeMode: 'contain'
                }}
                source={cs}
            />
        )
    }
}

const CollectionList = (props) => {
    return (
        props.fishes.map((item, idx) => (
            <View key={idx}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        props.sel({ id: item.id });
                    }}
                >
                    <CollectionComponent img={item.img} />
                    <Text>
                        {item.name}
                    </Text>
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
        width: 190,
        height: 190,
        borderColor: 'rgba(172,209,233,0.4)',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 1,
        shadowColor: 'rgba(172,209,233,1)',
        borderBottomEndRadius: 19,
        borderBottomStartRadius: 20,
        borderTopStartRadius: 19,
        borderTopEndRadius: 20,
    }
});

export default CollectionList;