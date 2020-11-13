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
    View,
    Text,
    Button,
    Image
} from 'react-native';

const eating = (data) => {
    if (data)
        return "식용 가능 합니다."
    else
        return "식용 불가능 합니다."
}

const checkType = (data) => {
    if (data == 1) {
        return "해수어"
    }
    else {
        return "민어"
    }
}

const SearchDetailScreen = (props) => {
    const data = props.props;
    if (data.check) {
        if (data.fish == null) {
            return (
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 30
                    // margin: 40
                }}>
                    <Text style={styles.text}>검색한 결과가 없습니다.</Text>
                </View>
            )
        }
        else {
            return (
                <View style={styles.mainView}>
                    <View style={styles.subcontentView}>
                        <View>
                            <Text style={{ fontSize: 50, fontFamily: 'Bazzi' }}>{data.fish.name}</Text>
                        </View>
                    </View>
                    <Image
                        style={{ width: 340, height: 200, resizeMode: 'contain' }}
                        source={{ uri: data.fish.image }}
                    />
                    <View style={{
                        marginLeft: -260
                    }}>
                        <Text style={{ fontFamily: 'Bazzi', fontSize: 30, }}> 기본 정보</Text>
                    </View>
                    <View style={styles.subcontentView}>
                        <View style={{
                            flexDirection: "column",
                            alignItems: 'center',
                        }}>
                            <Text style={{ fontFamily: 'Bazzi', fontSize: 22 }}> 종 류 : {checkType(data.fish.fish_type)} </Text>
                        </View>
                        <View style={{
                            flexDirection: "column",
                            alignItems: 'center',
                            paddingLeft: 20,
                            paddingRight: 20
                        }}>
                            <Text style={{ fontFamily: 'Bazzi', fontSize: 22 }}>서 식 지 : {data.fish.habitat}</Text>
                        </View>
                    </View>
                    <View style={styles.sub2ContentView}>
                        <View style={{
                            paddingTop: 5
                        }}>
                            <Text  style={{ fontFamily: 'Bazzi', fontSize: 22 }}>먹이 : {data.fish.feed}</Text>
                        </View>
                        <View style={{
                            paddingTop: 15
                        }}>
                            <Text  style={{ fontFamily: 'Bazzi', fontSize: 22 }}>포획 금지 조건 : {data.fish.prohibition}</Text>
                        </View>
                        <View style={{
                            paddingTop: 15
                        }}>
                            <Text  style={{ fontFamily: 'Bazzi', fontSize: 22 }}>식용 가능 : {eating(data.fish.recipe)}</Text>
                        </View>
                    </View>
                </View>
            )
        }
    }
    else {
        return (
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 30
                // margin: 40
            }}>
                <Text style={styles.text}>검색어를 입력해 주세요.</Text>
            </View>
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
        // elevation: 8,
        // backgroundColor: '#fff',
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
        marginLeft: -85
        // justifyContent: 'space-between'
    },
    text: {
        fontSize: 30,
        fontFamily: 'Bazzi'
    }
});

export default SearchDetailScreen;
