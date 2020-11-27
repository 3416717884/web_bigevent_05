$(function () {
    var url = 'http://ajax.frontend.itheima.net'
    $.ajaxPrefilter(function (params) {
        params.url = url + params.url
        // 判断 路径里面是否有 /my/ 有的话需要添加 headers
        if (params.url.indexOf('/my/') !== -1) {
            params.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        }
        // 拦截
        params.complete = function (res) {
            var obj = res.responseJSON;
            if (obj.status !== 0 && obj.message == '身份认证失败！') {
                // 清空本地
                localStorage.removeItem('token')
                // 跳转页面
                location.href = '/login.html'
            }
        }
    })

})