$(function () {
    // 导入 layer
    var layer = layui.layer
    // 导入 layer
    var form = layui.form
    // 数据
    var q = {
        pagenum: '1',
        pagesize: '2',
        cate_id: '',
        state: ''
    }
    // 获取文章
    initTable()
    function initTable() {
        $.ajax({
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 通过 template
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                initF(res.total)
            }
        })
    }
    // 获取到 分类下拉
    initCase()
    function initCase() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 
                var htmlStu = template('tpl-case', res)
                $('[name=cate_id]').html(htmlStu)
                // 重新渲染
                form.render()
            }
        })
    }
    // 筛选
    $('#form-sx').submit(function (e) {
        // 阻止默认
        e.preventDefault()
        // 获取数据
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        // 
        q.cate_id = cate_id
        q.state = state
        // 获取文章
        initTable()
    })
    // 分页
    function initF(total) {
        // 获取分页
        var laypage = layui.laypage
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    // 获取文章
                    initTable()
                }
            }
        })
    }
    // 删除
    $('tbody').on('click', '.btn-delete', function () {
        // 获取id
        var id = $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                url: '/my/article/delete/' + id,
                success: function (res) {
                    // console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    // 
                    layer.msg('删除文件信息成功！')
                    // 
                    if ($('.btn-delete').length == 1 && q.pagenum > 1) {
                        q.pagenum--
                    }
                    // 获取文章
                    initTable()
                }
            })
            layer.close(index);
        });
    })
})