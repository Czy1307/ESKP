const fs = require('fs')

const Router = require('koa-router')
const router = new Router()

fs.readdirSync(__dirname).forEach(file => {
    if (file !== 'index.js') {
        // routePath会变化，这里用let声明
        let routePath = require('./' + file)
        router.use(routePath.routes())
    }
})

module.exports = router