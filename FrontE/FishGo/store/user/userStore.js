//java의 service의 역할
import {decorate, observable, action, computed} from 'mobx';
import {observer} from 'mobx-react';
import http from '../../utils/http-common'
import { Alert } from 'react-native';

class UserStore {
    baseURL = "/auth";

    @observable
    userInfo = {
        token: null,
        user: {}
    };
    
    //vuex의 mutation 부분
    @action
    setUserInfo = (data) => { 
        this.userInfo = data;
        // return this.userInfo;
    };

    @action
    getUserInfo() {
        return this.userInfo;
    }
    
    //vuex의 action 부분
    @action
    logInUser(params){
        const URL = this.baseURL+'/login/';
        return http.post(`${URL}`,{
            "username": params.id,
            "password": params.pw
        });
    }

    @action
    signUpUser(params){
        const URL = this.baseURL+'/signup/';
        return http.post(`${URL}`,{
            "username": params.id,
            "password": params.pw
        });
    }

    @action
    logOutUser(params){
        const URL = this.baseURL+'/logout/';
        return http.post(`${URL}`,{params});
    }

    @action
    checkUser(temp_name){
        const URL = this.baseURL+'/check/';
        return http.post(`${URL}`,{temp_name});
    }

    //kakao 로그인
    // kakaoLoginUser(params){
    //     URL = this.baseURL+'/signup';
    //     return http.post(`${URL}`,params);
    // }

    @action
    resetPW(email){
        const URL = '/rest-auth/password/reset/';
        return http.post(`${URL}`,{
            email: email
        });
    }

}

// const store = new UserStore();
// console.log(store.checkUser('abcd'));
export default UserStore;