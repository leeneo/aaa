
$("#imgUpload").fileinput({
    language: 'zh',
    uploadUrl: "/mer/posmer/maintenance/addImg",
    autoReplace: true,
    maxFileCount: 1,
    allowedFileExtensions: ["jpg", "png", "gif"],
    browseClass: "btn btn-primary", //按钮样式 
    enctype: 'multipart/form-data',
    previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
    uploadExtraData: function(previewId, index) {   //额外参数
            var obj = {};
            obj.addImg_merId = $("#addImg_merId").val(); 
            obj.addImg_type = $("#addImg_type").val();
            obj.addImg_salesmanId = $("#addImg_salesmanId").val();
            obj.addImg_declarationDate = $("#addImg_declarationDate").val();
            obj.addImg_machineDate = $("#addImg_machineDate").val();
            return obj;
        }, layoutTemplates :{ 
        // actionDelete:'', //去除上传预览的缩略图中的删除图标
            actionUpload:'',//去除上传预览缩略图中的上传图片；
            actionZoom:''   //去除上传预览缩略图中的查看详情预览的缩略图标。
        }
    }).on("fileuploaded", function (e, data) {
    var res = data.response;
    if (res.state > 0) {
        layer.msg('上传成功');
        table.ajax.reload();
        $('#addImg').modal('hide');
    } else {
        layer.msg('上传失败');
        table.ajax.reload();
    }   

        $(e.target).fileinput('clear').fileinput('unlock') 
            $(e.target).parent().siblings('.fileinput-remove').hide()
}); 
// --------------------- 
// 作者：ChEnSv 
// 来源：CSDN 
// 原文：https://blog.csdn.net/weixin_41800431/article/details/86521219 
// 版权声明：本文为博主原创文章，转载请附上博文链接！