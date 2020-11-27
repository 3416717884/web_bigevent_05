$(function () {
    // 获取 layer form
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '用户昵称长度只限 1 ~ 6 位'
            }
        }
    })
    // 获取数据
    initUserInfo()
    // 获取 layer
    var layer = layui.layer
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 渲染
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 重置
    $('#btnReset').click(function (e) {
        // 清除重置
        e.preventDefault()
        // 重新渲染
        initUserInfo()
    })
    // 提交修改
    $('.layui-form').submit(function (e) {
        // 清除默认
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('修改用户信息成功！')
                // 渲染到页面
                window.parent.getUserInof()
            }
        })
    })
})