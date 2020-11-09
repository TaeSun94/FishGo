/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import { inject, observer } from 'mobx-react';
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
} from 'react-native';

@inject('userStore')
@observer
export default class LoginScreen extends Component {
    state = {
        id:'',
        pw:''
    }

    setId = (id) => {
        this.setState({id: id});
    }

    setPw = (pw) => {
        this.setState({pw:pw});
    }
    
    render() {
        const{userStore} = this.props;
        return (
            <View style={{
                backgroundColor: '#2fa9ff',
                width:'100%',
                height:'100%'
            }}>
                <View style={{
                    margin: 30,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize:80,
                    }}>Fish~ Go!</Text>
                </View>
                <View style={{
                    margin:30,
                    alignItems: 'center',
                    justifyContent:'center'
                }}>
                    <View style={{
                        padding: 10,
                        width:'100%'
                    }}>
                        <TextInput
                            style={{
                                borderColor: 'gray',
                                borderRadius: 15,
                                borderWidth: 1,
                                backgroundColor:'white'
                            }}
                            placeholder=" 아이디"
                            onChangeText={this.setId}
                        />
                    </View>
                    <View style={{
                        padding: 10,
                        width:'100%'
                    }}>
                        <TextInput 
                            style={{
                                borderColor: 'gray',
                                borderRadius: 15,
                                borderWidth: 1,
                                backgroundColor:'white'
                            }}
                            secureTextEntry
                            placeholder=" 비밀번호"
                            onChangeText={this.setPw}
                        />
                    </View>
                    <View style={{
                        width:"100%",
                        padding:5,
                    }}>
                    <Button title='로그인'
                        onPress={()=>{
                            userStore.logInUser(this.state);
                            const info = userStore.getUserInfo();
                            if(info.token !== null)
                                this.props.navigation.navigate('Home');
                            
                    }}/>
                    </View>
                    <View style={{
                        width:"100%",
                        padding:5,
                    }}>
                        <Button title='회원가입'
                            onPress={()=>{
                                this.props.navigation.navigate('Signup')
                            }}
                        />
                    </View>
                    <View style={{
                        width:"100%",
                        padding:5,
                    }}>
                        <Button title='카카오 로그인'/>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView:{
        // flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

// export default LoginScreen;
