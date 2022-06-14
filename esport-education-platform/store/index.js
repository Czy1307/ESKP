import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { setStore } from '@/utils/storage'

export default new Vuex.Store({
    state: {
        login: false,
        userInfor: null,
    },
    mutations: {
        islogin(state, info) {
            state.userInfo = info
            state.login = true
            setStore('userInfo', info)
        }
    }
})