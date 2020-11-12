import {decorate, observable, action, computed} from 'mobx';
import {observer} from 'mobx-react';
import http from "../../utils/http-common";
import fish from "../../src/assets/img88.jpg"

class FishStore {
    baseURL = "/api/";
    @computed
    userFishes = [];

    @observable
    allFishes = [];

    @computed
    searchFish = {};

    @computed
    predictFish = [];
    //vuex의 mutation 부분
    @action
    setUserFishes = (data) => { this.userFishes = data};

    @action
    setSearchFish = (data) =>{
        this.searchFish = data.data;
    }
    
    @action
    setDiscriminateFish = (data) => {
        this.predictFish= data;
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

    @action
    getUserFishes = (id) => {
        const URL = this.baseURL+'users/catches/';
        const fd = new FormData();
        console.log(id)
        fd.append('user_id',id);
        return http.post(`${URL}`,{user_id: id});
    }

    @action
    sendDiscrimination = (data) =>{
        const fd = new FormData();
        fd.append('img',{
            uri: data.uri,
            name: data.fileName,
            type: data.type
        })
        console.log(fd)
        const URL = this.baseURL +'fishdiscriminations/';
        return http.post(`${URL}`,fd,{
            headers:{
                'Content-Type':"multipart/form-data",
                'filename' : 'file'
            }
        })
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