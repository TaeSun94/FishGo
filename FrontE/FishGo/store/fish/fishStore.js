import {decorate, observable, action, computed} from 'mobx';
import {observer} from 'mobx-react';
import http from "../../utils/http-common";


class FishStore {
    baseURL = "/api/";
    @observable
    userFishes = [];

    @observable
    allFishes = [];

    @computed
    searchFish = {};
    //vuex의 mutation 부분
    @action
    setUserFishes = (data) => { this.userFishes = data.data};

    @action
    setSearchFish = (data) =>{
        this.searchFish = data.data;
    }
    
    @action
    setAllFishesInfo = (data) => {
        this.allFishes = data.fishes;
    };
    
    //vuex의 action 부분
    @action
    handleAddUserFishes = () =>{
        // this.userInfo.pu
    }

    @action
    getAllFishes = () =>{
        const URL = this.baseURL +'fishes/';
        return http.get(`${URL}`);
    }

    // @action
    // getSearchFish(params){
    //     const URL = this.baseURL + 'fishes/'
    //     console.log(URL)
    //     http.get(`${URL}`).then((data)=>{
    //         console.log(data);
            
    //     })
    // }
}

export default FishStore;