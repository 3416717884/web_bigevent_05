$(function () {
    // 导入 layer
    var layer = layui.layer
    // 导入 layer
    var form = layui.form
    // 获取数据
    initTable()
    function initTable() {
        // 获取数据
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return
                }
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    // 关闭层
    var indexAll = null
    // 弹出框
    $('#btn-add').on('click', function () {
        // 弹出框
        indexAll = layer.open({
            type: '1',
            title: '添加文章分类',
            content: $('#doccm').html(),
            area: ['500px', '260px']
        });
    })
    // 添加
    $('body').on('submit', '#form-add', function (e) {
        // 清楚默认
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('添加分类成功！')
                // 获取数据
                initTable()
                // 关闭层
                layer.close(indexAll)
            }
        })
    })
    // 关闭层
    var indexEdit = null
    // 点击编辑
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: '1',
            title: '修改文章分类',
            content: $('#doccedit').html(),
            area: ['500px', '260px']
        });
        // 获取当前点击的数据
        // 获取id
        var id = $(this).attr('data-id')
        // console.log(id);
        $.ajax({
            url: '/my/article/cates/' + id,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('form-edit', res.data)
            }
        })
    })
    // 确认编辑
    $('body').on('submit', '#form-edit', function (e) {
        // 清楚默认
        e.preventDefault()
        // 
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('修改文章分类成功！')
                // 获取数据
                initTable()
                // 关闭层
                layer.close(indexEdit)
            }
        })
    })
    // 删除
    $('tbody').on('click', '.btn-delete', function () {
        // id
        var id = $(this).siblings('.btn-edit').attr('data-id')
        // console.log(id);
        // 询问框
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    // console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('删除文章分类失败')
                    // 获取数据
                    initTable()
                }
            })
            layer.close(index);
        });

    })
})