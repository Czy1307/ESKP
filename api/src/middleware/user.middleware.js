const bcrypt = require('bcryptjs')

const { getUserInfo } = require('../service/user.service')
const { userRegisterError, userNotExist, userLoginError, invalidPassword, userFormateError, userAlreadyExited } = require('../constant/err.type')

// 验证输入合法性
const userValidator = async (ctx, next) => {
    const { user_name, password } = ctx.request.body
    if (!user_name || !password) {
        // console.error('用户名或密码为空', ctx.request.body);
        ctx.app.emit('error', userFormateError, ctx)
        return
    }
    await next()
}

// 验证用户是否存在
const verifyUser = async (ctx, next) => {
    const { user_name } = ctx.request.body
    try {
        const userInfo = await getUserInfo({ user_name })
        if (userInfo) {
            // console.error('用户名已存在', { user_name })
            ctx.app.emit('error', userAlreadyExited, ctx)
            return
        }
    } catch (error) {
        console.error('获取用户信息错误', error);
        ctx.app.emit('error', userRegisterError, ctx)
        return
    }
    await next()
}

// 密码加密
const crpytPassword = async (ctx, next) => {
    const { password } = ctx.request.body
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    ctx.request.body.password = hash
    await next()
}

const verifyLogin = async (ctx, next) => {
    const { user_name, password } = ctx.request.body

    try {
        // 1.判断用户是否存在
        const res = await getUserInfo({ user_name })
        if (!res) {
            ctx.app.emit('error', userNotExist, ctx)
            return
        }

        // 2.密码是否正确
        const passwordCorrect = bcrypt.compareSync(password, res.password)
        if (!passwordCorrect) {
            ctx.app.emit('error', invalidPassword, ctx)
            return
        }
    } catch (error) {
        ctx.app.emit('error', userLoginError, ctx)
        return
    }
    await next()
}

module.exports = {
    userValidator,
    verifyUser,
    crpytPassword,
    verifyLogin
}