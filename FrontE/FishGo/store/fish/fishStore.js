import {decorate, observable, action, computed} from 'mobx';
import {observer} from 'mobx-react';
class FishStore {
    @observable
    userFishes = [];

    @observable
    allFishes = [];

    // @observable


    //Add userInfo
    @action
    handleAddUserFishes = () =>{
        // this.userInfo.pu
    }
}

export default FishStore;