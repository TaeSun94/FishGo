//java의 service의 역할
import {decorate, observable, action, computed} from 'mobx';
import {observer} from 'mobx-react';
import http from '../../utils/http-common'

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
        http.post(`${URL}`,{
            "username": params.id,
            "password": params.pw
        }).then((res) =>{
            console.log(res);
            if(res.status === 200){
                this.setUserInfo(res.data.data);
            }
        })
        .catch(()=>{
            alert('아이디 또는 비밀번호를 다시 확인해주세요.');
        });
    }

    @action
    signUpUser(params){
        const URL = this.baseURL+'/signup/';
        return http.post(`${URL}`,{
            "username": params.id,
            "password": params.pw
        });
        // .then((res) =>{
        //     console.log(res);
        //     if(res.status === 200){
                // alert('이메일 인증 후 로그인 해주시기 바랍니다.');
        //         return true;
        //     }
        // })
        // .catch(()=>{
            // alert('아이디 또는 비밀번호를 다시 확인해주세요.');
        //     return false;
        // });
        // return http.post(`${URL}`,{
        //     "username": params.id,
        //     "password": params.pw
        // });
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
}

// const store = new UserStore();
// console.log(store.checkUser('abcd'));
export default UserStore;