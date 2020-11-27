$(function () {
    // 获取用户信息
    getUserInof()
    // 退出
    $('#loginOut').click(function () {
        layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 清空本地
            localStorage.removeItem('token')
            // 跳转页面
            location.href = '/login.html'
            layer.close(index);
        });
    })
})
// 获取layer
var layer = layui.layer
// 封装全局函数
function getUserInof() {
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            randerAvatar(res.data)
        }
    })
}
// 渲染
function randerAvatar(user) {
    // 渲染昵称
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp&nbsp' + name)
    // 渲染头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        var text = name[0].toUpperCase()
        $('.text-avatar').html(text).show()
        $('layui-nav-img').hide()
    }
}
//
