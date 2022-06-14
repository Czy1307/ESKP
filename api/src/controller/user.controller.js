const jwt = require('jsonwebtoken')

const { createUser, getUserInfo, updateById, createHistroy, createUserInfo, createMycourse } = require('../service/user.service')

const { userRegisterError } = require('../constant/err.type')

const { JWT_SECRET } = require('../config/config.default')
const UserInfo = require('../model/userInfo.model')
const History = require('../model/history.model')
const MyCourse = require('../model/myCourse.model')

class UserController {
    async register(ctx, next) {
        // 获取数据
        // console.log(ctx.request.body);
        // 操作数据库
        const { user_name, password } = ctx.request.body
        try {
            // 创建用户表
            const res = await createUser(user_name, password)
            // 创建个人信息表
            await createUserInfo(user_name)
            // 创建历史记录表
            await createHistroy(user_name, '[]')
            // 创建我的课程表
            await createMycourse(user_name, '[]')
            // 返回结果
            ctx.body = {
                code: 0,
                message: '用户注册成功',
                result: {
                    id: res.id,
                    user_name: res.user_name
                }
            }
        } catch (error) {
            console.log(error)
            ctx.app.emit('error', userRegisterError, ctx)
        }
    }

    async login(ctx, next) {
        const { user_name } = ctx.request.body
        // 获取用户信息(id, user_name, is_admin)
        try {
            // 剔除password
            const { password, ...userInfo } = await getUserInfo({ user_name })
            ctx.body = {
                code: 0,
                message: '用户登陆成功',
                result: {
                    userInfo: userInfo,
                    token: jwt.sign(userInfo, JWT_SECRET, { expiresIn: '1d' })
                }

            }
        } catch (error) {
            console.error('用户登陆失败', error);
        }
    }

    async changePassword(ctx, next) {
        const id = ctx.state.user.id
        const password = ctx.request.body.password
        if (await updateById({ id, password })) {
            ctx.body = {
                code: 0,
                message: '修改密码成功',
                result: '',
            }
        } else {
            ctx.body = {
                code: '10007',
                message: '修改密码失败',
                result: '',
            }
        }
    }

    async getPersonInfo(ctx, next) {
        const userAccount = ctx.query.account
        const res = await UserInfo.findOne({
            where: { account: userAccount }
        })
        ctx.body = res.dataValues
    }

    async getPersonHistory(ctx, next) {
        const userAccount = ctx.query.account
        const res = await History.findOne({
            where: { account: userAccount }
        })
        ctx.body = res.dataValues
    }

    async getMyCourse(ctx, next) {
        const userAccount = ctx.query.account
        const res = await MyCourse.findOne({
            where: { account: userAccount }
        })
        ctx.body = res.dataValues
    }

    // 代码乱，后期整理
    async addHistory(ctx, next) {
        const { account, historyList } = ctx.request.body
        const newHistoryData = {}
        const whereOpt = { account }
        const oldRes = await History.findOne({
            where: { account: account }
        })
        const oldHistory = oldRes.dataValues.historyList
        const oldHistoryList = JSON.parse(oldHistory)
        oldHistoryList.unshift(historyList)
        const newHistoryList = JSON.stringify(oldHistoryList)

        newHistoryList && Object.assign(newHistoryData, { historyList: newHistoryList })

        const res = await History.update(newHistoryData, { where: whereOpt })

        ctx.body = {
            code: 0,
            message: '添加观看记录成功',
            result: '',
        }

        return res[0] > 0
    }

    async addCourse(ctx, next) {
        const { account, courseList } = ctx.request.body
        const newCourseData = {}
        const whereOpt = { account }
        const oldRes = await MyCourse.findOne({
            where: { account: account }
        })
        const oldCourse = oldRes.dataValues.courseList
        const oldCourseList = JSON.parse(oldCourse)
        oldCourseList.unshift(courseList)
        const newCourseList = JSON.stringify(oldCourseList)

        newCourseList && Object.assign(newCourseData, { courseList: newCourseList })

        const res = await MyCourse.update(newCourseData, { where: whereOpt })

        ctx.body = {
            code: 0,
            message: '添加课程成功',
            result: '',
        }

        return res[0] > 0
    }

    async changeInfo(ctx, next) {
        const { account, name, phone, email, type, sex, birthday } = ctx.request.body
        const whereOpt = { account }
        const newInfo = {}

        name && Object.assign(newInfo, { name })
        phone && Object.assign(newInfo, { phone })
        email && Object.assign(newInfo, { email })
        type && Object.assign(newInfo, { type })
        sex && Object.assign(newInfo, { sex })
        birthday && Object.assign(newInfo, { birthday })

        const res = await UserInfo.update(newInfo, { where: whereOpt })

        ctx.body = {
            code: 0,
            message: '修改个人信息成功',
            result: '',
        }

        return res[0] > 0
    }
}

module.exports = new UserController