const Router = require('koa-router')

const { userValidator, verifyUser, crpytPassword, verifyLogin } = require('../middleware/user.middleware')
const { register, login, changePassword, getPersonInfo, getPersonHistory, addHistory, getMyCourse, addCourse, changeInfo } = require('../controller/user.controller')
const { auth } = require('../middleware/auth.middleware')
const router = new Router({ prefix: '/users' })

// 注册接口
router.post('/register', userValidator, verifyUser, crpytPassword, register)

// 登录接口
router.post('/login', userValidator, verifyLogin, login)

// 修改密码接口
router.patch('/', auth, crpytPassword, changePassword)

// 获取个人信息
router.get('/info', getPersonInfo)

// 修改个人信息
router.patch('/changeInfo', changeInfo)

// 获取个人浏览记录
router.get('/history', getPersonHistory)

// 添加浏览记录
router.post('/addHistory', addHistory)

// 获取我的课程
router.get('/myCourse', getMyCourse)

// 添加我的课程
router.post('/addCourse', addCourse)

module.exports = router