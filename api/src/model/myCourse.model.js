const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

// 创建模型
const MyCourse = seq.define('eskp_myCourse', {
    // sequelize会自动创建管理id
    account: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '用户名,唯一'
    },
    courseList: {
        type: DataTypes.TEXT,
        get: function () {
            return JSON.parse(this.getDataValue('courseList'));
        },
        set: function (val) {
            val.replace('\\', '')
            return this.setDataValue('courseList', val);
        }
    },
})

//强制重新创建数据表
MyCourse.sync({ force: true })

module.exports = MyCourse