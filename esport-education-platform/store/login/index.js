import { setStore } from '@/utils/storage'

const state = {
    login: false,
    userInfor: null,
}
const mutations = {
    islogin(state, info) {
        state.userInfo = info
        state.login = true
        setStore('userInfo', info)
    }
}
const actions = {}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}