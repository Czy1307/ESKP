module.exports = (err, ctx) => {
    let status = 500  // 需修改变量，暂用let
    if (err.code === '10001') {
        status = 400
    } else if (err.code === '10002') {
        status = 409
    }
    ctx.status = status
    ctx.body = err
}