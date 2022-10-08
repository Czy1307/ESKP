const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

// 创建模型
const UserInfo = seq.define('eskp_userInfo', {
    // sequelize会自动创建管理id
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '昵称'
    },
    account: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '用户名,唯一'
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '手机号'
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '邮箱'
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '用户类型'
    },
    sex: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '性别'
    },
    birthday: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '生日'
    }
})

//强制重新创建数据表
// UserInfo.sync({ force: true })

module.exports = UserInfo