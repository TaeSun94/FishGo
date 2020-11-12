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

const CollectionComponent = (props) => {
    if (props.img !== "") {
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
    else{
        return(
            <View></View>
        )
    }
}

const CollectionList = (props) => {
    return (
        props.fishes.map((item, idx) => (
            <View key={idx}>
                <TouchableOpacity
                    style={styles.btn}
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

export default CollectionList;