const User = require('../model/user.model')
const History = require('../model/history.model')
const UserInfo = require('../model/userInfo.model')
const MyCourse = require('../model/myCourse.model')

class UserService {
    async createUser(user_name, password) {
        // 插入数据
        // User.create({
        //     user_name: user_name,
        //     password: password
        // })
        // 简写
        const res = await User.create({ user_name, password })
        return res.dataValues
    }

    async createHistroy(account, historyList) {
        const res = await History.create({ account, historyList })
        return res.dataValues
    }

    async createUserInfo(account) {
        const res = await UserInfo.create({ name: account, account: account })
        return res.dataValues
    }

    async createMycourse(account, courseList) {
        const res = await MyCourse.create({ account, courseList })
        return res.dataValues
    }

    async getUserInfo({ id, user_name, password, is_admin }) {
        const whereOpt = {}

        id && Object.assign(whereOpt, { id })
        user_name && Object.assign(whereOpt, { user_name })
        password && Object.assign(whereOpt, { password })
        is_admin && Object.assign(whereOpt, { is_admin })

        const res = await User.findOne({
            attributes: ['id', 'user_name', 'password', 'is_admin'],
            where: whereOpt
        })
        return res ? res.dataValues : null
    }

    async updateById({ id, user_name, password, is_admin }) {
        const whereOpt = { id }
        const newUser = {}

        user_name && Object.assign(newUser, { user_name })
        password && Object.assign(newUser, { password })
        is_admin && Object.assign(newUser, { is_admin })

        const res = await User.update(newUser, { where: whereOpt })
        return res[0] > 0
    }
}

module.exports = new UserService()