import UserStore from './user/userStore';
import FishStore from './fish/fishStore';

const userStore = new UserStore();
const fishStore = new FishStore();

export default{
    userStore: userStore,
    fishStore: fishStore,
};