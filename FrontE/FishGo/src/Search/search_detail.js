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

const eating = (data)=>{
    if(data)
        return "식용 가능 합니다."
    else
        return "식용 불가능 합니다."
}

const checkType = (data) => {
    if(data == 1){
        return "해수어"
    }
    else{
        return "민어"
    }
}

const SearchDetailScreen = (props) => {
    // console.log(props);
    const data = props.props;
    if (data.keyword !== "" && data.check) {
        return (
            <View style={styles.mainView}>
                <Image
                    style={{ margin: 10, width: 180, height: 180, resizeMode: 'contain' }}
                    source={{ uri: data.fish.image }}
                />
                <View style={styles.mainContentView}>
                    <View style={styles.subcontentView}>
                        <View>
                            <Text style={{ fontSize: 30 }}>{ data.fish.name }</Text>
                        </View>
                    </View>
                    <View style={styles.subcontentView}>
                        <View style={{
                            flexDirection: "column",
                            alignItems: 'center',
                        }}>
                            <Text>어종 타입</Text>
                            <Text>{ checkType(data.fish.fish_type) }</Text>
                        </View>
                        <View style={{
                            flexDirection: "column",
                            alignItems: 'center',
                            paddingLeft: 20,
                            paddingRight: 20
                        }}>
                            <Text>서식지</Text>
                            <Text>{ data.fish.habitat }</Text>
                        </View>
                    </View>
                    <View style={styles.sub2ContentView}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start'
                        }}>
                            <Text>먹이 : </Text>
                            <Text>{ data.fish.feed }</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start'
                        }}>
                            <Text>포획 금지 조건 : </Text>
                            <Text>{ data.fish.prohibithion }</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start'
                        }}>
                            <Text>식용 가능 : </Text>
                            <Text>{eating(data.fish.recipe)}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    else if(data.keyword !== "" && JSON.stringify(data.fish) === JSON.stringify({})){
        return(
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 30
                // margin: 40
            }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                }}>검색한 결과가 없습니다.</Text>
            </View>
        )
    }
    else{
        return(
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 30
                // margin: 40
            }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                }}>검색어를 입력해 주세요.</Text>
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

export default SearchDetailScreen;
