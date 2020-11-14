import {decorate, observable, action, computed} from 'mobx';
import {observer} from 'mobx-react';
import http from "../../utils/http-common";

class FishStore {
    baseURL = "/api/";
    @observable
    userFishes = [];

    @observable
    allFishes = [];

    @observable
    selectedFishs = [];

    @computed
    predictFishs = [];
    //vuex의 mutation 부분
    @action
    setUserFishes = (data) => { this.userFishes = data};

    @action
    setSelectedFish = (data) =>{
        this.selectedFishs = data.data;
    }
    
    @action
    setDiscriminateFish = (data) => {
        this.predictFishs= data;
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
    getSelectedFishes = (data) =>{
        const URL = this.baseURL+`fishes/${data.id.id}/catches/`;
        return http.get(`${URL}`,{
            headers:{
                'Authorization': `Token ${data.info.token}`
            }
        });
    }

    @action
    getAllFishes = () =>{
        const URL = this.baseURL +'fishes/';
        return http.get(`${URL}`);
    }

    @action
    getSearchFish = (name) => {
        const URL = this.baseURL+`fishes?keyword=${name}`;
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
        const URL = this.baseURL +'fishdiscriminations/';
        return http.post(`${URL}`,fd,{
            headers:{
                'Content-Type':"multipart/form-data",
                'filename' : 'file'
            }
        })
    }

    @action
    registerUserFish = (data) =>{
        const fd = new FormData();
        fd.append('img',{
            uri: data.data.data.img.uri,
            name: data.data.data.img.fileName,
            type: data.data.data.img.type
        });
        fd.append('lat',data.data.data.site.lat);
        fd.append('lng',data.data.data.site.lng);
        if(data.length.length > 0){
            fd.append('length',data.length.length);
        }
        const URL = this.baseURL+`fishes/${data.data.data.fish.id}/catch/`;
        return http.post(`${URL}`,fd,{
            headers:{
                'Content-Type':"multipart/form-data",
                'Authorization': `Token ${data.info.token}`
            }
        });
    }
}

export default FishStore;