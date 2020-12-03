$(function () {
    // 导入 layer
    var layer = layui.layer
    // 导入 layer
    var form = layui.form
    // 获取文章类别
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
                var htmlStr = template('tpl-case', res)
                $('[name=cate_id]').html(htmlStr)
                // 重新渲染 layUI
                form.render()
            }
        })
    }
    // 初始化富文本编辑器
    initEditor()
    // 裁剪
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    // 点击选择封面触发上传
    $('#btntp').on('click', function () {
        // 触发上传
        $('#file').click()
    })
    $('#file').change(function (e) {
        var file = e.target.files[0]
        if (file == undefined) {
            return layer.msg('请上传文件')
        }
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })
    // 状态
    var state = '已发布'
    $('#btnSava2').on('click', function () {
        state = '草稿'
    })
    // 提交
    $('#form-add').on('submit', function (e) {
        // 
        e.preventDefault()
        // 创建 formDate
        var fd = new FormData(this)
        // console.log(...fd);
        fd.append('state', state)
        // console.log(...fd);
        // 输出图片
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                // console.log(...fd);
                initajax(fd)
            })
    })
    // ajax
    function initajax(fd) {
        console.log(...fd);
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    layer.msg(res.message)
                }
                layer.msg('发布文章成功！')
                // location.href = 'art_list.html'
                setTimeout(() => {
                    window.parent.document.querySelector('#art_list').click()
                }, 1000 );
            }
        })
    }
})