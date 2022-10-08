import { reqCourseList } from "../../src/api"
const state = {
    courseList: []
}
const mutations = {
    COURSELIST(state, courseList) {
        state.courseList = courseList
    }
}

const actions = {
    async courseList({ commit }) {
        let result = await reqCourseList()
        commit("COURSELIST", result)
    }
}

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters,
}