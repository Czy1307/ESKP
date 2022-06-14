const Router = require('koa-router')
const router = new Router({ prefix: '/goods' })
const { create, getData, getDetail } = require('../controller/goods.controller')

router.post('/create', create)
// 请求所有课程数据
router.get('/courseData', getData)
// 请求课程详情页数据
router.get('/courseDetail', getDetail)

module.exports = router