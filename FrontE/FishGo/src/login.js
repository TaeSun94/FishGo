/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
} from 'react-native';

class LoginScreen extends Component {
    // const [text, setText] = useState('');
    state = {
        text: ""
    }
    setText = (txt) => {
        this.setState({text: txt});
    }
    render() {
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
                            onChangeText={this.setText}
                            
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
                            placeholder=" 비밀번호"
                            onChangeText={this.setText}
                        />
                    </View>
                    <View style={{
                        width:"100%",
                        padding:5,
                    }}>
                    <Button title='로그인'
                        onPress={()=>{
                            this.props.navigation.navigate('Home')
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

export default LoginScreen;
