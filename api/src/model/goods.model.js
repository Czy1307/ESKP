const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

// 创建模型
const Goods = seq.define('eskp_goods', {
    // sequelize会自动创建管理id
    goods_area: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品分区',
    },
    goods_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品名称'
    },
    goods_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
        comment: '商品价格'
    },
    goods_img: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品图片url'
    },
    goods_author: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品作者'
    },
    goods_url: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品视频链接'
    }
})

//强制重新创建数据表
Goods.sync({ force: true })

module.exports = Goods