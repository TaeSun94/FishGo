/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
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

@inject('userStore')
@observer
export default class LoginScreen extends Component {
  state = {
    id: '',
    pw: '',
    isCorrect: '비밀번호와 다릅니다.',
  }

  setId = (id) => {
    this.setState({ id: id });
  }

  setPw = (pw) => {
    this.setState({ pw: pw });
  }
  successAlert = () =>
    Alert.alert(
      "FishGo에 오신걸 환영합니다.",
      "이메일 인증 후 사용해 주시기 바랍니다.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  failAlert = () =>
    Alert.alert(
      "",
      "다시 회원가입 해주세요.",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  unuseAlert = () =>
    Alert.alert(
      "",
      "사용 가능합니다.",
      [
        { text: "사용하기", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  useAlert = () =>
    Alert.alert(
      "",
      "중복된 아이디가 존재합니다.",
      [
        { text: "돌아가기", onPress: () => console.log("OK Pressed") }
      ]
    );
  setIsCorrectPW = (pwd) => {
    if (this.state.pw === pwd) {
      this.setState({ isCorrect: '비밀번호와 일치합니다.' });
    }
  }

  render() {
    const { userStore } = this.props;
    return (
      <LinearGradient colors={['#736efe', '#5efce8']}>
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
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  userStore.checkUser(this.state.id).then((data) => {
                    if (!data.data.check) {
                      this.unuseAlert();
                    }
                    else {
                      this.useAlert();
                    }
                  });
                }}
              >
                <Text style={styles.btnText}>중복체크</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btnView}>
              <TextInput
                style={styles.text}
                visible-password
                secureTextEntry
                placeholder=" 비밀번호"
                onChangeText={this.setPw}
              />
            </View>
            <View style={styles.btnView}>
              <TextInput
                style={styles.text}
                secureTextEntry
                placeholder=" 비밀번호 확인"
                onChangeText={this.setIsCorrectPW}
              />
              <Text style={{fontFamily:'Bazzi'}}>{this.state.isCorrect}</Text>
            </View>
            <View style={styles.btnView}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  userStore.
                    signUpUser(this.state).then((res) => {
                      this.successAlert();
                      this.props.navigation.navigate('Login');
                    })
                    .catch((res) => {
                      console.log(res);
                      this.failAlert();
                    });
                }}>
                <Text style={styles.btnText}>가입하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    height: '100%',
  },
  logoView: {
    margin: 30,
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 80,
    fontFamily: "Bazzi",
    color: 'white'
  },
  text: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    fontFamily: "Bazzi",
    fontSize: 20
  },
  subView: {
    marginTop: 80,
    marginLeft: 10,
    marginRight: 10,
  },
  btnView: {
    width: "100%",
    padding: 10,
  },
  btn: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#4F8EF7',
    borderRadius: 20
  },
  btnText: {
    fontSize: 20,
    // fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: "Bazzi",
  }
});
