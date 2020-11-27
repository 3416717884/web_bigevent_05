$(function () {
    // 点击去注册 隐藏登录界面
    $('#link_reg').on('click', function () {
        $('.loginBox').hide()
        $('.regBox').show()
    })
    // 点击去登录 隐藏注册界面
    $('#link_login').on('click', function () {
        $('.loginBox').show()
        $('.regBox').hide()
    })
    // 获取 layer
    var layer = layui.layer
    // 注册规则
    var form = layui.form
    form.verify({
        Pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        rePwd: function (value) {
            if (value !== $('.regBox [name=password]').val()) {
                return '输入的俩次密码不一致！'
            }
        }
    })
    // 提交注册
    $('#form_red').submit(function (e) {
        // 清楚默认
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜你注册成功！')
                // 跳转到登录
                $('#link_login').click()
            }
        })
    })
    // 提交登录
    $('#form_login').submit(function (e) {
        // 清除默认
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜你登录成功！')
                // 把token存到本地
                localStorage.setItem('token',res.token)
                // 跳转页面
                location.href = "/index.html"
            }
        })
    })
})