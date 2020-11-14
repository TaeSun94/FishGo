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
            state.imgURL.push(require('../assets/rkanfcl.png'));
            break;
        }
        case "가시고기": {
            state.imgURL.push(require('../assets/rktlrhrl.png'));
            break;
        }
        case "간재미": {
            state.imgURL.push(require('../assets/rkswoal.png'));
            break;
        }
        case "감성돔": {
            state.imgURL.push(require('../assets/rkatjdeha.png'));
            break;
        }
        case "강준치": {
            state.imgURL.push(require('../assets/rkdwnscl.png'));
            break;
        }
        case "고등어": {
            state.imgURL.push(require('../assets/rhemddj.png'));
            break;
        }
        case "광어": {
            state.imgURL.push(require('../assets/rhkddj.png'));
            break;
        }
        case "꺽지": {
            state.imgURL.push(require('../assets/Rjrwl.png'));
            break;
        }
        case "끄리": {
            state.imgURL.push(require('../assets/Rmfl.png'));
            break;
        }
        case "노래미": {
            state.imgURL.push(require('../assets/shfoal.png'));
            break;
        }
        case "농어": {
            state.imgURL.push(require('../assets/shddj.png'));
            break;
        }
        case "다금바리": {
            state.imgURL.push(require('../assets/ekrmaqkfl.png'));
            break;
        }
        case "도다리": {
            state.imgURL.push(require('../assets/ehekfl.png'));
            break;
        }
        case "독가시치": {
            state.imgURL.push(require('../assets/ehrrktlcl.png'));
            break;
        }
        case "돌돔": {
            state.imgURL.push(require('../assets/ehfeha.png'));
            break;
        }
        case "망둥어": {
            state.imgURL.push(require('../assets/akdenddj.png'));
            break;
        }
        case "망상어": {
            state.imgURL.push(require('../assets/akdtkddj.png'));
            break;
        }
        case "메기": {
            state.imgURL.push(require('../assets/aprl.png'));
            break;
        }
        case "미꾸라지": {
            state.imgURL.push(require('../assets/alRnfkwl.png'));
            break;
        }
        case "민어": {
            state.imgURL.push(require('../assets/alsdj.png'));
            break;
        }
        case "밀어": {
            state.imgURL.push(require('../assets/alfdj.png'));
            break;
        }
        case "방어": {
            state.imgURL.push(require('../assets/qkddj.png'));
            break;
        }
        case "배스": {
            state.imgURL.push(require('../assets/qotm.png'));
            break;
        }
        case "벤자리": {
            state.imgURL.push(require('../assets/qpswkfl.png'));
            break;
        }
        case "벵에돔": {
            state.imgURL.push(require('../assets/qpddpeha.png'));
            break;
        }
        case "보구치": {
            state.imgURL.push(require('../assets/qhrncl.png'));
            break;
        }
        case "보리멸": {
            state.imgURL.push(require('../assets/qhflauf.png'));
            break;
        }
        case "볼락": {
            state.imgURL.push(require('../assets/qhffkr.png'));
            break;
        }
        case "부세": {
            state.imgURL.push(require('../assets/qntp.png'));
            break;
        }
        case "부시리": {
            state.imgURL.push(require('../assets/qntlfl.png'));
            break;
        }
        case "붕어": {
            state.imgURL.push(require('../assets/qnddj.png'));
            break;
        }
        case "블루길": {
            state.imgURL.push(require('../assets/qmffnrlf.png'));
            break;
        }
        case "산천어": {
            state.imgURL.push(require('../assets/tkscjsdj.png'));
            break;
        }
        case "삼치": {
            state.imgURL.push(require('../assets/tkacl.png'));
            break;
        }
        case "송어": {
            state.imgURL.push(require('../assets/thddj.png'));
            break;
        }
        case "숭어": {
            state.imgURL.push(require('../assets/tnddj.png'));
            break;
        }
        case "쏘가리": {
            state.imgURL.push(require('../assets/Thrkfl.png'));
            break;
        }
        case "양태": {
            state.imgURL.push(require('../assets/didxo.png'));
            break;
        }
        case "우럭": {
            state.imgURL.push(require('../assets/dnfjr.png'));
            break;
        }
        case "잉어": {
            state.imgURL.push(require('../assets/dlddj.png'));
            break;
        }
        case "자리돔": {
            state.imgURL.push(require('../assets/wkfleha.png'));
            break;
        }
        case "전갱이": {
            state.imgURL.push(require('../assets/wjsroddl.png'));
            break;
        }
        case "전어": {
            state.imgURL.push(require('../assets/wjsdj.png'));
            break;
        }
        case "짱뚱어": {
            state.imgURL.push(require('../assets/WkdEnddj.png'));
            break;
        }
        case "참돔": {
            state.imgURL.push(require('../assets/ckaeha.png'));
            break;
        }
        case "피라미": {
            state.imgURL.push(require('../assets/vlfkal.png'));
            break;
        }
        case "학꽁치": {
            state.imgURL.push(require('../assets/gkrRhdcl.png'));
            break;
        }
        default:
            state.imgURL.push(require('../assets/commingSoon.png'));
    }
}

const getDarkImg = (name) => {
    switch (name) {
        case "가물치": {
            state.imgURL.push(require('../assets/rkanfclb.png'));
            break;
        }
        case "가시고기": {
            state.imgURL.push(require('../assets/rktlrhrlb.png'));
            break;
        }
        case "간재미": {
            state.imgURL.push(require('../assets/rkswoalb.png'));
            break;
        }
        case "감성돔": {
            state.imgURL.push(require('../assets/rkatjdehab.png'));
            break;
        }
        case "강준치": {
            state.imgURL.push(require('../assets/rkdwnsclb.png'));
            break;
        }
        case "고등어": {
            state.imgURL.push(require('../assets/rhemddjb.png'));
            break;
        }
        case "광어": {
            state.imgURL.push(require('../assets/rhkddjb.png'));
            break;
        }
        case "꺽지": {
            state.imgURL.push(require('../assets/Rjrwlb.png'));
            break;
        }
        case "끄리": {
            state.imgURL.push(require('../assets/Rmflb.png'));
            break;
        }
        case "노래미": {
            state.imgURL.push(require('../assets/shfoalb.png'));
            break;
        }
        case "농어": {
            state.imgURL.push(require('../assets/shddjb.png'));
            break;
        }
        case "다금바리": {
            state.imgURL.push(require('../assets/ekrmaqkflb.png'));
            break;
        }
        case "도다리": {
            state.imgURL.push(require('../assets/ehekflb.png'));
            break;
        }
        case "독가시치": {
            state.imgURL.push(require('../assets/ehrrktlclb.png'));
            break;
        }
        case "돌돔": {
            state.imgURL.push(require('../assets/ehfehab.png'))
            break;
        }
        case "망둥어": {
            state.imgURL.push(require('../assets/akdenddjb.png'));
            break;
        }
        case "망상어": {
            state.imgURL.push(require('../assets/akdtkddjb.png'));
            break;
        }
        case "메기": {
            state.imgURL.push(require('../assets/aprlb.png'));
            break;
        }
        case "미꾸라지": {
            state.imgURL.push(require('../assets/alRnfkwlb.png'));
            break;
        }
        case "민어": {
            state.imgURL.push(require('../assets/alsdjb.png'));
            break;
        }
        case "밀어": {
            state.imgURL.push(require('../assets/alfdjb.png'));
            break;
        }
        case "방어": {
            state.imgURL.push(require('../assets/qkddjb.png'));
            break;
        }
        case "배스": {
            state.imgURL.push(require('../assets/qotmb.png'));
            break;
        }
        case "벤자리": {
            state.imgURL.push(require('../assets/qpswkflb.png'));
            break;
        }
        case "벵에돔": {
            state.imgURL.push(require('../assets/qpddpehab.png'));
            break;
        }
        case "보구치": {
            state.imgURL.push(require('../assets/qhrnclb.png'));
            break;
        }
        case "보리멸": {
            state.imgURL.push(require('../assets/qhflaufb.png'));
            break;
        }
        case "볼락": {
            state.imgURL.push(require('../assets/qhffkrb.png'));
            break;
        }
        case "부세": {
            state.imgURL.push(require('../assets/qntpb.png'));
            break;
        }
        case "부시리": {
            state.imgURL.push(require('../assets/qntlflb.png'));
            break;
        }
        case "붕어": {
            state.imgURL.push(require('../assets/qnddjb.png'));
            break;
        }
        case "블루길": {
            state.imgURL.push(require('../assets/qmffnrlfb.png'));
            break;
        }
        case "산천어": {
            state.imgURL.push(require('../assets/tkscjsdjb.png'));
            break;
        }
        case "삼치": {
            state.imgURL.push(require('../assets/tkaclb.png'));
            break;
        }
        case "송어": {
            state.imgURL.push(require('../assets/thddjb.png'));
            break;
        }
        case "숭어": {
            state.imgURL.push(require('../assets/tnddjb.png'));
            break;
        }
        case "쏘가리": {
            state.imgURL.push(require('../assets/Thrkflb.png'));
            break;
        }
        case "양태": {
            state.imgURL.push(require('../assets/didxob.png'));
            break;
        }
        case "우럭": {
            state.imgURL.push(require('../assets/dnfjrb.png'));
            break;
        }
        case "잉어": {
            state.imgURL.push(require('../assets/dlddjb.png'));
            break;
        }
        case "자리돔": {
            state.imgURL.push(require('../assets/wkflehab.png'));
            break;
        }
        case "전갱이": {
            state.imgURL.push(require('../assets/wjsroddlb.png'));
            break;
        }
        case "전어": {
            state.imgURL.push(require('../assets/wjsdjb.png'));
            break;
        }
        case "짱뚱어": {
            state.imgURL.push(require('../assets/WkdEnddjb.png'));
            break;
        }
        case "참돔": {
            state.imgURL.push(require('../assets/ckaehab.png'));
            break;
        }
        case "피라미": {
            state.imgURL.push(require('../assets/vlfkalb.png'));
            break;
        }
        case "학꽁치": {
            state.imgURL.push(require('../assets/gkrRhdclb.png'));
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