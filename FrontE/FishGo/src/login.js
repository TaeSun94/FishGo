/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
// 카카오로그인 
import AsyncStorage from '@react-native-async-storage/async-storage';
import KakaoLogins, { login } from '@react-native-seoul/kakao-login';
import http from '../utils/http-common';

import {
    StyleSheet,
    View,
    Text,
    Alert,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    StatusBar,
    ScrollView
} from 'react-native';
import { color } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import httpCommon from '../utils/http-common';
if (!KakaoLogins) {
    console.error("KakaoLogins Module is Not Linked");
}

@inject('userStore')
@observer
export default class LoginScreen extends Component {
    state = {
        id: '',
        pw: '',
        idCheck: false,
        pwCheck: false
    }

    setId = (id) => {
        this.setState({ id: id });
    }

    setPw = (pw) => {
        this.setState({ pw: pw });
    }
    failAlert = () =>
        Alert.alert(
            "죄송합니다.",
            "아이디 또는 비밀번호를 다시 확인해주세요.",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );


    kakaoLogin = async () => {
        try {
            let result = await KakaoLogins.login([2]);
            if (result) {
                console.log(result.accessToken)
                let data = { access_token: result.accessToken }
                let resp = await http.post('auth/callback/', data)
                this.props.userStore.setUserInfo(resp.data.data);
                // await this.getProfile();
                await AsyncStorage.setItem("userToken", result.accessToken);
                console.log(`Login Finished:${JSON.stringify(result)}`);
                this.props.navigation.navigate('Home');
            }
        } catch (err) {
            if (err.code === "E_CANCELLED_OPERATION") {
                console.log(`Login Cancelled:${err.message}`);
            } else {
                console.log(`Login Failed:${err.code} ${err.message}`);
            }
        }
    };

    login = () => {
        const { userStore } = this.props;
        userStore.logInUser(this.state).then((res) => {
            userStore.setUserInfo(res.data.data);
            this.props.navigation.navigate('Home');
        }).catch((res) => {
            console.log(res);
            this.failAlert();
        });
    }
    render() {
        return (
            // <LinearGradient colors={['#736efe', '#5efce8']}>
            <KeyboardAvoidingView
                style={styles.mainView}
                behavior="height"
            >
                <StatusBar
                    backgroundColor="rgba(172,209,233,0.4)"
                    // backgroundColor="#736efe"
                    barStyle='dark-content'
                />
                <View style={styles.logoView}>
                    <Text style={styles.logoText}>FishGo</Text>
                </View>
                <ScrollView>
                <View style={styles.subView}>
                    <View style={styles.btnView}>
                        <TextInput
                            style={styles.text}
                            placeholder=" 아이디"
                            onChangeText={this.setId}
                        />
                    </View>
                    <View style={styles.btnView}>
                        <TextInput
                            style={styles.text}
                            secureTextEntry
                            placeholder=" 비밀번호"
                            onChangeText={this.setPw}
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        padding: 5,
                        paddingRight: 10
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('Forget');
                            }}
                        >
                            <Text style={{ color: 'black', fontFamily: 'Bazzi' }}>비밀번호를 까먹으셨나요?</Text>
                        </TouchableOpacity>
                    </View>
                    <BtnAble data={this.state} login={this.login} />
                    <View style={styles.btnView}>
                        <TouchableOpacity
                            // onPress={() => {
                            //     this.props.navigation.navigate('Home')
                            // }}
                            onPress={this.kakaoLogin}
                            style={styles.kakaobtn}
                        >
                            <Text style={styles.kakaobtnText}>
                                카카오 로그인
                                </Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}
                    >
                        <Text style={{ fontFamily: 'Bazzi', }}>아직 회원이 아니신가요?</Text>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('Signup')
                            }}
                        >
                            <Text style={{
                                fontFamily: 'Bazzi',
                                color: '#EE7785'
                            }}>회원가입하기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
            </KeyboardAvoidingView>
            // </LinearGradient>
        )
    }
}

const BtnAble = (data) => {
    if (data.data.id !== "" && data.data.pw !== "") {
        return (
            <View style={styles.btnView}>
                <TouchableOpacity
                    onPress={() => {
                        data.login()
                    }}
                    style={styles.btn}
                >
                    <Text style={styles.btnText}>
                        로그인
                </Text>
                </TouchableOpacity>
            </View>
        )
    }
    else {
        return (
            <View style={styles.btnView}>
                <TouchableOpacity
                    disabled
                    style={styles.btnNoAble}
                >
                    <Text style={styles.btnNoAbleText}>
                        로그인
                </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(172,209,233,0.4)',
        // flex:1
    },
    logoView: {
        flex:2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        fontSize: 80,
        fontFamily: "Bazzi",
        // color: 'rgba(183,175,163,0.9)'
        color: 'rgba(0,0,0,0.7)'
    },
    text: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        fontFamily: "Bazzi",
        fontSize: 20
    },
    subView: {
        marginLeft: 10,
        marginRight: 10,
        padding: 20,
        flex:5,
        justifyContent:'flex-end'
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    btnView: {
        width: "100%",
        padding: 10,
    },
    btnNoAble: {
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 20
    },
    btnNoAbleText: {
        fontSize: 20,
        color: 'rgba(183,175,163,1)',
        fontFamily: "Bazzi",
    },
    btn: {
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#4F8EF7',
        borderRadius: 20
    },
    btnText: {
        fontSize: 20,
        color: '#ffffff',
        fontFamily: "Bazzi",
    },
    kakaobtn: {
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'yellow',
        borderRadius: 20
    },
    kakaobtnText: {
        fontSize: 20,
        color: 'rgba(0,0,0,0.6)',
        fontFamily: "Bazzi",
    }
});
