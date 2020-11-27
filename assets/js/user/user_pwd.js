$(function () {
    // 获取form
    var form = layui.form
    // 
    form.verify({
        Pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
                return '新密码不能和原密码一致！'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '俩次输入的密码不一致！'
            }
        }
    })
    // 获取layer
    var layer = layui.layer
    // 提交重置密码
    $('.layui-form').on('submit', function (e) {
        // 清除默认
        e.preventDefault()
        // Ajax
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜你成功修改密码！')
                // 清空表单
                $('.layui-form')[0].reset()
            }
        })
    })
})