
import store from './store/store.js';
export default {
    methods:{
        $canChange(userId){
            const user = JSON.parse(store.getters['auth/getProfile'])
            return user.id === userId
        },
        $isAdmin(){
            const user = JSON.parse(store.getters['auth/getProfile'])
            return user.admin === 1
        }
    }
}