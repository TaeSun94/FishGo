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
    Button,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert
} from 'react-native';
import { color } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

@inject('userStore')
@observer
export default class LoginScreen extends Component {
    state = {
        id: ''
    }

    setId = (id) => {
        this.setState({ id: id });
    }

    successAlert = () =>
    Alert.alert(
      "",
      "이메일로 비밀번호 초기화 링크를 확인해주세요!",
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
                            <TouchableOpacity
                                onPress={() => {
                                    userStore.resetPW(this.state.id).then(res=>{
                                        this.successAlert();
                                        this.props.navigation.navigate('Login');
                                    }).catch(res=>console.log(res));
                                }}
                                style={styles.btn}
                            >
                                <Text style={styles.btnText}>
                                    초기화
                                </Text>
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
