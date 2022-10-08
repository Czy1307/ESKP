import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//引入仓库
import course from './course'
import user from './user'


export default new Vuex.Store({
    modules: {
        course,
        user,
        login
    }
})