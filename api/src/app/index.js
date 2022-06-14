const Koa = require('koa')
const KoaBody = require('koa-body')
const bodyPareser = require('koa-bodyparser')

const errHandler = require('./errHandler')

const router = require('../router')

const app = new Koa()

app.use(KoaBody())
app.use(router.routes())

app.use(bodyPareser())

// 统一错误处理
app.on('error', errHandler)

module.exports = app