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
import cs from '../assets/commingSoon.png'

const state = {
    imgURL: [],
    colorIdx: 0,
}

const getColorImg = (name) => {
    switch (name) {
        case "가물치": {
            state.imgURL.push(require('../assets/가물치.png'));
            break;
        }
        case "가시고기": {
            state.imgURL.push(require('../assets/가시고기.png'));
            break;
        }
        case "간재미": {
            state.imgURL.push(require('../assets/간재미.png'));
            break;
        }
        case "감성돔": {
            state.imgURL.push(require('../assets/감성돔.png'));
            break;
        }
        case "강준치": {
            state.imgURL.push(require('../assets/강준치.png'));
            break;
        }
        case "고등어": {
            state.imgURL.push(require('../assets/고등어.png'));
            break;
        }
        case "광어": {
            state.imgURL.push(require('../assets/광어.png'));
            break;
        }
        case "꺽지": {
            state.imgURL.push(require('../assets/꺽지.png'));
            break;
        }
        case "끄리": {
            state.imgURL.push(require('../assets/끄리.png'));
            break;
        }
        case "노래미": {
            state.imgURL.push(require('../assets/노래미.png'));
            break;
        }
        case "농어": {
            state.imgURL.push(require('../assets/농어.png'));
            break;
        }
        case "다금바리": {
            state.imgURL.push(require('../assets/다금바리.png'));
            break;
        }
        case "도다리": {
            state.imgURL.push(require('../assets/도다리.png'));
            break;
        }
        case "독가시치": {
            state.imgURL.push(require('../assets/독가시치.png'));
            break;
        }
        case "돌돔": {
            state.imgURL.push(require('../assets/돌돔.png'));
            break;
        }
        case "망둥어": {
            state.imgURL.push(require('../assets/망둥어.png'));
            break;
        }
        case "망상어": {
            state.imgURL.push(require('../assets/망상어.png'));
            break;
        }
        case "메기": {
            state.imgURL.push(require('../assets/메기.png'));
            break;
        }
        case "미꾸라지": {
            state.imgURL.push(require('../assets/미꾸라지.png'));
            break;
        }
        case "민어": {
            state.imgURL.push(require('../assets/민어.png'));
            break;
        }
        case "밀어": {
            state.imgURL.push(require('../assets/밀어.png'));
            break;
        }
        case "방어": {
            state.imgURL.push(require('../assets/방어.png'));
            break;
        }
        case "배스": {
            state.imgURL.push(require('../assets/배스.png'));
            break;
        }
        case "벤자리": {
            state.imgURL.push(require('../assets/벤자리.png'));
            break;
        }
        case "벵에돔": {
            state.imgURL.push(require('../assets/벵에돔.png'));
            break;
        }
        case "보구치": {
            state.imgURL.push(require('../assets/보구치.png'));
            break;
        }
        case "보리멸": {
            state.imgURL.push(require('../assets/보리멸.png'));
            break;
        }
        case "볼락": {
            state.imgURL.push(require('../assets/볼락.png'));
            break;
        }
        case "부세": {
            state.imgURL.push(require('../assets/부세.png'));
            break;
        }
        case "부시리": {
            state.imgURL.push(require('../assets/부시리.png'));
            break;
        }
        case "붕어": {
            state.imgURL.push(require('../assets/붕어.png'));
            break;
        }
        case "블루길": {
            state.imgURL.push(require('../assets/블루길.png'));
            break;
        }
        case "산천어": {
            state.imgURL.push(require('../assets/산천어.png'));
            break;
        }
        case "삼치": {
            state.imgURL.push(require('../assets/삼치.png'));
            break;
        }
        case "송어": {
            state.imgURL.push(require('../assets/송어.png'));
            break;
        }
        case "숭어": {
            state.imgURL.push(require('../assets/숭어.png'));
            break;
        }
        case "쏘가리": {
            state.imgURL.push(require('../assets/쏘가리.png'));
            break;
        }
        case "양태": {
            state.imgURL.push(require('../assets/양태.png'));
            break;
        }
        case "우럭": {
            state.imgURL.push(require('../assets/우럭.png'));
            break;
        }
        case "잉어": {
            state.imgURL.push(require('../assets/잉어.png'));
            break;
        }
        case "자리돔": {
            state.imgURL.push(require('../assets/자리돔.png'));
            break;
        }
        case "전갱이": {
            state.imgURL.push(require('../assets/전갱이.png'));
            break;
        }
        case "전어": {
            state.imgURL.push(require('../assets/전어.png'));
            break;
        }
        case "짱뚱어": {
            state.imgURL.push(require('../assets/짱뚱어.png'));
            break;
        }
        case "참돔": {
            state.imgURL.push(require('../assets/참돔.png'));
            break;
        }
        case "피라미": {
            state.imgURL.push(require('../assets/피라미.png'));
            break;
        }
        case "학꽁치": {
            state.imgURL.push(require('../assets/학꽁치.png'));
            break;
        }
        default:
            state.imgURL.push(require('../assets/commingSoon.png'));
    }
}

const getDarkImg = (name) => {
    switch (name) {
        case "가물치": {
            state.imgURL.push(require('../assets/가물치b.png'));
            break;
        }
        case "가시고기": {
            state.imgURL.push(require('../assets/가시고기b.png'));
            break;
        }
        case "간재미": {
            state.imgURL.push(require('../assets/간재미b.png'));
            break;
        }
        case "감성돔": {
            state.imgURL.push(require('../assets/감성돔b.png'));
            break;
        }
        case "강준치": {
            state.imgURL.push(require('../assets/강준치b.png'));
            break;
        }
        case "고등어": {
            state.imgURL.push(require('../assets/고등어b.png'));
            break;
        }
        case "광어": {
            state.imgURL.push(require('../assets/광어b.png'));
            break;
        }
        case "꺽지": {
            state.imgURL.push(require('../assets/꺽지b.png'));
            break;
        }
        case "끄리": {
            state.imgURL.push(require('../assets/끄리b.png'));
            break;
        }
        case "노래미": {
            state.imgURL.push(require('../assets/노래미b.png'));
            break;
        }
        case "농어": {
            state.imgURL.push(require('../assets/농어b.png'));
            break;
        }
        case "다금바리": {
            state.imgURL.push(require('../assets/다금바리b.png'));
            break;
        }
        case "도다리": {
            state.imgURL.push(require('../assets/도다리b.png'));
            break;
        }
        case "독가시치": {
            state.imgURL.push(require('../assets/독가시치b.png'));
            break;
        }
        case "돌돔": {
            state.imgURL.push(require('../assets/돌돔b.png'))
            break;
        }
        case "망둥어": {
            state.imgURL.push(require('../assets/망둥어b.png'));
            break;
        }
        case "망상어": {
            state.imgURL.push(require('../assets/망상어b.png'));
            break;
        }
        case "메기": {
            state.imgURL.push(require('../assets/메기b.png'));
            break;
        }
        case "미꾸라지": {
            state.imgURL.push(require('../assets/미꾸라지b.png'));
            break;
        }
        case "민어": {
            state.imgURL.push(require('../assets/민어b.png'));
            break;
        }
        case "밀어": {
            state.imgURL.push(require('../assets/밀어b.png'));
            break;
        }
        case "방어": {
            state.imgURL.push(require('../assets/방어b.png'));
            break;
        }
        case "배스": {
            state.imgURL.push(require('../assets/배스b.png'));
            break;
        }
        case "벤자리": {
            state.imgURL.push(require('../assets/벤자리b.png'));
            break;
        }
        case "벵에돔": {
            state.imgURL.push(require('../assets/벵에돔b.png'));
            break;
        }
        case "보구치": {
            state.imgURL.push(require('../assets/보구치b.png'));
            break;
        }
        case "보리멸": {
            state.imgURL.push(require('../assets/보리멸b.png'));
            break;
        }
        case "볼락": {
            state.imgURL.push(require('../assets/볼락b.png'));
            break;
        }
        case "부세": {
            state.imgURL.push(require('../assets/부세b.png'));
            break;
        }
        case "부시리": {
            state.imgURL.push(require('../assets/부시리b.png'));
            break;
        }
        case "붕어": {
            state.imgURL.push(require('../assets/붕어b.png'));
            break;
        }
        case "블루길": {
            state.imgURL.push(require('../assets/블루길b.png'));
            break;
        }
        case "산천어": {
            state.imgURL.push(require('../assets/산천어b.png'));
            break;
        }
        case "삼치": {
            state.imgURL.push(require('../assets/삼치b.png'));
            break;
        }
        case "송어": {
            state.imgURL.push(require('../assets/송어b.png'));
            break;
        }
        case "숭어": {
            state.imgURL.push(require('../assets/숭어b.png'));
            break;
        }
        case "쏘가리": {
            state.imgURL.push(require('../assets/쏘가리b.png'));
            break;
        }
        case "양태": {
            state.imgURL.push(require('../assets/양태b.png'));
            break;
        }
        case "우럭": {
            state.imgURL.push(require('../assets/우럭b.png'));
            break;
        }
        case "잉어": {
            state.imgURL.push(require('../assets/잉어b.png'));
            break;
        }
        case "자리돔": {
            state.imgURL.push(require('../assets/자리돔b.png'));
            break;
        }
        case "전갱이": {
            state.imgURL.push(require('../assets/전갱이b.png'));
            break;
        }
        case "전어": {
            state.imgURL.push(require('../assets/전어b.png'));
            break;
        }
        case "짱뚱어": {
            state.imgURL.push(require('../assets/짱뚱어b.png'));
            break;
        }
        case "참돔": {
            state.imgURL.push(require('../assets/참돔b.png'));
            break;
        }
        case "피라미": {
            state.imgURL.push(require('../assets/피라미b.png'));
            break;
        }
        case "학꽁치": {
            state.imgURL.push(require('../assets/학꽁치b.png'));
            break;
        }
        default:
            state.imgURL.push(require('../assets/commingSoon.png'));
    }
}

const CollectionComponent = (props) => {
    return (
        <Image
            style={{
                width: 180,
                height: 150,
                resizeMode: 'contain',
                borderRadius: 1
            }}
            source={state.imgURL[props.num]}
        />
    )
}

const setIMG = (data) => {
    data.fishes.map((item) => {
        if (item.catched) {
            getColorImg(item.name);
        }
        else {
            getDarkImg(item.name);
        }
    })
}

const CollectionList = (props) => {
    setIMG(props);
    return (
        props.fishes.map((item, idx) => (
            <View style={styles.main} key={idx}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        props.sel({ id: item.id });
                    }}
                >
                    <CollectionComponent fish={item} num={idx} />
                    <Text style={styles.text}>
                        {item.name}
                    </Text>
                </TouchableOpacity>
            </View>
        ))
    )
}

const styles = StyleSheet.create({
    main: {
        width:'50%',
    },
    btn: {
        width: "100%",
        height: 200,
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
    },
    text:{
        fontFamily:'Bazzi',
        fontSize: 20,
    }
});

export default CollectionList;