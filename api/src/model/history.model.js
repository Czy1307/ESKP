const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

// 创建模型
const History = seq.define('eskp_history', {
    // sequelize会自动创建管理id
    account: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '用户名,唯一'
    },
    historyList: {
        type: DataTypes.TEXT,
        get: function () {
            return JSON.parse(this.getDataValue('historyList'));
        },
        set: function (val) {
            val.replace('\\', '')
            return this.setDataValue('historyList', val);
        }
    },
})

//强制重新创建数据表
// History.sync({ force: true })

module.exports = History