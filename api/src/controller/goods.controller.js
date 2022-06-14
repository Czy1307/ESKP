const { publishGoodsError } = require('../constant/err.type')
const { createGoods } = require('../service/goods.service')
const Goods = require('../model/goods.model')

class GoodsController {
    async create(ctx) {
        // 调用createGoods方法
        try {
            const { createdAt, updatedAt, ...res } = await createGoods(ctx.request.body)
            ctx.body = {
                code: 0,
                message: '发布商品成功',
                result: res,
            }
        } catch (error) {
            console.error(error);
            return ctx.app.emit('error', publishGoodsError, ctx)
        }
    }
    async getData(ctx) {
        const res = await Goods.findAll({
            attributes: ['id', 'goods_area', 'goods_name', 'goods_price', 'goods_img', 'goods_author'],
            where: {}
        })
        ctx.body = res
    }
    async getDetail(ctx) {
        const courseId = ctx.query.courseId
        const res = await Goods.findOne({
            where: { id: courseId }
        })
        ctx.body = res.dataValues
    }
}

module.exports = new GoodsController