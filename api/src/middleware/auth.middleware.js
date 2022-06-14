const { tokenExpiredError, invalidToken } = require('../constant/err.type')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config.default')

const
    auth = async (ctx, next) => {
        try {
            // user包含payload信息
            const { authorization } = ctx.request.header
            const token = authorization.replace('Bearer ', '')
            const user = jwt.verify(token, JWT_SECRET)
            ctx.state.user = user
        } catch (error) {
            switch (error.name) {
                case 'TokenExpiredError':
                    console.error('token已过期', error);
                    ctx.app.emit('error', tokenExpiredError, ctx)
                    return
                case 'JsonWebTokenError':
                    console.error('无效的token', error);
                    ctx.app.emit('error', invalidToken, ctx)
                    return
            }
        }
        await next()
    }

module.exports = {
    auth
}