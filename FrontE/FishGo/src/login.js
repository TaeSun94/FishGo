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
import KakaoLogins  from '@react-native-seoul/kakao-login';
import http from '../utils/http-common';

import {
    StyleSheet,
    View,
    Text,
    Alert,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView
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
        pw: ''
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
        let result = await KakaoLogins.login();
        if (result) {
            console.log(result.accessToken)
            let data = { access_token : result.accessToken}
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

    // getProfile = async () => {
    //     try {
    //     let result = await KakaoLogins.getProfile();
    //     await console.log(`Get Profile Finished:${JSON.stringify(result)}`);
    //     } catch (err) {
    //     console.log(`Get Profile Failed:${err.code} ${err.message}`);
    //     }
    // };


    render() {
        const { userStore } = this.props;
        return (
            // <LinearGradient colors={['#736efe', '#5efce8']}>
                <KeyboardAvoidingView 
                    style={styles.mainView}
                    behavior="position"
                    enabled    
                >
                    <View style={styles.logoView}>
                        <Text style={styles.logoText}>FishGo</Text>
                    </View>
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
                            flexDirection:'row',
                            justifyContent:'flex-end',
                            padding:5,
                            paddingRight:10
                        }}>
                        <TouchableOpacity
                            onPress={()=>{
                                this.props.navigation.navigate('Forget');
                            }}
                        >
                            <Text style={{color:'black',fontFamily:'Bazzi'}}>비밀번호를 까먹으셨나요?</Text>
                        </TouchableOpacity>
                        </View>
                        <View style={styles.btnView}>
                            <TouchableOpacity
                                onPress={() => {
                                    userStore.logInUser(this.state).then((res)=>{
                                        userStore.setUserInfo(res.data.data);
                                        this.props.navigation.navigate('Home');
                                    }).catch((res)=>{
                                        console.log(res);
                                        this.failAlert();
                                    });
                                }}
                                style={styles.btn}
                            >
                                <Text style={styles.btnText}>
                                    로그인
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.btnView}>
                            <TouchableOpacity
                                // onPress={() => {
                                //     this.props.navigation.navigate('Home')
                                // }}
                                onPress={this.kakaoLogin}
                                style={styles.btn}
                            >
                                <Text style={styles.btnText}>
                                    카카오 로그인
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                flexDirection:'row',
                                justifyContent:'space-around'
                            }}
                        >
                            <Text style={{fontFamily:'Bazzi',}}>아직 회원이 아니신가요?</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate('Signup')
                                }}
                            >
                                <Text style={{
                                    fontFamily:'Bazzi',
                                    color:'#EE7785'
                                }}>회원가입하기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            // </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(165,223,249,0.3)',
    },
    logoView:{
        margin: 30,
        paddingTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText:{
        fontSize: 80,
        fontFamily: "Bazzi",
        color: 'white'
    },
    text: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        fontFamily: "Bazzi",
        fontSize:20
    },
    subView: {
        marginTop: 80,
        marginLeft: 10,
        marginRight: 10,
        padding:20,
    },
    btnView:{
        width: "100%",
        padding: 10,
    },
    btn:{
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#4F8EF7',
        borderRadius: 20
    },
    btnText:{
        fontSize: 20,
        // fontWeight: 'bold',
        color: '#ffffff',
        fontFamily: "Bazzi",
    }
});
