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
  SafeAreaView
} from 'react-native';

@inject('userStore')
@observer
class SignUpScreen extends Component {
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
      <SafeAreaView>
        <View style={styles.mainView}>
          <View style={{
            padding:30,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{
              fontWeight: 'bold',
              fontSize:80,
            }}>Fish~ Go!</Text>
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
              placeholder=" 아이디"
              onChangeText={this.setId}
            />
            <Button 
              title="중복체크"
              onPress={()=>{
                userStore.checkUser(this.state.id).then((data)=>{
                  if(!data.data.check){
                    alert('사용할 수 있는 아이디 입니다.')
                  }
                  else{
                    alert('사용할 수 없는 아이디 입니다.')
                  }
                });
              }}
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
              onChangeText={this.setPw}
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
              placeholder=" 비밀번호 확인"
              // onChangeText={this.setText}
            />
          </View>
          <View style={{
            width:"100%",
            padding:5,
          }}>
            <Button title='가입하기'
              onPress={()=>{
                userStore.
                signUpUser(this.state).then((res)=>{
                    alert('이메일 인증 후 로그인 해주시기 바랍니다.');
                    this.props.navigation.navigate('Login');
                  })
                  .catch((res)=>{
                    alert('회원가입을 다시 진행해 주시기 바랍니다.');
                });
            }}/>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  main:{
      backgroundColor: "#ffffff",
      flex:1,
          alignItems: 'center',
          justifyContent: 'center',
  },
  mainView:{
    backgroundColor: '#2fa9ff',
    width:'100%',
    height:'100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default SignUpScreen;
